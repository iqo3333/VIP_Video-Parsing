const ROUTES = {
    1: 'https://www.yemu.xyz/?url=',
    2: 'https://jx.playerjy.com/?url=',
    3: 'https://jx.nnxv.cn/tv.php?url=',
    4: 'https://jx.dmflv.cc/?url=',
    5: 'https://jx.xymp4.cc/?url=',
    6: 'https://jx.77flv.cc/?url='
}

function handleRedirect() {
    const route = document.getElementById('routeSelect').value
    const videoUrl = document.getElementById('videoUrl').value.trim()
    const btn = document.querySelector('button')

    if (!isValidUrl(videoUrl)) {
        showError('请输入有效的视频地址')
        return
    }

    btn.innerHTML = '解析中<span class="loading"></span>'
    btn.disabled = true

    const processedUrl = processUrl(videoUrl)
    const fullUrl = ROUTES[route] + encodeURIComponent(processedUrl)

    setTimeout(() => {
        window.open(fullUrl, '_blank')
        btn.innerHTML = '🚀 立即解析'
        btn.disabled = false
    }, 800)
}

function isValidUrl(url) {
    try {
        new URL(url)
        return true
    } catch {
        return /^[\w-]+(\.[\w-]+)+/i.test(url)
    }
}

function processUrl(url) {
    if (!url.startsWith('http')) {
        return `https://${url}`
    }
    return url
}

function showError(msg) {
    const errorEl = document.createElement('div')
    errorEl.className = 'error-msg'
    errorEl.textContent = msg
    document.querySelector('.container').appendChild(errorEl)
    setTimeout(() => errorEl.remove(), 3000)
}

document.getElementById('videoUrl').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleRedirect()
})
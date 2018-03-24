if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  window.location.href = 'http://alberttian.cn/#/error'
} else {
  console.log('ok')
}

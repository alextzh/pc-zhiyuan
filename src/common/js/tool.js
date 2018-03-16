// 截取年月日
export function _normalizeDate(date) {
  return date.substr(0, 10)
}

// 转为以万为单位
export function rendererZhMoneyWan(v) {
  if (isNaN(v)) {
    return v
  }
  v = v * 0.0001 // 10000
  v = parseInt(v)
  rendererZhMoney(v)
  return v
}
// 数字千分符
function rendererZhMoney(v) {
  if (isNaN(v)) {
    return v
  }
  v = (Math.round((v - 0) * 100)) / 100
  v = (v === Math.floor(v)) ? v + '.00' : ((v * 10 === Math.floor(v * 10)) ? v + '0' : v)
  v = String(v)
  var ps = v.split('.')
  var whole = ps[0]
  // var sub = ps[1] ? '.' + ps[1] : '.00'
  var r = /(\d+)(\d{3})/
  while (r.test(whole)) {
    whole = whole.replace(r, '$1' + ',' + '$2')
  }
  v = whole
  return v
}
// 数字千分符转数字
export function rendertoNumber(num) {
  num = num.split(',').join('')
  return num
}

export function _normalizeStr(str) {
  str = str || ''
  const arr = str.split(',')
  const newArr = arr.map(item => {
    return item
  })
  return newArr
}

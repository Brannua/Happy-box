/**
 * @description 函数防抖
 * @author Brannua
 */

/**
 * 防抖函数
 * @param {function} fn callback
 * @param {number} dealy 延迟时间
 */
function debounce(fn, delay) {
  var timer
  return function() {
    clearTimeout(timer)
    timer = setTimeout(fn, delay)
  }
}

export default debounce

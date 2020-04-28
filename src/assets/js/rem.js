/**
 * @description rem-reset
 * @author Brannua
 */

(function (win) {
    var doc = win.document,
        docEl = doc.documentElement,
        timer,
        hz = 10

    function refreshRem() {
        // 获取屏幕宽度
        var width = docEl.getBoundingClientRect().width
        // 将屏幕宽度分成6.4份，1份为1rem
        var rem = width / 6.4

        // 320/6.4    html的fontsize  =  50
        // 640/6.4    html的fontsize  =  100
        docEl.style.fontSize = rem + 'px'
    }

    refreshRem()

    win.addEventListener('resize', () => {
        clearTimeout(timer)
        timer = setTimeout(refreshRem, hz)
    }, false)

    win.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            clearTimeout(timer)
            timer = setTimeout(refreshRem, hz)
        }
    }, false)

})(window)

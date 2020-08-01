// 使用函数节流防止重复点击
// https://blog.csdn.net/qq_37949737/article/details/105089290
// https://www.runoob.com/w3cnote/js-call-apply-bind.html  理解this的作用域
function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500
    }
    let _lastTime = null
    // 返回新的函数
    return function (e) {
        let _nowTime = +new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments)   //将this和参数传给原函数
            _lastTime = _nowTime
        }
    }
}


module.exports = {
    throttle: throttle,
}
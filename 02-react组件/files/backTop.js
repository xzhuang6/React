{
    /* 返回顶部 */
    (function(){
        let $back = document.querySelector('.back-up'),
            $clientH = document.documentElement.clientHeight || document.body.clientHeight, // 窗口可视高度
            target = 0,
            leader = 0,
            timer = null;
        addEvent(window,'scroll',scrollFun);
        function scrollFun() {
            $back.classList[scroll().top >= $clientH ?'add':'remove']('show');
            leader = scroll().top;
        };
        addEvent($back,'click',returnTop);
        /* 返回顶部, 点击按钮 */
        function returnTop() {
            clearInterval(timer);
            timer = setInterval(function () {
                let step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader += step;
                window.scrollTo(0, leader);
                if (Math.abs(target - leader) <= Math.abs(step)) {
                    window.scrollTo(0, 0);
                    clearInterval(timer);
                }
            },10);
        };
        /* 网页卷起高度 */
        function scroll() {
            return {
                "top": window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            };
        };
    })();
}

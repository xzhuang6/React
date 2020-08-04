{
    /* 添加移出class */
    function addDel(dom,rel,cls) {
        dom && dom.classList[rel](cls);
    };
    /* 判断class是否存在 */
    function hasClass(ele, cls) {return (' ' + ele.className + ' ').indexOf(' ' + cls + ' ') > -1;};
    /* 监听 */
    function addEvent(obj,eName,eFn) {!-[1,]?obj.attachEvent('on'+eName,eFn):obj.addEventListener(eName,eFn);};
    /* 提示信息 */
    function reminder(dom,param) {
        dom.style.cssText = `left: ${(window.innerWidth-dom.offsetWidth)/2}px;top: ${(window.innerHeight-dom.offsetHeight)/2}px;`;
        dom.innerHTML = param;
        addDel(dom,'add','veils-layer-show');
        setTimeout(function(){
            addDel(dom,'remove','veils-layer-show');
        },1500);
    };
    /* 页面加载之前的动画 */
    function loading() {
        let $load = document.querySelector('.loading');
        $load && addDel($load,'remove','show');
        document.onreadystatechange = function () {
            if (document.readyState == "complete") {
                $load && addDel($load,'add','show');
                window.$load = $load;
            };
        };
    };
    loading();
    /* body事件 五角星 */
    function star() {
        let body = document.body,
            timer = null,
            color = '';
        body.onclick = function (e) {
            e = e || window.event;
            let span = document.createElement('span'),
                initX = e.pageX - 98,
                initY = e.pageY - 32;
            span.className = 'veiles-start';
            color = randomColor();
            span.style.cssText = `left:${initX}px;top:${initY}px;border-bottom-color:${color};`;
            uproll({span,initY});
            body.appendChild(span);
        };
        /* 随机颜色 */
        function randomColor() {
            let str = '#';
            for (let i = 0; i < 6; i++) {
                str += Math.floor(Math.random()*16).toString(16);
            };
            return str;
        };
        /* uproll事件 */
        function uproll(param) {
            let { span, initY, upward } = param;
            upward = initY;
            clearInterval(timer);
            timer = setInterval(function () {
                let $span = [...document.getElementsByClassName('veiles-start')],
                    step = initY - 6;
                span.style.top = `${step}px`;
                initY = step;
                $span.forEach((item,index) => {
                    if (step < upward - 180) {
                        $span[index] && $span[index].parentNode.removeChild($span[index]);
                        clearInterval(timer);
                    };
                });
            },1000/30);
        };
    };
    addEvent(window,'load',star);
    /* 屏蔽 */
    function shield() {
        let $shield = document.querySelector('.shield'),
            clickTime = 0;
        /* F12 */
        document.onkeydown = function(e){
            e = e || window.event;
            if(e && e.keyCode == 123) {
                addDel($shield,'add','show');
                $shield.innerHTML = '呜呜呜o(╥﹏╥)o,本宝宝被喵星人劫持了!!!';
                setTimeout(() => {
                    addDel($shield,'remove','show');
                },1000);
                e.keyCode=0;
                e.returnValue=false;
            };
        };
        /* 右键 */
        document.oncontextmenu = function (e) {
            e = e || window.event;
            if(new Date() - clickTime < 1000) return false;
            clickTime = new Date();
            addDel($shield,'add','show');
            $shield.innerHTML = '别看啦!本宝宝还小,会害羞的啦!!!♥(ˆ◡ˆԅ)♥';
            // hint(e);
            setTimeout(() => {
                addDel($shield,'remove','show');
            },1000);
            // return false;
        };
        /* 关闭屏蔽 */
        document.onclick = function () {
            addDel($shield,'remove','show');
        };
        /* 屏蔽显示内容 */
        function hint(param) {
            let $wW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                $wH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                $sW = $shield.clientWidth,
                $sH = $shield.clientHeight,
                t = '',
                l = '';
            if (param === 1) {
                l = ($wW - $sW)/2;
                t = ($wH - $sH)/2;
            } else {
                let $sT = param.pageY,
                    $sL = param.pageX;
                l = $sL;
                t = $sT;
                if ($sL + $sW >= $wW) {
                    l = Math.max($sL,0);
                    l = Math.min($sL, $sL - $sW);
                }
                if ($sT + $sH >= $wH) {
                    t = Math.max($sT,0);
                    t = Math.min($sT,$sT - $sH);
                }
            }
            $shield.style.top = t + 'px';
            $shield.style.left = l + 'px';
        };
    };
    addEvent(window,'load',shield);
    // list
    /* 分页渲染结束回滚页面 */
    function scrollTop() {
        let top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
            target = 0,
            timer;
        /* 返回顶部, 点击按钮 */
        clearInterval(timer);
        timer = setInterval(function () {
            let step = (target - top) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            top += step;
            window.scrollTo(0, top);
            if (Math.abs(target - top) <= Math.abs(step)) {
                window.scrollTo(0, 0);
                clearInterval(timer);
            };
        },10);
    };
    // 默认图片
    function defaultImg(dom) {
        let promiseAll = [], // 记录所有的异步
            imgs = []; // 记录所有的预加载图片
        Array.from(dom).forEach((item,index) => {
            promiseAll[index] = new Promise((res,rej) => {
                imgs[index] = new Image();
                imgs[index].src = item.dataset.original;
                addEvent(imgs[index],'load',() => {
                    res(imgs[index])
                });
                addEvent(imgs[index],'error',() => {
                    res();
                });
            });
        });
        Promise.all(promiseAll)
            .then(img => {
                Array.from(dom).forEach((item,index) => {
                    item.src = img[index].src;
                });
            })
            .catch(err => {
                Array.from(dom).forEach((item,index) => {
                    item.src = item.src;
                });
            })
    };
}

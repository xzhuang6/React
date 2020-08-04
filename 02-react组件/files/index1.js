{
    /* 不同分辨率显示不同js */
    let scrWidth = document.documentElement.clientWidth,
        local = window.location.pathname;
    search(); // 搜索
    if (scrWidth >= 1200) {
        /* web */
        /* 导航菜单音乐 */
        sideWeb();
    } else if (scrWidth < 1199 & scrWidth >= 768) {
        /* IPad */
        /* 左侧菜单导航 */
        sideMenu();
    } else  {
        /* 左侧菜单导航 */
        sideMenu();
    };
    /* web端菜单导航 */
    function sideWeb() {
        let $li = document.querySelectorAll('.h-n-r li > a'),
            $p = document.querySelectorAll('.h-n-r li > p'),
            $audio = document.querySelectorAll('.h-n-r li > audio'),
            $music = document.querySelector('.piano'),
            song = ['/layout/head/music/do.mp3','/layout/head/music/re.mp3','/layout/head/music/mi.mp3','/layout/head/music/fa.mp3','/layout/head/music/sol.mp3','/layout/head/music/la.mp3','/layout/head/music/si.mp3','/layout/head/music/dd.mp3'],
            flag = false; // 音乐开关
        /* 音乐开关 */
        $music.onclick = function() {
            let _classList = this.classList;
            _classList[!flag? 'add': 'remove']('hover');
            $p.forEach(item => {
                item.style.opacity = !flag? '1':'0';
            });
            /* 悬浮播放音乐 */
            $li.forEach((item,index) => {
                item.onmouseenter = () => {
                    $audio[index].src =  !flag? '':song[index]
                }
            });
            flag = !flag;
        };
    };
    /* 搜索 */
    function search() {
        let $header =document.querySelector('#header'),
            $btn = document.querySelectorAll('.search .veils-icon'),
            $search = document.querySelector('.site-search');
        $btn.flag = false;
        $btn.forEach(item => {
            item.onclick = function() {
                item.classList[!this.flag?'add':'remove']('veils-icon-guanbi');
                $search.classList[!this.flag?'add':'remove']('show');
                $header.style.zIndex = !this.flag?'11':'';
                this.flag = !this.flag;
            };
        });
    };
    /* 移动端左侧菜单导航 */
    function sideMenu() {
        let $head = document.querySelector('.head'),
            $cont = document.querySelector('.head-cont'),
            $menu = document.querySelector('.head-menu'),
            $banner = document.querySelector('#banner'),
            $side = document.querySelector('.head-side-left'),
            $btn = document.querySelector('.head-search .veils-icon'),
            $search = document.querySelector('.site-search'),
            $cover = document.querySelector('.cover'),
            $main = document.querySelector('#main');
            $footer = document.querySelector('#footer');
        $menu.bool = false;
        $menu.onclick = function() {
            same();
            $btn.classList.remove('veils-icon-guanbi');
            $btn.flag = false; // 更新搜索按钮开关状态
            $search.classList.remove('show');
            $menu.bool = !$menu.bool;
            menuDown(); // 二级导航
        };
        $cover.onclick = function () {
            $menu.bool = true;
            same();
            $menu.bool = false;
        };
        function same(param) {
            $head.style.transform = $cont.style.transform = $cover.style.transform = $main.style.transform = $footer.style.transform = !$menu.bool?`translateX(160px)`:`translateX(0px)`;
            $banner && ($banner.style.transform = !$menu.bool?`translateX(160px)`:`translateX(0px)`);
            $cover.style.display = !$menu.bool?`block`:`none`;
            $side.classList[$menu.bool?'add':'remove']('head-side-btn');
            $menu.children[0].classList[$menu.bool?'add':'remove']('veils-icon-shensuoyou');
            $menu.children[0].classList[!$menu.bool?'add':'remove']('veils-icon-shensuozuo');
        };
    };
    /* 移动端二级手风琴 */
    menuDown()
    function menuDown() {
        let $li = document.querySelectorAll('.head-side-left li'),
            lastIndex = 0;
        /* 一级栏目点击 */
        $li.forEach((item,index) => {
            let $Lia = item.children[0],
                $Lidiv = item.children[1],
                $heiA = item.clientHeight,
                $hei = $Lidiv && $Lidiv.clientHeight;
            item.flag = false;
            item.onclick = function () {
                let $liaT = $li[lastIndex].children[0],
                    $LidivT = $li[lastIndex].children[1];
                /* 隐藏点击栏目外的所有收缩内容 */
                $liaT.classList.remove('show');
                $LidivT && ($LidivT.parentNode.style.height = ``);;
                if (this.flag) { // 已点击
                    this.flag = false;
                } else { // 未点击
                    /* 收缩图标/收缩模块 */
                    this.children[0].classList.add('show');
                    $Lidiv && ($li[index].style.height = `${$heiA+$hei}px`);
                    $li[lastIndex].flag = false; // 保存上一次点击开关记录
                    this.flag = true; // 当前开关记录
                    lastIndex = index; // 保存上一次下标
                };
            };
        });
    };
    function getDefaultStyle(obj,attribute){ // 返回最终样式函数，兼容IE和DOM，设置参数：元素对象、样式特性
        return obj.currentStyle?obj.currentStyle[attribute]:document.defaultView.getComputedStyle(obj,false)[attribute];
    };
    /* 导航高亮 */
    function navHighlight(a) {
        let url = window.location.href,
            hrefA = document.querySelectorAll(a),
            crumbs = document.querySelectorAll('.crumbs-line a');
        if(url.indexOf('detail') >= 0) url = crumbs[crumbs.length-1].href;
        hrefA.forEach(item => {
            let href = item.href;
            if (url === href) {
                if (item.parentNode.nodeName.toLowerCase() === 'p') {
                    item.parentNode.parentNode.parentNode.children[0].classList.add('active');
                } else if (item.parentNode.nodeName.toLowerCase() === 'div') {
                    item.parentNode.parentNode.children[0].classList.add('active');
                };
                item.classList.add('active');
            };
        });
    };
    navHighlight('.h-n-r a');
    navHighlight('.head-side-left a');
    /* 关于我页面处理 */
    local,local.split(/(\/|\.)/)[2].toLocaleLowerCase() === 'about'&& aboutClick();
    function aboutClick(){
        let $right = document.querySelector('.main-right');
        $right && ($right.parentNode.removeChild($right))
    };
}

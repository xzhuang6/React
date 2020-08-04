{
    /* 移动端适配 */
    (function change(){
        let oFz = document.getElementsByTagName("html")[0],
            width = window.innerWidth;
        oFz.style.fontSize = width > 750 ? 75 + 'px' : width/10 +"px";
        window.onresize=function() {change();};
    })();
}

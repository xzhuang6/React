{
    /* 滑入分享 */
    {
        let share = document.querySelector('.share'),
            dl = share.querySelector('dl');
        share.style.width = 0+'px';
        share.onmouseenter = () => {
            share.style.width = 112+'px';
        };
        share.onmouseleave = () => {
            share.style.width = 0+'px';
        };
    }
    /* 点击分享 */
    function shareTo(param) {
        let imgShare = document.querySelectorAll('#main img'),
            qrcode = document.querySelector('.qrcode'),
            qrcodeClose = qrcode.querySelector('h4 i'),
            srcShare = imgShare[0] && imgShare[0].src,
            title = document.title,
            bool = false;
        if ( typeof srcShare == 'undefined' ) {
            srcShare = 'http://'+window.location.host+'/logo.png';
        };
        switch (param) {
            case 'qzone':
                window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+document.location.href+'?sharesource=qzone&title='+title+'&pics='+srcShare+'&summary='+document.querySelector('meta[name="description"]').getAttribute('content'),'newwindow', 'height=600, width=800, top=30%,left=30%, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
                break;
            case 'qq':
                window.open('http://connect.qq.com/widget/shareqq/index.html?url='+document.location.href+'?sharesource=qzone&title='+title+'&pics='+srcShare+'&summary='+document.querySelector('meta[name="description"]').getAttribute('content')+'&desc=指尖轻纱，一个web开发交流的网站','newwindow', 'height=600, width=800, top=30%,left=30%, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
                break;
            case 'sina':
                window.open('http://service.weibo.com/share/share.php?url='+document.location.href+'?sharesource=weibo&title='+title+'&pic='+srcShare+'&rcontent='+document.querySelector('meta[name="description"]').getAttribute('content')+'&appkey=2706825840','newwindow', 'height=600, width=800, top=30%,left=30%, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
                break;
            case 'weixin':
                qrcode.children[2] && qrcode.removeChild(qrcode.children[2]);
                jQuery('.qrcode').qrcode(document.location.href);
                bool = true;
            break;
            default:
                break;
        };
        if (bool) {
            qrcode.style.display = 'block';
            qrcodeClose.onclick = () => {
                qrcode.style.display = '';
                qrcode.children[2] && qrcode.removeChild(qrcode.children[2]);
            };
        }
    }
}

{
    /* 瀑布流 */
    ~function () {
        let $cont = document.querySelector('.main-cont'),
            $scroll = document.querySelector('.scroll-load'),
            $img = document.querySelectorAll('.main-cont .text img'),
            url = window.location.pathname + window.location.search,
            num = 1,
            boll = true;
        if(!$scroll) return false;
        /* 监听窗口改变 */
        addEvent(window,'scroll',function () {
            rollLoad();
        });
        /* 滚动加载数据 */
        function rollLoad() {
            if (!$cont) return false;
            let top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
                distance = $cont.offsetTop + $cont.clientHeight - top,
                winH = document.documentElement.clientHeight || document.body.clientHeight;
            if ( distance >= winH) return;
            if (boll) {
                addDel($scroll,'add','show');
                boll = false;
                setTimeout(() => {
                    num++;
                    ajaxPage(num);
                }, 500);
            };
        };
        /* ajax 提交 */
        function ajaxPage(page) {
            $.ajax({
                url: `${url}`,
                type: 'post',
                dataType: 'json',
                data: {
                    page
                },
                success(data){
                    if (!data.result) {
                        $scroll.children[0].style.display = 'none';
                        $scroll.children[1].innerHTML = '哎哟哟,终于被你发现我的底线啦,略略略!!!';
                        addDel($scroll,'add','show');
                        boll = false;
                        return false;
                    }else{
                        renderdata(data.data);
                        addDel($scroll,'remove','show');
                    };
                },
                error(res){
                    reminder($tip,res.responseText);
                }
            });
        };
        /* 分页数据渲染 */
        function renderdata(param) {
            let $oDiv;
            param.forEach(item => {
                $oDiv = document.createElement('div');
                $oDiv.className = 'text';
                $oDiv.innerHTML = `
                    <div class="img">
                        <a href="${item.links ? item.links : '/article/detail-'+item.id+'.html'}">
                            <img data-original="${ item.fileLoad }" src="/files/image/default.jpg" ondragstart="return false" alt="${ item.NewsTitle }" width="440" height="300" />
                        </a>
                    </div>
                    <div class="info">
                        <h2><span>${ item.column }</span><a href="${item.links ? item.links : '/article/detail-'+item.id+'.html'}">${ item.NewsTitle }</a></h2>
                        <h3>${ item.NavCont }</h3>
                        <a class="read-more" href="${item.links ? item.links : '/article/detail-'+item.id+'.html'}">阅读全文<i class="veils-icon veils-icon-jinrujiantouxiao"></i></a>
                        <p>
                            <span><i class="veils-icon veils-icon-naozhong-copy"></i>${ item.CreatTime.split(' ')[0] }</span>
                            <span><i class="veils-icon veils-icon-liulan"></i>${ item.Readcount }℃</span>
                            <span><i class="veils-icon veils-icon-yonghupinglun"></i>${ item.comments }条评论</span>
                            <span class='like'><i class="veils-icon veils-icon-dianjixihuan"></i><span>${ item.Salute }</span>喜欢</span>
                        </p>
                    </div>`;
                    $cont.appendChild($oDiv);
            });
            $img = document.querySelectorAll('.main-cont .text img');
            defaultImg($img);
            boll = true;
        };
		defaultImg($img);
    }();
}

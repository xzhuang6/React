{
    /* 公用 */
    let $cont = document.querySelector('.main-cont'),
        $img = document.querySelectorAll('.main-cont .text img'),
        $page = document.querySelector('.veils-page'),
        $btn = document.querySelectorAll('.veils-btn'),
        $tab = document.querySelectorAll('.veils-page a'),
        url = window.location.pathname + window.location.search,
        path = '', // 记录地址栏分页数
        $column = '', // 记录当前栏目 分页时更新地址栏
        $total = '', // 记录总分页数
        $len = $tab.length, // 数字分页长度
        curHtml = '', // 记录当前页数
        lastIndex = 0; // 记录当前分页下标
    /* 分页 */
    {
        if ($page) {
            $total = Number($page.dataset.page);
            $tab[lastIndex].classList.add('current');
            $btn[lastIndex].classList.add('veils-disable');
            Array.from($tab).forEach((item,index) => {
                addEvent(item,'click',() => {
                    tabClick(index)
                });
            });
            Array.from($btn).forEach((item,index) => {
                addEvent(item,'click',() => {
                    btnClick(index)
                });
            });
            addEvent(window,'load',() => {
                path = Number(window.location.pathname.split('-')[1].split('.')[0]); // 当前页数
                $tab[lastIndex].classList.remove('current');
                refreshNumTab(path);
            });
        };
        /* tab点击事件 */
        function tabClick(params) {
            if (lastIndex === params) return false;
            change(() => {
                lastIndex = params;
            });
        };
        /* btn点击事件 */
        function btnClick(params) {
            if (hasClass($btn[params],'veils-disable')) return false;
            change(() => {
                if (params) {
                    if (lastIndex === $len-1) return false;
                    lastIndex++;
                } else {
                    if (lastIndex === 0) return false;
                    lastIndex--;
                };
            });
        };
        /* change事件 */
        function change(params){
            $tab[lastIndex].classList.remove('current');
            params && params();
            let page = Number($tab[lastIndex].dataset.page);
            refreshNumTab(page);
            /* 点击切换更新地址栏 */
            addressBar(page);
        };
        /* 分页数字按钮渲染(刷新页面/点击按钮) */
        function refreshNumTab(count) {
            if ($total > count + 1) {
                lastIndex = Math.ceil(($len-1)/2);
                if (count > $len || count > lastIndex ) { // 中间分页
                    curHtml = count;
                    Array.from($tab).forEach((item,index) => {
                        if(index > lastIndex) {
                            item.dataset.page = item.innerHTML = ++curHtml;
                        }else if (index === lastIndex) {
                            item.dataset.page = item.innerHTML = curHtml;
                        } else if(index < lastIndex) {
                            item.dataset.page = item.innerHTML = curHtml - Math.abs(index-lastIndex);
                        };
                    });
                } else { // 第一组分页
                    /* 因为是第一组分页按钮,故刷新页面时可不重新渲染分页按钮 */
                    lastIndex = count - 1;
                };
            } else { // 最后一组分页
                if ($total == count + 1) { // 倒数第二个分页按钮
                    lastIndex = $len - 2;
                    curHtml = count;
                    Array.from($tab).forEach((item,index) => {
                        if(index > lastIndex) {
                            item.dataset.page = item.innerHTML = ++curHtml;
                        }else if (index === lastIndex) {
                            item.dataset.page = item.innerHTML = curHtml;
                        } else if(index < lastIndex) {
                            item.dataset.page = item.innerHTML = curHtml - Math.abs(index-lastIndex);
                        };
                    });
                } else { //
                    lastIndex = $len - 1;
                    Array.from($tab).forEach((item,index) => {
                        item.dataset.page = item.innerHTML = count-Math.abs(index-lastIndex);
                    });
                };
            };
            $tab[lastIndex].classList.add('current');
            /* 第一页/最后一页切换按钮禁止点击 */
            if (lastIndex === 0 || lastIndex === ($len -1)) {
                $btn[0].classList[lastIndex?'remove':'add']('veils-disable');
                $btn[1].classList[!lastIndex?'remove':'add']('veils-disable');
            }else{
                $btn[0].classList.remove('veils-disable');
                $btn[1].classList.remove('veils-disable');
            };
            parent.$load.classList.remove('show');
            ajaxPage(count);
        };
        /* 地址栏路径事件 */
        function addressBar(page) {
            $column = $page.dataset.column;
            let stateObject = {},
                title = "RABBIT",
                newUrl = `/article/${$column}/index-${page}.html`;
            history.pushState(stateObject,title,newUrl);
        };
    }
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
                renderdata(data.data);
                setTimeout(() => {
                    scrollTop();
                    parent.$load.classList.add('show');
                }, 500);
            },
            error(res){
                reminder(res.responseText);
            }
        });
    };
    /* 分页数据渲染 */
    function renderdata(param) {
        let str = '';
        $cont.innerHTML = '';
        param.forEach(item => {
            str += `<div class="text">
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
                </div>
            </div>`;
        });
        $cont.innerHTML = str;
        $img = document.querySelectorAll('.main-cont .text img');
        defaultImg($img);
    };
}

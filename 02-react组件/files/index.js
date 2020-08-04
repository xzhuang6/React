{
    /* banner */
    let veilsBan = class {
        constructor(a,b,c,d,e){
            this.wrap = document.querySelector(a); // 外部大盒子(可做控制器用)
            this.ul = document.querySelector(b); // banner切换盒子(左右)
            this.img = document.querySelectorAll(c); // 上/下一张
            this.tab = document.querySelector(d); // banner切换盒子(左右)
            this.btn = document.querySelectorAll(e); // 上/下一张
            this.li = this.ul.children; // 切换li
            this.len = this.li.length; // 轮播banner长度
            this.tabSpan = this.tab.children;
            this.width = this.ul.parentNode.clientWidth;
            this.num = 0; // 记录当前下标
            this.clickTime = 0; // 记录上一次点击时间
            this.init();
        }
        init(){
            // 生成tab按钮
            this.obj = document.createDocumentFragment(); // 暂存生成的tab按钮标签
            Array.from(this.li).forEach((item) => {
                this.span = document.createElement('span');
                this.obj.appendChild(this.span);
                item.style.width = `${this.width}px`;
            });
            this.tab.appendChild(this.obj);
            addDel(this.tabSpan[this.num],'add','current'); // 默认显示第一个
            this.cloneLi = this.li[this.num].cloneNode(true); // 克隆第一张bann
            this.ul.insertBefore(this.cloneLi,this.li[this.len]); //把克隆的bann放到最后面
            this.len = this.li.length; // 更新bann长度
            this.ul.style.width = `${this.len*this.width}px`;
            this.ul.style.marginLeft = `${-this.num*this.width}px`;
            // tab按钮事件
            Array.from(this.tabSpan).forEach((item,index) => {
                addEvent(item,'click',() => {
                    this.tabClick(index);
                });
            });
            // btn按钮事件
            Array.from(this.btn).forEach((item,index) => {
                addEvent(item,'click',() => {
                    this.btnClick(index);
                });
            });
            // 鼠标滑入
            addEvent(this.wrap,'mouseenter',() => {
                clearInterval(this.timer);
            });
            // 鼠标滑出
            this.autoPlay();
            addEvent(this.wrap,'mouseleave',() => {
                this.autoPlay();
            });
            addEvent(window,'resize',() => {
                clearInterval(this.timer);
                this.width = this.ul.parentNode.clientWidth;
                this.ul.style.width = `${this.len*this.width}px`;
                this.ul.style.marginLeft = `${-this.num*this.width}px`;
                [...this.li].forEach(item => {
                    item.style.width = `${this.width}px`;
                });
                this.autoPlay();
            })
            // 不同设备bann转换
            this.ratioShow();
            this.removeStop();
        }
        tabClick(num){
            this.changeClick(() => {
                this.num = num;
            });
        }
        btnClick(num){
            this.changeClick(() => {
                if (num) {
                    if (this.num == this.len-1) {
                        this.num = 0;
                        this.ul.style.marginLeft = 0;
                    }
                    this.num++;
                } else {
                    if (this.num<=0)  {
                        this.num = this.len-1;
                        this.ul.style.marginLeft = -this.num*this.width+'px';
                    }
                    this.num--;
                }
            });
        }
        changeClick(fn){
            if (new Date() - this.clickTime > 500) {
                addDel(this.tabSpan[this.num%(this.len-1)],'remove','current'); // 默认显示第一个
                fn && fn();
                addDel(this.tabSpan[this.num%(this.len-1)],'add','current'); // 默认显示第一个
                animation(this.ul,{marginLeft:-this.num*this.width},500);
                this.clickTime = new Date();
            };
        }
        autoPlay(){
            this.timer = setInterval(() => {
                this.changeClick(() => {
                    if (this.num == this.len-1) {
                        this.num = 0;
                        this.ul.style.marginLeft = 0;
                    };
                    this.num++;
                });
            },2500);
        }
        ratioShow(){
            // 判断不同设备显示不同尺寸图片(此处偷懒不予详细判断)
            this.scrWidth = document.body.clientWidth || document.documentElement.clientWidth;
            this.bool = this.scrWidth >= 1200 ? 1 : 0;
            Array.from(this.img).forEach((item,index) => {
                this.str = item.src.split(/\-\d/);
                item.src = !this.bool ? this.str[0] + '-' + (index+1) + 'ph' + this.str[1] : item.src;
                !this.bool && (this.li[this.img.length].children[0].children[0].src = this.img[0].src);
            });
        }
        removeStop(){
            let hiddenProperty = 'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : null;
            let visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
            let onVisibilityChange = () => {
                if (!document[hiddenProperty]) {
                    this.autoPlay();
                }else{
                    clearInterval(this.timer);
                }
            }
            document.addEventListener(visibilityChangeEvent, onVisibilityChange);
        }
    };
    window.onload = function () {
        new veilsBan('#banner','#banner .bann-cont ul','#banner .bann-cont ul img','#banner .tab','#banner .btn span');
    }
};

## 一、react入门

### 1. 是什么框架

+ 是一个基本概念上的结构，用于去解决或者处理复杂的问题

+ a. 框架是一个框子

  + 指其约束性
    + 例如门框，决定了门的主体大小

  ![门](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596278062607&di=04eec0f57a1e557e29948b73b32f3af2&imgtype=0&src=http%3A%2F%2Fpro.user.img42.51sole.com%2FproductImages3%2F20150829%2Fb_2743056_20150829221058.jpg)

+ b. 也是一个架子

  + 指其支撑性
    + 例如楼房建筑，支撑技术工人高空作业

  <img src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1596278255214&amp;di=fe2dbc856ee458b49fcd817bfa9a8ae9&amp;imgtype=0&amp;src=http%3A%2F%2Ffiles.b2b.cn%2FPICTUREDEPOT%2F2015%2F20150210%2F20150210222025_2900.jpg" alt="脚手架" style="zoom:50%;" />

  

  



### 2.  为什么要用框架

+ 一般成熟、稳健的框架，周边生态会很丰富，并且它的结构性、扩展性、安全性、稳定性等会很好，还会不断更新迭代。
+ 框架会帮你处理很多细节问题，铺设一些基础性接口，你只需要集中精力完成系统的业务逻辑设计

### 3. 学习前提

+ 完成课程二`JS、ES6`课程的学习，对新技术有强烈的未知欲，付出不亚于任何人的学习态度

### 4. react是什么

+ React 是一个声明式，高效且灵活的用于`构建用户界面`的 JavaScript 库
+ 使用 React 可以将一些简短、独立的代码片段组合成复杂的 `UI` 界面，这些代码片段被称作`组件`

```js
// 只需要声明，无需架设底层实现
// 比如创建一个一个包含2个子节点的dom节点

// jsx就是一个最明显的声明式，超简单、超粗暴，直接声明所有dom元素和属性。
const ele = (
	<div className='box' style={{color:'red'}}>
        <p>this’s p</p>
        <span>this’s span</span>
  	</div>
)
// babeljs 编译 https://babeljs.io/repl/#?browsers=defaults
const ele = React.createElement(
    "div",
    { className: "box" },
    React.createElement("p", null, "this’s p"),
    React.createElement("span", null, "this’s span")
);



// 过程式
var oDiv = document.createElement('div')
oDiv.className = 'box'

var oP = document.createElement('p')
oP.innerText = 'this’s p'
var oSpan = document.createElement('span')
oP.innerText = 'this’s span'

oDiv.appendChild(oP)
oDiv.appendChild(oSpan)
```

+ 渲染流程

  ```css
  初始化的渲染流程分为 3 步
  
  第一步，开发者使用 JSX 语法写 React，babel 会将 JSX 编译为浏览器能识别的 React JS 语法。这一步，一般配合 webpack 在本地进行
  第二步，执行 ReactDOM.render 函数，渲染出虚拟DOM
  第三步，react 将虚拟DOM，渲染成真实的DOM
  
  页面更新的流程同样也是 3 步
  第一步，当页面需要更新时，通过声明式的方法，调用 setState 告诉 react
  第二步，react 自动调用组件的 render 方法，渲染出虚拟 DOM
  第三步，react 会通过 diffing 算法，对比当前虚拟 DOM 和需要更新的虚拟 DOM 有什么区别。然后重新渲染区别部分的真实 DOM
  ```

  

### 5. 环境准备

+ 在浏览器中编写代码
  + https://codepen.io/gaearon/pen/oWWQNa?editors=0010

+ 搭建本地开发环境
  + 安装node  js的运行时
    + 如果已安装过，就不用重复安装

### 6. react初体验

+ 利用react原生能力构建`ui`
+ 引入网络链接

```js
<div id="root"></div>

// react框架 实现 ui 用户界面 关注ui层
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
// react-dom  用户交互  处理dom
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script>
    const e = React.createElement
	const domContainer = document.querySelector('#like_button_container')
    const ele1 = e('h1',{className: 'box',onClick:()=>console.log('good')},'hello react')
    console.log(ele1)
	ReactDOM.render(ele1, document.querySelector('#root'));
</script>
```

+ 在上面的示例中，我们只依赖了浏览器原生支持的特性。这就是为什么我们使用了 JavaScript 函数调用来告诉 React 要显示什么



### 7. JSX语法

+ babel 解析器 转换浏览器 认识的语言
+ 框架的代码想要浏览端预览 需要进行转换
+ babel编译

```js
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
let es6 = `
    let {name,version} = {
        name: 'react',
        version: '16.6.0'
    }
`
const es5 = Babel.transform(es6,{presets:['es2015']}).code
console.log( es5 )
// 通过这种手动的方式  进行转换 框架的代码（JSX） 手动 效率太低
// 自动帮我们进行解析编译 成浏览器识别的代码
// 设置type = babel 就会自动帮我们解析编译
```



```jsx
<div id="root"></div>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script type="text/babel">
    const ele2 = (
    	<h1 className="box" onClick={()=>console.log('good')}> hello jsx </h1>
    )
    console.log( ele2 )
	ReactDOM.render(ele2, document.querySelector('#root'));
    
    // 提示: 您正在使用浏览器中的巴别塔转换器。确保为生产预编译脚本
</script>
```

+ 这两段代码是等价的。虽然 JSX 完全是可选的，但是多数人觉得这样编写 UI 代码更方便

### 8. react基本语法

+ npm下载包-软件包 管理工具
  + 下载第三方插件
    + 别人封装开源的js库

+ npm i yarn -g
+ yarn -v
+ yarn config set registry https://registry.npm.taobao.org
+ 










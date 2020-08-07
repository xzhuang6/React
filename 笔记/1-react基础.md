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

### 3. react是什么

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

  

### 4. 环境准备

+ 在浏览器中编写代码
  + https://codepen.io/gaearon/pen/oWWQNa?editors=0010

+ 搭建本地开发环境
  + 安装node  js的运行时
    + 如果已安装过，就不用重复安装

### 5. react初体验

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



### 6. JSX语法

+ babel 解析器 转换浏览器 认识的语言
+ 框架的代码想要浏览端预览 需要进行转换
+ babel编译

```jsx
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

- jsx


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

### 7. react基本语法

+ npm下载包-软件包 管理工具
  + 下载第三方插件
    + 别人封装开源的js库
+ npm i yarn -g
+ yarn -v
+ yarn config set registry https://registry.npm.taobao.org
+ yarn add babel-standalone react react-dom
    - 下载插件库，前期在html中通过script引入js


```jsx
<script src="../node_modules/babel-standalone/babel.js"></script>
<script src="../node_modules/react/umd/react.development.js"></script>
<script src="../node_modules/react-dom/umd/react-dom.development.js"></script>
<script type="text/babel">
    // 状态
    const state = {
    	msg: 'hi react',
        info: '正儿八经的js代码 但要有返回值',
        arr: ['a','b','c'],
        list: [
            {
            	title: '声明式',
                content: 'React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时 React 能有效地更新并正确地渲染组件。以声明式编写 UI，可以让你的代码更加可靠，且方便调试。'
            },
            {
            	title: '组件化',
                content: '创建拥有各自状态的组件，再由这些组件构成更加复杂的 UI。组件逻辑使用 JavaScript 编写而非模版，因此你可以轻松地在应用中传递数据，并使得状态与 DOM 分离。'
            },
            {
            	title: '一次学习，随处编写',
                content: '无论你现在正在使用什么技术栈，你都可以随时引入 React 来开发新特性，而不需要重写现有代码。React 还可以使用 Node 进行服务器渲染，或使用 React Native 开发原生移动应用。'
            }
        ]
    }
	// style
    const createStyle = {
    	color: 'blue',
        backgroundColor: 'blue',
    }
    
const ele1 = (
	<div className="box" data-abc="自定义属性" title="这是box元素" style={createStyle}>
    	{'插入数据'}
    	{
            /*
            	多行注释
            	单标签要闭合
         	*/
        }
		<br />
	   {
        	// 单行注释    
        }
	   {
            // 自动展开数组每一项，不能展开对象
            state.arr
        }
		{
            // 渲染数据
            // 可以写js代码，不能写多句代码，要有返回值
            state.list.map((item,index)=>{
		                return <li key={index}>
                            <b>{item.title}</b>
                            <p>{item.content}}</p>
                        </li>
            })
        }
        {
            // 逻辑代码不建议与在结构里面
            createStateList()
        }
    </div>
)

function createStateList() {
    return state.list.map((item,index)=>{
        // 返回的代码块 最好用小 括号包裹起来
        return (
        	<li key={index}>
                <b>{item.title}</b>
                <p>{item.content}}</p>
            </li>
        )
    })
}

function createJsx(){
	return (
	    <div className="box">
		    <h1> hello react </h1>
	    </div>
    )
}
const ele2 = createJsx()
// jsx有一个根节点
ReactDOM.render(ele1,document.querySelector('#root'))
</script>
```

### 8.事件绑定

```jsx
<input
    type="button"
    value="自执行"
    onClick={console.log('自执行')}
/>

<input
    type="button"
    value="箭头函数"
    onClick={()=>alert('箭头函数')}
/>

// call 会立马执行
// bind 不会自执行 预传参
<input
    type="button"
    value="事件调用函数"
    onClick={ handleClick.bind({},'传参') 
}
/>
// 函数 的[最后]一个参数 是 事件对象event
function handleClick(data,e) {
    console.log(
        'handleClick',
        data,
        e.target
    )
}

<input type="text" defaultValue="keydown" onKeyUp={handleKeyUp} />
function handleKeyUp(e) {
    console.log('handleKeyUp',e.keyCode)
}
```


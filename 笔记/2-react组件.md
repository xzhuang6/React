## 二、组件

+ 组件允许你将 UI 拆分为`独立可复用`的代码片段，并对每个片段进行独立构思。
  + 开发项目 最好把每个部分 拆分成 一个个独立 小区块 ，能多小就多小
  + 为什么？因为可以重用（css重用） 需要用的直接引入
+ 组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

### 1. 无状态组件

```js
// 无状态组件
let str = 'pika'

// 
let element = (
    <div>{str}</div>
)

ReactDOM.render(
    element,
    document.querySelector('#abc')
)

setTimeout(()=>{
    str = '皮卡'
},2000)

// 此element 只是一个普通变量
// 是没有状态，
// 我们区分是否是组件 也就看 组件是否有状态 或 无状态
// 什么是状态？
// 就是让数据驱动视图的响应式数据
// 状态 = 数据
// 请求后端 返回 字符串 数组 json
// 这些数据 我们肯定得放在一下地方 方便于管理 state = {}
// state = { arr:[],title:'',des:'' }

// 此处 只是其稍微拓展一下
// 是方便于管理 但是 一个项目 有太多太多的页面 ，那么这页面都需要页面与页面之间的数据互联（网络互联）
// 那么有一个js库 帮我们去进行管理 ，方便在每一个页面 都是拿到最新的数据（页面通讯）
// 比如 redux js库能帮我们去管理 大量的数据
// 想要在每一个页面都能够很方便去调取 redux里面的数据 react-dedux 库
```



### 2. 函数组件

+ 定义组件最简单的方式就是编写 JavaScript 函数：

```jsx
const hd = (
    <header> 这是页面头部 </header>
)

const main = (
    <main> 这是页面主体内容 </main>
)

const ft = (
    <footer> 这是页面底部 </footer>
)

// 这是声明一个 有名的函数组件
// 此时也只是一个无状态的组件
// 只是从基本 一步步给大家去延伸 所以组件定义 慢慢抬高
function Head(){
    return (
        <header> 这是页面头部 </header>
    )
}

function Main(props){
    // 当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”。
    return (
        <main> {props.name}  </main>
    )
}

function Foot(){
    return (
        <footer> 这是页面底部 </footer>
    )
}

const hd = (
    <header> 这是页面头部 </header>
)

const main = (
    <main> 这是页面主体内容 </main>
)

const ft = (
    <footer> 这是页面底部 </footer>
)

function Layout(){
    return (
        <div>
            {hd}
            {main}
            {ft}
            {hd}
        	<Head></Head>
            <Main name='这是页面主体内容'></Main>
            <Foot></Foot>
        </div>
    )
    
}

ReactDOM.render(
    element,
    document.querySelector('#abc')
)
```

- 普通组件(无状态组件)没有自身独立并能维护的状态

### 3. 类组件

- 基于类并继承父类React组件，子类就能使用react所提供的特性



```js
const state = {
	name: 'hello react component'
}

class CreateHeader extends React.Component {
    // 不写构造函数 默认会创建构造函数并自执行
    // constructor 最先执行
    constructor(props) {
	    // 写constructor，必定手动调用 父类构造函数
        	// 调用父类构造函数来初始化子类实例，super之前只是不能使用this，因为当前实例的父类构造函数没有执行，不具有父类的能力
        // super(props) 在constructor 中可以使用 this.props
	    // super(props);
        super(...arguments);
	    // 写构造的目的 就向this上添加东东
        // 即使我们不添加　state 默认会创建state
        // this.state = {
        //     info: '这是组件状态'
        // }

	    console.log( this.props )
	    console.log('arguments',...arguments)
	    this.xyz = '默认添加东西'
    }

    // 状态 ==== ’数据‘  数据 生成 视图(用户界面)

    // 自定义属性
    abc = 123

    static dream = '静态属性'

    // 生命周期函数
	render(){
		// 被父类创建出来 子类继承过来的
        // 当前实例对象
	    console.log(this)
        const {dream,msg} = this.props
		return (
		    <div>
			    <h1>头部组件</h1>
                <p>{this.abc}</p>
                {dream} -- {msg}
                <br />
                {this.xyz}
                <br />
                {
                	//this.state.info
                }
		    </div>
        )
    }
}
ReactDOM.render(<CreateHeader dream='皮卡' {state.name}/>,document.querySelector('#root'))
```


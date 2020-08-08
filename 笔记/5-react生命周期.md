## 9. 生命周期

- 一个人的生命周期，是指他的`出生、成长过程、衰老、生病和死亡`的过程
- 组件也是一样，从`创建到删除`的过程

#### 1. 新旧生命周期对比图

- 旧的生命周期

------

![16.x之前的生命周期](https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4201876802,3227315254&fm=26&gp=0.jpg)

------

<img src="https://segmentfault.com/img/bVbhRvE" alt="16.x版本的生命周期" style="zoom: 150%;" />

------

![16.x的生命周期](https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1253092971,2252224879&fm=26&gp=0.jpg)

- 旧版生命周期如果要开启async rendering，在render函数之前的所有函数，都有可能被执行多次
- 新的生命周期

![17.x版本的生命周期](https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3115158139,3247188125&fm=15&gp=0.jpg)

- `getDerivedStateFromProps()`无论是Mounting还是Updating，也无论是因为什么引起的Updating，全部都会被调用
- `getSnapshotBeforeUpdate()`被调用于render之后，可以读取但无法使用DOM的时候。它使您的组件可以在可能更改之前从DOM捕获一些信息（例如滚动位置）。此生命周期返回的任何值都将作为参数传递给`componentDidUpdate()`

#### 2. 旧生命周期函数作用

```css
初始阶段

①组件挂载阶段
0. 读取props或初始化state、自定义属性或方法
	+ constructor()
		+ 加载的时候调用一次，可以初始化state	
1.组件将要挂载时触发的函数：componentWillMount
	+ 组件加载时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state
2.组件渲染：render
	+ react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行
3.组件挂载完成时触发的函数：componentDidMount
	+ 组件渲染之后调用，只调用一次
	+ *在进行服务器端渲染时不会被调用


②组件更新阶段
1.父组件中改变了props传值时触发的函数：componentWillReceiveProps(nextProps)
	+ 组件加载时不调用，组件接受新的props时调用
	+ 我们父组件给子组件传值的时候改变了props的值时触发的函数
	+ 该函数在组件进行更新以及父组件render函数（不管数据是否发生了改变）被调用后执行，this.props取得当前的props，nextProps传入的是要更新的props。通常是比较this.props和nextProps来重新setState。
2.是否要更新数据时触发的函数：shouldComponentUpdate(nextProps, nextState)
	+ 要返回bool值
	+ 组件接收到新的props或者state时调用，就会更新dom（使用diff算法更新）
	+ return false 能阻止更新（不调用render）
3.将要更新数据时触发的函数：componentWillUpdata(nextProps, nextState)
	+ 组件加载时不调用，只有在组件将要更新时才调用，此时可以修改state
4.组件渲染：render
	+ react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行
5.数据更新完成时触发的函数：componentDidUpdate(nextProps, nextState)
	+ 组件加载时不调用，组件更新完成后调用

③组件卸载阶段
1.组件将要销毁时触发的函数：componentWillUnmount
	+ 组件渲染之后调用，只调用一次
	+ 切换页面时，上个页面被销毁时触发
	+ 卸载过程只涉及一个函数componentWillUnmount，当React组件要从DOM树上删除前，会调用一次这个函数。这个函数经常用于去除componentDidMount函数带来的副作用，例如清除计时器、删除componentDidMount中创造的非React元素、


import React,{Component} from 'react';

class SubComponent extends Component{

	state = {
		sub: 'defualt'
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		console.log('02-a-获取父组件更新的时候带来的数据-componentWillReceiveProps')
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('02-b-是否将来更新组件03',nextProps, nextState)
		return true
	}

	UNSAFE_componentWillUpdate(nextProps, nextState) {
		console.log('02-c-组件即将被更新',nextProps, nextState)
	}

	render() {
		console.log('02-d-render')
		const {data} = this.props
		return (
			<>
				<h2>这是子组件</h2>
				<ul>
					{
						data.map((item,index)=>{
							return <li key={index}>{item}</li>
						})
					}
				</ul>
			</>
		)
	}

	componentDidUpdate(nextProps, nextState) {
		console.log( '02-e-组件更新完成啦06',nextProps, nextState )
	}
}

class App extends Component{

	constructor(props) {
		super(props)
		this.state = {
			obj: props,
			arr: ['vue','react','flutter'],
			onOff: true,
		}
		console.log('01-a-初始化阶段')
	}

	UNSAFE_componentWillMount() {
		console.log('01-b-将要挂载时-componentWillMount')
		this.setState({
			c: '请求的数据'
		},()=>{
			console.log('123')
		})
	}

	handleUpdateData = ()=>{
		this.setState(state=>({
			//onOff:!state.onOff,
			arr: state.arr.reverse()}
		))
	}

	render() {
		console.log('01-c-组件创建渲染dom-render')
		const {arr,onOff} = this.state
		return (
			<>
				<h1>
					App父组件
					<button onClick={this.handleUpdateData}> 更新状态 </button>

				</h1>

				<br/>
				<br/>
				<hr/>
				{onOff && <SubComponent data={arr}/>}
			</>
		)
	}

	componentDidMount() {
		console.log('02-d-组件挂载完成啦-componentDidMount')
	}

	componentDidCatch(error, errorInfo) {
		console.log('03-a',error,errorInfo)
	}
}


export default App;

```

#### 3. 新生命周期

- React生命周期新引入了两个生命周期函数：`getDerivedStateFromProps`、` getSnapShotBeforeUpdate`，代替在17.x版本中会废弃的生命周期方法：`componentWillMount()`、`componentWillReceiveProps()`、`componentWillUpdate()`。16.x中新增UNSAFE_前缀为别名的三个函数`UNSAFE_componentWillMount()`、`UNSAFE_componentWillReceiveProps()`、`UNSAFE_componentWillUpdate()`，并在17.x版本中会保留 UNSAFE_前缀为别名的三个函数
- `getDerivedStateFromProps()`无论是Mounting还是Updating，也无论是因为什么引起的Updating，全部都会被调用
- `getSnapshotBeforeUpdate()`被调用于render之后，可以读取但无法使用DOM的时候。它使您的组件可以在可能更改之前从DOM捕获一些信息（例如滚动位置）。此生命周期返回的任何值都将作为参数传递给`componentDidUpdate()`

```css
①组件挂载阶段
	+ 装载（Mount）组件第一次渲染到Dom树

0. constructor()
	+ 读取props或初始化state、自定义属性或方法
    + 加载的时候调用一次，可以初始化state	
1. static getDerivedStateFromProps(props, state)
	+ 组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；
	+ 每次接收新的props之后都会返回一个对象作为新的state,返回null则说明不需要更新
	+ 配合componentDidUpdate，可以覆盖componentWillReceiveProps的所有用法
	+ 是一个静态函数，所以函数体内不能访问this，输出完全由输入决定。
2. render渲染
4. componentDidMount:完成挂载

②组件更新阶段
	+ 组件state，props变化引发的重新渲染

1. static getDeriverdStateFromProps(prevProps,prevState)
	+  从 props 中获取 state
	+ 根据nextProps和prevState计算出预期的状态改变，返回结果会被送给setState
2. shouldComponentUpdate
	+  判断是否需要重绘
3. render渲染
4. static getSnapshotBeforeUpdate(prevProps,prevState)
	+ 获取快照
	+ 触发时间: update发生的时候，在render之后，在组件dom渲染之前。
	+ 返回一个值，作为componentDidUpdate的第三个参数。
	+ 配合componentDidUpdate, 可以覆盖componentWillUpdate的所有用法。
5. componentDidUpdate(prevProps,prevState,snapshot)
	+ 渲染完成后的回调

③组件卸载阶段
	+ 组件从Dom树删除
1. componentWillUnmount
	+  即将卸载。

④错误处理
1. static getDerivedStateFromError
	+  从错误中获取 state。
2. componentDidCatch
	+  捕获错误并进行处理。

```


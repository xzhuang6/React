### 6. this指向

- `<></>`是`<React.Fragment></React.Fragment>`的语法糖

    - 空元素
        - 很多时候不需要，不需要被一个父元素包裹

- React.Fragment可以有个key属性

- 渲染数据

    ```jsx
    state = {
        msg: 'react',
        list: ['vue','react','flutter']
    }
    
    handleFragment(){
        // 指定tr的子级是td,不能是其他元素
        return (
            <>
                <td>vue</td>
                <td>react</td>
                <td>flutter</td>
            </>
        )
    }
    
    handleMoreEle(){
        // .info的子级必需是 p+div
        return this.state.list.map((item,index)=>{
            return <React.Fragment key={index}>
                <p>{index}</p>
                <div>{item}</div>
            </React.Fragment>
        })
    }
    
    render() {
        return (
            <React.Fragment>
               <h1>{msg}</h1>
                <ul>
                    {
                        list.map((item,index)=>{
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
                
                <table>
                    <tbody>
                        <tr>
                            {this.handleFragment()}
                        </tr>
                    </tbody>
                </table>
                
                <div className='info'>
                    {this.handleMoreEle()}
                </div>
                
            </React.Fragment>
        )
    }
    ```

    

- 事件

    - 原生js行间事件

    ```css
    <button onclick="console.log(123)">行间事件</button>
    ```

    - react 函数组件事件

    ```jsx
    function ActionLink() {
      // 函数嵌套函数...
      function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
      }
    
      return (
        <a href="#" onClick={handleClick}>
          Click me
        </a>
      );
    }
    ```

    - 类组件

    ```jsx
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
            isShow: true,
            list: ['vue','react','flutter']
        }
    	
        // 为了在回调中使用 `this`，这个绑定是必不可少的
        this.handleClick2 = this.handleClick2.bind(this);
      }
    	
      handleClick1(data,e){
          console.log(this)
          console.log(data)
          console.log(e.target)
      }
        
      handleClick2(e){
          console.log(this)
          console.log(e.target)
      }
           
      handleClick3(data,e){
          console.log(this)
          console.log(e.target)
      }
    
      handleClick4 = (e)=>{
        console.log(this)
        console.log(e.target)
      }
      
      handleClick5(){
          console.log(this)
      }
        
       handleClick6 = ()=>{
        // 调用更新田视图的方法
        // 第一个参数是 对象 ，第二个是回调
        this.setState({
            isShow: !this.state.isShow
        },()=>{
            console.log('isShow更新完成',this.state.isShow)
        })
           
        // 第一个参数是 函数 ，第二个是回调  官方推荐这种方式 
        this.setState((state,props)=>({isShow: !state.isShow}),()=>{
            console.log('isShow更新完成',this.state.isShow)
        })
      }
      
      render() {
        const {list} = this.state
        return (
          <div>
            <ul>
                {
                    list.map((item,index)=>{
                        return (
                        	<li 
                                key={index} 
                                onClick={this.handleClick1.bind(this,'01任意类型参数'+index)}
                            >{item}</li>
                        )
                    })
                }
            </ul>
                
           <button onClick={this.handleClick2}> 02不能传参 事件2 </button>
    		
           <button onClick={(e)=>this.handleClick3('03传参',e)}> 03事件3 </button>
                
    	   <button onClick={this.handleClick4}> 事件4 </button>
    		
           <button onClick={()=>{
                     this.handleClick5.call(this)   
           }}></button>  
                
            <button onClick={this.handleClick6}>
                {this.state.isShow ? 'ON' : 'OFF'}
            </button>  
                
          	
                
          </div>
        );
      }
    }
    
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
    ```

    

### 7. Dom操作

- 不建议直接操作DOM，用框架干嘛不用框架提供的api呢
- 避免使用 refs 来做任何可以通过声明式实现来完成的事情。
- 第1种

```jsx
<h1 id='title1'> 以后可能要进行dom操作 </h1>
<button onClick={this.handleDom1}>handle dom 1</button>

handleDom1 = (e)=>{
    e.target.style.background = 'hotpink'
    
    const oTitle = document.querySelector('#title1')
    oTitle.style.background = 'hotpink'
}
```

- 第2种

```jsx
<h2 ref='title'> 以后可能要进行dom操作 </h2>
<button onClick={this.handleDom2}>handle dom 2</button>

handleDom2 = ()=>{
    console.log(this)
    const {title} = this.refs
    title.style.background = 'hotpink'
}
```

- 第3种

```jsx
<button onClick={this.handleDom3}>handle dom 3</button>
handleDom3 = ()=>{
    // 要引入react-dom模块
    const oTitle = document.querySelector('#title1')
    ReactDOM.findDOMNode(oTitle).style.background = 'purple'

    // 有时 我们需要从 组件中获取真实的dom 可以用 ref属性
    // 新版本 React 不推荐 使用ref string  ，转而 推荐我们使用 ref callback
    // 通过此种方式 挂载 实例对象上面 ref callback -> this.属性名
    //大多数据 情况下 应该使用的DOM的固定引用 而非使用findDOMNode方法
    // 因为当render返回null里 findDOMNod也会返回null
    // 在使用 ReactDOM.findDOMNode时 当参数是DOM 返回值 是此DOM
    // 当参数是Component 获取 就是Component的 render中dom
    // 前期要坚持来听课 多积累 后面自会形成一个知识体系 就会理解
}
```

- 第4种

```jsx
<h4 ref={ele=>this._h4Ele=ele}> 以后可能要进行dom操作 </h4>
<button onClick={this.handleDom4}>handle dom 4</button>

handleDom4 = ()=>{
    // 挂载到当前组件实例对象上
    console.log(this._h4Ele)
    this._h4Ele.style.background = 'green'
    
    console.log( this._h4Ele === ReactDOM.findDOMNode(this._h4Ele) )

}
```

- 第5种

```css
// Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。
// 当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问。

ref 的值根据节点的类型而有所不同：

1. 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
2. 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
3. 你不能在函数组件上使用 ref 属性，因为他们没有实例。

<input type="text" value={this.state.msg} onChange={this.handleMsg}/>
<input type="button" onClick={this.handleAdd} defaultValue={'添加'}/>

<ul ref={this.list}>

</ul>

list = React.createRef()

handleMsg = (e)=>{
    console.log(e.target.value)
    this.setState({
        msg: e.target.value
    })
}

handleAdd = ()=>{
    console.log(this.list)
    this.list.current.innerHTML += '<li>'+this.state.msg+'</li>'
    console.log(this.list.current)
    console.log(this.list.current.childNodes)

    this.list.current.childNodes.forEach((item,index)=>{
        item.onclick = ()=>{
            console.log(item)
            this.handleDel(item)
        }
    })
}

handleDel = (ele)=>{
    this.list.current.removeChild(ele)
}
```

### 8. 组件通信

- 父子组件

```jsx
// 父组件
<Main data={this.state.lit}>

// 子组件接收
this.props.data    

```

- 子父组件
    - 把子组件的数据传到父组件中

```jsx
// 子组件
class Test extends Component {
	state = {
		data: '这是子组件的数据'
	}

	handleEmit = ()=>{
		const {data} = this.state
		const {handleHi} = this.props
		handleHi(data)
	}

	render() {
		return (
			<>
				<button onClick={this.handleEmit}> 子向父 </button>
			</>
		)
	}
}

// 父组件
state = {
    msg: '父组件的数据'
}

handleData = (res)=>{
    this.setState({
        msg: res
    })
}

{this.state.msg}
<Test handleHi={this.handleData}></Test>


```

- 作业
    - 实现 todomvc的功能
    - 输入值，回车，生成li，用框架的思想，不要操作真实dom



- 兄弟组件

```jsx
class App extends React.Component{
    state={
        keyWord: ''
    }
//设置组件A input的查询参数
setKeyWorld = (keyWord) => {
    this.setState({
        keyWord
    })
}

render() {
    return (
        <div>
            {/*组件A*/}
            <Search setKeyWorld={this.setKeyWorld} />
            {/*组件B*/}
            <Label keyWordValue={this.state.keyWord}/>
        </div>

    );
}

}

class Search extends React.Component{
    state={
        currentKeyValue: ''
    }
    setCurrentKeyValue= (e) => {
        const currentKeyValue = e.target.value
        this.setState({
            currentKeyValue
        })

    }
    //点击查询按钮，将值传给父组件
    search = () =>{
        this.props.setKeyWorld(this.state.currentKeyValue);
    }
    render() {
        return (
            <div>
                <input type="text" value={this.state.currentKeyValue} onChange={this.setCurrentKeyValue}/>
                <button onClick={this.search}>查询</button>
            </div>
        );
    }

}

class Label extends React.Component{
    state={
        key: '',
        UserList: []
    }

// props将要被改变前执行
// componentWillReceiveProps(props){
//
//  const key=props.keyWordValue;
//  console.log('key',key)
//  this.setState({key});
//  //ajax请求接口
//  fetch('https://api.github.com/search/users?q='+key).then(response=>response.json())
//  .then(res=>{
// 	 this.setState({UserList: res.items})
//  })
//  .catch( error=> {
// 	 console.log(error);
//  })
// }

render() {
    console.log(this.props.keyWordValue)
    const UserList=this.state.UserList;
    if (this.props.keyWordValue)return <h1>{this.props.keyWordValue}</h1>
    // 遍历列表数据
    return UserList.map((value,index)=> (
        <div style={{width: 110, height:160,float:'left'}} key={index}>
            <img style={{width: 100, height:100}} src={value.avatar_url} alt=""/>
            <p>用户Id：{value.login}</p>
        </div>
    ));
}

}

ReactDOM.render(<App />,document.querySelector('#root'))
```


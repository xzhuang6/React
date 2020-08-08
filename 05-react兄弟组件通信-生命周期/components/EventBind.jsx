import React,{Component} from "react"
import ReactDOM from "react-dom"

export default class EventBind extends Component{
	constructor(props) {
		super(props);
		this.handleClick3 = this.handleClick3.bind(this)
	}


	state = {
		msg: 'hello react',
		list: ['vue','react','flutter'],
		isShow: true,
	};

	handleEmptyTag(){
		return (
			<>
				<td>vue</td>
				<td>react</td>
				<td>flutter</td>
			</>
		)
	}

	handleFragment(){
		return this.state.list.map((item,index)=>{
			return (
				<React.Fragment key={index}>
					<p>vue</p>
					<div>react</div>
				</React.Fragment>
			)
		})
	}

	handleClick2(){
		console.log(this)
	}

	handleClick3(){
		console.log(this)
	}

	handleClick4 = (e)=>{
		console.log(this);
		console.log(e.target)
	};

	handleClick5 = ()=>{
		// this.setState({
		// 	isShow: !this.state.isShow
		// },()=>{
		// 	console.log( this.state.isShow )
		// })

		// this.setState((state)=>({isShow: !state.isShow}),()=>{
		// 	console.log( this.state.isShow )
		// })

		this.setState((state,props)=>{
			console.log(props);
			return {isShow: !state.isShow}
		},()=>{
			console.log( this.state.isShow )
		})

	};

	// 避免过多的操作dom，应该框架 的思维方式 （状态）
	handleDom1 = ()=>{
		const oTitle = document.querySelector('#title1');
		console.log( oTitle );
		oTitle.style.background = 'hotpink'
	};

	handleDom2 = ()=>{
		//console.log( this.refs )
		const { title } = this.refs;
		title.style.background = 'purple'
	};

	handleDom3 = ()=>{
		const oTitle = document.querySelector('#title1');
		ReactDOM.findDOMNode(oTitle).style.background = 'blue'
	};

	handleDom4 = ()=>{
		console.log( this._h1Ele );
		// const { title } = this.refs
		this._h1Ele.style.background = 'green'
	};

	handleChange = (e)=>{
		// console.log(e.target.value)
		this.setState({
			msg: e.target.value
		})
	};

	oUl = React.createRef();

	handleAdd = ()=>{
		const {msg} = this.state;
		// console.log(msg)

		this.oUl.current.innerHTML += '<li aabaa="console.log(123)">'+msg+'</li>';
		// console.log(this.oUl.current.childNodes)
		this.oUl.current.childNodes.forEach((item,index)=>{
			item.onclick = ()=>{
				console.log(item);
				this.handleDel(item)
			}
		})
	};

	handleDel = (ele)=>{
		this.oUl.current.removeChild(ele)
	};


	render() {
		return (
			<div>
				<h1>{this.state.msg}</h1>
				<ul>
					{this.state.list.map((item,index)=>{
						return <li key={index}>{item}</li>
					})}
				</ul>
				<table>
					<tbody>
					<tr>
						{this.handleEmptyTag()}
					</tr>
					</tbody>
				</table>

				<div className="info">
					{this.handleFragment()}
				</div>

				<p>
					<button onClick={this.handleClick2.bind(this)}> 事件2 可以传参 </button>
				</p>
				<p>
					<button onClick={this.handleClick3}> 事件3 不能传参 </button>
				</p>
				<p>
					<button onClick={this.handleClick4}> 事件4  </button>
				</p>
				<p>
					<button onClick={this.handleClick5}>
						事件5 { this.state.isShow ? 'ON' : 'OFF' }
					</button>
				</p>

				<h1 id={'title1'}> dom操作1 </h1>
				<p>
					<button onClick={this.handleDom1}> handle dom 1 </button>
				</p>

				<h1 ref={'title'}> dom操作2 </h1>
				<p>
					<button onClick={this.handleDom2}> handle dom 2 </button>
				</p>


				<p>
					<button onClick={this.handleDom3}> handle dom 3 </button>
				</p>

				<h1 ref={ele=>this._h1Ele=ele}> dom操作4 </h1>
				<p>
					<button onClick={this.handleDom4}> handle dom 4 </button>
				</p>

				<br/>
				<br/>
				<br/>
				<input type="text" value={this.state.msg} onChange={this.handleChange}/>
				<button onClick={this.handleAdd}>add</button>
				<br/>
				<ul ref={this.oUl}>
				</ul>
			</div>
		)
	}
}

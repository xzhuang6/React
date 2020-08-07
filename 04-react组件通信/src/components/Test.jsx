import React,{Component} from "react"

export default class Test extends Component{



	handleMsg = ()=>{
		// console.log( this.props.xyz )
		const {xyz,fn} = this.props
		const newXyz = xyz.reverse()
		// console.log(fn)
		fn(newXyz)
	}

	render() {
		// console.log( this.props )
		const {abc,xyz} = this.props
		if ( !(abc && xyz.length) ){
			return <h1>请传参</h1>
		}
		return (
			<div className={'test'}>
				<h1>这是 Test子组件</h1>
				<h2>{abc}</h2>
				<ul>
					{xyz.map((item,index)=>{
						return <li key={index}>{item}</li>
					})}
				</ul>

				<button onClick={this.handleMsg}> 向父组件传数据 </button>
			</div>
		)
	}

}

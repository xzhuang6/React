import React,{Component} from 'react';
import TodoMvc from "./components/TodoMvc";

import Test from "./components/Test"

class App extends Component{

	state = {
		arr: ['vue','react','flutter']
	};

	handleData = (res)=>{
		// console.log(res)

		this.setState({
			arr: res
		})
	};


	render() {
		const {arr} = this.state;
		return (
			<>
				<TodoMvc />
				<Test abc={'常量'} xyz={arr} fn={this.handleData}/>

				<br/>
				<Test abc={'abc'} xyz={['html','css','js']} fn={this.handleData}/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
			</>
		)
	}
}

export default App;

import React,{Component} from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
export default class TodoMvc extends Component{
	render() {
		return (
			<>
				<Header />
				<Main />
				<Footer />
			</>
		)
	}
}

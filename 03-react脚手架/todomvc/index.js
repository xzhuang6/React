class App extends React.Component {
	render() {
		return (
			//Fragment来防止有未闭合的标签
			<React.Fragment>
				<section className="todoapp">
					<Header/>

					{/*This section should be hidden by default and shown when there are todos url*/}
					<Main/>
					{/*This footer should hidden by default and shown when there are todos url*/}
					<Footer/>
				</section>

			</React.Fragment>
		)
	}
}


ReactDOM.render(<App/>, document.querySelector('#root'));


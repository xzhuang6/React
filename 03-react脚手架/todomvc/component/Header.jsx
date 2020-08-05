window.Header = class Header extends React.Component{
	render() {
		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<input className="new-todo" placeholder="What needs to be done?" autoFocus/>
				</header>

			</div>
		);
	}
};

//用什么 就引入什么
//import React from 'react';

window.Main = class Main extends React.Component {
	render() {
		return (
			<section className="main">
				<input id="toggle-all" className="toggle-all" type="checkbox"/>
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul className="todo-list">

					<li className="completed">
						<div className="view">
							<input className="toggle" type="checkbox" defaultChecked/>
							<label>Taste JavaScript</label>
							<button className="destroy"/>
						</div>
						<input className="edit" defaultChecked="Create a TodoMVC template"/>
					</li>
					<li>
						<div className="view">
							<input className="toggle" type="checkbox"/>
							<label>Buy a unicorn</label>
							<button className="destroy"/>
						</div>
						<input className="edit" defaultValue="Rule the web"/>
					</li>
				</ul>
			</section>

		);
	}
};

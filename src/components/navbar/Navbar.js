import "bootstrap/dist/css/bootstrap.css";
import "./navbar.scss";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../config/fbConfig";

class Navbar extends React.Component {
	handleClick() {
		auth.signOut().catch(err => console.error(err));
	}

	render() {
		return (
			<nav id="navbar" className="navbar navbar-expand-lg navbar-light ">
				<Link to="/" className="logohere">
					Quiz master
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ">
						<li className="link-nav mr-4">
							<NavLink className="link-nav " to="/">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink className="link-nav mr-4" to="/CreateQuiz">
								Create Quiz
							</NavLink>
						</li>
						<li>
							{this.props.user ? (
								""
							) : (
								<NavLink className="link-nav mr-4" to="/SignUp">
									Sign Up
								</NavLink>
							)}
						</li>
						<li>
							{this.props.user ? (
								<NavLink onClick={this.handleClick} className="link-nav" to="/">
									Log Out
								</NavLink>
							) : (
								<NavLink className="link-nav" to="/LogIn">
									Log In
								</NavLink>
							)}
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;

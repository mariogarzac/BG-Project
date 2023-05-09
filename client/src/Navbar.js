import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
	render() {
		return (
			<div className="navbar">
				<div className="navbar__logo">
					<Link to="/">Logo</Link>
				</div>
				<div className="navbar__links">
					<ul className="navbar__list">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/calendar">Calendar</Link>
						</li>
						<li>
							<Link to="/services">Services</Link>
						</li>
						<li>
							<Link to="/contact">Contact</Link>
						</li>
						<li>
							<Link to="/location">Location</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Navbar;

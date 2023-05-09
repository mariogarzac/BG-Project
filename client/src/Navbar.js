import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import logo from "./assets/BGPROJECT_LOGO.jpg";

class Navbar extends React.Component {
	render() {
		return (
			<div className="navbar">
				<div className="navbar__logo">
					<Link to="/">
						<img src={logo} alt="BG Project" />
					</Link>
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

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
						<Link to="/">
							<li>Home</li>
						</Link>
						<Link to="/calendar">
							<li>Calendar</li>
						</Link>
						<Link to="/services">
							<li>Services</li>
						</Link>
						<Link to="/contact">
							<li>Contact</li>
						</Link>
						<Link to="/location">
							<li>Location</li>
						</Link>
						<Link className="admin__navbar__link" to="/admin">
							<li>Admin</li>
						</Link>
					</ul>
				</div>
			</div>
		);
	}
}

export default Navbar;

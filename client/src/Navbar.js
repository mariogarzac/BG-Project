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
					<Link to="/">Home</Link>
					<Link to="/calendar">Calendar</Link>
					<Link to="/contact">Contact</Link>
					<Link to="/location">Location</Link>
				</div>
			</div>
		);
	}
}

export default Navbar;

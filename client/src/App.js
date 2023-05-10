import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Calendar from "./Calendar";
import Contact from "./Contact";
import Location from "./Location";
import Services from "./Services";
import Footer from "./Footer";

// import Axios from "axios";

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className="app">
					<div className="app__header">
						<Navbar />
					</div>
					<div className="app__body">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/calendar" element={<Calendar />} />
							<Route path="/services" element={<Services />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/location" element={<Location />} />
						</Routes>
					</div>

					<div className="app__footer">
						<Footer />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
import React from "react";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminPage() {
	const [barbers, setBarbers] = useState([]);

	useEffect(() => {
		const fetch_barbers = async () => {
			const res = await axios
				.get("http://localhost:5002/api/barbers")
				.then((res) => {
					// console.log(res.data);
					setBarbers(res.data);
				});
		};

		fetch_barbers();
	}, []);

	return (
		<div className="content">
			<div className="admin_page">
				<h1>Admin Page</h1>
				<ul className="link__list">
					<li>
						<a href="/hours">Administrar horarios</a>
					</li>
					<li>
						<a href="/new-barber">Agregar barbero</a>
					</li>
				</ul>
				<h2>Barberos:</h2>
				<ul className="barber__list">
					{barbers.map((barber) => (
						<li>
							<Link to={`/barber/${barber._id}`}>
								{barber.name} {barber.last_name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default AdminPage;

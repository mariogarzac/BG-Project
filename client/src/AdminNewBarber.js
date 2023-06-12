import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function AdminNewBarber() {
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");

	function create_default_sched(start, end) {
		let sched = [];
		for (let i = start; i < end; i += 0.5) {
			sched.push(i);
		}
		return sched;
	}

	function handleFnameChange(event) {
		setFname(event.target.value);
	}

	function handleLnameChange(event) {
		setLname(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (fname === "" || lname === "") {
			console.log("No se puede agregar un barbero sin nombre o apellido");
		} else {
			const sched = create_default_sched(9.0, 18.0);

			const body = { name: fname, last_name: lname, sched: sched };

			const res = axios
				.post("/api/barbers", body)
				.then((res) => {
					console.log("Barbero agregado exitosamente!");
					window.location.replace("/admin");
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	return (
		<div className="content">
			<div className="admin_new_barber">
				<h1>Agregar Barbero</h1>
				<form className="cita__form">
					<label htmlFor="barber">Nombre</label>
					<input
						type="text"
						name="fname"
						onChange={handleFnameChange}
					/>
					<label htmlFor="barber">Apellido</label>
					<input
						type="text"
						name="lname"
						onChange={handleLnameChange}
					/>
					<button
						className="submit__button"
						type="submit"
						onClick={handleSubmit}
					>
						Agregar
					</button>
				</form>
			</div>
		</div>
	);
}

export default AdminNewBarber;

import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

function AdminNewBarber() {
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');

	function handleFnameChange(event) {
		setFname(event.target.value);
	}

	function handleLnameChange(event) {
		setLname(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log(fname);
		console.log(lname);
	}


	return (
		<div className="content">
			<div className="admin_new_barber">
				<h1>Agregar Barbero</h1>
				<form className="cita__form">
					<label htmlFor="barber">Nombre</label>
					<input type="text" name="fname" onChange={handleFnameChange} />
					<label htmlFor="barber">Apellido</label>
					<input type="text" name="lname" onChange={handleLnameChange} />
					<button className="submit__button" type="submit" onClick={handleSubmit}>Agregar</button>
				</form>
			</div>
		</div>
	);
}

export default AdminNewBarber;
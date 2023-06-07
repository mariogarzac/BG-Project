import React from "react";
import { useEffect, useState } from "react";

import "./App.css";


function AdminHours () {

const available_hours = get_available_hours(9.0, 18.0);
var end_available_hours = get_available_hours(9.5, 18.0);
		

	
const [barber, setBarber] = useState('');
const [day, setDay] = useState('');
const [start, setStart] = useState('');
const [end, setEnd] = useState('');

const start_hours = 9.0;
const end_hours = 18.0;

function get_available_hours(start, finish) {
	var hours = [];
	var hour = "";
	for (var i = start; i <= finish; i += 0.5) {
		if (i % 1 === 0) {
			hour = i + ":00";
		} else {
			hour = i - 0.5 + ":30";
		}
		hours.push({value: i, hour: hour});
	}
	return hours;
}

function handleBarberChange(event) {
	setBarber(event.target.value);
}

function handleDayChange(event) {
	setDay(event.target.value);
}

function handleStartChange(event) {
	setStart(event.target.value);
	end_available_hours = get_available_hours(event.target.value + 0.5, end_hours);
}

function handleEndChange(event) {
	setEnd(event.target.value);
}

function handleSubmit(event) {
	event.preventDefault();
	let final_hours = [];
	if (start <= end) {
		final_hours = get_available_hours(start, end);
		
	} else {
		console.log("Error: La hora de inicio debe ser menor a la hora de fin")
	}

}

		return (
			<div className="content">
				<div className="admin_hours">
					<h1>Modificar Horarios</h1>
					<form className="cita__form" onSubmit={handleSubmit}>
						<label htmlFor="barber">Barbero</label>
						<select name="barber" onChange={handleBarberChange}>
							<option value="0" defaultValue={this}>Barbero 1</option>
						</select>
						<label htmlFor="day">Día</label>
						<select name="day" onChange={handleDayChange}>
							<option value="0" defaultValue={this}>Lunes</option>
							<option value="1">Martes</option>
							<option value="2">Miércoles</option>
							<option value="3">Jueves</option>
							<option value="4">Viernes</option>
						</select>
						<label htmlFor="start">Hora de inicio</label>
						<select name="start" onChange={handleStartChange}>
							{available_hours.map((hour) => (
								<option value={hour.value}>{hour.hour}</option>
							))}
						</select>
						<label htmlFor="end">Hora de fin</label>
						<select name="end" onChange={handleEndChange}>
							{end_available_hours.map((hour) => (
								<option value={hour.value}>{hour.hour}</option>
							))}
						</select>
						<button className="submit__button" type="submit">Guardar</button>
					</form>
				</div>
			</div>
		);
};

export default AdminHours;
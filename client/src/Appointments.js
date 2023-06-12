import React from "react";
import "./App.css";
import axios from "axios";

const Appointments = ({ date, time, name, email, id }) => {
	function parse_date(date) {
		const myDate = new Date(date);
		var result_date = "";
		result_date += myDate.getDate() + "/";
		result_date += myDate.getMonth() + "/";
		result_date += myDate.getFullYear();
		return result_date;
	}

	function parse_hour(hour) {
		var result_hour = "";
		if (hour % 1 === 0) {
			result_hour += hour + ":00";
		} else {
			result_hour += Math.floor(hour) + ":30";
		}
		return result_hour;
	}

	function handle_delete(event) {
		event.preventDefault();
		const res = axios
			.delete("/api/appointments/" + id)
			.then((res) => {
				console.log(res);
				window.location.reload();
			});
	}

	return (
		<div className="card">
			<p className="card__title">Corte de cabello</p>
			<p className="card__title">
				{parse_date(date)} a las {parse_hour(time)}
			</p>
			<p className="card_description">
				<strong>Cliente: </strong>
				{name}
			</p>
			<p>
				<strong>Email: </strong>
				{email}
			</p>
			<button className="delete__button" onClick={handle_delete}>
				Cancel Appointment
			</button>
		</div>
	);
};

export default Appointments;

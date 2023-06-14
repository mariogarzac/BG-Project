import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import Appointments from "./Appointments";

const BarberPage = () => {
	const { barber_id } = useParams();
	const [barber_name, setBarberName] = useState("");
	const [schedule, setSchedule] = useState({
		Lun: [9.0, , 18.0],
		Mar: [9.0, 18.0],
		Mier: [9.0, , 18.0],
		Juev: [9.0, , 18.0],
		Vier: [9.0, , 18.0],
	});
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		const fetch_barber = async () => {
			const res = await fetch(
				"/api/barbers/" + barber_id
			);
			const res_json = await res.json();
			setBarberName((await res_json.name) + " " + res_json.last_name);
			setSchedule(await res_json.schedule);
		};

		const fetch_appointments = async () => {
			const today = new Date();
			const date = new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate()
			);
			const body = { date: date, barber: barber_id };
			console.log(body);
			const res = axios
				.post(
					"/api/appointments/appointmentDate",
					body
				)
				.then((res) => {
					setAppointments(res.data);
				});
		};

		fetch_barber();
		fetch_appointments();
	}, []);

	function parse_hours(hr) {
		if (hr % 1 === 0) {
			return hr + ":00";
		} else {
			return Math.floor(hr) + ":30";
		}
	}

	function render_appointments(apps) {
		console.log(apps);
		if (apps.length === 0) {
			return <p>No hay citas agendadas para este día.</p>;
		} else {
			return (
				<div>
					{apps.map((app) => (
						<Appointments
							date={app.date}
							time={app.hour}
							name={app.customer_name}
							email={app.customer_email}
							id={app._id}
						/>
					))}
				</div>
			);
		}
	}

	function handle_delete(event) {
		event.preventDefault();
		const res = axios
			.delete("/api/barbers/" + barber_id)
			.then((res) => {
				console.log(res);
				window.location.replace("/admin");
			});
	}

	return (
		<div className="content">
			<div className="barber-page">
				<Link to="/admin">Back</Link>
				<h1>Barber Page</h1>
				<h2>
					<strong>Nombre: </strong>
					{barber_name}
				</h2>
				<h3>ID: {barber_id}</h3>
				<h3>Schedule</h3>

				<ul>
					<li>
						<strong>Lunes: </strong> de{" "}
						{parse_hours(schedule.Lun[0])} a{" "}
						{parse_hours(schedule.Lun.at(-1))}
					</li>
					<li>
						<strong>Martes: </strong> de{" "}
						{parse_hours(schedule.Mar[0])} a{" "}
						{parse_hours(schedule.Mar.at(-1))}
					</li>
					<li>
						<strong>Miércoles: </strong> de{" "}
						{parse_hours(schedule.Mier[0])} a{" "}
						{parse_hours(schedule.Mier.at(-1))}
					</li>
					<li>
						<strong>Jueves: </strong> de{" "}
						{parse_hours(schedule.Juev[0])} a{" "}
						{parse_hours(schedule.Juev.at(-1))}
					</li>
					<li>
						<strong>Viernes: </strong> de{" "}
						{parse_hours(schedule.Vier[0])} a{" "}
						{parse_hours(schedule.Vier.at(-1))}
					</li>
				</ul>
				<h3>Appointments for today:</h3>
				{render_appointments(appointments)}
				<button className="delete__button" onClick={handle_delete}>
					Delete Barber
				</button>
			</div>
		</div>
	);
};

export default BarberPage;

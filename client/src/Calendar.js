import "./App.css";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { json } from "react-router-dom";

function MyCalendar() {
	const myDate = new Date();
	const [date, setDate] = useState(
		new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate())
	);

	const [barber, setBarber] = useState("");
	const [hora, setHora] = useState("10.0");

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const [week_day, setWeekDay] = useState(get_weekday(date));

	const [barber_list, setBarberList] = useState([]);
	const [booked_list, setBookedList] = useState([]);

	const [hora_list, setHoraList] = useState([{}]);
	//   const [all_hours, setAllHours] = useState([]);

	const [all_appointments, setAllAppointments] = useState([]);

	async function fetch_barber_list() {
		axios.get("/api/barbers").then((res) => {
			setBarberList(parse_barbers(res.data));
			setBarber(res.data[0]._id);
		});
	}

	function get_weekday(date) {
		switch (date.getDay()) {
			case 0:
				return "Domingo";
			case 1:
				return "Lun";
			case 2:
				return "Mar";
			case 3:
				return "Mier";
			case 4:
				return "Juev";
			case 5:
				return "Vier";
			case 6:
				return "Sab";
			default:
				return "Lun";
		}
	}

	function parse_hours(hr) {
		var hours = [];
		var hour = "";
		for (var i = 0; i < hr.length; i++) {
			if (hr[i] % 1 === 0) {
				hour = hr[i] + ":00";
			} else {
				hour = hr[i] - 0.5 + ":30";
			}
			hours.push({ value: hr[i], hour: hour });
		}
		return hours;
	}

	useEffect(() => {
		async function fetch_booked_hours() {
			axios
				.post(
					"/api/appointments/appointmentDate",
					{ date, barber }
				)
				.then((res) => {
					// console.log("Booked hours: ");
					console.log(res.data);
					var booked_hours = [];

					for (var i = 0; i < res.data.length; i++) {
						booked_hours.push(res.data[i].hour);
					}
					console.log("Booked hours: ");
					console.log(booked_hours);
					setBookedList(booked_hours);
					axios
						.get("/api/barbers/" + barber)
						.then((res) => {
							// console.log(res.data);
							const sched = res.data.schedule;
							// console.log(sched);
							// setHoraList(sched[week_day]);
							console.log("Schedule today: ");
							console.log(sched[week_day]);

							console.log("Booked today: ");
							console.log(booked_hours);

							var available_hours = [];
							for (var i = 0; i < sched[week_day].length; i++) {
								if (
									!booked_hours.includes(sched[week_day][i])
								) {
									available_hours.push(sched[week_day][i]);
								}
							}

							console.log(available_hours);
							setHoraList(parse_hours(available_hours));
							console.log("Available hours: ");
							console.log(parse_hours(available_hours));
						});
					// console.log(barber_list);
				});
		}

		// console.log("Barber or date changed.");
		// console.log("Barber: " + barber);
		// console.log("Date: " + date);

		fetch_booked_hours();
	}, [barber, date]);

	useEffect(() => {
		fetch_barber_list();
	}, []);

	// Gets list of hours that are available for X barber on a day
	function get_available_hours(sched, booked_hours) {
		// Return a list of available hours with values & hours
		var available_hours = [];
		for (var i = 0; i < sched.length; i++) {
			// if (booked_hours.indexOf(all_hours[i].value) === -1) {
			// 	available_hours.push(all_hours[i]);
			// }
			if (!booked_hours.includes(sched[i].value)) {
				available_hours.push(sched[i]);
			}
		}
		return available_hours;
	}

	// Get list of barbers [{id: id, name: name}]
	function parse_barbers(barbers) {
		var result_barbers = [];
		var id = 0;
		var name = "";
		for (var i = 0; i < barbers.length; i++) {
			id = barbers[i]._id;
			name = barbers[i].name + " " + barbers[i].last_name;
			result_barbers.push({ id: id, name: name });
		}
		// console.log(result_barbers)
		return result_barbers;
	}

	// Gets list of hours that are already booked in a day for X barber
	function get_booked_hours(barber, day, appointments) {
		// console.log("Getting booked hours for barber " + barber + " on day " + day + ".")
		var booked_hours = [];
		for (var i = 0; i < appointments.length; i++) {
			var myDate = new Date(appointments[i].date);
			var app_date = new Date(
				myDate.getFullYear(),
				myDate.getMonth(),
				myDate.getDate()
			);
			console.log(
				"My barber: " +
					barber +
					"; barber[i]: " +
					appointments[i].barber_id +
					"; my date: " +
					day +
					"; app date: " +
					app_date
			);
			if (appointments[i].barber_id === barber && app_date === day) {
				booked_hours.push(appointments[i].hour);
			}
		}
		// console.log(booked_hours);
		return booked_hours;
	}

	//   var booked_list = [10.0, 11.0, 12.0, 13.0]

	// Returns list of hours from start to finish with 0.5 increments
	function get_hours(start, finish) {
		var hours = [];
		var hour = "";
		for (var i = start; i <= finish; i += 0.5) {
			if (i % 1 === 0) {
				hour = i + ":00";
			} else {
				hour = i - 0.5 + ":30";
			}
			hours.push({ value: i, hour: hour });
		}
		return hours;
	}

	// Request appointment by date and barber
	function request_appointment_by_date_barber() {
		const body = {
			date: date,
			barber: barber,
		};
		// console.log(barber);
		// console.log(date);
		const res = axios
			.post(
				"/api/appointments/appointmentDate",
				body
			)
			.then((res) => {
				console.log("Response: ");
				console.log(res.data);
				var booked_hours = [];
				for (var i = 0; i < res.data.length; i++) {
					booked_hours.push(res.data[i].hour);
				}
				setBookedList(booked_hours);
				console.log("Booked list: ");
				console.log(booked_list);
				hora_list = get_available_hours(all_hours, booked_list);
				console.log("Hora list: ");
				console.log(hora_list);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// All hours in a work day
	var all_hours = get_hours(9.0, 18.0);

	const handleDateChange = (date) => {
		setDate(date);
	};

	const handleBarberChange = (event) => {
		setBarber(event.target.value);
		// request_appointment_by_date_barber();
		// setBookedList(get_booked_hours(barber, date, all_appointments));
	};

	const handleHoraChange = (event) => {
		setHora(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		var json_data = {
			barber_id: barber,
			customer_name: name,
			customer_email: email,
			date: date,
			hour: hora,
		};

		const post_appointment = async () => {
			const res = await axios
				.post("/api/appointments", json_data)
				.then((res) => {
					console.log(res);
					console.log("Cita agendada con éxito");
					window.location.replace("/");
				})
				.catch((err) => {
					console.log(err);
					console.log("Error al agendar cita");
				});
		};

		post_appointment();
	};

	const nextWeek = new Date();
	nextWeek.setDate(nextWeek.getDate() + 6);

	return (
		<div className="content">
			<h1>Agendar Cita</h1>

			<form className="cita__form" onSubmit={handleSubmit}>
				<label>Selecciona el servicio</label>
				<select>
					<option value="0" defaultValue={this}>
						Corte de cabello
					</option>
				</select>
				<label>Selecciona fecha</label>
				<div className="calendar-container">
					<Calendar
						className="calendar"
						value={date}
						onChange={handleDateChange}
						calendarType="ISO 8601"
						minDate={new Date()}
						maxDate={nextWeek}
					/>
				</div>
				<label>Selecciona barbero</label>
				<select value={barber} onChange={handleBarberChange}>
					{barber_list.map((barber) => (
						<option value={barber.id} defaultValue={this}>
							{barber.name}
						</option>
					))}
				</select>

				<label>Selecciona la hora</label>
				<select value={hora} onChange={handleHoraChange}>
					{hora_list.map((hora) => (
						<option value={hora.value} defaultValue={this}>
							{hora.hour}
						</option>
					))}
				</select>

				<label>Ingresa tu nombre</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<label>Ingresa tu email</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<button className="submit__button" type="submit">
					Agendar
				</button>
			</form>
		</div>
	);
}

export default MyCalendar;

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function AdminHours() {
	const [barber_list, setBarberList] = useState([]);
	const [hours_list, setHoursList] = useState([]);
	const [all_barbers, setAllBarbers] = useState([]);

	const [barber, setBarber] = useState("");
	const [day, setDay] = useState("Lun");
	const [start, setStart] = useState(9.0);
	const [end, setEnd] = useState(9.5);

	const start_hours = 9.0;
	const end_hours = 18.0;

	const [available_hours, setAvailableHours] = useState(
		get_available_hours(start)
	);
	const [end_available_hours, setEndAvailableHours] = useState([]);

	useEffect(() => {
		const fetch_barbers = async () => {
			const res = await fetch("/api/barbers");
			const res_json = await res.json();
			// console.log(res_json);
			setAllBarbers(res_json);
			setBarberList(parse_barbers(res_json));
			setBarber(res_json[0]._id);
		};

		fetch_barbers();
	}, []);

	useEffect(() => {
		console.log("barber changed + " + barber);
		setHoursList(parse_hours(all_barbers, barber));
	}, [barber]);

	useEffect(() => {
		console.log("start changed: " + start);
		setEndAvailableHours(get_available_hours(parseFloat(start) + 0.5));
	}, [start]);

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

	function parse_hours(barbers, b_id) {
		var result_hours = barbers;
		for (var i = 0; i < barbers.length; i++) {
			if (barbers[i]._id === b_id) {
				result_hours = barbers[i].schedule;
			}
		}
		// console.log(result_hours);
		return result_hours;
	}

	function get_available_hours(s, f = 18.0, print = false) {
		var hours = [];
		var hour = "";
		if (print) {
			console.log(s + " to " + f);
		}
		for (var i = s; i <= f; i += 0.5) {
			if (i % 1 === 0) {
				hour = i + ":00";
			} else {
				hour = i - 0.5 + ":30";
			}
			if (print) {
				console.log(i + " : " + hour);
			}
			hours.push({ value: i, hour: hour });
		}
		return hours;
	}

	function get_hours(s, f) {
		var hours = [];
		for (let i = s; i <= f; i += 0.5) {
			hours.push(i);
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
	}

	function handleEndChange(event) {
		setEnd(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		var final_hours = [];
		final_hours = get_hours(parseFloat(start), parseFloat(end));
		// console.log(final_hours);
		console.log(hours_list);
		hours_list[day] = final_hours;
		const body = {
			jueves: hours_list.Juev,
			lunes: hours_list.Lun,
			martes: hours_list.Mar,
			miercoles: hours_list.Mier,
			viernes: hours_list.Vier,
		};

		const post_schedule = async () => {
			const res = await axios
				.patch("/api/barbers/" + barber, body)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		post_schedule();
	}

	return (
		<div className="content">
			<div className="admin_hours">
				<h1>Modificar Horarios</h1>
				<form className="cita__form" onSubmit={handleSubmit}>
					<label htmlFor="barber">Barbero</label>
					<select name="barber" onChange={handleBarberChange}>
						{barber_list.map((barber) => (
							<option value={barber.id}>{barber.name}</option>
						))}
					</select>
					<label htmlFor="day">Día</label>
					<select name="day" onChange={handleDayChange}>
						<option value="Lun" defaultValue={this}>
							Lunes
						</option>
						<option value="Mar">Martes</option>
						<option value="Mier">Miércoles</option>
						<option value="Juev">Jueves</option>
						<option value="Vier">Viernes</option>
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
					<button className="submit__button" type="submit">
						Guardar
					</button>
				</form>
			</div>
		</div>
	);
}

export default AdminHours;

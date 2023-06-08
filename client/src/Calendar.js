import "./App.css";

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { json } from "react-router-dom";

function MyCalendar() {

    useEffect(() => {
        const fetch_barbers = async () => {
            const res = await fetch('http://localhost:5002/api/barbers');
            const res_json = await res.json();
            // console.log(res_json);
            setBarberList(parse_barbers(res_json));     
            setBarber(res_json[0]._id);  
        }

        const fetch_booked_hours = async () => {
            const res = await fetch('http://localhost:5002/api/appointments');
            const res_json = await res.json();
            console.log(res_json);
            setAllAppointments(res_json);
        }

        fetch_barbers();
        fetch_booked_hours();
        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
        setBookedList(get_booked_hours(barber, date, all_appointments));
        
    }, []);

    function parse_barbers(barbers) {
        var result_barbers = [];
        var id = 0;
        var name = '';
        for (var i = 0; i < barbers.length; i++) {
            id = barbers[i]._id;
            name = barbers[i].name + ' ' + barbers[i].last_name;
            result_barbers.push({id: id, name: name});
        }
        // console.log(result_barbers)
        return result_barbers;
    }


    function get_booked_hours(barber, day, appointments) {
        // console.log("Getting booked hours for barber " + barber + " on day " + day + ".")
        var booked_hours = [];
        for (var i = 0; i < appointments.length; i++) {
            var myDate = new Date(appointments[i].date);
            var app_date = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
            console.log("My barber: " + barber + "; barber[i]: " + appointments[i].barber_id + "; my date: " + day + "; app date: " + app_date)
            if (appointments[i].barber_id === barber && app_date === day) {
                booked_hours.push(appointments[i].hour);
            }
        }
        console.log(booked_hours);
        return booked_hours;
    }

  function get_available_hours(all_hours, booked_hours) {
    // Return a list of available hours with values & hours
    var available_hours = [];
    for (var i = 0; i < all_hours.length; i++) {
        if (booked_hours.indexOf(all_hours[i].value) === -1) {
            available_hours.push(all_hours[i]);
        }
    }
    return available_hours;
  }

  const [date, setDate] = useState(new Date());

  const [barber, setBarber] = useState('');
  const [hora, setHora] = useState('10.0');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [week_day, setWeekDay] = useState('monday');

  const [barber_list, setBarberList] = useState([]);
  const [booked_list, setBookedList] = useState([]);
//   const [all_hours, setAllHours] = useState([]);

  const [all_appointments, setAllAppointments] = useState([]);

//   var booked_list = [10.0, 11.0, 12.0, 13.0]

function get_hours(start, finish) {
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

    var all_hours = get_hours(9.0, 18.0);

  var hora_list = get_available_hours(all_hours, booked_list);

  const handleDateChange = (date) => {
    setDate(date);
    console.log(date);
    var day = date.getDay();
    // Get day of the week
    switch (day) {
        case 0:
            setWeekDay('Lun');
            break;
        case 1:
            setWeekDay('Mar');
            break;
        case 2:
            setWeekDay('Mier');
            break;
        case 3:
            setWeekDay('Juev');
            break;
        case 4:
            setWeekDay('Vier');
            break;
        case 5:
            setWeekDay('Sab');
            break;
        case 6:
            setWeekDay('Dom');
            break;
        default:
            setWeekDay('Lun');
            break;
        }
    setBookedList(get_booked_hours(barber, date, all_appointments));
  };

  const handleBarberChange = (event) => {
    setBarber(event.target.value);
    console.log(barber);
    setBookedList(get_booked_hours(barber, date, all_appointments));
  }

  const handleHoraChange = (event) => {
    setHora(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var json_data = {
        barber_id: barber,
        customer_name: name,
        customer_email: email,
        date: date,
        hour: hora,
    }

    const post_appointment = async () => {
        const res = await axios.post('http://localhost:5002/api/appointments', json_data);
    }

    post_appointment();
  }

 const nextWeek = new Date();
 nextWeek.setDate(nextWeek.getDate() + 6);

  return (
    <div className="content">
      <h1>Agendar Cita</h1>

      <form className="cita__form" onSubmit={handleSubmit}>
        <label>Selecciona el servicio</label>
        <select>
          <option value="0" defaultValue={this}>Corte de cabello</option>
        </select>
        <label>Selecciona fecha</label>
        <div className="calendar-container">
            <Calendar className="calendar"
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
                <option value={barber.id}>{barber.name}</option>
            ))}
        </select>

        <label>Selecciona la hora</label>
        <select value={hora} onChange={handleHoraChange}>
            {hora_list.map((hora) => (
                <option value={hora.value}>{hora.hour}</option>
            ))}
        </select>

        <label>Ingresa tu nombre</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Ingresa tu email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        <button className="submit__button" type="submit">Agendar</button>
      </form>
    </div>
  );
}

export default MyCalendar;
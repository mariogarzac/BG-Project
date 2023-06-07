import "./App.css";

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

function MyCalendar() {

    useEffect(() => {
        const fetch_barbers = async () => {
            const res = await axios.get('http://localhost:5002/api/barbers');
            console.log(res.data);
        }

        fetch_barbers();
    }, []);

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

  var barber_list = [
    {id: 0, name: 'Barbero 1'},
    {id: 1, name: 'Barbero 2'},
    {id: 2, name: 'Barbero 3'},
    {id: 3, name: 'Barbero 4'},
  ];

  var booked_list = [10.0, 11.0, 12.0, 13.0]

  var all_hours = [
    {value: 10.0, hour: '10:00'},
    {value: 10.5, hour: '10:30'},
    {value: 11.0, hour: '11:00'},
    {value: 11.5, hour: '11:30'},
    {value: 12.0, hour: '12:00'},
    {value: 12.5, hour: '12:30'},
    {value: 13.0, hour: '13:00'},
    {value: 13.5, hour: '13:30'},
  ];

  var hora_list = get_available_hours(all_hours, booked_list);

  const handleDateChange = (date) => {
    setDate(date);
    var day = date.getDay();
    // Get day of the week
    switch (day) {
        case 0:
            setWeekDay('sunday');
            break;
        case 1:
            setWeekDay('monday');
            break;
        case 2:
            setWeekDay('tuesday');
            break;
        case 3:
            setWeekDay('wednesday');
            break;
        case 4:
            setWeekDay('thursday');
            break;
        case 5:
            setWeekDay('friday');
            break;
        case 6:
            setWeekDay('saturday');
            break;
        default:
            setWeekDay('monday');
            break;
        }
  };

  const handleBarberChange = (event) => {
    setBarber(event.target.value);
  }

  const handleHoraChange = (event) => {
    setHora(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
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
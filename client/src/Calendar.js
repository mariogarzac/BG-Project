import "./App.css";

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

function MyCalendar() {

    useEffect(() => {
        try {
            axios.get('https://run.mocky.io/v3/8d91d0b0-1453-4baf-96d8-095aeb3e325c').then((response) => {
                console.log(response.data);
            });
        } catch (e) {
            console.log(e.message);
            console.log("Error fetching request");
        }
    }, []);

  const [date, setDate] = useState(new Date());

  const [barber, setBarber] = useState('');
  const [hora, setHora] = useState('10.0');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  var barber_list = [
    {id: 0, name: 'Barbero 1'},
    {id: 1, name: 'Barbero 2'},
    {id: 2, name: 'Barbero 3'},
    {id: 3, name: 'Barbero 4'},
  ];

  var hora_list = [
    {value: 10.0, name: '10:00'},
    {value: 10.5, name: '10:30'},
    {value: 11.0, name: '11:00'},
    {value: 11.5, name: '11:30'},
    {value: 12.0, name: '12:00'},
    {value: 12.5, name: '12:30'},
    {value: 13.0, name: '13:00'},
    {value: 13.5, name: '13:30'},
  ];

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleBarberChange = (event) => {
    setBarber(event.target.value);
  }

  const handleHoraChange = (event) => {
    setHora(event.target.value);
  }

 const nextWeek = new Date();
 nextWeek.setDate(nextWeek.getDate() + 6);

  return (
    <div className="content">
      <h1>Agendar Cita</h1>

      <form className="cita__form">
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
                <option value={hora.value}>{hora.name}</option>
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
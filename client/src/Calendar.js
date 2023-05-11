import "./App.css";

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (date) => {
    setDate(date);
  };

 const nextWeek = new Date();
 nextWeek.setDate(nextWeek.getDate() + 7);

  return (
    <div className="content">
      <div className="calendar-container">
       <Calendar className="calendar"
        value={date}
        onChange={handleDateChange}
        calendarType="US"
        minDate={new Date()}
        maxDate={nextWeek}
      />
      </div>
    </div>
  );
}

export default MyCalendar;



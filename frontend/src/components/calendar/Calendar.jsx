import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/events');
      const eventData = response.data.map(event => ({
        id: event.id,
        title: `${event.name} @ ${event.venue}`,
        start: new Date(event.date), 
        end: new Date(event.date),
      }));
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div>
      <div  style={{marginTop:'10px',textAlign: 'center'}}>
      <h1>EventFlow Calendar</h1>
      <h2>Navigate Your Events with Timeless Precision!</h2>
      </div>
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ margin: '50px' }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;

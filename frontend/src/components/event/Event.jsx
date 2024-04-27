import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';
import axios from 'axios';
import './Event.css';
import './EventForm.css';
import EventCard from './EventCard';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/events');
      // Sort events by ID in descending order (newly added first)
      const sortedEvents = response.data.sort((a, b) => b.id - a.id);
      setEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      console.log("Error");
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleAddEventClick = () => {
    setShowEventForm(true);
    setSelectedEvent(null);
  };

  const handleCancelAddEvent = () => {
    setShowEventForm(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  const refreshEvents = () => {
    fetchEvents();
  };

  return (
    <div className='event-body'>
      <h1>Event Central: Plan, Create, and Manage Spectacular Events!</h1>
      <button className="custom-btn btn-5 addEvent" onClick={handleAddEventClick}>
        <span>Add Event</span>
      </button>
      {showEventForm && <EventForm onCancel={handleCancelAddEvent} event={selectedEvent} refreshEvents={refreshEvents} />}
      {!showEventForm && (
        <div className="event-list">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              handleDeleteEvent={handleDeleteEvent}
              handleEditEvent={handleEditEvent}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Event;


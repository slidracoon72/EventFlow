import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Event.css';
import EventCardDashboard from './EventCardDashboard';

const EventDashboard = () => {
    const [events, setEvents] = useState([]);

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
        }
    };

    return (
        <div>
            <h2 className='head-left'>Upcoming Events: Your Gateway to Memorable Experiences</h2>
            <div className="event-list dash">
                {events.map(event => (
                    <EventCardDashboard
                        key={event.id}
                        event={event}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventDashboard;


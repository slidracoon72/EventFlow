import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCardGuest from './EventCardGuest';

const EventGuest = () => {
    const [bookedEvents, setBookedEvents] = useState([]);

    useEffect(() => {
        fetchBookedEvents();
    }, []);

    const fetchBookedEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/events');
            const bookedEventsData = response.data.filter(event => event.attending === true);
            setBookedEvents(bookedEventsData);
        } catch (error) {
            console.error('Error fetching booked events:', error);
        }
    };

    return (
        <div className="event-guest-container">
            <h1 className='head-left'>My Upcoming Events!</h1>
            <div className="event-list dash">
                {bookedEvents.length > 0 ? (
                    bookedEvents.map(event => (
                        <EventCardGuest
                            key={event.id}
                            event={event}
                            removeFromList={fetchBookedEvents}
                        />
                    ))
                ) : (
                    <div style={{color:'white'}}>
                        <h3>You have not registered for any events</h3>
                        <p>Tip: You can attend events from the <a href="http://localhost:5173/dashboard">Dashboard</a></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventGuest;
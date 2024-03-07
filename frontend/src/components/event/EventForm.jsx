import React, { useState, useEffect } from 'react';
import './EventForm.css'; // Import custom CSS file for additional styling
import axios from 'axios';
// Import moment.js library for date manipulation
import moment from 'moment';

const formatDate = (dateString) => {
    // Convert the dateString to a Date object
    const date = new Date(dateString);

    // Get the year, month, and day components of the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(date.getDate() + 1).padStart(2, '0'); // Add leading zero if needed

    // Format the date as yyyy-mm-dd
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
};

// Get today's date and format it as yyyy-mm-dd
const today = new Date();
const minDate = formatDate(today.toISOString());

const EventForm = ({ onCancel, event, refreshEvents }) => {

    // Convert the event date to a moment object for consistent handling
    const initialDate = event ? moment(event.date).format('YYYY-MM-DD') : '';


    const [name, setName] = useState(event ? event.name : '');
    const [venue, setVenue] = useState(event ? event.venue : '');
    const [venues, setVenues] = useState([]);
    const [ticket, setTicket] = useState(event ? event.ticket : '');
    const [date, setDate] = useState(initialDate); // Initialize with event date

    // Fetch venues from backend when component mounts
    useEffect(() => {
        axios.get('http://localhost:8080/venues/names')
            .then(response => {
                setVenues(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching venues:', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once


    const handleSubmit = (e) => {
        e.preventDefault();
        const eventData = { name, venue, ticket, date: moment(date).toDate() };

        if (event) {
            // Update existing event
            axios.put(`http://localhost:8080/events/${event.id}`, eventData)
                .then(response => {
                    console.log('Event updated successfully:', response.data);
                    refreshEvents(); // Fetch events again to refresh the event list
                    onCancel(); // Hide the form after updating event
                })
                .catch(error => {
                    console.error('Error updating event:', error);
                });
        } else {
            // Add new event
            axios.post('http://localhost:8080/events', eventData)
                .then(response => {
                    console.log('Event added successfully:', response.data);
                    // Reset form fields
                    setName('');
                    setVenue('');
                    setTicket('');
                    setDate('');
                    refreshEvents(); // Fetch events again to refresh the event list
                    onCancel(); // Hide the form after adding event
                })
                .catch(error => {
                    console.error('Error adding event:', error);
                });
        }
    };

    const handleCancel = () => {
        onCancel(); // Call the onCancel function passed as prop
    };

    return (
        <div className="formevent">
            <div className="title">{event ? 'UPDATE EVENT' : 'ADD EVENT'}</div>
            <div className="subtitle">Let's {event ? 'update' : 'add'} an Event!</div>
            <form onSubmit={handleSubmit}>
                <div className="input-container ic1">
                    <input
                        id="name"
                        className="input"
                        type="text"
                        placeholder=" "
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="cut"></div>
                    <label htmlFor="name" className="placeholder">Event Name</label>
                </div>
                <div className="input-container ic2">
                    <select
                        id="venue"
                        className="input"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                    >
                        <option key="" value="">Select Venue</option>
                        {venues.map(venue => (
                            <option key={venue.id} value={venue.id}>{venue.name}</option>
                        ))}
                    </select>
                    <div className="cut cut-short"></div>
                    <label htmlFor="venue" className="placeholder">Venue</label>
                </div>
                <div className="input-container ic2">
                    <input
                        id="ticket"
                        className="input"
                        type="number"
                        placeholder=" "
                        required
                        value={ticket}
                        onChange={(e) => setTicket(e.target.value)}
                    />
                    <div className="cut"></div>
                    <label htmlFor="ticket" className="placeholder">Ticket Price</label>
                </div>
                <div className="input-container ic2">
                    <input
                        id="date"
                        className="input"
                        type="date"
                        placeholder=" "
                        required
                        min={minDate}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <div className="cut cut-short"></div>
                    <label htmlFor="date" className="placeholder">Date</label>
                </div>
                <div>
                    <button type="submit" className="submit">{event ? 'Update' : 'Submit'}</button>
                    <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;

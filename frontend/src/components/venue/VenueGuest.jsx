import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Venue.css';
import VenueCardGuest from './VenueCardGuest';

const VenueGuest = () => {
    const [bookedVenues, setBookedVenues] = useState([]);

    useEffect(() => {
        fetchBookedVenues();
    }, []);

    const fetchBookedVenues = async () => {
        try {
            const response = await axios.get('http://localhost:8080/venues');
            const bookedVenuesData = response.data.filter(venue => venue.booked === true);
            setBookedVenues(bookedVenuesData);
        } catch (error) {
            console.error('Error fetching booked venues:', error);
        }
    };

    return (
        <div>
            <h1 className='head-left'>My Booked Venues!</h1>
            <div className="venue-list dash">
                {bookedVenues.length > 0 ? (
                    bookedVenues.map(venue => (
                        <VenueCardGuest
                            key={venue.id}
                            venue={venue}
                            removeFromList={fetchBookedVenues}
                        />
                    ))
                ) : (
                    <div style={{color:'white'}}>
                        <h3>No venues are currently booked</h3>
                        <p>Tip: You can book Venues from <a href="http://localhost:5173/dashboard">Dashboard</a></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VenueGuest;

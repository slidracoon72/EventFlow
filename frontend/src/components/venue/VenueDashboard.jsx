import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Venue.css';
import VenueCardDashboard from './VenueCardDashboard';

const VenueDashboard = () => {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = async () => {
        try {
            const response = await axios.get('http://localhost:8080/venues');
            // Sort venues by ID in descending order (newly added first)
            const sortedVenues = response.data.sort((a, b) => b.id - a.id);
            setVenues(sortedVenues);
        } catch (error) {
            console.error('Error fetching venues:', error);
        }
    };

    return (
        <div>
            <h2 className='head-left'>Top Venues: Discover Premier Spaces for Unforgettable Events</h2>
            <div className="venue-list dash">
                {venues.map(venue => (
                    <VenueCardDashboard
                        key={venue.id}
                        venue={venue}   
                    />
                ))}
            </div>
        </div>
    );
};

export default VenueDashboard;

import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const VenueCardGuest = ({ venue, removeFromList }) => {

    const [isBooked, setIsBooked] = useState(venue.booked);

    const handleCancelVenue = (venueId) => {
        // venue
        axios.put(`http://localhost:8080/venues/${venueId}/cancel`)
          .then(response => {
            console.log('Venue cancelled successfully:', response.data);
            setIsBooked(false); // Update UI to reflect the booking
            // Remove the venue from the list
            removeFromList(venueId);
          })
          .catch(error => {
            console.error('Error cancelling venue:', error);
          });
      };
    

    return (
        <div className="venue-card">
            <h2>{venue.name}</h2>
            <h3 className='sub'>Address: <span className="sp">{venue.address}</span></h3>
            <div style={{ margin: '15px' }}></div>
            <h4 className='sub'>Facilities: <span className="sp">{venue.facilities.join(', ')}</span></h4>
            <div style={{ margin: '15px' }}></div>
            <p className='sub'>Capacity: <span className="sp">{venue.capacity}</span></p>
            <div style={{ margin: '15px' }}></div>
            <h4 className='sub'>Price: <span className="sp">${venue.price}</span></h4>
            <Button className="book-button" size="small" variant="contained" color="error" onClick={() => handleCancelVenue(venue.id)}>Cancel Booking</Button>
        </div>
    );
};

export default VenueCardGuest;
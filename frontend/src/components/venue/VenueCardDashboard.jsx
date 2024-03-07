import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const VenueCardDashboard = ({ venue }) => {

  const [isBooked, setIsBooked] = useState(venue.booked);
  
  const theme = createTheme({
    palette: {
      ochre: {
        main: '#E3D026',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
      },
    },
  });

  const handleBookVenue = (venueId) => {
    // Book venue
    axios.put(`http://localhost:8080/venues/${venueId}/book`)
      .then(response => {
        console.log('Venue booked successfully:', response.data);
        setIsBooked(true); // Update UI to reflect the booking
      })
      .catch(error => {
        console.error('Error booking venue:', error);
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
      {isBooked ? (
       <ThemeProvider theme={theme}>
        <Button className="book-button" size="small" variant="contained" color="ochre">Booked</Button>
        </ThemeProvider> 
      ) : (
        <Button className="book-button" size="small" variant="contained" color="info" onClick={() => handleBookVenue(venue.id)}>Book Venue</Button>
      )}
    </div>
  );
};

export default VenueCardDashboard;

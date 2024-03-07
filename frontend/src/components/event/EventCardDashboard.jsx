import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const EventCardDashboard = ({ event }) => {

  const [isAttending, setIsAttending] = useState(event.attending);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4caf50',
        contrastText: '#fff',
      },
      secondary: {
        main: '#bdbdbd',
        contrastText: '#242105',
      },
    },
  });

  const handleAttendEvent = (eventId) => {
    // Attending Event
    axios.put(`http://localhost:8080/events/${eventId}/attend`)
      .then(response => {
        console.log('Marked as Attending successfully:', response.data);
        setIsAttending(true); // Update UI to reflect the change
      })
      .catch(error => {
        console.error('Error marking as Attending:', error);
      });

  };

  return (
    <div className="event-card">
      <h2>{event.name}</h2>
      <h3 className='sub'>Venue:  <span className="sp">{event.venue}</span></h3>
      <div style={{ margin: '15px' }}></div>
      <p className='sub'>Date: <span className="sp">{new Date(event.date).toLocaleDateString()}</span></p>
      <div style={{ margin: '15px' }}></div>
      <h4 className='sub'>Ticket Price: <span className="sp">${event.ticket}</span></h4>
      <div style={{ margin: '15px' }}></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {isAttending ? (
          <ThemeProvider theme={theme}><Button className="attend-button" size="small" variant="contained" color="secondary">Registered</Button></ThemeProvider>
        ) : (
          <ThemeProvider theme={theme}><Button className="attend-button" size="small" variant="contained" color="primary" onClick={() => handleAttendEvent(event.id)}>Attend</Button></ThemeProvider>
        )}
      </div>

    </div>
  );
};

export default EventCardDashboard;

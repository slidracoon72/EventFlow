import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const EventCardGuest = ({ event, removeFromList }) => {

    const [isAttending, setIsAttending] = useState(event.attending);

    const theme = createTheme({
        palette: {
            ochre: {
                main: '#00acc1',
                light: '#E9DB5D',
                dark: '#01579b',
                contrastText: '#fff',
            },
        },
    });

    const handleNotAttend = (eventId) => {
        // Not Attending
        axios.put(`http://localhost:8080/events/${eventId}/not-attend`)
            .then(response => {
                console.log('Marked as Not Attending successfully:', response.data);
                setIsAttending(false); // Update UI to reflect the change
                removeFromList(eventId);
            })
            .catch(error => {
                console.error('Error marking as Not Attending:', error);
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
                <ThemeProvider theme={theme}>
                    <Button className="attend-button" size="small" variant="contained" color="ochre" onClick={() => handleNotAttend(event.id)}>Skip It</Button>
                </ThemeProvider>

            </div>
        </div>
    );
};

export default EventCardGuest;

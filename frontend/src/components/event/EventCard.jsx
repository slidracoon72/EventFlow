import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const EventCard = ({ event, handleDeleteEvent, handleEditEvent }) => {
  return (
    <div className="event-card">
      <h2>{event.name}</h2>
      <h3 className='sub'>Venue:  <span className="sp">{event.venue}</span></h3>
      <div style={{ margin: '15px' }}></div>
      <p className='sub'>Date: <span className="sp">{new Date(event.date).toLocaleDateString()}</span></p>
      <div style={{ margin: '15px' }}></div>
      <h4 className='sub'>Ticket Price: <span className="sp">${event.ticket}</span></h4>
      <div style={{ margin: '15px' }}></div>
      <Stack direction="row" spacing={5}>
        <Button variant="contained" size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteEvent(event.id)}>
          Delete
        </Button>
        <Button variant="contained" size="small" color="info" endIcon={<EditIcon />} onClick={() => handleEditEvent(event)}>
          Update
        </Button>
      </Stack>
    </div>
  );
};

export default EventCard;

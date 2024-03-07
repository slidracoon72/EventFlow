import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const VenueCard = ({ venue, handleDeleteVenue, handleEditVenue }) => {
  return (
    <div className="venue-card">
      <h2>{venue.name}</h2>
      <h3 className='sub'>Address:  <span className="sp">{venue.address}</span></h3>
      <div style={{margin:'15px'}}></div>
      <h4 className='sub'>Facilities:  <span className="sp">{venue.facilities.join(', ')}</span></h4> {/* Join the facilities array */}
      <div style={{margin:'15px'}}></div>
      <p className='sub'>Capacity:  <span className="sp">{venue.capacity}</span></p>
      <div style={{margin:'15px'}}></div>
      <h4 className='sub'>Price: <span className="sp">${venue.price}</span></h4>
      <div style={{margin:'25px'}}></div>
      <Stack direction="row" spacing={5}>
        <Button variant="contained" size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteVenue(venue.id)}>
          Delete
        </Button>
        <Button variant="contained" size="small" color="info" endIcon={<EditIcon />} onClick={() => handleEditVenue(venue)}>
          Update
        </Button>

      </Stack>
    </div>
  );
};

export default VenueCard;

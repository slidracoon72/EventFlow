import React, { useState, useEffect } from 'react';
import VenueForm from './VenueForm';
import axios from 'axios';
import './Venue.css';
import './VenueForm.css';
import VenueCard from './VenueCard';

const Venue = () => {
  const [venues, setVenues] = useState([]);
  const [showVenueForm, setShowVenueForm] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

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

  const handleDeleteVenue = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/venues/${id}`);
      setVenues(venues.filter(venue => venue.id !== id));
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  const handleAddVenueClick = () => {
    setShowVenueForm(true);
    setSelectedVenue(null);
  };

  const handleCancelAddVenue = () => {
    setShowVenueForm(false);
    setSelectedVenue(null);
  };

  const handleEditVenue = (venue) => {
    setSelectedVenue(venue);
    setShowVenueForm(true);
  };

  const refreshVenues = () => {
    fetchVenues();
  };

  return (
    <div>
      <h1>Venue Nexus: Manage Your Venue Spaces!</h1>
      <button className="custom-btn btn-5 addVenue" onClick={handleAddVenueClick}>
        <span>Add Venue</span>
      </button>
      {showVenueForm && <VenueForm onCancel={handleCancelAddVenue} venue={selectedVenue} refreshVenues={refreshVenues} />}
      {!showVenueForm && (
        <div className="venue-list">
          {venues.map(venue => (
            <VenueCard
              key={venue.id}
              venue={venue}
              handleDeleteVenue={handleDeleteVenue}
              handleEditVenue={handleEditVenue}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Venue;

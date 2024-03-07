import React from 'react';
import VenueGuest from '../venue/VenueGuest';
import EventGuest from '../event/EventGuest';

const Guest = () => {
  return (
    <div>
      <h1>Visitor's Corner: Explore the Event Wonderland</h1>
      <div className="dashboard-container">
        <div className="venue-container">
          <VenueGuest />
        </div>
        <div className="event-container">
          <EventGuest />
        </div>
      </div>
    </div>
  );
};

export default Guest;

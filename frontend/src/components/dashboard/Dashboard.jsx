import React from "react";
import VenueDashboard from "../venue/VenueDashboard"
import EventDashboard from "../event/EventDashboard"
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <div style={{ marginBottom: '8px'}}>
        <h1>Insight Hub: Your Event Command Center</h1>
      </div>
      <div className="dashboard-container">
        <div className="venue-container">
          <VenueDashboard />
        </div>
        <div className="event-container">
          <EventDashboard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

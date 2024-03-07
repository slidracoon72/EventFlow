import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles.scss";
import Header from "./components/Header";
import CustomNav from "./components/CustomNav";
import Dashboard from "./components/dashboard/Dashboard";
import Event from "./components/event/Event";
import Venue from "./components/venue/Venue";
import Guest from "./components/guest/Guest";
import Calendar from "./components/calendar/Calendar";
import Login from "./components/login/login";
import Register from "./components/login/register";

export default function App() {
  return (
    <Router>
      <Switch>
        {/* Route for login */}
        <Route path="/login" component={Login} />
        {/* Route for register */}
        <Route path="/register" component={Register} />
        {/* Other routes with the header and nav */}
        <Route>
          <Header />
          <div className="app-container">
            <CustomNav
              items={[
                ["Home", "img/dashboard.svg", "/dashboard"],
                ["Venue", "img/manage order.svg", "/venue"],
                ["Event", "img/restaurant.svg", "/event"],
                ["Guest", "img/manage user.svg", "/guest"],
                ["Calendar", "img/manage coupon.svg", "/calendar"]
              ]}
            />
            <div className="content-container">
              <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/venue" component={Venue} />
                <Route path="/event" component={Event} />
                <Route path="/guest" component={Guest} />
                <Route path="/calendar" component={Calendar} />
                {/* Add other routes as needed */}
              </Switch>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

import React from "react";
import { Route, Routes } from "react-router-dom";
import EventTypes from "../components/User Dashboard/EventTypes";
import RoutingForms from "../components/User Dashboard/RoutingForms";
import ScheduledEvents from "../components/User Dashboard/ScheduledEvents";

const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EventTypes />} />
        <Route path="/scheduled_events" element={<ScheduledEvents />} />
        <Route path="/routing_forms" element={<RoutingForms />} />
      </Routes>
    </div>
  );
};

export default UserRoutes;

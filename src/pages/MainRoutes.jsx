import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Calendar2 from "../components/Calendar/Calendar2";
import { Home } from "./Home";
import Individuals from "./Indiviuals";
import EventTypes from "../components/User Dashboard/EventTypes";
import ScheduledEvents from "../components/User Dashboard/ScheduledEvents";
import EventForm from "../components/User Dashboard/EventForm";
import { GlobalContext } from "../App";
export const MainRoutes = () => {

  const {log} = useContext(GlobalContext)
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home log={log} />} />
        <Route path="/individuals" element={<Individuals />} />
        <Route path="/userevent/userhome/eventtype" element={<EventTypes />} />
        <Route
          path="/userevent/userhome/scheduledevents"
          element={<ScheduledEvents />}
        />
        <Route path="/userevent/userhome/eventforms" element={<EventForm />} />
        <Route
          path="/userevent/userhome/availability"
          element={<Calendar2 />}
        />
      </Routes>
    </div>
  );
};

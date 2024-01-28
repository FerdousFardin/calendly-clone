import React, { useState, useEffect, useCallback, useMemo } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Views, Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar2.css";
import "date-fns/locale/en-US";
import { Box, Stack } from "@chakra-ui/react";
import { auth } from "../../firebase/Firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

const locales = {
  "en-US": "date-fns/locale/en-US",
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar2 = () => {
  const [user] = useAuthState(auth);
  const [allEvents, setAllEvents] = useState([]);

  const events = [
    {
      start: "2024-01-29T18:00:00.000Z",
      end: "2024-01-30T18:00:00.000Z",
      title: "test1",
    },
    {
      start: "2024-01-31T02:00:00.000Z",
      end: "2024-01-31T02:30:00.000Z",
      title: "test2",
    },
    {
      start: "2024-02-01T05:30:00.000Z",
      end: "2024-02-01T06:00:00.000Z",
      title: "test3",
    },
    {
      start: "2024-02-02T08:30:00.000Z",
      end: "2024-02-02T09:00:00.000Z",
      title: "test4",
    },
  ];

  useEffect(() => {
    const convertedEvents = events.map((event) => ({
      start: new Date(event.start),
      end: new Date(event.end),
      title: event.title,
    }));
    setAllEvents(convertedEvents);
  }, []);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event Name");
      if (title) {
        setAllEvents((prev) => [
          ...prev,
          { start, end, title: `${title}-${user && user.displayName}` },
        ]);
      }
    },
    [setAllEvents]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(Date.now()),
      scrollToTime: new Date(2023, 1, 1, 6),
    }),
    []
  );

  return (
    <div className="App">
      <div className="container">
        <div className="calendar height-600">
          {/* Calendar is imported from react-Big-Calendar */}
          <Calendar
            dayLayoutAlgorithm={"no-overlap"}
            defaultDate={defaultDate}
            defaultView={Views.WEEK}
            events={allEvents}
            localizer={localizer}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            scrollToTime={scrollToTime}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar2;

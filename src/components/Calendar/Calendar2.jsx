import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Views, Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar2.css";
import "date-fns/locale/en-US";
import AsyncLocalStorage from "@createnextapp/async-local-storage";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  Box,
  Button,
  Heading,
  Highlight,
  Icon,
  Input,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { auth } from "../../firebase/Firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { Dashboard } from "../User Dashboard/Dashboard.jsx";
import { WarningIcon } from "@chakra-ui/icons";

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
  const [allEventsObj, setAllEventsObj] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [selectedEvent, setSelectedEvent] = useState({});
  const {
    isOpen: detailsIsOpen,
    onOpen: detailsOnOpen,
    onClose: detailsOnClose,
  } = useDisclosure();
  const {
    isOpen: inputIsOpen,
    onOpen: inputOnOpen,
    onClose: inputOnClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  console.log(role);

  const getDetails = async () => {
    const roleFrmStrg = await AsyncLocalStorage.getItem("Role");

    const url =
      roleFrmStrg === "Teacher"
        ? `${import.meta.env.VITE_APP_API}/schedules?email=${user?.email}`
        : `${import.meta.env.VITE_APP_API}/schedules`;

    const eventsData = await fetch(url);

    const events = await eventsData.json();

    const convertedEvents = events.map((eventObj) => ({
      id: eventObj._id,
      start: new Date(eventObj.schedule.start),
      end: new Date(eventObj.schedule.end),
      title: eventObj.schedule.title ? eventObj.schedule.title : eventObj.name,
      isAvailable: eventObj.schedule.isAvailable,
      scheduledTo: eventObj.scheduledTo ? eventObj.scheduledTo : "",
    }));

    setAllEventsObj(events);
    setRole(roleFrmStrg);
    setAllEvents(convertedEvents);
  };

  const getAllDetails = async () => {
    await getDetails();
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getAllDetails();
  }, []);

  const convertDetailedTime = (isoDateString) => {
    const dateObject = new Date(isoDateString);

    const options = {
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      month: "short",
    };

    const formattedDateString = dateObject.toLocaleString("en-US", options);
    return formattedDateString;
  };

  const handleSave = async (email, schedule) => {
    const query = await fetch(`${import.meta.env.VITE_APP_API}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name: user?.displayName,
        schedule,
        isAvailable: true,
      }),
    });
    const data = await query.json();
    return data;
  };

  const handleDelete = async (id) => {
    const query = await fetch(
      `${import.meta.env.VITE_APP_API}/schedules?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await query.json();
    if (data.acknowledged) {
      detailsOnClose();
      setSelectedEvent({});
      setLoading(true);
      getAllDetails();
    }
  };

  const handleCancel = async () => {
    const updatedSchedule = {
      ...selectedEvent,
      schedule: {
        ...selectedEvent.schedule,
        title: "",
        isAvailable: true,
        scheduledTo: "",
      },
    };
    const query = await fetch(`${import.meta.env.VITE_APP_API}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSchedule),
    });
    const data = await query.json();
    if (data.acknowledged) {
      detailsOnClose();
      setSelectedEvent({});
      setLoading(true);
      getAllDetails();
    }
  };

  const handleSchedule = async (e) => {
    e.preventDefault();
    const form = e.target;

    const eventName = form.eventName.value;

    const updatedSchedule = {
      ...selectedEvent,
      schedule: {
        ...selectedEvent.schedule,
        title: eventName,
        isAvailable: false,
        scheduledTo: user?.email,
      },
    };
    const query = await fetch(`${import.meta.env.VITE_APP_API}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSchedule),
    });
    const data = await query.json();
    if (data.acknowledged) {
      detailsOnClose();
      inputOnClose();
      setSelectedEvent({});
      setLoading(true);
      getAllDetails();
    }
  };

  const handleSelectSlot = async ({ start, end }) => {
    if (role === "Teacher") {
      const newEvent = {
        start,
        end,
        title: "",
        isAvailable: true,
        scheduledTo: "",
      };

      const response = await handleSave(user.email, newEvent);

      if (response.acknowledged) {
        setLoading(true);
        getAllDetails();
      } else
        toast({
          title: "Couldn't save event in the database. Please try again",
          status: "error",
          isClosable: true,
          duration: 5000,
        });
    } else
      toast({
        title: "You are not authorized to edit this calender",
        status: "error",
        isClosable: true,
        duration: 2000,
      });
  };

  const handleSelectEvent = (event) => {
    const selctdEvnt = allEventsObj.find(
      (eventObj) => event.id === eventObj._id
    );

    setSelectedEvent(selctdEvnt);
    detailsOnOpen();
  };

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(Date.now()),
      scrollToTime: new Date(2023, 1, 1, 6),
    }),
    []
  );
  if (loading)
    return (
      <Box
        display="flex"
        height="70vh"
        width="100%"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
        color="gray.400"
        gap={5}
      >
        <Spinner size="xl" />
        <Heading as="h4" size="l" color="gray.400">
          Retreving from the server, please wait
        </Heading>
      </Box>
    );
  return (
    <div className="App">
      <Dashboard />
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
            eventPropGetter={(event) => {
              let newStyle = {
                backgroundColor: "lightgray",
                color: "black",
                borderRadius: "0px",
                border: "none",
              };

              if (event.isAvailable) {
                newStyle.backgroundColor = "lightgreen";
              }

              return {
                className: "",
                style: newStyle,
              };
            }}
          />
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={detailsOnClose}
            isOpen={detailsIsOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>Event Details</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                <Stack gap={4} justifyContent={"start"}>
                  <Text display="flex" gap={2}>
                    <strong>Event Title: </strong>
                    {selectedEvent &&
                    selectedEvent.schedule &&
                    selectedEvent.schedule?.title ? (
                      selectedEvent.schedule.title
                    ) : (
                      <Box
                        color="yellow.500"
                        display="flex"
                        gap={1}
                        alignItems="center"
                      >
                        <WarningIcon />
                        <p>No title available</p>
                      </Box>
                    )}
                  </Text>
                  <Text>
                    <strong>Event Details</strong>: From{" "}
                    <strong>
                      {convertDetailedTime(selectedEvent?.schedule?.start)}
                    </strong>{" "}
                    to{" "}
                    <strong>
                      {convertDetailedTime(selectedEvent?.schedule?.end)}
                    </strong>
                  </Text>
                  {role === "Teacher" &&
                    selectedEvent.schedule &&
                    selectedEvent.schedule.scheduledTo?.length && (
                      <Text>
                        <strong>Event Scheduled To: </strong>
                        {selectedEvent &&
                        selectedEvent.schedule &&
                        selectedEvent.schedule.scheduledTo
                          ? selectedEvent.schedule.scheduledTo
                          : ""}
                      </Text>
                    )}
                </Stack>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={detailsOnClose}>
                  Close
                </Button>

                {selectedEvent?.schedule?.isAvailable === false &&
                  (user?.email === selectedEvent?.schedule?.scheduledTo ||
                    role === "Teacher") && (
                    <Button
                      colorScheme="teal"
                      ml={3}
                      onClick={() => handleCancel(selectedEvent._id)}
                    >
                      Cancel Schedule
                    </Button>
                  )}

                {role === "Student" &&
                  selectedEvent?.schedule?.isAvailable === false &&
                  user?.email !== selectedEvent?.schedule?.scheduledTo && (
                    <Button isDisabled ml={3}>
                      Unavailable
                    </Button>
                  )}

                {role === "Teacher" ? (
                  <Button
                    colorScheme="red"
                    ml={3}
                    onClick={() => handleDelete(selectedEvent._id)}
                  >
                    Delete
                  </Button>
                ) : null}

                {role === "Student" && selectedEvent?.schedule?.isAvailable && (
                  <Button colorScheme="blue" ml={3} onClick={inputOnOpen}>
                    Schedule
                  </Button>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={inputOnClose}
            isOpen={inputIsOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>Enter Name</AlertDialogHeader>
              <AlertDialogCloseButton />
              <form onSubmit={(e) => handleSchedule(e)}>
                <AlertDialogBody>
                  <Stack gap={4} justifyContent={"start"}>
                    <Input name="eventName" placeholder="Enter Event Name" />
                  </Stack>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button
                    colorScheme="red"
                    ref={cancelRef}
                    onClick={inputOnClose}
                  >
                    Cancel
                  </Button>

                  <Button colorScheme="green" ml={3} type="submit">
                    Done
                  </Button>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Box>
          <Stack
            direction={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <div className="box available" />
            <Text>Avaiable</Text>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <div className="box not-available" />
            <Text>Not Avaiable</Text>
          </Stack>
        </Box>
      </div>
    </div>
  );
};

export default Calendar2;

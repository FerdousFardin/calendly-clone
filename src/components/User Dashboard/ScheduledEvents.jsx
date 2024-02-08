import {
  Box,
  Button,
  Heading,
  Spinner,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/Firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import AsyncLocalStorage from "@createnextapp/async-local-storage";
import { Dashboard } from "./Dashboard.jsx";

const ScheduledEvents = ({ isVisible = true }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);
  const [allEventsObj, setAllEventsObj] = useState([]);
  const [role, setRole] = useState("");

  const getDetails = async () => {
    const roleFrmStrg = await AsyncLocalStorage.getItem("Role");
    let eventsData = null;
    if (roleFrmStrg === "Teacher") {
      eventsData = await fetch(
        `${import.meta.env.VITE_APP_API}/schedules?email=${user?.email}`
      );
    } else {
      eventsData = await fetch(
        `${import.meta.env.VITE_APP_API}/schedules?scheduledTo=${user?.email}`
      );
    }
    const events = await eventsData.json();
    setAllEventsObj(events);
    setRole(roleFrmStrg);

    const convertedEvents = events.map((eventObj) => ({
      start: new Date(eventObj.schedule.start),
      end: new Date(eventObj.schedule.end),
      title: eventObj.schedule.title ? eventObj.schedule.title : "",
      isAvailable: eventObj.schedule.isAvailable,
      scheduledTo: eventObj.scheduledTo ? eventObj.scheduledTo : "",
    }));

    setAllEvents(convertedEvents);
  };

  const getAllDetails = async () => {
    await getDetails();
    setLoading(false);
  };

  const handleCancel = async (selectedEvent) => {
    const updatedSchedule = {
      ...selectedEvent,
      schedule: {
        ...selectedEvent.schedule,
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
      setLoading(true);
      getAllDetails();
    }
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
      setLoading(true);
      getAllDetails();
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllDetails();
  }, []);

  if (loading)
    return (
      <>
        {" "}
        {isVisible && <Dashboard />}
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
            Retreving data from the server, please wait
          </Heading>
        </Box>
      </>
    );
  if (allEventsObj.length > 0)
    return (
      <>
        {isVisible && <Dashboard />}
        <TableContainer>
          <Table variant="simple">
            {isVisible && <TableCaption>Your Scheduled Events</TableCaption>}
            <Thead>
              <Tr>
                <Th>Event Title</Th>
                <Th>Hosted By</Th>
                <Th>Availability</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allEventsObj.map((event) => {
                const { _id, schedule, email } = event;
                return (
                  <Tr key={_id}>
                    <Td>{schedule.title}</Td>
                    <Td>{email}</Td>
                    <Td>
                      {schedule.isAvailable ? (
                        <Text color="lightgreen">Available</Text>
                      ) : (
                        <Text color="lightgray">Not Available</Text>
                      )}
                    </Td>
                    <Td>
                      <Stack flexDirection="row">
                        {schedule.isAvailable === false && (
                          <Button
                            onClick={() => handleCancel(event)}
                            size="sm"
                            colorScheme="teal"
                          >
                            Cancel Schedule
                          </Button>
                        )}
                        {role === "Teacher" && (
                          <Button
                            onClick={() => handleDelete(_id)}
                            size="sm"
                            colorScheme="red"
                          >
                            Delete
                          </Button>
                        )}
                      </Stack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </>
    );
  return (
    <>
      {isVisible && <Dashboard />}
      <Box
        display="flex"
        height="50vh"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Heading as="h4" size="l" color="gray.400">
          No Scheduled Events
        </Heading>
      </Box>
    </>
  );
};

export default ScheduledEvents;

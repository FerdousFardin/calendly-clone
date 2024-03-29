import {
  Box,
  Button,
  Flex,
  Heading,
  FormLabel,
  Input,
  Textarea,
  Select,
  Stack,
} from "@chakra-ui/react";
import { times } from "../../data/data";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/Firebase";
import DatePicker from "react-datepicker";
import { Dashboard } from "./Dashboard";

const EventForm = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [type, setType] = useState("One-on-One");
  const [heading, setHeading] = useState("");
  const [time, setTime] = useState(5);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(0);

  const postEvent = async ({ details, heading }) => {
    setLoading(true);
    const data = await fetch(import.meta.env.VITE_APP_API + "/event", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        heading,
        details,
        time: `${time} min`,
        date: date,
        type,
        email: user && user.email,
      }),
    });
    const result = await data.json();
    return result;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target;
    const details = form.details.value;
    const heading = form.heading.value;
    const res = await postEvent({ details, heading });
    if (res.acknowledged) navigate("/userevent/userhome/eventtype");
    setLoading(false);
  };
  return (
    <>
      <Dashboard />
      <Box mx={"25rem"} p={4}>
        <Flex gap={50} mb={10}>
          <Button
            variant={"outline"}
            borderColor={"blue.500"}
            rounded={50}
            color={"blue.500"}
            onClick={() => navigate("/userevent/userhome/eventtype")}
          >
            {"< Back to Events"}
          </Button>
          <Heading fontWeight={"normal"}>Add Event Type</Heading>
        </Flex>
        <hr />
        <form onSubmit={handleSave}>
          <Flex my={4} justifyContent={"space-between"}>
            <Box>
              <Heading as={"h4"} fontWeight={"medium"}>
                What event is this?
              </Heading>
            </Box>
            <Flex gap={4}>
              <Button
                onClick={() => navigate("/userevent/userhome/eventtype")}
                rounded={"full"}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={loading}
                loadingText="Saving"
                rounded={"full"}
                color={"white"}
                bg={"blue.500"}
              >
                Save
              </Button>
            </Flex>
          </Flex>
          <hr />
          <FormLabel>Event Name</FormLabel>
          <Input
            type="text"
            name="heading"
            onChange={(e) => setHeading(e.target.value)}
            required
          />

          <FormLabel>Duration</FormLabel>
          <Select onChange={(e) => setTime(e.target.value)}>
            {times.map((time) => (
              <option value={time}>{time} minutes</option>
            ))}
          </Select>
          <FormLabel>Event Date</FormLabel>
          <Stack direction="row" justifyContent="flex-start">
            <DatePicker
              showIcon
              dateFormat="MMMM d, yyyy"
              placeholderText="Click to select a date"
              selected={date}
              onChange={(date) => setDate(date)}
            />
          </Stack>
          <FormLabel>Event Type</FormLabel>
          <Select onChange={(e) => setType(e.target.value)}>
            <option value="One-on-One">One-on-One</option>
            <option value="Group">Group</option>
            <option value="Collective">Collective</option>
          </Select>
          <FormLabel>Description/Instructions</FormLabel>
          <Textarea type="textBox" required name="details" minHeight={40} />
          <FormLabel>Event Link</FormLabel>
          <Input type="text" />
          <hr />

          <Flex gap={4} my={4} justifyContent={"right"}>
            <Button
              onClick={() => navigate("/userevent/userhome/eventtype")}
              rounded={"full"}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={loading}
              loadingText="Saving"
              color={"white"}
              rounded={"full"}
              bg={"blue.500"}
            >
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default EventForm;

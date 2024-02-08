import {
  Box,
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
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

const EventForm = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [type, setType] = useState("One-on-One");
  const [heading, setHeading] = useState("");
  const [time, setTime] = useState(5);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(0);

  const postEvent = async () => {
    setLoading(true);
    const data = await fetch(import.meta.env.VITE_APP_API + "/event", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        heading,
        time: `${time} min`,
        date: date,
        type,
        email: user && user.email,
      }),
    });
    const result = await data.json();
    return result;
  };

  const handleSave = async () => {
    const res = await postEvent();
    if (res.acknowledged) navigate("/userevent/userhome/eventtype");
    setLoading(false);
  };
  return (
    <Box mx={"25rem"} p={4}>
      <Flex justifyContent={"space-between"} my={8}>
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
      <FormControl border={"1px solid"} p={8}>
        <Flex my={4} justifyContent={"space-between"}>
          <Box>
            <Heading as={"h4"} fontWeight={"medium"}>
              What event is this?
            </Heading>
          </Box>
          <Flex gap={4}>
            <Button rounded={"full"}>Cancel</Button>
            <Button
              isLoading={loading}
              loadingText="Saving"
              onClick={handleSave}
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
          onChange={(e) => setHeading(e.target.value)}
          isRequired
        />
        <FormHelperText>We'll never share your info.</FormHelperText>
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
        <Textarea type="textBox" isRequired minHeight={40} />
        <FormLabel>Event Link</FormLabel>
        <Input type="text" isRequired />
        <hr />

        <Flex gap={4} my={4} justifyContent={"right"}>
          <Button rounded={"full"}>Cancel</Button>
          <Button
            isLoading={loading}
            loadingText="Saving"
            onClick={handleSave}
            color={"white"}
            rounded={"full"}
            bg={"blue.500"}
          >
            Save
          </Button>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default EventForm;

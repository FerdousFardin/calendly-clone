import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  Avatar,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiSettings2Fill } from "react-icons/ri";
import { BiLink } from "react-icons/bi";
import EventCard from "./EventCard";
import { auth } from "../../firebase/Firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
const EventTypes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [events, setEvents] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);

  const handleOpen = (_id) => {
    setSelectedId(_id);
    onOpen();
  };

  const handleDelete = async () => {
    console.log(selectedId);
    const res = await fetch(
      import.meta.env.VITE_APP_API + "/event?id=" + selectedId,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    if (data.acknowledged) handleGetEvents();
    onClose();
    return;
  };
  useEffect(() => {
    handleGetEvents();
  }, []);

  const handleGetEvents = () => {
    setLoading(true);
    fetch(import.meta.env.VITE_APP_API + "/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.events.length > 0) setEvents(data.events);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box mx={"25rem"}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<AiOutlineSearch color="gray.300" />}
        />
        <Input type="text" placeholder="Filter" />
      </InputGroup>

      <Flex my={4} justifyContent={"space-between"}>
        <Flex gap={4} alignItems="center">
          <Avatar src={user ? user?.photoURL : ""} />
          <Heading as={"h2"} size="lg" fontWeight={"normal"}>
            {user && user.displayName}
          </Heading>
        </Flex>
        <Flex>
          <Link to={"/userevent/userhome/eventforms"}>
            <Button
              color={"blue.500"}
              rounded={"full"}
              borderColor={"blue.500"}
              variant={"outline"}
            >
              + New Event Type
            </Button>
          </Link>
          <Menu>
            <MenuButton as={Button} border={"none"} bg={"none"}>
              <RiSettings2Fill />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Box mr={2}>
                  <BiLink />
                </Box>
                Copy Link
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <hr />
      {events.length > 0 && loading === false ? (
        <Grid templateColumns="repeat(2, 1fr)" justifyContent={"left"} gap={8}>
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              handleOpen={handleOpen}
              handleDelete={handleDelete}
            />
          ))}
        </Grid>
      ) : loading === true ? (
        <Flex alignItems="center" h="40vh" justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex alignItems="center" h="40vh" justifyContent="center">
          <Heading as="h1" color="#bbb">
            No Events Found
          </Heading>
        </Flex>
      )}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure?</ModalBody>
          <ModalFooter>
            <Button mr={5} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EventTypes;

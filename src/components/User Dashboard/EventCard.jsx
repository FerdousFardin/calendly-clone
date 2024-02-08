import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  Checkbox,
  Flex,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Switch,
} from "@chakra-ui/react";
import { BiCopy, BiNote } from "react-icons/bi";
import { RiSettings2Fill, RiDeleteBin6Fill } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown, MdEdit } from "react-icons/md";
import { colors } from "../../data/data";
export default function EventCard({ event, handleOpen }) {
  const convertDetailedTime = (isoDateString) => {
    const dateObject = new Date(isoDateString);

    const options = {
      day: "numeric",
      month: "short",
    };

    const formattedDateString = dateObject.toLocaleString("en-US", options);
    return formattedDateString;
  };
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"300px"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"xl"}
        rounded={"xl"}
        borderTop={`0.5rem solid ${
          colors[Math.floor(Math.random() * (colors.length - 1))]
        }`}
        p={4}
        textAlign={"left"}
      >
        <Flex direction={"row"} justifyContent={"space-between"}>
          <Checkbox></Checkbox>
          <Menu>
            <MenuButton
              as={Button}
              border={"none"}
              bg={"none"}
              rightIcon={<MdOutlineKeyboardArrowDown />}
            >
              <RiSettings2Fill />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Box mr={2}>
                  <MdEdit />
                </Box>
                Edit
              </MenuItem>
              <MenuItem>
                <Box mr={2}>
                  <BiNote />
                </Box>
                Add Internal Note
              </MenuItem>
              <MenuItem>
                <Box mr={2}>
                  <BiCopy />
                </Box>
                Clone
              </MenuItem>
              <MenuItem onClick={() => handleOpen(event._id)}>
                <Box mr={2}>
                  <RiDeleteBin6Fill />
                </Box>
                Delete
              </MenuItem>
              <hr />

              <MenuItem>
                On/Off <Switch ml={"6rem"} />
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Box mb={12}>
          <Heading fontSize={"xl"} fontWeight={600}>
            {event && event.heading}
          </Heading>
          <Text fontWeight={400} color={"gray.500"} mb={4}>
            {event && event.time},{" "}
            {event && event.date ? convertDetailedTime(event.date) + "," : ""}{" "}
            {event && event.type}
          </Text>

          <Link href={"#"} color={"blue.500"}>
            View booking page
          </Link>
        </Box>

        <hr />

        <Stack mt={2} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            variant={"ghost"}
            leftIcon={<BiCopy />}
            color={"blue.500"}
          >
            Copy Link
          </Button>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            color={"blue.400"}
            variant={"outline"}
            border={"1px solid "}
            borderColor={"blue.500"}
          >
            Share
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}

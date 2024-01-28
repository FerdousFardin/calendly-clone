import {
  Box,
  Flex,
  HStack,
  VStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export function Dashboard() {
  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        px={4}
        my={"5rem"}
        mx={"25rem"}
      >
        <Flex
          h={16}
          justifyContent="space-between"
          alignItems={"center"}
          w={["90%", "85%", "80%"]}
          py={4}
          maxW="container.lg"
          mx="auto"
        >
          <VStack spacing={8}>
            <HStack>
              <Button
                bg={"none"}
                fontWeight={"semibold"}
                rightIcon={<MdOutlineKeyboardArrowDown size={40} />}
                mr={80}
              >
                <Menu>
                  <MenuButton bg={"none"} fontWeight={"semibold"}>
                    <Heading as={"h2"} fontWeight={"normal"}>
                      My Scheduler
                    </Heading>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Box mr={4}>{/* <BsBoxArrowUpRight/>  */}</Box>
                      Help Center
                    </MenuItem>
                    <MenuItem>Chat With Us</MenuItem>
                  </MenuList>
                </Menu>
              </Button>
            </HStack>

            <HStack as={"nav"} spacing={4} justifyContent={"space-between"}>
              <Link to={"/userevent/userhome/eventtype"}>
                <Button bg={"none"} fontWeight={"semibold"}>
                  Event Types
                </Button>
              </Link>
              <Link to={"/userevent/userhome/scheduledevents"}>
                <Button bg={"none"} fontWeight={"semibold"}>
                  Scheduled Events
                </Button>
              </Link>

              <Link to={"/userevent/userhome/routingforms"}>
                <Button bg={"none"} fontWeight={"semibold"}>
                  Routing Forms
                </Button>
              </Link>
              <Link to={"/userevent/userhome/availability"}>
                <Button bg={"none"} fontWeight={"semibold"}>
                  Availability
                </Button>
              </Link>
            </HStack>
          </VStack>
          <Flex alignItems={"center"}>
            <Link to={"/userevent/userhome/eventforms"}>
              <Button
                variant={"solid"}
                bg={"#3372cc"}
                color={"white"}
                size={"lg"}
                mr={4}
                leftIcon={<AddIcon />}
                borderRadius={50}
              >
                Create
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

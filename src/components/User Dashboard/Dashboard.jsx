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
import { Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export function Dashboard() {
  const route = useLocation();

  const activeStatus = (path) => {
    const pathRegex = new RegExp(path);
    return pathRegex.test(route.pathname);
  };
  return (
    <>
      <Box
        position={"relative"}
        bg={useColorModeValue("white", "gray.900")}
        px={4}
        my={"5rem"}
        mx={"25rem"}
      >
        <Flex
          mt={150}
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
                <Button
                  isActive={activeStatus("eventtype")}
                  bg={"none"}
                  fontWeight={"semibold"}
                >
                  Event Types
                </Button>
              </Link>
              <Link to={"/userevent/userhome/scheduledevents"}>
                <Button
                  isActive={activeStatus("scheduledevents")}
                  bg={"none"}
                  fontWeight={"semibold"}
                >
                  Scheduled Events
                </Button>
              </Link>
              <Link to={"/userevent/userhome/availability"}>
                <Button
                  isActive={activeStatus("availability")}
                  bg={"none"}
                  fontWeight={"semibold"}
                >
                  Availability
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Flex>
      </Box>
    </>
  );
}

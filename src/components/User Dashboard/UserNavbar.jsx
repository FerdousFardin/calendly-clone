import { React, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import AsyncLocalStorage from "@createnextapp/async-local-storage";
import { FaUserAlt } from "react-icons/fa";
import { ImCreditCard } from "react-icons/im";
import { AiTwotoneCalendar, AiOutlineAppstore } from "react-icons/ai";
import { MdPeople } from "react-icons/md";
import { BsFillLockFill, BsLink45Deg, BsBoxArrowUpRight } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineKeyboardArrowDown, MdOutlineLiveHelp } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/Firebase.js";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useAuthState,
  useSignOut,
} from "react-firebase-hooks/auth";

export function Navbar({ handleLog }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, userLoading, userError] = useAuthState(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);
  const [goingUp, setGoingUp] = useState(false);

  const navigate = useNavigate();
  const route = useLocation();

  const activeStatus = (path) => {
    if (path === undefined) {
      return route.pathname === "/";
    }
    const pathRegex = new RegExp(path);
    return pathRegex.test(route.pathname);
  };

  const handleScroll = () => {
    if (window.scrollY >= 104) {
      setGoingUp(true);
    } else {
      setGoingUp(false);
    }
  };
  window.addEventListener("scroll", handleScroll);

  return (
    <>
      <Box bg={useColorModeValue("white", "gray.900")} px={4} mx={"25rem"}>
        <Flex
          className={goingUp ? "shadow_btm" : "no_shadow"}
          pos="fixed"
          top="0"
          left="0"
          zIndex={2}
          w="100%"
          h="104"
          bg="white"
          px={{ base: "6%", md: "5%", lg: "4%" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link to={"/"}>
                <Image
                  src="https://i.postimg.cc/CxDV6G3h/scheduler-removebg-preview.png"
                  w="auto"
                  objectFit="contain"
                  alt="Dan Abramov"
                />
              </Link>
            </Box>
          </HStack>

          <Flex alignItems={"center"}>
            <HStack as={"nav"} marginLeft={"10rem"} spacing={4}>
              <Link to={"/"}>
                <Button
                  isActive={activeStatus()}
                  bg={"none"}
                  fontWeight={"semibold"}
                >
                  Home
                </Button>
              </Link>
              <Link to={"/userevent/userhome/eventtype"}>
                <Button
                  isActive={activeStatus("userhome")}
                  bg={"none"}
                  fontWeight={"semibold"}
                >
                  Dashboard
                </Button>
              </Link>

              <Button
                bg={"none"}
                fontWeight={"semibold"}
                rightIcon={<MdOutlineKeyboardArrowDown />}
              >
                <Menu>
                  <MenuButton bg={"none"} fontWeight={"semibold"}>
                    Help
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Box mr={4}>
                        <BsBoxArrowUpRight />
                      </Box>
                      Help Center
                    </MenuItem>
                    <MenuItem>
                      <Box mr={4}>
                        <MdOutlineLiveHelp />
                      </Box>
                      Chat With Us
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Button>
            </HStack>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  marginLeft={8}
                >
                  <Avatar size="sm" name={user?.displayName} src="" />
                  <Box>
                    <Button
                      bg={"none"}
                      rightIcon={<MdOutlineKeyboardArrowDown />}
                    >
                      Account
                    </Button>
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  {" "}
                  <Box marginRight={4}>
                    {" "}
                    <FaUserAlt size={14} />{" "}
                  </Box>{" "}
                  Account Settings
                </MenuItem>

                <MenuItem>
                  <Box marginRight={3}>
                    <AiTwotoneCalendar size={18} />
                  </Box>
                  Calender Connections
                </MenuItem>

                <MenuItem>
                  <Box marginRight={3}>
                    <BsLink45Deg size={18} />
                  </Box>
                  Share Your Link
                </MenuItem>

                <MenuItem>
                  <Box marginRight={3}>
                    <AiOutlineAppstore size={18} />
                  </Box>
                  Apps
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onClick={async () => {
                    const res = await signOut();
                    if (res) {
                      handleLog(false);
                      await AsyncLocalStorage.removeItem("Role");
                      setTimeout(() => navigate("/"), 1000);
                    }
                  }}
                >
                  <Box marginRight={3}>
                    <IoIosLogOut size={18} />
                  </Box>
                  Log Out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
      <hr />
    </>
  );
}

import { React } from "react";
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
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaUserAlt } from "react-icons/fa";
import { ImCreditCard } from "react-icons/im";
import { AiTwotoneCalendar, AiOutlineAppstore } from "react-icons/ai";
import { MdPeople } from "react-icons/md";
import { BsFillLockFill, BsLink45Deg, BsBoxArrowUpRight } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineKeyboardArrowDown, MdOutlineLiveHelp } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/Firebase.js";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useAuthState,
} from "react-firebase-hooks/auth";

export function Navbar({ handleLog }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  console.log("user", user, loading);
  return (
    <>
      <Box bg={useColorModeValue("white", "gray.900")} px={4} mx={"25rem"}>
        <Flex
          h={16}
          justifyContent="space-between"
          alignItems={"center"}
          w={["90%", "85%", "80%"]}
          py={4}
          maxW="container.lg"
          mx="auto"
        >
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link to={"/"}>
                <Image
                  size={""}
                  borderRadius="full"
                  boxSize="50px"
                  src={
                    "https://assets.calendly.com/packs/frontend/media/logo-square-cd364a3c33976d32792a.png"
                  }
                />
              </Link>
            </Box>
          </HStack>

          <Flex alignItems={"center"}>
            <HStack
              as={"nav"}
              marginLeft={"10rem"}
              spacing={4}
            >
              <Link to={"/userevent/userhome"}>
                <Button bg={"none"} fontWeight={"semibold"}>
                  Home
                </Button>
              </Link>
              <Link to={"/userevent/userhome/availability"}>
                <Button bg={"none"} fontWeight={"semibold"}>
                  Availabilty
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
                  onClick={() => {
                    handleLog();
                    navigate("/");
                  }}
                >
                  <Box marginRight={3}>
                    <IoIosLogOut size={18} />
                  </Box>
                  LogOut
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

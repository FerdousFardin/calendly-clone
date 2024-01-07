import React, { useState } from "react";
import { Flex, Spacer, useDisclosure, useToast } from "@chakra-ui/react";
import { HStack, VStack, Button, Box, Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import "./Navbar.css";
import { auth } from "../../firebase/Firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Divider } from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import SigninBox from "../Auth/SigninBox";
import Resources from "../Resources/Resources";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import RegisterBox from "../Auth/RegisterBox";

export const Navbar = ({ handleLog, resolveTrue }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [opend, setOpend] = useState(false);
  const [goingUp, setGoingUp] = useState(false);
  const [register, setRegister] = useState(false);
  const [error, setError] = useState("");

  const [user] = useAuthState(auth);
  const postPHEvent = async () => {
    const data = await fetch(import.meta.env.VITE_APP_API + "/event", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        heading: "Getting Started",
        time: "5 min",
        type: "Tutorial",
        email: user && user.email,
      }),
    });
    const result = await data.json();
    console.log("postPHResult", result);
    return result;
  };

  const handleScroll = () => {
    if (window.scrollY >= 104) {
      setGoingUp(true);
    } else {
      setGoingUp(false);
    }
  };
  const getUser = async (email, role) => {
    const query = await fetch(
      import.meta.env.VITE_APP_API + "/user" + `?email=${email}&role=${role}`
    );
    const res = await query.json();
    return res;
  };
  const loginWithGoogle = (role) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (res) => {
        setError("");
        handleLog(true);
        const resPH = await postPHEvent();
        const user = await getUser(res?.user?.email, role);
        console.log("user.result", user.result);
        if (resPH.acknowledged && user && user.result)
          navigate("/userevent/userhome/eventtype");
        else {
          // sign;
          const resOut = await signOut();
          console.log("resOut", resOut);
          if (resOut) {
            handleLog(false);
            onOpen();
            toast({
              title: `Could not find user in the database`,
              status: "error",
              isClosable: true,
            });
            setError("Could not find user in the database");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.code);
      });
  };
  window.addEventListener("scroll", handleScroll);
  return (
    <>
      <Drawer
        isOpen={opend}
        placement="right"
        onClose={!opend}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={() => setOpend(false)} />
          <DrawerHeader>Welcome to Scheduler</DrawerHeader>

          <DrawerBody>
            {/* <Input placeholder='Type here...' /> */}
            <VStack fontWeight={"bold"} align={"left"}>
              <Link to="/individuals">
                {" "}
                <Text cursor={"pointer"} pl={"18px"}>
                  Individuals
                </Text>
              </Link>
              <Divider />
              <Link to="/pricing">
                {" "}
                <Text cursor={"pointer"} pl={"18px"}>
                  Pricing
                </Text>
              </Link>
              <Accordion
                allowToggle
                width={"100%"}
                bg={"white"}
                outline={"none"}
              >
                <AccordionItem>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight={"bold"}
                      pl={"auto"}
                    >
                      <Text>More</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} align={"center"}>
                    <Link to="/about">
                      {" "}
                      <Text cursor={"pointer"} pl={"18px"}>
                        About
                      </Text>
                    </Link>
                    <br />
                    <Link to="/customer">
                      {" "}
                      <Text cursor={"pointer"} pl={"18px"}>
                        Customer
                      </Text>
                    </Link>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Modal isOpen={isOpen} border={"1px solid red"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {register ? "Get started today" : "Login with existing account"}
          </ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            {!register ? (
              <SigninBox
                onClose={onClose}
                setRegister={setRegister}
                loginWithGoogle={loginWithGoogle}
                type={"Sign up"}
                handleLog={handleLog}
                resolveTrue={resolveTrue}
                error={error}
              />
            ) : (
              <RegisterBox
                onClose={onClose}
                setRegister={setRegister}
                loginWithGoogle={loginWithGoogle}
                type={"Sign up"}
                handleLog={handleLog}
                postPHEvent={postPHEvent}
                resolveTrue={resolveTrue}
                error={error}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
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
        <Box
          cursor="pointer"
          display={{ base: "none", sm: "block", md: "block" }}
        >
          <Link to="/">
            <Image
              src="https://i.postimg.cc/CxDV6G3h/scheduler-removebg-preview.png"
              w="auto"
              alt="Dan Abramov"
            />
          </Link>
        </Box>
        <Box display={{ base: "block", sm: "none" }}>
          <Link to="/">
            <Image
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI3LjQxNjYgMjUuOTI5OEMyNi4xMjE2IDI3LjA1NTQgMjQuNTEwNSAyOC40NTY2IDIxLjU3NjQgMjguNDU2NkgxOS44MjQ3QzE3LjcwNDMgMjguNDU2NiAxNS43NzU5IDI3LjcwMiAxNC4zOTU1IDI2LjMzMDdDMTMuMDQ3OCAyNC45OTE0IDEyLjMwNDMgMjMuMTU5NSAxMi4zMDQzIDIxLjE3MDJWMTguODE3OUMxMi4zMDQzIDE2LjgyODYgMTMuMDQ2NiAxNC45OTU1IDE0LjM5NTUgMTMuNjU3NEMxNS43NzU5IDEyLjI4NiAxNy43MDQzIDExLjUzMTQgMTkuODI0NyAxMS41MzE0SDIxLjU3NjRDMjQuNTEwNSAxMS41MzE0IDI2LjEyMTYgMTIuOTMyNiAyNy40MTY2IDE0LjA1ODJDMjguNzU5NiAxNS4yMjYzIDI5LjkxOTkgMTYuMjM0OCAzMy4wMDk4IDE2LjIzNDhDMzMuNDg5OCAxNi4yMzQ4IDMzLjk2MDUgMTYuMTk2OSAzNC40MTgzIDE2LjEyNDVDMzQuNDE0OCAxNi4xMTUzIDM0LjQxMTMgMTYuMTA3MyAzNC40MDc4IDE2LjA5ODFDMzQuMjI0IDE1LjY1MTMgMzQuMDA3MyAxNS4yMTI1IDMzLjc1OCAxNC43ODg3TDMxLjY5MTQgMTEuMjc3NkMyOS43OTU4IDguMDU1ODUgMjYuMjkxNCA2LjA3MjI3IDIyLjUwMDIgNi4wNzIyN0gxOC4zNjdDMTQuNTc1OCA2LjA3MjI3IDExLjA3MTQgOC4wNTY5OSA5LjE3NTc3IDExLjI3NzZMNy4xMDkyMiAxNC43ODg3QzUuMjEzNTkgMTguMDEwNSA1LjIxMzU5IDIxLjk3ODcgNy4xMDkyMiAyNS4xOTkzTDkuMTc1NzcgMjguNzEwNUMxMS4wNzE0IDMxLjkzMjIgMTQuNTc1OCAzMy45MTU4IDE4LjM2NyAzMy45MTU4SDIyLjUwMDJDMjYuMjkxNCAzMy45MTU4IDI5Ljc5NTggMzEuOTMxMSAzMS42OTE0IDI4LjcxMDVMMzMuNzU4IDI1LjE5OTNDMzQuMDA3MyAyNC43NzQ0IDM0LjIyNCAyNC4zMzY3IDM0LjQwNzggMjMuODlDMzQuNDExMyAyMy44ODA4IDM0LjQxNDggMjMuODcyNyAzNC40MTgzIDIzLjg2MzVDMzMuOTYwNSAyMy43OTEyIDMzLjQ5MSAyMy43NTMzIDMzLjAwOTggMjMuNzUzM0MyOS45MTk5IDIzLjc1MzMgMjguNzU5NiAyNC43NjE3IDI3LjQxNjYgMjUuOTI5OFoiIGZpbGw9IiMwMDZCRkYiLz4KPHBhdGggZD0iTTIxLjU3NjcgMTMuNjYyMUgxOS44MjVDMTYuNTk4MiAxMy42NjIxIDE0LjQ3NjYgMTUuOTIzNiAxNC40NzY2IDE4LjgxOFYyMS4xNzAzQzE0LjQ3NjYgMjQuMDY0NyAxNi41OTcgMjYuMzI2MiAxOS44MjUgMjYuMzI2MkgyMS41NzY3QzI2LjI3ODggMjYuMzI2MiAyNS45MSAyMS42MjI4IDMzLjAxMDEgMjEuNjIyOEMzMy42OTA0IDIxLjYyMjggMzQuMzYyNCAyMS42ODM3IDM1LjAxNjkgMjEuODAzMUMzNS4yMzI0IDIwLjYwNzUgMzUuMjMyNCAxOS4zODMxIDM1LjAxNjkgMTguMTg2M0MzNC4zNjI0IDE4LjMwNTggMzMuNjkwNCAxOC4zNjY2IDMzLjAxMDEgMTguMzY2NkMyNS45MSAxOC4zNjU1IDI2LjI3ODggMTMuNjYyMSAyMS41NzY3IDEzLjY2MjFaIiBmaWxsPSIjMDA2QkZGIi8+CjxwYXRoIGQ9Ik0zOS4wOTUgMjMuNTIwM0MzNy44ODIgMjIuNjQyOCAzNi40OTEgMjIuMDcwOCAzNS4wMTU3IDIxLjgwMDlDMzUuMDEzNCAyMS44MTI0IDM1LjAxMjIgMjEuODIzOSAzNS4wMDk5IDIxLjgzNTRDMzQuODgzNCAyMi41MjQ1IDM0LjY4NjcgMjMuMjAzMyAzNC40MTc0IDIzLjg2MTRDMzUuNjYyIDI0LjA1OSAzNi44MDk1IDI0LjUxODQgMzcuNzg5NSAyNS4yMjI1QzM3Ljc4NiAyNS4yMzI4IDM3Ljc4MzYgMjUuMjQzMiAzNy43ODAxIDI1LjI1NDdDMzcuMjE0NiAyNy4wNTU2IDM2LjM2MjIgMjguNzUzMiAzNS4yNDc2IDMwLjI5OEMzNC4xNDU4IDMxLjgyMzMgMzIuODE0NSAzMy4xNjYgMzEuMjg4OSAzNC4yODgxQzI4LjEyMTcgMzYuNjE4NiAyNC4zNDkyIDM3Ljg0OTggMjAuMzc3NiAzNy44NDk4QzE3LjkxODggMzcuODQ5OCAxNS41MzUgMzcuMzc3OCAxMy4yOTE2IDM2LjQ0NzRDMTEuMTI0MyAzNS41NDgxIDkuMTc3MTggMzQuMjYwNSA3LjUwNDAyIDMyLjYxOTJDNS44MzA4NiAzMC45Nzc5IDQuNTE4MzUgMjkuMDY3OSAzLjYwMTU2IDI2Ljk0MTlDMi42NTMxNyAyNC43NDEyIDIuMTcxOTQgMjIuNDAyOCAyLjE3MTk0IDE5Ljk5MDhDMi4xNzE5NCAxNy41Nzg4IDIuNjUzMTcgMTUuMjQwMyAzLjYwMTU2IDEzLjAzOTdDNC41MTgzNSAxMC45MTM3IDUuODMwODYgOS4wMDM2IDcuNTA0MDIgNy4zNjIzQzkuMTc3MTggNS43MjEgMTEuMTI0MyA0LjQzMzQ2IDEzLjI5MTYgMy41MzQxNEMxNS41MzUgMi42MDM4IDE3LjkxODggMi4xMzE3NCAyMC4zNzc2IDIuMTMxNzRDMjQuMzQ5MiAyLjEzMTc0IDI4LjEyMTcgMy4zNjMwMSAzMS4yODg5IDUuNjkzNDVDMzIuODE0NSA2LjgxNTU5IDM0LjE0NTggOC4xNTgyNyAzNS4yNDc2IDkuNjgzNTZDMzYuMzYyMiAxMS4yMjg0IDM3LjIxNDYgMTIuOTI2IDM3Ljc4MDEgMTQuNzI2OUMzNy43ODM2IDE0LjczODQgMzcuNzg3MSAxNC43NDg3IDM3Ljc4OTUgMTQuNzU5MUMzNi44MDk1IDE1LjQ2MzEgMzUuNjYyIDE1LjkyMzcgMzQuNDE3NCAxNi4xMjAxQzM0LjY4NjcgMTYuNzc5NCAzNC44ODQ2IDE3LjQ1OTMgMzUuMDA5OSAxOC4xNDg1QzM1LjAxMjIgMTguMTYgMzUuMDEzNCAxOC4xNzAzIDM1LjAxNTcgMTguMTgxOEMzNi40OTEgMTcuOTExOSAzNy44ODA4IDE3LjMzOTkgMzkuMDk1IDE2LjQ2MjRDNDAuMjU3NiAxNS42MTgyIDQwLjAzMjggMTQuNjY0OSAzOS44NTYgMTQuMDk5OEMzNy4yOTMgNS45MzQ2NCAyOS41NDIgMCAyMC4zNzc2IDBDOS4xMjMzNCAwIDAgOC45NDk2MiAwIDE5Ljk4OTZDMCAzMS4wMjk2IDkuMTIzMzQgMzkuOTc5MyAyMC4zNzc2IDM5Ljk3OTNDMjkuNTQyIDM5Ljk3OTMgMzcuMjkzIDM0LjA0NDYgMzkuODU2IDI1Ljg3OTVDNDAuMDMyOCAyNS4zMTc4IDQwLjI1ODggMjQuMzY0NSAzOS4wOTUgMjMuNTIwM1oiIGZpbGw9IiMwMDZCRkYiLz4KPHBhdGggZD0iTTM0LjQxODcgMTYuMTIyNEMzMy45NjA5IDE2LjE5NDggMzMuNDkxNCAxNi4yMzI3IDMzLjAxMDIgMTYuMjMyN0MyOS45MjAzIDE2LjIzMjcgMjguNzYgMTUuMjI0MiAyNy40MTcgMTQuMDU2MUMyNi4xMjIgMTIuOTMwNSAyNC41MTA5IDExLjUyOTMgMjEuNTc2NyAxMS41MjkzSDE5LjgyNTFDMTcuNzA0NyAxMS41MjkzIDE1Ljc3NjMgMTIuMjgzOSAxNC4zOTU5IDEzLjY1NTNDMTMuMDQ4MiAxNC45OTQ1IDEyLjMwNDcgMTYuODI2NSAxMi4zMDQ3IDE4LjgxNThWMjEuMTY4MUMxMi4zMDQ3IDIzLjE1NzQgMTMuMDQ3IDI0Ljk5MDUgMTQuMzk1OSAyNi4zMjg2QzE1Ljc3NjMgMjcuNjk5OSAxNy43MDQ3IDI4LjQ1NDYgMTkuODI1MSAyOC40NTQ2SDIxLjU3NjdDMjQuNTEwOSAyOC40NTQ2IDI2LjEyMiAyNy4wNTMzIDI3LjQxNyAyNS45Mjc3QzI4Ljc2IDI0Ljc1OTYgMjkuOTIwMyAyMy43NTEyIDMzLjAxMDIgMjMuNzUxMkMzMy40OTAyIDIzLjc1MTIgMzMuOTYwOSAyMy43ODkxIDM0LjQxODcgMjMuODYxNEMzNC42ODggMjMuMjAzMyAzNC44ODQ3IDIyLjUyMzQgMzUuMDExMiAyMS44MzU0QzM1LjAxMzUgMjEuODIzOSAzNS4wMTQ3IDIxLjgxMjQgMzUuMDE3IDIxLjgwMDlDMzQuMzYyNSAyMS42ODE1IDMzLjY5MDQgMjEuNjIwNiAzMy4wMTAyIDIxLjYyMDZDMjUuOTEwMSAyMS42MjA2IDI2LjI3ODkgMjYuMzI0IDIxLjU3NjcgMjYuMzI0SDE5LjgyNTFDMTYuNTk4MyAyNi4zMjQgMTQuNDc2NiAyNC4wNjI0IDE0LjQ3NjYgMjEuMTY4MVYxOC44MTU4QzE0LjQ3NjYgMTUuOTIxNCAxNi41OTcxIDEzLjY1OTkgMTkuODI1MSAxMy42NTk5SDIxLjU3NjdDMjYuMjc4OSAxMy42NTk5IDI1LjkxMDEgMTguMzYzMyAzMy4wMTAyIDE4LjM2MzNDMzMuNjkwNCAxOC4zNjMzIDM0LjM2MjUgMTguMzAyNCAzNS4wMTcgMTguMTgyOUMzNS4wMTQ3IDE4LjE3MTUgMzUuMDEzNSAxOC4xNjExIDM1LjAxMTIgMTguMTQ5NkMzNC44ODU5IDE3LjQ2MTYgMzQuNjg4IDE2Ljc4MTcgMzQuNDE4NyAxNi4xMjI0WiIgZmlsbD0iIzBBRThGMCIvPgo8cGF0aCBkPSJNMzQuNDE4NyAxNi4xMjI0QzMzLjk2MDkgMTYuMTk0OCAzMy40OTE0IDE2LjIzMjcgMzMuMDEwMiAxNi4yMzI3QzI5LjkyMDMgMTYuMjMyNyAyOC43NiAxNS4yMjQyIDI3LjQxNyAxNC4wNTYxQzI2LjEyMiAxMi45MzA1IDI0LjUxMDkgMTEuNTI5MyAyMS41NzY3IDExLjUyOTNIMTkuODI1MUMxNy43MDQ3IDExLjUyOTMgMTUuNzc2MyAxMi4yODM5IDE0LjM5NTkgMTMuNjU1M0MxMy4wNDgyIDE0Ljk5NDUgMTIuMzA0NyAxNi44MjY1IDEyLjMwNDcgMTguODE1OFYyMS4xNjgxQzEyLjMwNDcgMjMuMTU3NCAxMy4wNDcgMjQuOTkwNSAxNC4zOTU5IDI2LjMyODZDMTUuNzc2MyAyNy42OTk5IDE3LjcwNDcgMjguNDU0NiAxOS44MjUxIDI4LjQ1NDZIMjEuNTc2N0MyNC41MTA5IDI4LjQ1NDYgMjYuMTIyIDI3LjA1MzMgMjcuNDE3IDI1LjkyNzdDMjguNzYgMjQuNzU5NiAyOS45MjAzIDIzLjc1MTIgMzMuMDEwMiAyMy43NTEyQzMzLjQ5MDIgMjMuNzUxMiAzMy45NjA5IDIzLjc4OTEgMzQuNDE4NyAyMy44NjE0QzM0LjY4OCAyMy4yMDMzIDM0Ljg4NDcgMjIuNTIzNCAzNS4wMTEyIDIxLjgzNTRDMzUuMDEzNSAyMS44MjM5IDM1LjAxNDcgMjEuODEyNCAzNS4wMTcgMjEuODAwOUMzNC4zNjI1IDIxLjY4MTUgMzMuNjkwNCAyMS42MjA2IDMzLjAxMDIgMjEuNjIwNkMyNS45MTAxIDIxLjYyMDYgMjYuMjc4OSAyNi4zMjQgMjEuNTc2NyAyNi4zMjRIMTkuODI1MUMxNi41OTgzIDI2LjMyNCAxNC40NzY2IDI0LjA2MjQgMTQuNDc2NiAyMS4xNjgxVjE4LjgxNThDMTQuNDc2NiAxNS45MjE0IDE2LjU5NzEgMTMuNjU5OSAxOS44MjUxIDEzLjY1OTlIMjEuNTc2N0MyNi4yNzg5IDEzLjY1OTkgMjUuOTEwMSAxOC4zNjMzIDMzLjAxMDIgMTguMzYzM0MzMy42OTA0IDE4LjM2MzMgMzQuMzYyNSAxOC4zMDI0IDM1LjAxNyAxOC4xODI5QzM1LjAxNDcgMTguMTcxNSAzNS4wMTM1IDE4LjE2MTEgMzUuMDExMiAxOC4xNDk2QzM0Ljg4NTkgMTcuNDYxNiAzNC42ODggMTYuNzgxNyAzNC40MTg3IDE2LjEyMjRaIiBmaWxsPSIjMEFFOEYwIi8+Cjwvc3ZnPgo="
              h={"40px"}
              w={"40px"}
              alt="logo"
            />
          </Link>
        </Box>
        <Spacer />
        <HStack
          display={{ base: "none", lg: "flex" }}
          justifyContent="center"
          spacing={10}
          w={{ md: "85%", lg: "84%" }}
        >
          <Link to="/individuals">
            <Text
              fontSize="1rem"
              fontWeight="700"
              _hover={{ color: "#006BFF" }}
            >
              Individuals
            </Text>
          </Link>

          <Link to="/pricing">
            <Text
              fontSize="1rem"
              fontWeight="700"
              _hover={{ color: "#006BFF" }}
            >
              Pricing
            </Text>
          </Link>
          <Link to="/resources">
            <Text>
              <Resources />
              {/* <ChevronDownIcon display={{ base: "none", lg: "inline" }} /> */}
            </Text>
          </Link>
        </HStack>
        <Spacer />
        <Box>
          <Button
            onClick={onOpen}
            colorScheme={"messenger"}
            variant="solid"
            w="131px"
            height="51px"
            borderRadius="39px"
          >
            My Account
          </Button>
        </Box>
        <Box
          ref={btnRef}
          fontSize={"2rem"}
          display={{ base: "block", lg: "none" }}
          ml={"10px"}
        >
          <BiMenu onClick={() => setOpend(true)} />
        </Box>
      </Flex>
    </>
  );
};

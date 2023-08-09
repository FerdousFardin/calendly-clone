import React, {useState } from "react";
import { Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import {HStack, VStack, Button, Box, Image } from "@chakra-ui/react";
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
import SignupBox from "../Auth/SignupBox";
import Resources from "../Resources/Resources";
export const Navbar = ({handleLog}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [opend, setOpend] = useState(false);
  const [goingUp, setGoingUp] = useState(false);
  const handleScroll = () => {
    if (window.scrollY >= 104) {
      setGoingUp(true);
      console.log(goingUp);
    } else {
      setGoingUp(false);
    }
  };
  const loginWithGoogle = () => {
    console.log("login");
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
       handleLog();
       navigate('/userevent/userhome');
      })
      .catch((err) => {
        console.log(err);
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
            <VStack fontWeight={"bold"} align={'left'} >
              <Link to='/individuals'> <Text cursor={'pointer'} pl={'18px'}>Individuals</Text></Link>
              <Divider />

              <Divider />
              <Link to='/pricing'> <Text cursor={'pointer'} pl={'18px'}>Pricing</Text></Link>
              <Accordion allowToggle width={"100%"} bg={'white'}  outline={'none'}>
                <AccordionItem>
                    <AccordionButton>
                    <Box flex='1' textAlign='left' fontWeight={'bold'} pl={'auto'}>
                        <Text>More</Text>
                         </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  <AccordionPanel pb={4} align={'center'}>
              <Link to='/about'> <Text cursor={'pointer'} pl={'18px'}>About</Text></Link>
                    <br />
              <Link to='/customer'> <Text cursor={'pointer'} pl={'18px'}>Customer</Text></Link>
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
          <ModalHeader textAlign={"center"}>Get started today</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <SignupBox loginWithGoogle={loginWithGoogle} log={"Sign up"} />
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
          <Link to='/'>
          <Image
            src="data:image/png;base64,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"
            h="60px"
            w="auto"
            alt=""
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
          <Link to='/individuals'>
          <Text fontSize="1rem" fontWeight="700" _hover={{ color: "#006BFF" }}>
            Individuals
          </Text>
          </Link>

          <Link to='/enterprise'>
          <Text fontSize="1rem" fontWeight="700" _hover={{ color: "#006BFF" }}>
            Pricing
          </Text>
          </Link>

          <Link to='/resources'>
          <Text >
            <Resources/>
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
          fontSize={"2rem"}
          display={{ base: "block", lg: "none" }}
          ml={"10px"}
        >
          <BiMenu ref={btnRef} onClick={() => setOpend(true)} />
        </Box>
      </Flex>
    </>
  );
};

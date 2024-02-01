import React, { useRef, useState } from "react";
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  Divider,
  Text,
  Radio,
  RadioGroup,
  FormLabel,
  Box,
  AbsoluteCenter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
export default function RegisterBox({
  loginWithGoogle,
  type,
  setRegister,
  onClose,
  handleLog,
  postPHEvent,
}) {
  const [error, setError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [gender, setGender] = useState("male");
  const [role, setRole] = useState("Teacher");
  const [selectedRole, setSelectedRole] = useState(false);

  const { isOpen, onOpen, onClose: roleClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();

  const postUserAdd = async (user) => {
    const req = await fetch(`${import.meta.env.VITE_APP_API}/user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await req.json();
    return data;
  };
  const handleRegister = (e) => {
    setRegisterLoading(true);
    e && e.preventDefault();
    if (e) {
      const form = e.target;
      const email = form.email.value;
      const name = form.userName.value;
      const password = form.password.value;
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          setError("");
          onClose();
          updateProfile(res.user, {
            displayName: name,
            photoURL:
              gender === "male"
                ? "https://i.postimg.cc/cJ70796c/male.png"
                : "https://i.postimg.cc/50wYCSMc/female.png",
          })
            .then(async () => {
              const resPH = await postPHEvent();
              const addUserDB = await postUserAdd({
                email: email,
                password: password,
                role,
              });
              if (resPH.acknowledged && addUserDB.acknowledged) {
                handleLog(true);
                navigate("/userevent/userhome/eventtype");
              }

              return;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          setTimeout(() => {
            setError(err.code);
            form.email.style.borderColor = "red";
            form.email.style.backgroundColor = "#fabec6";
            form.email.focus();
          }, 1000);
          console.error(err.message);
        })
        .finally(
          setTimeout(() => {
            setRegisterLoading(false);
          }, 1000)
        );
    }
    return;
  };
  return (
    <Flex align={"center"} mb={12} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={1}
      >
        <form id="sign-in-form" onSubmit={(e) => handleRegister(e)}>
          <FormControl>
            <Stack spacing={6}>
              <div>
                <FormLabel>User Name</FormLabel>
                <Input
                  name="userName"
                  placeholder="Your name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  required
                />
              </div>
              <div>
                <FormLabel>User Email</FormLabel>
                <Input
                  name="email"
                  placeholder="abc@gmail.com"
                  _invalid={{ borderColor: "red.500", bgColor: "red.50" }}
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                  required
                />
              </div>
              <div>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  placeholder="Your Password"
                  _placeholder={{ color: "gray.500" }}
                  type="password"
                  minLength={6}
                  required
                />
              </div>
              <div>
                <FormLabel>Select Gender</FormLabel>
                <RadioGroup
                  onChange={(value) => setGender(value)}
                  value={gender}
                >
                  <Stack direction="row">
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                  </Stack>
                </RadioGroup>
              </div>
              <div>
                <FormLabel>Select Role</FormLabel>
                <RadioGroup onChange={(value) => setRole(value)} value={role}>
                  <Stack direction="row">
                    <Radio value="Teacher">Teacher</Radio>
                    <Radio value="Student">Student</Radio>
                  </Stack>
                </RadioGroup>
              </div>
              {error.length > 0 && (
                <Text color={"red.400"} w={"2xl"}>
                  Error: {error}
                </Text>
              )}
              <Button
                type="submit"
                isLoading={registerLoading}
                loadingText="Registering..."
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Register
              </Button>
            </Stack>
          </FormControl>
        </form>

        <Box position="relative" padding="2">
          <Divider />
          <AbsoluteCenter bg="white" px="2" color="gray.500" fontSize="sm">
            Already have an account?
          </AbsoluteCenter>
        </Box>
        <Stack spacing={6}>
          <Button
            onClick={() => setRegister(false)}
            bg={"green.400"}
            color={"white"}
            _hover={{
              bg: "green.500",
            }}
          >
            Login
          </Button>
          <Box position="relative" padding="2">
            <Divider />
            <AbsoluteCenter bg="white" px="2" color="gray.500" fontSize="sm">
              OR
            </AbsoluteCenter>
          </Box>
          <Button
            onClick={onOpen}
            bg={"white"}
            variant={"outline"}
            colorScheme="blue.900"
            color={"blue.900"}
            leftIcon={<FcGoogle />}
            _hover={{
              color: "blue.400",
            }}
          >
            {type} with Google
          </Button>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={() => {
              roleClose();
              setSelectedRole(false);
              setRole("");
            }}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>Role Selection</AlertDialogHeader>
              <AlertDialogCloseButton
                onClick={() => {
                  roleClose();
                  setSelectedRole(false);
                  setRole("");
                }}
              />
              <AlertDialogBody>
                Please select your role before signing in
                <RadioGroup
                  onChange={(value) => {
                    setRole(value);
                    setSelectedRole(true);
                  }}
                  value={role}
                  mt={5}
                >
                  <Stack direction="row">
                    <Radio fontWeight="bold" value="Teacher">
                      Teacher
                    </Radio>
                    <Radio fontWeight="bold" value="Student">
                      Student
                    </Radio>
                  </Stack>
                </RadioGroup>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  ref={cancelRef}
                  onClick={() => {
                    roleClose();
                    setSelectedRole(false);
                    setRole("");
                  }}
                >
                  Close
                </Button>
                <Button
                  disabled={!selectedRole}
                  colorScheme="green"
                  onClick={() => {
                    loginWithGoogle(role);
                    roleClose();
                    setSelectedRole(false);
                    setRole("");
                  }}
                  ml={3}
                >
                  Done
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Stack>
      </Stack>
    </Flex>
  );
}

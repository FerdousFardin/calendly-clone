import React, { useState } from "react";
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

  const navigate = useNavigate();
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
          //   console.log(res.user);
          onClose();
          updateProfile(res.user, {
            displayName: name,
            photoURL:
              gender === "male"
                ? "https://i.postimg.cc/cJ70796c/male.png"
                : "https://i.postimg.cc/50wYCSMc/female.png",
          })
            .then(async () => {
              // Profile updated!
              // ...
              const resPH = await postPHEvent();
              if (resPH.acknowledged) {
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
                <FormLabel>Select gender</FormLabel>
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
            onClick={() => loginWithGoogle()}
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
        </Stack>
      </Stack>
    </Flex>
  );
}

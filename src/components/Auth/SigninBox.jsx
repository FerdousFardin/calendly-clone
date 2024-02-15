import React, { useRef, useState } from "react";
import AsyncLocalStorage from "@createnextapp/async-local-storage";
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  Divider,
  Text,
  Box,
  AbsoluteCenter,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  RadioGroup,
  Radio,
  FormLabel,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
export default function SigninBox({
  loginWithGoogle,
  type,
  setRegister,
  onClose,
  handleLog,
  error: googleError,
}) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(false);
  const [role, setRole] = useState("Teacher");
  const { isOpen, onOpen, onClose: roleClose } = useDisclosure();
  const cancelRef = useRef();

  const getUser = async (email, role) => {
    const query = await fetch(
      import.meta.env.VITE_APP_API + "/user" + `?email=${email}&role=${role}`
    );
    const res = await query.json();
    return res;
  };
  const handleLogin = (e) => {
    setLoginLoading(true);
    e && e.preventDefault();
    if (e) {
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      signInWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          setError("");

          const findUser = await getUser(email, role);

          if (findUser && findUser.result) {
            await AsyncLocalStorage.setItem("Role", role);
            onClose();
            handleLog(true);
            navigate("/userevent/userhome/eventtype");
          }
          setError("Wrong Role!");
        })
        .catch((err) => {
          setTimeout(() => {
            setError(err.code);
            form.email.focus();
          }, 1000);
          console.error(err.message);
        })
        .finally(
          setTimeout(() => {
            setLoginLoading(false);
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
        <form id="sign-in-form" onSubmit={(e) => handleLogin(e)}>
          <FormControl>
            <Stack spacing={6}>
              <Input
                required
                name="email"
                placeholder="abc@gmail.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
              <Input
                required
                name="password"
                placeholder="Your Password"
                _placeholder={{ color: "gray.500" }}
                type="password"
              />
              <div>
                <FormLabel>Select Role</FormLabel>
                <RadioGroup
                  required={true}
                  onChange={(value) => setRole(value)}
                  value={role}
                >
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
              {googleError.length > 0 && (
                <Text color={"red.400"} w={"2xl"}>
                  Error: {googleError}
                </Text>
              )}
              <Button
                type="submit"
                isLoading={loginLoading}
                loadingText="Logging in..."
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Log In
              </Button>
            </Stack>
          </FormControl>
        </form>

        <Box position="relative" padding="2">
          <Divider />
          <AbsoluteCenter bg="white" px="2" color="gray.500" fontSize="sm">
            Don't have an account?
          </AbsoluteCenter>
        </Box>
        <Stack spacing={6}>
          <Button
            onClick={() => setRegister(true)}
            bg={"green.400"}
            color={"white"}
            _hover={{
              bg: "green.500",
            }}
          >
            Register
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
        </Stack>
      </Stack>
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
    </Flex>
  );
}

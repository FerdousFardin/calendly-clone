import React from "react";
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
export default function SignupBox({
  login,
  loginLoading,
  loginError,
  loginWithGoogle,
  log,
}) {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    login(email, password);
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
        <form onSubmit={handleLogin}>
          <FormControl id="form">
            <Stack spacing={6}>
              <Input
                name="email"
                placeholder="abc@gmail.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
              <Input
                name="password"
                placeholder="Your Password"
                _placeholder={{ color: "gray.500" }}
                type="password"
              />
              <Input
                type="submit"
                isLoading={loginLoading}
                loadingText="Logging in..."
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                value="Log In"
              />
            </Stack>
          </FormControl>
        </form>

        <Divider />
        <Stack spacing={6}>
          <Button
            onClick={() => navigate("signup")}
            bg={"green.400"}
            color={"white"}
            _hover={{
              bg: "green.500",
            }}
          >
            Register
          </Button>
          <Divider />
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
            {log} with Google
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

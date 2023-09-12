import { signIn, signOut, useSession } from "next-auth/react";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import { api } from "~/utils/api";
import React, { useState } from "react";
import { Alert } from "~/Components/alert";

interface formData {
  username: string;
  password: string;
}

export default function Home() {
  const { toggleColorMode } = useColorMode();
  const formBackgroundColor = useColorModeValue("gray.100", "gray.700");
  const [formData, setFormData] = useState<formData>({
    username: "",
    password: "",
  });
  const {
    mutate,
    isError,
    isSuccess = false,
    isLoading,
    error,
    data,
    // failureCount,
  } = api.main
    .login
    .useMutation();
  console.log("is success: ", isSuccess, "isLoading: ", isLoading);
  const handlePasswordChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData({ ...formData, password: event.target.value });
  };
  const handleEmailChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData({ ...formData, username: event.target.value });
  };
  const handleLogin = async () => {
    mutate(formData);
    console.log("is success: ", isSuccess);
    console.log("data is: ", data);
  };

  return (
    <>
      <Alert
        {...{
          isError,
          isLoading,
          isSuccess,
          error,
          data,
          isFetching: false,
          message: "Fechted the data successfully",
        }}
      />
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex
          direction={"column"}
          background={formBackgroundColor}
          p={12}
          rounded={6}
        >
          <Heading mb={6}>Log In</Heading>
          <Input
            placeholder="email"
            name="username"
            variant="filled"
            type="email"
            onChange={handleEmailChange}
          />
          <Input
            placeholder="******"
            name="password"
            variant="filled"
            mt={3}
            type="password"
            onChange={handlePasswordChange}
          />
          <Button
            mb={6}
            mt={6}
            onClick={handleLogin}
            isDisabled={isLoading}
            colorScheme="teal"
          >
            Submit
          </Button>
          <AuthShowcase />
        </Flex>
      </Flex>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span>- {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}

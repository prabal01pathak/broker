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

export default function Home() {
  const { toggleColorMode } = useColorMode();
  const formBackgroundColor = useColorModeValue("gray.100", "gray.700");
  const { data, isError, isFetching, isLoading, isFetched, error } = api.example
    .hello.useQuery({ text: "from tRPC", id: 1 });
  console.log(
    "data is: ",
    data,
    "isError: ",
    isError,
    "isFetched: ",
    isFetched,
    "isFetching: ",
    isFetching,
    "error: ",
    error,
    "isLoading",
    isLoading,
  );
  // const allUsers = api.example.getAll.useQuery();
  // console.log("allusers are: ", allUsers);
  //
  //
  const handleLogin = () => {
  };

  return (
    <>
      <IconButton
        isRound={false}
        variant="solid"
        // colorScheme="blue"
        aria-label="done"
        position={"absolute"}
        fontSize="10px"
        // icon={<CheckboxIcon />}
        onClick={toggleColorMode}
      />
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex
          direction={"column"}
          background={formBackgroundColor}
          p={12}
          rounded={6}
        >
          <Heading mb={6}>Log In</Heading>
          <Input placeholder="email" variant="filled" type="email" />
          <Input placeholder="******" variant="filled" mt={3} type="password" />
          <Button mb={6} mt={6} colorScheme="teal">Submit</Button>
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

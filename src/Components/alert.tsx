import React from "react";
import { CircularProgress, useToast } from "@chakra-ui/react";
import "~/styles/globals.css";

interface AlertProps {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  message: string;
}

export const Alert: React.FC<AlertProps> = (props) => {
  const toast = useToast();
  const variants = ["solid", "subtle", "left-accent", "top-accent"];
  const ids = {
    isError: "isError",
    isSuccess: "isSuccess",
    isLoading: "isLoading",
  };
  return (
    <>
      {(props.isLoading || props.isFetching)
        ? (
          <>
            <CircularProgress
              isIndeterminate
              position="absolute"
              className="top-[48%] left-[48%]"
              // className="absolute top+500 left-500"
              color="gray.700"
            />
          </>
        )
        : (props.isSuccess && !toast.isActive(ids.isSuccess))
        ? toast({
          id: ids.isSuccess,
          title: `${variants[0]} Success`,
          variant: variants[0],
          isClosable: true,
          duration: 2000,
          status: "success",
        })
        : (props.isError && !toast.isActive(ids.isError)) &&
          toast({
            id: ids.isError,
            title: `${variants[0]} Error`,
            variant: variants[0],
            isClosable: true,
            duration: 2000,
            status: "error",
          })}
    </>
  );
};

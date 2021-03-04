import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import {
  Center,
  Box,
  Divider,
  Button,
  Icon,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { API_URL } from "../../../Constants";
import axios from "axios";

function SignUp() {
  const [userAlreadyExistsError, setUserAlreadyExistsError] = useState(false);
  const toast = useToast();
  useEffect(() => {
    // effect
    return () => {
      // cleanup
    };
  }, []);
  const responseGoogle = (response) => {
    console.log(response);
    axios
      .post(API_URL + "/api/signup-with-google", {
        token: response.tokenId,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(
            error.response.status === 409 &&
              error.response.data === "User already exists"
          );
          if (
            error.response.status === 409 &&
            error.response.data === "User already exists"
          ) {
            setUserAlreadyExistsError(true);
          } else {
            toast({
              title: "An error occurred.",
              description: "Please try again!",
              status: "error",
              position: "bottom-left",
              duration: 3000,
              isClosable: true,
            });
          }
        }
      );
  };
  return (
    <Box className="login">
      <Center>
        <h1>Sign Up</h1>
      </Center>
      <Divider />
      <Center>
        <GoogleLogin
          className="google-login-button"
          clientId="973934553610-iph5uagr02rc6rgkcee7jloq3q7qpdpa.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <Button
              colorScheme="blue"
              variant="outline"
              leftIcon={<Icon as={FcGoogle} />}
              className="google-login-button"
              onClick={renderProps.onClick}
            >
              SignUp with Google
            </Button>
          )}
        />
      </Center>
      {userAlreadyExistsError && (
        <Alert status="warning" alignItems="center">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>You Already have an account</AlertTitle>
            <AlertDescription display="block">
              Please use Login.
            </AlertDescription>
          </Box>
        </Alert>
      )}
    </Box>
  );
}

export default SignUp;

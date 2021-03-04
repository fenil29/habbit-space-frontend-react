import React, { useEffect, useState } from "react";
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
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { API_URL } from "../../../Constants";
import axios from "axios";
import "./Login.scss";

function Login() {
  const [noAccountFoundError, setNoAccountFoundError] = useState(false);
  const toast = useToast();
  useEffect(() => {
    // effect
    return () => {
      // cleanup
    };
  }, []);

  const responseGoogle = (response) => {
    // console.log(response);
    axios
      .post(API_URL + "/api/login-with-google", {
        token: response.tokenId,
      })
      .then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(
            error.response.status === 404 &&
              error.response.data === "User not found"
          );
          if (
            error.response.status === 404 &&
            error.response.data === "User not found"
          ) {
            setNoAccountFoundError(true);
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
        <h1>Log In</h1>
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
              Login with Google
            </Button>
          )}
        />
      </Center>
      {noAccountFoundError && (
        <Alert status="warning" alignItems="center">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Could not find your Account.</AlertTitle>
            <AlertDescription display="block">
              If you are new, Please consider Sign Up.
            </AlertDescription>
          </Box>
        </Alert>
      )}
    </Box>
  );
}

export default Login;

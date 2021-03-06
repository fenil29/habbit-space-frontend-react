import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
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
  Spinner,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { API_URL, GOOGLE_AUTH_CLIENT_ID } from "../../../Constants";
import { GlobalContext } from "../../../context/GlobalState";

import axios from "axios";

function SignUp() {
  let history = useHistory();
  const contextData = useContext(GlobalContext);
  const [userAlreadyExistsError, setUserAlreadyExistsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  useEffect(() => {
    // effect
    return () => {
      // cleanup
    };
  }, []);
  const responseGoogle = (response) => {
    console.log(response);
    setLoading(true);

    axios
      .post(API_URL + "/api/signup-with-google", {
        token: response.tokenId,
      })
      .then(
        (response) => {
          setLoading(false);

          console.log(response.data);
          response.data.isLoggedIn = true;
          contextData.setLoginData(response.data);
          history.push("/app");
        },
        (error) => {
          setLoading(false);

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
          clientId={GOOGLE_AUTH_CLIENT_ID}
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
              {loading && <Spinner size="sm" ml={3} />}
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

import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import {
  Center,
  Box,
  Divider,
  Button,
  Icon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

import { API_URL, GOOGLE_AUTH_CLIENT_ID } from "../../../Constants";
import { GlobalContext } from "../../../context/GlobalState";
import HomeNavBar from "../navbar-home/HomeNavBar";


function SignUp() {
  let history = useHistory();
  const contextStore = useContext(GlobalContext);
  const [userAlreadyExistsError, setUserAlreadyExistsError] = useState(false);
  const [loading, setLoading] = useState(false);

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
          if (response.status === 200 || response.status === 201) {
            console.log(response.data);
            response.data.isLoggedIn = true;
            contextStore.setLoginData(response.data);
            history.push("/app");
          } else {
            contextStore.showUnexpectedError();
          }
        },
        (error) => {
          setLoading(false);

          console.log(
            error.response &&
              error.response.status === 409 &&
              error.response.data === "User already exists"
          );
          if (
            error.response &&
            error.response.status === 409 &&
            error.response.data === "User already exists"
          ) {
            setUserAlreadyExistsError(true);
          } else {
            contextStore.showUnexpectedError();
          }
        }
      );
  };
  return (
    <>
      <HomeNavBar />
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
    </>
  );
}

export default SignUp;

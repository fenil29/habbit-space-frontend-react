import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
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
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { API_URL, GOOGLE_AUTH_CLIENT_ID } from "../../../Constants";
import { GlobalContext } from "../../../context/GlobalState";
import axios from "axios";

import "./Login.scss";

function Login() {
  let history = useHistory();
  const contextStore = useContext(GlobalContext);

  const [noAccountFoundError, setNoAccountFoundError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // effect
    return () => {
      // cleanup
    };
  }, []);

  const responseGoogle = (response) => {
    // console.log(response);
    setLoading(true);
    axios
      .post(API_URL + "/api/login-with-google", {
        token: response.tokenId,
      })
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        response.data.isLoggedIn = true;
        contextStore.setLoginData(response.data);
        history.push("/app");
      })
      .catch((error) => {
        setLoading(false);

        console.log(error.response &&
          error.response.status === 404 &&
            error.response.data === "User not found"
        );
        if (error.response &&
          error.response.status === 404 &&
          error.response.data === "User not found"
        ) {
          setNoAccountFoundError(true);
        } else {
          contextStore.showUnexpectedError();
        }
      });
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
              Login with Google
              {loading && <Spinner size="sm" ml={3} />}
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

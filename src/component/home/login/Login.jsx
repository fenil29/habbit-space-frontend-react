import React from "react";
import {  Center, Box,Divider  } from "@chakra-ui/react";
import "./Login.scss";
import { GoogleLogin } from "react-google-login";

const responseGoogle = (response) => {
  console.log(response);
};
function Login() {
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
          buttonText="Login With Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </Center>
    </Box>
  );
}

export default Login;

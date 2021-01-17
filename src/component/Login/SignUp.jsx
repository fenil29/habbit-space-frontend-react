
import React from "react";
import { Container, Center, Box,Divider } from "@chakra-ui/react";
import { GoogleLogin } from "react-google-login";

const responseGoogle = (response) => {
  console.log(response);
};
function SignUp() {
  return (
    <Box className="login">
      <Center>
        <h1>Sign Up</h1>
      </Center>
      <Divider/>
      <Center>
        <GoogleLogin
          className="google-login-button"
          clientId="973934553610-iph5uagr02rc6rgkcee7jloq3q7qpdpa.apps.googleusercontent.com"
          buttonText="SignUp With Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </Center>
    </Box>
  );
}

export default SignUp;

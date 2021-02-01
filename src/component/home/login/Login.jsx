import React from "react";
import { Center, Box, Divider,Button,Icon } from "@chakra-ui/react";
import "./Login.scss";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc"

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
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <Button colorScheme="blue" variant="outline" 
            leftIcon={<Icon as={FcGoogle} />}
            className="google-login-button"
             onClick={renderProps.onClick}>
              Login with Google
            </Button>
          )}
        />
      </Center>
    </Box>
  );
}

export default Login;

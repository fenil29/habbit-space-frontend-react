import React from "react";
import { Container, Center } from "@chakra-ui/react";
import "./Login.scss";
import { GoogleLogin } from "react-google-login";

const responseGoogle = (response) => {
  console.log(response);
};
function Login() {
  return (
    <div className="login">
      <Center>
        <h1>Log In</h1>
      </Center>
      <GoogleLogin
        clientId="973934553610-iph5uagr02rc6rgkcee7jloq3q7qpdpa.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default Login;

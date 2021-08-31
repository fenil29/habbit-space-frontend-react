import React, { createContext, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../Constants";


export const GlobalContext = createContext();

function GlobalState(props) {
  const toast = useToast();

  const [loginData, setLoginData] = useState({ isLoggedIn: false });
  const [isLoaded, setIsLoaded] = useState(false);

  let setLoginDataL = (data) => {
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };
  let loadData = () => {
    if (!isLoaded) {
      let loginDataLocal = JSON.parse(localStorage.getItem("loginData"));
      if (!(loginDataLocal === null)) {
        setLoginData(loginDataLocal);
      }
      setIsLoaded(true);
    }
  };
  let clearLoginDataAndRedirectToLogin = () => {
    setLoginDataL({ isLoggedIn: false });
    toast({
      title: "Session Has Expired",
      description: "Please Login again!",
      status: "warning",
      position: "bottom-left",
      duration: 3000,
      isClosable: true,
    });
  };

  let showUnexpectedError = () => {
    toast({
      title: "An unexpected error occurred.",
      description: "Please try again!",
      status: "error",
      position: "bottom-left",
      duration: 3000,
      isClosable: true,
    });
  };
  let Logout = () => {
    axios
      .post(API_URL + "/api/logout",)
      .then((response) => {
        // console.log(response.status)
        if(response.status===200){
        setLoginDataL({ isLoggedIn: false });
        toast({
          title: "Logout Successful",
          description: "you have successfully logged out.",
          status: "success",
          position: "bottom-left",
          duration: 3000,
          isClosable: true,
        });
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data === "Unauthorized"
        ) {
          clearLoginDataAndRedirectToLogin();
        } else {
          showUnexpectedError();
        }
      });


  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <GlobalContext.Provider
        value={{
          loginData,
          isLoaded,
          Logout,
          setLoginData: setLoginDataL,
          clearLoginDataAndRedirectToLogin,
          showUnexpectedError,
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    </div>
  );
}

export default GlobalState;

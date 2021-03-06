import React, { createContext, useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useToast ,Box} from "@chakra-ui/react";

export const GlobalContext = createContext();

function GlobalState(props) {
  const toast = useToast();

  let history = useHistory();

  const [loginData, setLoginData] = useState({ isLoggedIn: false });
  let setLoginDataL = (data) => {
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };
  let loadData = () => {
    let loginDataLocal = JSON.parse(localStorage.getItem("loginData"));
    if (!(loginDataLocal === null)) {
      setLoginData(loginDataLocal);
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

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <GlobalContext.Provider
        value={{
          loginData,
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

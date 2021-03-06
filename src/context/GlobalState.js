import React, { createContext, useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

export const GlobalContext = createContext();

function GlobalState(props) {
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
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    </div>
  );
}

export default GlobalState;

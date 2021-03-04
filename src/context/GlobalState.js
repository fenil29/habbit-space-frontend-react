import React, { createContext, useState, useEffect, useRef } from "react";

export const GlobalContext = createContext();

function GlobalState(props) {
  const [loginData, setLoginData] = useState({ isLoggedIn: false });
  let setLoginDataL = (data) => {
    data.isLoggedIn = true;
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };
  let loadData = () => {
    let loginDataLocal = JSON.parse(localStorage.getItem("loginData"));
    if (!(loginDataLocal === null)) {
      setLoginData(loginDataLocal);
    }
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
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    </div>
  );
}

export default GlobalState;

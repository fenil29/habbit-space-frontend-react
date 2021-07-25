import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";


const AppRoute = ({ component: Component, ...rest }) => {
  // console.log(window.location);
  const contextStore = useContext(GlobalContext);
  return (
    <Route
    {...rest}
    render={(props) => {
      if (!contextStore.loginData.isLoggedIn) {
        return (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        );
      } else {
        return <Component {...props} />;
      }
    }}
  />
  );
};
export default AppRoute;

import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";


const AppRoute = ({ component: Component, ...rest }) => {
  // console.log(window.location);
  const contextData = useContext(GlobalContext);
  // console.log("from business authintiacation", contextData);
  return (
    <Route
    {...rest}
    render={(props) => {
      if (!contextData.loginData.isLoggedIn) {
        return (
          <Redirect
            to={{
              pathname: "/",
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

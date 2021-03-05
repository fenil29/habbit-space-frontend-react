import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";

const DefaultRoute = ({ component: Component, ...rest }) => {
  const contextData = useContext(GlobalContext);
  console.log("from default authintiacation",contextData)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (contextData.loginData.isLoggedIn) {
          return (
            <Redirect
              to={{
                pathname: "/app",
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
export default DefaultRoute;

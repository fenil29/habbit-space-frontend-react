import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";

const DefaultRoute = ({ component: Component, ...rest }) => {
  const contextStore = useContext(GlobalContext);
  console.log("from default authintiacation",contextStore)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (contextStore.loginData.isLoggedIn) {
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

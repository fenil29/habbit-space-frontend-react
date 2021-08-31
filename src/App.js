import React, { useContext } from "react";

import { Switch } from "react-router-dom";
import Home from "./component/home/Home";
import "./App.scss";
import Login from "./component/home/login/Login";
import SignUp from "./component/home/login/SignUp";
import AppHome from "./component/app/AppHome";
import DefaultRoute from "./authentication/DefaultRoute";
import AppRoute from "./authentication/AppRoute";

import { GlobalContext } from "./context/GlobalState";

import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const contextData = useContext(GlobalContext);

  return (
    <>
      {contextData.isLoaded ? (
        <Switch>
          <DefaultRoute path="/" exact component={Home} />
          <DefaultRoute exact path="/login" component={Login} />
          <DefaultRoute exact path="/signup" component={SignUp} />
          <AppRoute path="/app" component={AppHome} />
        </Switch>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;

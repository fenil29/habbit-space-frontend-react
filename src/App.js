import React, { useContext } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./component/home/Home";
import "./App.scss";
import HomeNavBar from "./component/home/navbar-home/HomeNavBar";
import Login from "./component/home/login/Login";
import SignUp from "./component/home/login/SignUp";
import AppNavBar from "./component/app/navbar-app/AppNavBar";
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
          <DefaultRoute
            path="/"
            exact
            component={() => (
              <>
                <HomeNavBar />
                <Home />
              </>
            )}
          />
          <DefaultRoute
            exact
            path="/login"
            component={() => (
              <>
                <HomeNavBar />
                <Login />
              </>
            )}
          />

          <DefaultRoute
            exact
            path="/signup"
            component={() => (
              <>
                <HomeNavBar />
                <SignUp />
              </>
            )}
          />

          <AppRoute
            path="/app"
            component={() => (
              <>
                <AppNavBar />
                <AppHome />
              </>
            )}
          />
        </Switch>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;

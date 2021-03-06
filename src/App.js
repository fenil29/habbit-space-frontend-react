import { Switch, Route } from "react-router-dom";
import Home from "./component/home/Home";
import "./App.scss";
import HomeNavBar from "./component/home/navbar-home/HomeNavBar";
import Login from "./component/home/login/Login";
import SignUp from "./component/home/login/SignUp";
import AppNavBar from "./component/app/navbar-app/AppNavBar";
import AppHome from "./component/app/AppHome";
import DefaultRoute from "./authentication/DefaultRoute";
import AppRoute from "./authentication/AppRoute";

import axios from "axios";
axios.defaults.withCredentials = true

function App() {
  return (
    <div>
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
          path="/login"
          component={() => (
            <>
              <HomeNavBar />
              <Login />
            </>
          )}
        />

        <DefaultRoute
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
    </div>
  );
}

export default App;

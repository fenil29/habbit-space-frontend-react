import React from "react";
import "./Home.scss";
import NavBar from "../navbar/NavBar";
import HomeContent from "./HomeContent";
import { Container, Center } from "@chakra-ui/react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "../Login/Login";
import SignUp from "../Login/SignUp";

function Home() {
  return (
    <div className="home">
      <NavBar />
        <Switch>
          <Route path="/" exact >
            <HomeContent />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
    </div>
  );
}

export default Home;

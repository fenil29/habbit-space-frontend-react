import React, { useEffect, useState } from "react";

import { Box, useDisclosure } from "@chakra-ui/react";
import "./AppHome.scss";

import AppNavBar from "./navbar-app/AppNavBar";
import SettingsHome from "./settings/SettingsHome";
import SettingsOption from "./settings/SettingsOption";
import HabitHome from "./habits/HabitHome";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function AppHome() {
  console.log("habitsDateInfo Rendering");

  return (
    <>
      <AppNavBar  />
      <div className="app-home">
        <Switch>
          <Route
            path="/app/settings/:setting_name"
            component={() => (
              <SettingsHome />
            )}
            exact
          />
          <Route path="/app">
            <HabitHome
            />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default AppHome;

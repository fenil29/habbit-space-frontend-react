import React from "react";
import "./AppHome.scss";

import AppNavBar from "./navbar-app/AppNavBar";
import SettingsHome from "./settings/SettingsHome";
import HabitHome from "./habits/HabitHome";

import { Switch, Route } from "react-router-dom";

function AppHome() {
  console.log("habitsDateInfo Rendering");

  return (
    <>
      <AppNavBar />
      <div className="app-home">
        <Switch>
          <Route
            path="/app/settings/:setting_name"
            component={() => <SettingsHome />}
            exact
          />
          <Route path="/app">
            <HabitHome />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default AppHome;

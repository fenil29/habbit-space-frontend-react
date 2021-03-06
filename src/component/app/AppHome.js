import React from "react";
import { Switch, Route } from "react-router-dom";

import { Box } from "@chakra-ui/react";
import "./AppHome.scss";

import AppOption from "./AppOption";
import HabitView from "./HabitView";
function AppHome() {
  return (
    <Box className="app-home" boxShadow="xl">
      <AppOption />
      <Switch>
        <Route path="/app/habit/:habit_id" exact component={() => <HabitView />} />
      </Switch>
    </Box>
  );
}

export default AppHome;

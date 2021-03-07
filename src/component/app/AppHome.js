import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import { Box } from "@chakra-ui/react";
import "./AppHome.scss";

import AppOption from "./AppOption";
import HabitView from "./HabitView";
let habitsDateInfo = {};
function AppHome() {
  console.log("habitsDateInfo Rendering");

  let addHabitsDateInfo = (habit_id, data) => {
    habitsDateInfo[habit_id] = data;
  };
  useEffect(() => {
    // effect
    // console.log("render AppHome");

    return () => {
      // cleanup
    };
  }, []);
  return (
    <Box className="app-home" boxShadow="xl">
      <AppOption />
      <Switch>
        <Route
          path="/app/habit/:habit_id"
          exact
          component={() => (
            <HabitView
              habitsDateInfo={habitsDateInfo}
              addHabitsDateInfo={addHabitsDateInfo}
            />
          )}
        />
      </Switch>
    </Box>
  );
}

export default AppHome;

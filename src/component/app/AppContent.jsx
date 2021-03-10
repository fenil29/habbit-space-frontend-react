import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import HabitView from "./HabitView";
import AllHabit from "./AllHabit";

import "./AppContent.scss"

let habitsDateInfo = {};

function AppContent(props) {
  let addHabitsDateInfo = (habit_id, data) => {
    habitsDateInfo[habit_id] = data;
  };
  return (
    <div className="app-content">
      <Switch>
        <Route
          path="/app/habit/:habit_id"
          exact
          component={() => (
            <HabitView
              onSideDrawerOpen={props.onSideDrawerOpen}
              habitsDateInfo={habitsDateInfo}
              addHabitsDateInfo={addHabitsDateInfo}
            />
          )}
        />
        <Route
          path="/app/all-habit"
          exact
          component={() => <AllHabit addHabitsDateInfo={addHabitsDateInfo} />}
        />
      </Switch>
    </div>
  );
}

export default AppContent;

import React, { useEffect, useState, useRef } from "react";
import { Switch, Route } from "react-router-dom";

import HabitView from "./HabitView";
import AllHabit from "./AllHabit";

import "./AppContent.scss";

import { io } from "socket.io-client";
import { API_URL } from "../../Constants";


let habitsDateInfo = {};

function AppContent(props) {
  const childRef = useRef();

  let addHabitsDateInfo = (habit_id, data) => {
    habitsDateInfo[habit_id] = data;
  };
  useEffect(() => {
    const socket = io(API_URL, {path: '/api/socket.io'});


    console.log("initialize socket");
    // effect
    socket.on("habit change", (data) => {
      console.log(data);

      childRef.current.changeCurrentStateFromSocket(data);
    });

    return () => {
      socket.off("habit change");
      // cleanup
    };
  }, []);
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
              ref={childRef}
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

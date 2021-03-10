import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import "./AppHome.scss";

import AppOption from "./AppOption";
import HabitView from "./HabitView";
import AllHabit from "./AllHabit";

let habitsDateInfo = {};
function AppHome() {
  console.log("habitsDateInfo Rendering");
  const {
    isOpen:isSideDrawerOpen,
    onOpen:onSideDrawerOpen,
    onClose:onSideDrawerClose,
  } = useDisclosure();

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
      <AppOption isSideDrawerOpen={isSideDrawerOpen}  onSideDrawerOpen={onSideDrawerOpen} onSideDrawerClose={onSideDrawerClose}/>
      {/* <Button colorScheme="teal" onClick={onOpen}>
        Open
      </Button> */}
      {/* <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Habit Tracker</DrawerHeader>

            <DrawerBody p={0}>
              <AppOption type="drawer" />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer> */}

      <Switch>
        <Route
          path="/app/habit/:habit_id"
          exact
          component={() => (
            <HabitView
            onSideDrawerOpen={onSideDrawerOpen}
              habitsDateInfo={habitsDateInfo}
              addHabitsDateInfo={addHabitsDateInfo}
            />
          )}
        />
        <Route
          path="/app/all-habit"
          exact
          component={() => (
            <AllHabit/>
          )}
        />
      </Switch>
    </Box>
  );
}

export default AppHome;

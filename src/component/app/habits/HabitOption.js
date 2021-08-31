import React from "react";
import { NavLink } from "react-router-dom";
import "./HabitOption.scss";
import {
  Box,
  Center,
  List,
  ListItem,
  Button,
  Stack,
  Skeleton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import AddHabitModel from "../models/AddHabitModel";


function HabitOption(props) {
  const OptionComponent = (localProps) => (
    <>
      <Box
        className={
          localProps.type === "drawer"
            ? "habit-option habit-option-drawer"
            : "habit-option habit-option-main"
        }
      >
        <Box className="title">
          <h2>Dashboard</h2>
        </Box>
        <List>
          <NavLink
            to="/app/all-habit"
            exact
            activeClassName="is-active-habit"
            onClick={() => {
              props.onSideDrawerClose();
            }}
          >
            <ListItem>All Habits</ListItem>
          </NavLink>
        </List>
        <br />

        <Box className="title">
          <h2>Habits</h2>
        </Box>
        <List>
          {props.getHabitListLoading ? (
            <Stack m={2}>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          ) : (
            <>
              {props.habitList.map((item) => (
                <NavLink
                  to={"/app/habit/" + item.habit_id}
                  key={item.habit_id}
                  activeClassName="is-active-habit"
                  onClick={() => {
                    props.onSideDrawerClose();
                  }}
                >
                  <ListItem>{item.habit_name}</ListItem>
                </NavLink>
              ))}
            </>
          )}
        </List>
        <Center className="add-habit-button-container">
          <Button
            // colorScheme="blue"
            customColor="blue"
            // variant="outline"
            size="sm"
            onClick={() => {
              props.onOpenAddHabitModel();
              props.onSideDrawerClose();
            }}
          >
            Add Habit
          </Button>
        </Center>
        {/* add habit model */}
        <AddHabitModel
          isOpen={props.isOpenAddHabitModel}
          onClose={props.onCloseAddHabitModel}
          onHabitsSuccessfulAdd={props.onHabitsSuccessfulAdd}
        />
      </Box>
    </>
  );
  const OptionComponentMain = () => (
    <>
      <OptionComponent type="main" />
    </>
  );
  // console.log("contextStore.isSideDrawerOpen",contextStore)
  const OptionComponentDrawer = () => (
    <>
      <Drawer
        isOpen={props.isSideDrawerOpen}
        onClose={props.onSideDrawerClose}
        placement="left"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Habit Tracker</DrawerHeader>
            <DrawerBody p={0}>
              <OptionComponent type="drawer" />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
  return (
    <>
      <OptionComponentDrawer /> <OptionComponentMain />
    </>
  );
}

export default HabitOption;

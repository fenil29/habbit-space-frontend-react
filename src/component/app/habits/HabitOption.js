import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./HabitOption.scss";
import {
  Box,
  Center,
  List,
  ListItem,
  Button,
  useDisclosure,
  Stack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

import AddHabitModel from "./AddHabitModel";
import { API_URL } from "../../../Constants";
import { GlobalContext } from "../../../context/GlobalState";

import axios from "axios";

function HabitOption(props) {
  const contextStore = useContext(GlobalContext);
  const [habitList, setHabitList] = useState([]);
  const [getHabitListLoading, setGetHabitListLoading] = useState(false);
  const [addHabitLoading, setAddHabitLoading] = useState(false);

  const {
    isOpen: isOpenAddHabitModel,
    onOpen: onOpenAddHabitModel,
    onClose: onCloseAddHabitModel,
  } = useDisclosure();

  let getHabit = () => {
    setGetHabitListLoading(true);
    axios
      .get(API_URL + "/api/habit")
      .then((response) => {
        setGetHabitListLoading(false);
        // console.log(response.data);
        setHabitList(response.data);
      })
      .catch((error) => {
        setGetHabitListLoading(false);
        // console.log(error);
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data === "Unauthorized"
        ) {
          contextStore.clearLoginDataAndRedirectToLogin();
        } else {
          contextStore.showUnexpectedError();
        }
      });
  };
  let addHabit = (habitName) => {
    setAddHabitLoading(true);
    axios
      .post(API_URL + "/api/habit", {
        habit_name: habitName,
      })
      .then((response) => {
        setAddHabitLoading(false);
        onCloseAddHabitModel();
        // console.log(response);
        setHabitList(response.data);
      })
      .catch((error) => {
        setAddHabitLoading(false);
        // console.log(error);
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data === "Unauthorized"
        ) {
          contextStore.clearLoginDataAndRedirectToLogin();
        } else {
          contextStore.showUnexpectedError();
        }
      });
  };

  useEffect(() => {
    // effect
    getHabit();

    return () => {
      // cleanup
    };
  }, []);

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
        {/* <Divider /> */}
        <List>
          {/* <ListItem>
            <ListIcon as={CheckIcon} />
            Lorem ipsum dolor sit amet
          </ListItem> */}
          {getHabitListLoading ? (
            <Stack m={2}>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          ) : (
            <>
              {/* <NavLink
                to={"/app/habit/04a13a79-3109-4ed2-b11d-c3619dd8e2c6"}
                activeClassName="is-active-habit"
              >
                <ListItem>list</ListItem>
              </NavLink>
              <NavLink
                to={"/app/habit/b23332da-463e-404e-a49f-e4152c82e334"}
                activeClassName="is-active-habit"
              >
                <ListItem>list2</ListItem>
              </NavLink> */}
              {habitList.map((item) => (
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
              onOpenAddHabitModel();
              props.onSideDrawerClose();
            }}
          >
            Add Habit
          </Button>
        </Center>
        {/* add habit model */}
        <AddHabitModel
          isOpen={isOpenAddHabitModel}
          onClose={onCloseAddHabitModel}
          onAddHabit={addHabit}
          addHabitLoading={addHabitLoading}
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

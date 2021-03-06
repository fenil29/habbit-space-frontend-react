import React, { useEffect, useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./AppOption.scss";
import {
  Box,
  Center,
  List,
  ListItem,
  Button,
  useDisclosure,
  Stack
} from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

import AddHabitModel from "./AddHabitModel";
import { API_URL } from "../../Constants";
import { GlobalContext } from "../../context/GlobalState";

import axios from "axios";

function AppOption() {
  const contextStore = useContext(GlobalContext);
  const [habitList, setHabitList] = useState([]);
  const [getHabitLoading, setGetHabitLoading] = useState(false);
  const [addHabitLoading, setAddHabitLoading] = useState(false);

  const {
    isOpen: isOpenAddHabitModel,
    onOpen: onOpenAddHabitModel,
    onClose: onCloseAddHabitModel,
  } = useDisclosure();

  let getHabit = () => {
    setGetHabitLoading(true);
    axios
      .get(API_URL + "/api/habit")
      .then((response) => {
        setGetHabitLoading(false);
        console.log(response.data);
        setHabitList(response.data);
      })
      .catch((error) => {
        setGetHabitLoading(false);
        console.log(error);
        if (
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
        habitName: habitName,
      })
      .then((response) => {
        setAddHabitLoading(false);
        onCloseAddHabitModel();
        console.log(response);
        setHabitList(response.data);
      })
      .catch((error) => {
        setAddHabitLoading(false);
        console.log(error);
        if (
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
  return (
    <>
      <Box className="app-option">
        <Box className="title">
          <h2>All Habits</h2>
        </Box>
        <List>
          <ListItem>Today</ListItem>
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
          {getHabitLoading ? (
            <Stack m={2}>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          ) : (
            habitList.map((item) => (
              <NavLink
                to={"/app/habit/" + item.habit_id}
                key={item.habit_id}
                activeClassName="is-active-habit"
              >
                <ListItem>{item.name}</ListItem>
              </NavLink>
            ))
          )}
        </List>
        <Center className="add-habit-button-container">
          <Button
            // colorScheme="blue"
            customColor="blue"
            // variant="outline"
            size="sm"
            onClick={onOpenAddHabitModel}
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
}

export default AppOption;

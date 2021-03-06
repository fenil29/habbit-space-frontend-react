import React, { useEffect, useContext,useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./AppOption.scss";
import {
  Box,
  Center,
  List,
  ListItem,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import AddHabitModel from "./AddHabitModel";
import { API_URL } from "../../Constants";
import { GlobalContext } from "../../context/GlobalState";

import axios from "axios";

function AppOption() {
  const contextStore = useContext(GlobalContext);
  const [addHabitLoading, setAddHabitLoading] = useState(false)

  const {
    isOpen: isOpenAddHabitModel,
    onOpen: onOpenAddHabitModel,
    onClose: onCloseAddHabitModel,
  } = useDisclosure();

  let getHabit = () => {
    axios
      .get(API_URL + "/api/habit")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
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
    setAddHabitLoading(true)
    axios
      .post(API_URL + "/api/habit",{
        habitName:habitName
      })
      .then((response) => {
        setAddHabitLoading(false)
        onCloseAddHabitModel()
        console.log(response);
      })
      .catch((error) => {
        setAddHabitLoading(false)
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
          <ListItem>Reading</ListItem>
          <ListItem>Learn Code</ListItem>
          <ListItem>System Design</ListItem>
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

import React, { useEffect, useContext, useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import HabitContent from "../habits/HabitContent";

import { Link, useHistory } from "react-router-dom";
import HabitOption from "../habits/HabitOption";

import "./HabitHome.scss";

import axios from "axios";
import { API_URL } from "../../../Constants";
import { GlobalContext } from "../../../context/GlobalState";

function HabitHome() {
  const [habitList, setHabitList] = useState([]);
  const [getHabitListLoading, setGetHabitListLoading] = useState(false);

  let history = useHistory();
  const contextStore = useContext(GlobalContext);

  const {
    isOpen: isSideDrawerOpen,
    onOpen: onSideDrawerOpen,
    onClose: onSideDrawerClose,
  } = useDisclosure();

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
        setHabitList(response.data);
      })
      .catch((error) => {
        setGetHabitListLoading(false);
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

  let onHabitsSuccessfulAdd = (newHabit) => {
    onCloseAddHabitModel();

    setHabitList([...habitList, newHabit]);
    history.push("/app/habit/" + newHabit.habit_id);
  };
  useEffect(() => {
    // effect
    getHabit();

    return () => {
      // cleanup
    };
  }, []);
  return (
    <Box className="habit-home" boxShadow="xl">
      <HabitOption
        isSideDrawerOpen={isSideDrawerOpen}
        onSideDrawerOpen={onSideDrawerOpen}
        onSideDrawerClose={onSideDrawerClose}

        isOpenAddHabitModel={isOpenAddHabitModel}
        onOpenAddHabitModel={onOpenAddHabitModel}
        onCloseAddHabitModel={onCloseAddHabitModel}

        habitList={habitList}
        getHabitListLoading={getHabitListLoading}
        onHabitsSuccessfulAdd={onHabitsSuccessfulAdd}
      />
      <HabitContent
        onSideDrawerOpen={onSideDrawerOpen}

        onOpenAddHabitModel={onOpenAddHabitModel}
      />
    </Box>
  );
}

export default HabitHome;

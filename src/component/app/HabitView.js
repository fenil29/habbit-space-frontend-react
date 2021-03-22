import React, {
  useEffect,
  useState,
  useContext,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useParams } from "react-router-dom";

import { Box, Stack, Skeleton, Button } from "@chakra-ui/react";
import "./HabitView.scss";
import Calendar from "./calendar/Calendar";

import { API_URL } from "../../Constants";
import { GlobalContext } from "../../context/GlobalState";

import axios from "axios";

import { HamburgerIcon } from "@chakra-ui/icons";

import { io } from "socket.io-client";

let requestedAddHabitDateTemp = {};
let requestedRemoveHabitDateTemp = {};
let HabitView = forwardRef((props, ref) => {
  let { habit_id } = useParams();
  const contextStore = useContext(GlobalContext);
  const [getHabitDateLoading, setGetHabitDateLoading] = useState(true);
  const [currentHabitDate, setCurrentHabitDate] = useState(
    props.habitsDateInfo[habit_id]
  );
  const setCurrentHabitDateCustom = (data) => {
    setCurrentHabitDate(data);
    props.addHabitsDateInfo(habit_id, data);
  };

  const addSelectedDate = (date, dateElement) => {
    // add date which is not completed to temp container
    if (!requestedAddHabitDateTemp[habit_id]) {
      requestedAddHabitDateTemp[habit_id] = {};
    }
    requestedAddHabitDateTemp[habit_id][date] = true;
    // console.log("tempstorelog", requestedAddHabitDateTemp);
    if (
      requestedRemoveHabitDateTemp[habit_id] &&
      date in requestedRemoveHabitDateTemp[habit_id]
    ) {
      delete requestedRemoveHabitDateTemp[habit_id][date];
    }
    let currentHabitDateTemp = { ...currentHabitDate };
    currentHabitDateTemp.dates[date] = true;
    setCurrentHabitDateCustom(currentHabitDateTemp);

    axios
      .post(API_URL + "/api/habit-date/" + habit_id, {
        date: date,
      })
      .then((response) => {
        // remove from temp container if the request is completed
        delete requestedAddHabitDateTemp[habit_id][date];
      })
      .catch((error) => {
        // remove from temp container if the request is completed
        delete requestedAddHabitDateTemp[habit_id][date];
        console.log(error);
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data === "Unauthorized"
        ) {
          contextStore.clearLoginDataAndRedirectToLogin();
        } else {
          let currentHabitDateTemp = { ...currentHabitDate };
          delete currentHabitDateTemp.dates[date];
          setCurrentHabitDateCustom(currentHabitDateTemp);
          contextStore.showUnexpectedError();
        }
      });
  };
  const removeSelectedDate = (date, dateElement) => {
    // add date which is not completed to temp container
    if (!requestedRemoveHabitDateTemp[habit_id]) {
      requestedRemoveHabitDateTemp[habit_id] = {};
    }

    requestedRemoveHabitDateTemp[habit_id][date] = true;
    if (
      requestedAddHabitDateTemp[habit_id] &&
      date in requestedAddHabitDateTemp[habit_id]
    ) {
      delete requestedAddHabitDateTemp[habit_id][date];
    }
    let currentHabitDateTemp = { ...currentHabitDate };
    delete currentHabitDateTemp.dates[date];
    setCurrentHabitDateCustom(currentHabitDateTemp);

    axios
      .delete(API_URL + "/api/habit-date/" + habit_id, {
        data: {
          date: date,
        },
      })
      .then((response) => {
        // remove from temp container if the request is completed
        delete requestedRemoveHabitDateTemp[habit_id][date];
      })
      .catch((error) => {
        // remove from temp container if the request is completed
        delete requestedRemoveHabitDateTemp[habit_id][date];
        console.log(error);
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data === "Unauthorized"
        ) {
          contextStore.clearLoginDataAndRedirectToLogin();
        } else {
          let currentHabitDateTemp = { ...currentHabitDate };
          currentHabitDateTemp.dates[date] = true;
          setCurrentHabitDateCustom(currentHabitDateTemp);
          // dateElement.classList.add("calendar-day--selected");
          contextStore.showUnexpectedError();
        }
      });
  };
  let onDateClick = (clickedDate) => {
    if (clickedDate in props.habitsDateInfo[habit_id].dates) {
      removeSelectedDate(clickedDate);
    } else {
      addSelectedDate(clickedDate);
    }
  };
  let getHabitDate = () => {
    if (true) {
      // if (!currentHabitDate) {
      setGetHabitDateLoading(true);
      axios
        .get(API_URL + "/api/habit-date/" + habit_id)
        .then((response) => {
          setGetHabitDateLoading(false);
          // add currently pending add date request
          // if the request is successful no need to add because the the response of this request most likely has that date
          response.data.dates = {
            ...response.data.dates,
            ...requestedAddHabitDateTemp[habit_id],
          };
          if (requestedRemoveHabitDateTemp[habit_id]) {
            for (let ele in requestedRemoveHabitDateTemp[habit_id]) {
              if (ele in response.data.dates) {
                delete response.data.dates[ele];
              }
            }
          }

          // remove currently pending remove date request
          setCurrentHabitDateCustom(response.data);
        })
        .catch((error) => {
          setGetHabitDateLoading(false);
          console.log(error);
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
    }
  };

  useImperativeHandle(ref, () => ({
    changeCurrentStateFromSocket(data) {
      if (data.add) {
        let currentHabitDateTemp = { ...currentHabitDate };
        console.log(
          props.habitsDateInfo[habit_id],
          currentHabitDate,
          currentHabitDateTemp.dates
        );
        currentHabitDateTemp.dates[data.add.date] = data.add[data.add.date];
        setCurrentHabitDateCustom(currentHabitDateTemp);
      }
      if (data.remove) {
        let currentHabitDateTemp = { ...currentHabitDate };
        delete currentHabitDateTemp.dates[data.remove.date];
        console.log(
          props.habitsDateInfo[habit_id],
          currentHabitDate,
          currentHabitDateTemp.dates,
          data.remove.date
        );
        setCurrentHabitDateCustom(currentHabitDateTemp);
      }
    },
  }));
  useEffect(() => {
    const socket = io();
    // effect
    // console.log(habit_id);
    console.log(props.habitsDateInfo);
    if (!currentHabitDate) {
      getHabitDate();
    }

    // socket.on("habit change", (data) => {
    //   console.log(data);
    //   if (data.add) {
    //     let currentHabitDateTemp = { ...props.habitsDateInfo[habit_id] };
    //     console.log(
    //       props.habitsDateInfo[habit_id],
    //       currentHabitDateTemp,
    //       currentHabitDateTemp.dates
    //     );
    //     currentHabitDateTemp.dates[data.add.date] = data.add[data.add.date];
    //     setCurrentHabitDateCustom(currentHabitDateTemp);
    //   }
    // });
    return () => {
      // cleanup
    };
  }, []);
  return (
    <Box className="habit-view-container">
      {!currentHabitDate ? (
        <Stack mt={10} className="calendar-month">
          <Skeleton height="30px" mb={10} />
          {/* <Skeleton height="200px" /> */}
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <>
          <h2>
            {/* <Button onClick={props.onSideDrawerOpen} size="sm" mr={2}> */}
            <HamburgerIcon
              onClick={props.onSideDrawerOpen}
              mr={3}
              className="side-drawer-menu"
            />
            {/* </Button> */}
            {currentHabitDate.habit_name}
          </h2>
          <hr className="habit-bottom-ht" />
          <Calendar
            selectedDate={currentHabitDate.dates}
            addSelectedDate={addSelectedDate}
            removeSelectedDate={removeSelectedDate}
            onDateClick={onDateClick}
          />
        </>
      )}
    </Box>
  );
});
export default HabitView;

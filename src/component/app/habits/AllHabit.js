import React, { useContext, useEffect, useState } from "react";

import "./AllHabit.scss";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";

import { API_URL } from "../../../Constants";
import { GlobalContext } from "../../../context/GlobalState";
import { Spinner, Center, Button } from "@chakra-ui/react";
import NoData from "../../../assets/NoData.svg";

import { HamburgerIcon } from "@chakra-ui/icons";

import axios from "axios";

const today = new Date();

function AllHabit(props) {
  const contextStore = useContext(GlobalContext);
  const [habitInfoWithDate, setHabitInfoWithDate] = useState([]);
  const [getHabitInfoLoading, setGetHabitInfoLoading] = useState(true);
  const [totalDisplayDay, setTotalDisplayDay] = useState(365);

  let getHabitWithDate = (props) => {
    setGetHabitInfoLoading(true);
    axios
      .get(API_URL + "/api/habit-with-date")
      .then((response) => {
        console.log(response.data);
        setGetHabitInfoLoading(false);
        // for (let habitInfo of response.data) {
        //   // adding to local cache
        //   // let storeForCache = { ...habitInfo };
        //   // storeForCache.dates = { ...storeForCache.dates };
        //   // props.addHabitsDateInfo(habitInfo.habit_id, storeForCache);
        //   // console.log("sdfsf324d", storeForCache);
        //   // let dateValue = [];
        //   // for (let date in habitInfo.dates) {
        //   //   dateValue.push({ date: date });
        //   // }
        //   // habitInfo.dates = dateValue;
        // }
        console.log(response.data);
        setHabitInfoWithDate(response.data);
        // adding to local cache
      })
      .catch((error) => {
        console.log(error);
        setGetHabitInfoLoading(false);

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
    getHabitWithDate();
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function handleResize() {
    let totalDays = document.querySelector(".habit-content").clientWidth * 0.35;
    console.log(totalDays);
    if (totalDays > 365) {
      totalDays = 365;
    }
    setTotalDisplayDay(totalDays);
  }
  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  return (
    <>
      <div className="habit-main-top-title">
        <HamburgerIcon
          onClick={props.onSideDrawerOpen}
          ml={5}
          className="side-drawer-menu"
        />
        <h2>All habits Activity</h2>
      </div>
      <div className="all-habit-container">
        <hr className="habit-bottom-ht" />
        {/* <br /> */}
        {getHabitInfoLoading ? (
          <Center mt={20}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        ) : habitInfoWithDate.length === 0 ? (
          <Center className="no-data-container">
            <img src={NoData} alt="no data" />
            <div>
              <h1>No Habit Found</h1>
              <h2>Please add new habit to see the information</h2>
            </div>
            <Button
              colorScheme="blue"
              size="sm"
              mt="3"
              variant="outline"
              onClick={() => {
                props.onOpenAddHabitModel();
              }}
            >
              Add Habit
            </Button>
          </Center>
        ) : (
          habitInfoWithDate.map((habit, index) => {
            let allHabitDayWithCount = [];
            let loopCurrentDay = shiftDate(today, -totalDisplayDay);
            // console.log(loopCurrentDay);
            
            do {
              // increment date by one day
              loopCurrentDay = new Date(
                loopCurrentDay.getTime() + 60 * 60 * 24 * 1000
                );
                console.log("sdfdsfds",loopCurrentDay);
              // console.log(loopCurrentDay.toISOString().slice(0, 10))
              if (
                habit.dates &&
                loopCurrentDay.toISOString().slice(0, 10) in habit.dates
              ) {
                allHabitDayWithCount.push({
                  date: loopCurrentDay.toISOString().slice(0, 10),
                  count: habit.dates[loopCurrentDay.toISOString().slice(0, 10)],
                });
              } else {
                allHabitDayWithCount.push({
                  date: loopCurrentDay.toISOString().slice(0, 10),
                  count: 0,
                });
              }
            } while (
              loopCurrentDay.toISOString().slice(0, 10) !==
              today.toISOString().slice(0, 10)
            );

            return (
              <>
                <h3>{habit.habit_name}</h3>
                <CalendarHeatmap
                  // startDate={shiftDate(today, -150)}
                  key={index}
                  startDate={shiftDate(today, -totalDisplayDay)}
                  gutterSize={3}
                  endDate={today}
                  weekdayLabels={["S", "M", "T", "W", "T", "F", "S"]}
                  // showOutOfRangeDays={true}
                  values={allHabitDayWithCount}
                  classForValue={(value) => {
                    console.log("kjsdfkjdsf",value)
                    if (value.count === 0) {
                      return "color-empty";
                    }
                    if (value.count === -1) {
                      return "color-fail";
                    }
                    return `color-completed`;
                  }}
                  showWeekdayLabels={true}
                  tooltipDataAttrs={(value) => {
                    return {
                      "data-tip": `${value.date}`,
                    };
                  }}
                />
                <ReactTooltip />
                <hr className="habit-bottom-ht" />
              </>
            );
          })
        )}
      </div>
    </>
  );
}

export default AllHabit;

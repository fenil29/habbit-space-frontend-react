import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import "./Calendar.scss";
import classNames from "classnames";
import { Progress } from "@chakra-ui/react";

const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

function Calendar(props) {
  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const TODAY = dayjs().format("YYYY-MM-DD");

  const INITIAL_YEAR = dayjs().format("YYYY");
  const INITIAL_MONTH = dayjs().format("M");

  let currentMonthDays;
  let previousMonthDays;
  let nextMonthDays;

  const [currentDates, setCurrentDates] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1))
  );
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);

  let updateOverview = () => {
    // let
    let tempSuccessCount = 0;
    let tempFailCount = 0;
    for (let [key, value] of Object.entries(props.selectedDate)) {
      if (dayjs(key).format("MM-YYYY") === selectedMonth.format("MM-YYYY")) {
        if (Number(value) === 1) {
          tempSuccessCount = tempSuccessCount + 1;
        } else if (Number(value) === -1) {
          tempFailCount = tempFailCount + 1;
        }
      }
    }
    setSuccessCount(tempSuccessCount);
    setFailCount(tempFailCount);
  };

  useEffect(() => {
    // createCalendar();
    initMonthSelectors();

    // add event listener for click

    return () => {
      // cleanup
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // effect
    createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
    updateOverview();

    return () => {
      // cleanup
    };
  }, [selectedMonth]);

  function onDateClick(clickedDate) {
    props.onDateClick(clickedDate);
    updateOverview();
  }
  function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
    document.getElementById("selected-month").innerText = dayjs(
      new Date(year, month - 1)
    ).format("MMMM YYYY");

    currentMonthDays = createDaysForCurrentMonth(
      year,
      month,
      dayjs(`${year}-${month}-01`).daysInMonth()
    );

    previousMonthDays = createDaysForPreviousMonth(year, month);

    nextMonthDays = createDaysForNextMonth(year, month);

    const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
    setCurrentDates(days);
  }

  function getNumberOfDaysInMonth(year, month) {
    return dayjs(`${year}-${month}-01`).daysInMonth();
  }

  function createDaysForCurrentMonth(year, month) {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
      return {
        date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: true,
      };
    });
  }

  function createDaysForPreviousMonth(year, month) {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);

    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

    // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
      ? firstDayOfTheMonthWeekday - 1
      : 6;

    const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
      .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
      .date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
      (day, index) => {
        return {
          date: dayjs(
            `${previousMonth.year()}-${previousMonth.month() + 1}-${
              previousMonthLastMondayDayOfMonth + index
            }`
          ).format("YYYY-MM-DD"),
          dayOfMonth: previousMonthLastMondayDayOfMonth + index,
          isCurrentMonth: false,
        };
      }
    );
  }

  function createDaysForNextMonth(year, month) {
    const lastDayOfTheMonthWeekday = getWeekday(
      `${year}-${month}-${currentMonthDays.length}`
    );

    const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");

    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
      ? 7 - lastDayOfTheMonthWeekday
      : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
      return {
        date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
        ).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: false,
      };
    });
  }

  function getWeekday(date) {
    return dayjs(date).weekday();
  }

  function initMonthSelectors() {
    document
      .getElementById("previous-month-selector")
      .addEventListener("click", function () {
        setSelectedMonth((selectedMonth) =>
          dayjs(selectedMonth).subtract(1, "month")
        );
      });

    document
      .getElementById("present-month-selector")
      .addEventListener("click", function () {
        setSelectedMonth((selectedMonth) =>
          dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1))
        );
      });

    document
      .getElementById("next-month-selector")
      .addEventListener("click", () => {
        setSelectedMonth((selectedMonth) =>
          dayjs(selectedMonth).add(1, "month")
        );
      });
  }
  let currentHabitRatio =
  Math.round((successCount * 100) / (successCount + failCount) || 0) 
  return (
    <>
      <div className="calendar-month">
        <section className="calendar-month-header">
          <div
            id="selected-month"
            className="calendar-month-header-selected-month"
          ></div>
          <section className="calendar-month-header-selectors">
            {/* <span id="present-month-selector">Today</span> */}
            <span
              id="present-month-selector"
              className="calendar-change-month-button"
            >
              <RepeatIcon w={5} h={5} />
            </span>
            <span
              id="previous-month-selector"
              className="calendar-change-month-button"
            >
              <ChevronLeftIcon w={7} h={7} />
            </span>
            <span
              id="next-month-selector"
              className="calendar-change-month-button"
            >
              <ChevronRightIcon w={7} h={7} />
            </span>
          </section>
        </section>

        <ol id="days-of-week" className="day-of-week">
          {WEEKDAYS.map((weekday, index) => (
            <li key={index}>{weekday}</li>
          ))}
        </ol>

        <ol id="calendar-days" className="days-grid">
          {currentDates.map((day, index) => (
            <li
              className={classNames(
                "calendar-day",
                {
                  "calendar-day--selected": props.selectedDate[day.date] === 1,
                },
                {
                  "calendar-day--selected-fail":
                    props.selectedDate[day.date] === -1,
                },
                { "calendar-day--today": day.date === TODAY }
              )}
              key={index}
            >
              <span
                onClick={() => {
                  onDateClick(day.date, index);
                }}
              >
                {day.dayOfMonth}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="habit-overview-container">
        <h1>This Month</h1>
        <h2>{`(${successCount}/${successCount + failCount})`}</h2>
        <div className="habit-overview-progress-container">
          <Progress value={currentHabitRatio} className="progress-bar" />
        </div>
        <h2>{`${currentHabitRatio}%`}</h2>

      </div>
    </>
  );
}

export default Calendar;

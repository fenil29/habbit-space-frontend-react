import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import "./Calendar.scss";

const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

function Calendar(props) {
  const [currentDates, setCurrentDates] = useState([]);

  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const TODAY = dayjs().format("YYYY-MM-DD");

  const INITIAL_YEAR = dayjs().format("YYYY");
  const INITIAL_MONTH = dayjs().format("M");

  let selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
  let currentMonthDays;
  let previousMonthDays;
  let nextMonthDays;

  useEffect(() => {
    // effect

    // const daysOfWeekElement = document.getElementById("days-of-week");

    // WEEKDAYS.forEach((weekday) => {
    //   const weekDayElement = document.createElement("li");
    //   daysOfWeekElement.appendChild(weekDayElement);
    //   weekDayElement.innerText = weekday;
    // });

    createCalendar();
    initMonthSelectors();

    // add event listener for click

    return () => {
      // cleanup
    };
  }, []);

  function onDateClick(clickedDate) {
    props.onDateClick(clickedDate);
  }
  function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
    const calendarDaysElement = document.getElementById("calendar-days");

    document.getElementById("selected-month").innerText = dayjs(
      new Date(year, month - 1)
    ).format("MMMM YYYY");

    // removeAllDayElements(calendarDaysElement);

    currentMonthDays = createDaysForCurrentMonth(
      year,
      month,
      dayjs(`${year}-${month}-01`).daysInMonth()
    );

    previousMonthDays = createDaysForPreviousMonth(year, month);

    nextMonthDays = createDaysForNextMonth(year, month);

    const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
    // days.forEach((day) => {
    //   appendDay(day, calendarDaysElement);
    // });
    setCurrentDates(days);
  }

  // function appendDay(day, calendarDaysElement) {
  //   const dayElement = document.createElement("li");
  //   const dayElementClassList = dayElement.classList;
  //   dayElementClassList.add("calendar-day");
  //   const dayOfMonthElement = document.createElement("span");
  //   dayOfMonthElement.innerText = day.dayOfMonth;
  //   dayOfMonthElement.setAttribute("value", day.date);
  //   dayOfMonthElement.addEventListener("click", onDateClick);

  //   dayElement.appendChild(dayOfMonthElement);
  //   calendarDaysElement.appendChild(dayElement);

  //   if (!day.isCurrentMonth) {
  //     dayElementClassList.add("calendar-day--not-current");
  //   }

  //   if (day.date === TODAY) {
  //     dayElementClassList.add("calendar-day--today");
  //   }
  //   if (day.date in props.selectedDate.dates) {
  //     dayElementClassList.add("calendar-day--selected");
  //   }
  // }

  function removeAllDayElements(calendarDaysElement) {
    let first = calendarDaysElement.firstElementChild;

    while (first) {
      first.remove();
      first = calendarDaysElement.firstElementChild;
    }
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
        selectedMonth = dayjs(selectedMonth).subtract(1, "month");
        createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
      });

    document
      .getElementById("present-month-selector")
      .addEventListener("click", function () {
        selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
        createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
      });

    document
      .getElementById("next-month-selector")
      .addEventListener("click", function () {
        selectedMonth = dayjs(selectedMonth).add(1, "month");
        createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
      });
  }
  return (
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
        {WEEKDAYS.map((weekday,index) => (
          <li key={index}>{weekday}</li>
        ))}
      </ol>

      <ol id="calendar-days" className="days-grid">
        {currentDates.map((day, index) => (
          <li
            className={
              props.selectedDate[day.date]
                ? "calendar-day calendar-day--selected"
                : "calendar-day"
            }
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
  );
}

export default Calendar;

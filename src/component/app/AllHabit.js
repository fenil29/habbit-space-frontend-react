import React from "react";

import "./AllHabit.scss";
import CalendarHeatmap from "react-calendar-heatmap";
const today = new Date();

function AllHabit() {
    function shiftDate(date, numDays) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + numDays);
        return newDate;
      }

  return (
    <div className="all-habit-container">
      All habit h
      <CalendarHeatmap
        // startDate={shiftDate(today, -150)}
        startDate={shiftDate(today, -182)}
        gutterSize={3}
        endDate={today}
        weekdayLabels={["S","M","T","W","T","F","S"]}
        // showOutOfRangeDays={true}
        values={[
          { date: "2016-01-01" },
          { date: "2016-01-22" },
          { date: "2021-02-02" },
          // ...and so on
        ]}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-completed`;
        }}
        showWeekdayLabels={true}
      />
    </div>
  );
}

export default AllHabit;

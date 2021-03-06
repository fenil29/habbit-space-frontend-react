import React from "react";
import { Box } from "@chakra-ui/react";
import "./HabitView.scss";
import Calendar from './calendar/Calendar';


function HabitView() {
  return (
    <Box className="app-content">
      <h2>Learn to Code</h2>
      <Calendar
      />
    </Box>
  );
}

export default HabitView;

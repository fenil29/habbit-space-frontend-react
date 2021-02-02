import React from "react";
import { Box } from "@chakra-ui/react";
import "./AppContent.scss";
import Calendar from './calendar/Calendar';


function AppContent() {
  return (
    <Box className="app-content">
      <h2>Learn to Code</h2>
      <Calendar
      />
    </Box>
  );
}

export default AppContent;

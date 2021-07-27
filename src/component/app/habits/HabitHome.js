import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import HabitContent from "../habits/HabitContent";

import HabitOption from "../habits/HabitOption";

import "./HabitHome.scss"

function HabitHome(props) {
  return (
    <Box className="habit-home" boxShadow="xl">
      <HabitOption
        isSideDrawerOpen={props.isSideDrawerOpen}
        onSideDrawerOpen={props.onSideDrawerOpen}
        onSideDrawerClose={props.onSideDrawerClose}
      />
      <HabitContent />
    </Box>
  );
}

export default HabitHome;

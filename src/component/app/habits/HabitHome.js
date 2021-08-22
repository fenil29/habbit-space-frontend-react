import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import HabitContent from "../habits/HabitContent";

import HabitOption from "../habits/HabitOption";

import "./HabitHome.scss";

function HabitHome() {
  const {
    isOpen: isSideDrawerOpen,
    onOpen: onSideDrawerOpen,
    onClose: onSideDrawerClose,
  } = useDisclosure();
  return (
    <Box className="habit-home" boxShadow="xl">
      <HabitOption
        isSideDrawerOpen={isSideDrawerOpen}
        onSideDrawerOpen={onSideDrawerOpen}
        onSideDrawerClose={onSideDrawerClose}
      />
      <HabitContent  onSideDrawerOpen={onSideDrawerOpen}/>
    </Box>
  );
}

export default HabitHome;

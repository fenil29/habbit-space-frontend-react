import React, { useEffect, useState } from "react";

import { Box, useDisclosure } from "@chakra-ui/react";
import "./AppHome.scss";

import AppOption from "./AppOption";
import AppContent from "./AppContent";
import AppNavBar from "./navbar-app/AppNavBar";

function AppHome() {
  console.log("habitsDateInfo Rendering");
  const {
    isOpen: isSideDrawerOpen,
    onOpen: onSideDrawerOpen,
    onClose: onSideDrawerClose,
  } = useDisclosure();
  return (
    <>
      <AppNavBar onSideDrawerOpen={onSideDrawerOpen}/>
      <Box className="app-home" boxShadow="xl">
        <AppOption
          isSideDrawerOpen={isSideDrawerOpen}
          onSideDrawerOpen={onSideDrawerOpen}
          onSideDrawerClose={onSideDrawerClose}
        />
        <AppContent  />
      </Box>
    </>
  );
}

export default AppHome;

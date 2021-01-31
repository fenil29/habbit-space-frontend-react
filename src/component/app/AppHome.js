import React from "react";
import "./AppHome.scss";
import { Box } from "@chakra-ui/react";


import AppOption from "./AppOption";
import AppContent from "./AppContent";
function AppHome() {
  return (
    <Box className="app-home" boxShadow="2xl" >
      <AppOption />
      <AppContent />
    </Box>
  );
}

export default AppHome;

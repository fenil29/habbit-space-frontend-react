import React from "react";
import { Box } from "@chakra-ui/react";
import "./AppHome.scss";


import AppOption from "./AppOption";
import AppContent from "./AppContent";
function AppHome() {
  return (
    <Box className="app-home"
     boxShadow="xl" 
     >
      <AppOption />
      <AppContent />
    </Box>
  );
}

export default AppHome;

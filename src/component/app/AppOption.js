import React from "react";
import "./AppOption.scss";
import { Box,useColorMode } from "@chakra-ui/react";

function AppOption() {
    const { colorMode } = useColorMode()
  return <Box className="app-option" backgroundColor={`mode.${colorMode}.backgroundSecondary`}></Box>;
}

export default AppOption;

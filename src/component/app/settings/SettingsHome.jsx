import React from "react";
import "./SettingsHome.scss";
import { Box } from "@chakra-ui/react";

import SettingsOption from "./SettingsOption";
import SettingsContent from "./SettingsContent";

function SettingsHome(props) {
  return (
    <Box className="setting-home">
      <SettingsOption
        isSideDrawerOpen={props.isSideDrawerOpen}
        onSideDrawerOpen={props.onSideDrawerOpen}
        onSideDrawerClose={props.onSideDrawerClose}
      />
      <SettingsContent />
    </Box>
  );
}

export default SettingsHome;

import React from "react";
import "./SettingsOption.scss";

import { Box, List, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function SettingsOption(props) {
  return (
    <div>
      <Box className="settings-option settings-option-main">
        <Box className="title">
          <h2>Settings</h2>
        </Box>
        <List>
          <NavLink
            to={"/app/settings/habits"}
            activeClassName="is-active-habit"
          >
            <ListItem>habits</ListItem>
          </NavLink>
          <NavLink
            to={"/app/settings/account"}
            activeClassName="is-active-habit"
          >
            <ListItem>account</ListItem>
          </NavLink>
        </List>
      </Box>
    </div>
  );
}

export default SettingsOption;

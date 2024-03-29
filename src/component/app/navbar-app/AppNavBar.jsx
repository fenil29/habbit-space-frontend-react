import React, { useContext } from "react";
import Logo from "../../Logo";
import "./AppNavBar.scss";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import DarkModeButton from "./DarkModeButton";
import { GlobalContext } from "../../../context/GlobalState";

function AppNavBar(props) {
  const contextStore = useContext(GlobalContext);

  return (
    <div className="nav-bar">
      <div className="nav-bar-content">
        <div className="left">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="right">
          <DarkModeButton />
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              customColor="light-blue"
            >
              <Avatar
                size="sm"
                name={
                  contextStore.loginData.first_name +
                  " " +
                  contextStore.loginData.last_name
                }
                src={contextStore.loginData.picture}
                mr="1"
              />
            </MenuButton>
            <MenuList>
              <div>
                <MenuItem>
                  {contextStore.loginData.first_name +
                    " " +
                    contextStore.loginData.last_name}
                </MenuItem>
              </div>
              <hr />
              <Link to="/app/all-habit">
                <MenuItem>Habits</MenuItem>
              </Link>
              <Link to="/app/settings/habits">
                <MenuItem>Settings</MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  contextStore.Logout();
                }}
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default AppNavBar;

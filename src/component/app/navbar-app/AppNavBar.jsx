import React from "react";
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
  useColorMode,
} from "@chakra-ui/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

function AppNavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div className="nav-bar">
      <div className="nav-bar-content">
        <Link to="/">
          <Logo />
        </Link>
        <div className="right">
          <Button size="md" margin="5px" onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <MoonIcon onClick={toggleColorMode} />
            ) : (
              <SunIcon onClick={toggleColorMode} />
            )}
          </Button>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Fenil Kaneria
            </MenuButton>
            <MenuList>
              <MenuItem>App</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Account</MenuItem>
              <MenuDivider />
              <MenuItem>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default AppNavBar;

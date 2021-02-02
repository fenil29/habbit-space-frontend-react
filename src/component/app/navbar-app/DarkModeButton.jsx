import React from "react";
import {
  Button,
  useColorMode,
} from "@chakra-ui/react";
import {  MoonIcon, SunIcon } from "@chakra-ui/icons";

let colorList = [
  // "--primary-color",
  // "--primary-background-color",
  "--secondary-background-color",
  "--primary-font-color",
  // "--secondary-font-color",
];

function DarkModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  let toggleColorModeCustom = () => {
    for (let i of colorList) {
      document.documentElement.style.setProperty(
        i,
        colorMode === "light"
          ? `var(--dark-mode${i.slice(1)})`
          : `var(--light-mode${i.slice(1)})`
      );
    }
    toggleColorMode();
  };
  return (
    <Button size="md" margin="5px" onClick={toggleColorModeCustom}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}

export default DarkModeButton;

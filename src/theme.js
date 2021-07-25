// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  // mode: {
  //   light: {
  //     backgroundSecondary: "#EDF2F7",
  //   },
  //   dark: {
  //     backgroundSecondary: "rgba(255, 255, 255, 0.08)",
  //   },
  // },
  blue: {
    200: "#3182CE",
  },
};
// 3. extend the theme
const theme = extendTheme({ config, colors });
console.log(theme);

export default theme;

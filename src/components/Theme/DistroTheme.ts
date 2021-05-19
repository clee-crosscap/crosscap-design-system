import chroma from "chroma-js";
import { DefaultTheme } from "styled-components/macro";

const DistroTheme: DefaultTheme = {
  NAME:            "Distro",

  MODULE_PRIMARY:  "#5F78FD",
  MODULE_DARK:     "#282156",
  MODULE_LIGHT:    "#453996",

  TEXT_DARK:       "#3B3B3B",
  ICON_DARK:       "#3B3B3B",

  INPUT_DISABLED:  "#F7F7F7",

  INVALID:         "#EB4747",

  GRAY_E6:         "#E6E6E6",
  GRAY_84:         "#848484",

  DIVIDER:         "#D8D8D8",

  FOOTER_HOVER:    "#E4EBED",

  HOVER:           chroma.mix("#453996", "#FFFFFF", 0.92).hex().toUpperCase(), // #F0EFF7

  HIGHLIGHT:       "#FFDF00",
  HIGHLIGHT_FOCUS: "#FF9100",
  BANNER:          "#FFE3A6",

  BUTTON: {
    primary: {
      FG:          "#FFFFFF",
      BG:          "#453996",
    },
    secondary: {
      FG:          "#3B3B3B",
      BG:          "rgba(255, 255, 255, 0)", // Avoid transparent since chroma rejects it
    },
  },
};

export default DistroTheme;

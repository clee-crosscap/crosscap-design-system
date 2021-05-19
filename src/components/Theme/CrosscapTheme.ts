import chroma from "chroma-js";
import { DefaultTheme } from "styled-components/macro";

const CrosscapTheme: DefaultTheme = {
  NAME:            "Crosscap",

  MODULE_PRIMARY:  "#5CE1BA",
  MODULE_DARK:     "#5CE1BA",
  MODULE_LIGHT:    "#D9FCF2",

  TEXT_DARK:       "#3B3B3B",
  ICON_DARK:       "#3B3B3B",

  INPUT_DISABLED:  "#F7F7F7",

  INVALID:         "#F35955",

  GRAY_E6:         "#E6E6E6",
  GRAY_84:         "#848484",

  DIVIDER:         "#D8D8D8",

  FOOTER_HOVER:    "#E4EBED",

  HOVER:           chroma.mix("#5CE1BA", "#FFFFFF", 0.8).hex().toUpperCase(), // #DEF9F1

  HIGHLIGHT:       "#FFDF00",
  HIGHLIGHT_FOCUS: "#FF9100",
  BANNER:          "#FFE3A6",

  BUTTON: {
    primary: {
      FG:          "#FFFFFF",
      BG:          "#5CE1BA",
    },
    secondary: {
      FG:          "#3B3B3B",
      BG:          "rgba(255, 255, 255, 0)", // Avoid transparent since chroma rejects it
    },
  },
};

export default CrosscapTheme;

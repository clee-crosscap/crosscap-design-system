import chroma from "chroma-js";
import { DefaultTheme } from "styled-components/macro";

const BudgetingTheme: DefaultTheme = {
  NAME :           "Budgeting",

  MODULE_PRIMARY : "#0B8389",
  MODULE_DARK :    "#097075",
  MODULE_LIGHT :   "#0B8389",

  TEXT_DARK :      "#3B3B3B",
  ICON_DARK :      "#3B3B3B",

  INPUT_DISABLED : "#F7F7F7",

  INVALID :        "#EB4747",

  GRAY_E6 :        "#E6E6E6",
  GRAY_84 :        "#848484",

  DIVIDER :        "#D8D8D8",

  FOOTER_HOVER :   "#E4EBED",

  HOVER :          "#D4EBEC",

  HIGHLIGHT:       "#FFDF00",
  HIGHLIGHT_FOCUS: "#FF9100",
  BANNER:          "#FFF2D9",

  BUTTON: {
    primary: {
      FG:          "#FFFFFF",
      BG:          "#0B8389",
    },
    secondary: {
      FG:          "#3B3B3B",
      BG:          "rgba(255, 255, 255, 0)", // Avoid transparent since chroma rejects it
    },
  },
};

export default BudgetingTheme;

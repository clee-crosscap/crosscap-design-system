import chroma from "chroma-js";
import { DefaultTheme } from "styled-components/macro";

const PlatformAdminTheme: DefaultTheme = {
  NAME:            "Platform Admin",

  MODULE_PRIMARY:  "#3A3A3A",
  MODULE_DARK:     "#8AA0BA",
  MODULE_LIGHT:    "#C5D0DD",

  TEXT_DARK:       "#3B3B3B",
  ICON_DARK:       "#3B3B3B",

  INPUT_DISABLED:  "#F7F7F7",

  INVALID:         "#EB4747",

  GRAY_E6:         "#E6E6E6",
  GRAY_84:         "#848484",

  DIVIDER:         "#D8D8D8",

  FOOTER_HOVER:    "#E4EBED",

  HOVER:           "#E2E7EE",

  HIGHLIGHT:       "#FFDF00",
  HIGHLIGHT_FOCUS: "#FF9100",
  BANNER:          "#FFF2D9",

  BUTTON: {
    primary: {
      FG:          "#FFFFFF",
      BG:          "#8AA0BA",
    },
    secondary: {
      FG:          "#3B3B3B",
      BG:          "rgba(255, 255, 255, 0)", // Avoid transparent since chroma rejects it
    },
  },
};

export default PlatformAdminTheme;

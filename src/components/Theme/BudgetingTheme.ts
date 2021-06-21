import chroma from "chroma-js";
import { DefaultTheme } from "styled-components/macro";

const WHITE = "#FFFFFF";
const TRANSPARENT_WHITE = 'rgba(255, 255, 255, 0)';
const GRAY_3B = '#3B3B3B';
const GRAY_84 = '#848484';
const GRAY_D8 = '#D8D8D8';
const GRAY_E6 = '#E6E6E6';
const PRIMARY = "#0B8389";
const DARK    = "#097075";
const LIGHT   = "#0B8389";

const BudgetingTheme: DefaultTheme<typeof PRIMARY, typeof DARK, typeof LIGHT> = {
  NAME:              "Budgeting",

  MODULE_PRIMARY:    PRIMARY,
  MODULE_DARK:       DARK,
  MODULE_LIGHT:      LIGHT,

  TEXT_DARK:         GRAY_3B,
  ICON_DARK:         GRAY_3B,

  BADGE_ACTIVE_BG:   DARK,
  BADGE_ACTIVE_FG:   "#FFFFFF",
  BADGE_INACTIVE_BG: GRAY_E6,
  BADGE_INACTIVE_FG: GRAY_3B,

  TAB_ACTIVE:        DARK,
  TAB_INACTIVE:      GRAY_3B,

  INVALID:           "#BF4743",
    
  GRAY_84:           GRAY_84,
  GRAY_D8:           GRAY_D8,
  GRAY_E6:           GRAY_E6,

  DIVIDER:           GRAY_D8,

  FOOTER_HOVER:      "#E4EBED",

  HOVER:             "#D4EBEC",

  HIGHLIGHT:         "#FFDF00",
  HIGHLIGHT_FOCUS:   "#FF9100",
  BANNER:            "#FFE3A6",

  BUTTON: {
    primary: {
      FG:          WHITE,
      BG:          PRIMARY,
    },
    secondary: {
      BG:          GRAY_E6,
      FG:          GRAY_3B,
    },
    tertiary: {
      BG:          TRANSPARENT_WHITE, // Avoid transparent since chroma rejects it
      FG:          GRAY_3B,
    },
    text: {
      BG:          TRANSPARENT_WHITE, // Avoid transparent since chroma rejects it
      FG:          DARK,
    },
    icon: {
      BG:          TRANSPARENT_WHITE, // Avoid transparent since chroma rejects it
      FG:          GRAY_3B,
    },
  },
};

export default BudgetingTheme;

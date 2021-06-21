// styled.d.ts
import 'styled-components';

const WHITE = "#FFFFFF";
const TRANSPARENT_WHITE = 'rgba(255, 255, 255, 0)';
const GRAY_3B = '#3B3B3B';
const GRAY_84 = '#848484';
const GRAY_D8 = '#D8D8D8';
const GRAY_E6 = '#E6E6E6';

declare module 'styled-components' {
  interface ButtonConfig<BG = string, FG = string> {
    FG: FG,
    BG: BG,
    HOVER?: string,
    FOCUS?: string,
    ACTIVE?: string,
  }
  export interface DefaultTheme<PRIMARY, DARK, LIGHT> {
    NAME:              string,

    MODULE_PRIMARY:    PRIMARY,
    MODULE_DARK:       DARK,
    MODULE_LIGHT:      LIGHT,

    TEXT_DARK:         GRAY_3B,
    ICON_DARK:         GRAY_3B,
    
    BADGE_ACTIVE_BG:   DARK,
    BADGE_ACTIVE_FG:   string,
    BADGE_INACTIVE_BG: GRAY_E6,
    BADGE_INACTIVE_FG: GRAY_3B,

    TAB_ACTIVE:        DARK,
    TAB_INACTIVE:      GRAY_3B,

    INVALID:           "#BF4743",
    
    GRAY_84:           GRAY_84,
    GRAY_D8:           GRAY_D8,
    GRAY_E6:           GRAY_E6,
  
    DIVIDER:           GRAY_D8,
  
    HOVER:             string,
    FOOTER_HOVER:      string,
    
    HIGHLIGHT:         "#FFDF00",
    HIGHLIGHT_FOCUS:   "#FF9100",
    BANNER:            "#FFE3A6",

    BUTTON: {
      primary: ButtonConfig<PRIMARY, WHITE>,
      secondary: ButtonConfig<GRAY_E6, GRAY_3B>,
      tertiary: ButtonConfig<TRANSPARENT_WHITE, GRAY_3B>,
      text: ButtonConfig<TRANSPARENT_WHITE, DARK>,
      icon: ButtonConfig<TRANSPARENT_WHITE, GRAY_3B>,
      custom?: ButtonConfig,
    }
  }
}
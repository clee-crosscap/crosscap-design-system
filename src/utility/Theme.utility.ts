import { DefaultTheme } from 'styled-components/macro';
import chroma, { Color } from 'chroma-js';

import * as GU from '@utility/General.utility';

const WHITE = "#FFFFFF";
const TRANSPARENT_WHITE = 'rgba(255, 255, 255, 0)';
const GRAY_3B = '#3B3B3B';
const GRAY_84 = '#848484';
const GRAY_D8 = '#D8D8D8';
const GRAY_E6 = '#E6E6E6';

export function createTheme(name: string, primary: string, dark: string, light: string): DefaultTheme<typeof primary, typeof dark, typeof light> {
  const hoverColor: Color = chroma(primary).set('hsl.l', GU.lerp(0.80, chroma(primary).get('hsl.l'), 1));

  return {
    NAME:              name,
  
    MODULE_PRIMARY:    primary,
    MODULE_DARK:       dark,
    MODULE_LIGHT:      light,
  
    TEXT_DARK:         GRAY_3B,
    ICON_DARK:         GRAY_3B,
  
    BADGE_ACTIVE_BG:   dark,
    BADGE_ACTIVE_FG:   "#FFFFFF",
    BADGE_INACTIVE_BG: GRAY_E6,
    BADGE_INACTIVE_FG: GRAY_3B,
  
    TAB_ACTIVE:        dark,
    TAB_INACTIVE:      GRAY_3B,
  
    INVALID:           "#BF4743",
  
    GRAY_84:           GRAY_84,
    GRAY_D8:           GRAY_D8,
    GRAY_E6:           GRAY_E6,
  
    DIVIDER:           GRAY_D8,
  
    HOVER:             hoverColor.hex().toUpperCase(),
  
    HIGHLIGHT:         "#FFDF00",
    HIGHLIGHT_FOCUS:   "#FF9100",
    BANNER:            "#FFE3A6",
  
    BUTTON: {
      primary: {
        FG:            WHITE,
        BG:            primary,
        HOVER:         chroma(primary).set('hsl.s', '*0.64').set('hsl.l', '*0.8').hex().toUpperCase(),
        ACTIVE:        chroma(primary).set('hsl.s', '*0.64').set('hsl.l', '*0.6').hex().toUpperCase(),
      },
      secondary: {
        BG:            GRAY_E6,
        FG:            GRAY_3B,
        HOVER:         chroma(GRAY_E6).set('hsl.l', '*0.8').hex().toUpperCase(),
        ACTIVE:        chroma(GRAY_E6).set('hsl.l', '*0.6').hex().toUpperCase(),
      },
      tertiary: {
        BG:            TRANSPARENT_WHITE, // Avoid transparent since chroma rejects it
        FG:            GRAY_3B,
        HOVER:         chroma(GRAY_3B).set('hsl.l', 0.9).hex().toUpperCase(),
        ACTIVE:        chroma(GRAY_3B).set('hsl.l', 0.7).hex().toUpperCase(),
      },
      icon: {
        BG:            TRANSPARENT_WHITE, // Avoid transparent since chroma rejects it
        FG:            GRAY_3B,
        HOVER:         chroma(GRAY_3B).set('hsl.l', 0.9).hex().toUpperCase(),
        ACTIVE:        chroma(GRAY_3B).set('hsl.l', 0.7).hex().toUpperCase(),
      },
      text: {
        BG:            TRANSPARENT_WHITE, // Avoid transparent since chroma rejects it
        FG:            dark,
        HOVER:         chroma(dark).set('hsl.l', '*0.75').hex().toUpperCase(),
        ACTIVE:        chroma(dark).set('hsl.l', '*0.50').hex().toUpperCase(),
      },
      footer: {
        BG:            WHITE,
        FG:            GRAY_3B,
        HOVER:         hoverColor.set('hsl.l', `*${0.8/0.8}`).hex().toUpperCase(),
        ACTIVE:        hoverColor.set('hsl.l', `*${0.6/0.8}`).hex().toUpperCase(),
      },
    },
  };  
}
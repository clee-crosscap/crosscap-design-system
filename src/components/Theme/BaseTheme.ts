import chroma from 'chroma-js';

export const BaseTheme = {
  MODULE_DARK:    '#1189B0',
  MODULE_LIGHT:   '#38C6F4',

  TEXT_DARK:      '#3B3B3B',
  ICON_DARK:      '#3B3B3B',

  INPUT_DISABLED: '#F7F7F7',

  INVALID:        '#F35955',

  GRAY_E6:        '#E6E6E6',
  GRAY_84:        '#848484',

  DIVIDER:        '#D8D8D8',

  FOOTER_HOVER:   '#E4EBED',

  HOVER:           chroma.mix('#38C6F4', '#FFFFFF', 0.8).hex(),

  BUTTON: {
    primary: {
      FG:          '#FFFFFF',
      BG:          '#1189B0',
    },
    secondary: {
      FG:          '#3B3B3B',
      BG:          'rgba(255, 255, 255, 0)', // Avoid transparent since chroma rejects it
    },
  },
};

export default BaseTheme;

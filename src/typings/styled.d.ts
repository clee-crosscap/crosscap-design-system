// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  interface ButtonConfig {
    FG: string,
    BG: string,
    HOVER?: string,
    FOCUS?: string,
    ACTIVE?: string,
  }
  export interface DefaultTheme {
    NAME: string,

    MODULE_PRIMARY: string,
    MODULE_DARK: string,
    MODULE_LIGHT: string,

    TEXT_DARK: string,
    ICON_DARK: string,
    
    INPUT_DISABLED: string,
    
    INVALID: string,
    
    GRAY_E6: string,
    GRAY_84: string,
    
    HOVER: string,
    
    DIVIDER: string,
    
    FOOTER_HOVER: string,
    
    HIGHLIGHT: string,
    HIGHLIGHT_FOCUS: string,
    BANNER: string,

    BUTTON: {
      primary: ButtonConfig,
      secondary: ButtonConfig,
      custom?: ButtonConfig,
    }
  }
}
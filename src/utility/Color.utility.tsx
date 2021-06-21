import chroma, { Color } from 'chroma-js';
import { DefaultTheme } from 'styled-components/macro';

type GenericTheme = DefaultTheme<string, string, string>;

const HoverVariantSettings: VariantSettings  = { customColorProp: 'HOVER',  autoAdjustment: { dark: '*0.80', light: 0.9 } };
const FocusVariantSettings: VariantSettings  = { customColorProp: 'FOCUS',  autoAdjustment: { dark: '*0.80', light: 0.9 } };
const ActiveVariantSettings: VariantSettings = { customColorProp: 'ACTIVE', autoAdjustment: { dark: '*0.60', light: 0.7 } };

type ButtonConfig = GenericTheme["BUTTON"][keyof GenericTheme["BUTTON"]];
export interface VariantSettings {
  customColorProp: 'HOVER' | 'FOCUS' | 'ACTIVE',
  autoAdjustment: {
    dark: number | string,
    light: number | string,
  },
}

function compositeChroma(fg: string = '#000000', bg: string = '#FFFFFF'): Color {
  const a: number  = chroma(fg).alpha();
  const fgc: Color = chroma(fg).alpha(1);
  const bgc: Color = chroma(bg);
  return chroma.mix(fgc, bgc, 1-a);
}
function withRelativeSign(v: string | number): string | number {
  if(typeof v === 'number') return v;       // passed as absolute value
  if(/[-+*]/.test(v.charAt(0))) return v;   // passed as signed relative value
  return `+${v}`;                           // unsigned relative value treated as positive
}

function getButtonBgVariant(config: ButtonConfig, settings: VariantSettings): string {
  if(!config) return 'transparent';

  // Use override color if one was provided in button theming
  if(config?.[settings.customColorProp]) {
    return config[settings.customColorProp]!;
  }
  const bgc: Color = chroma(config.BG);

  const isTransparent: boolean = (bgc.alpha() === 0);
  const isWhite: boolean = (chroma.distance(config.BG, '#FFF') === 0);

  // Use a lightened color variant when possible
  if(!isTransparent && !isWhite) {
    return compositeChroma(config.BG).set('hsl.l', withRelativeSign(settings.autoAdjustment.dark)).hex();
  }

  // If BG color is white or fully transparent, use white tinted with that FG color
  // Note: Setting absolute lightness will set alpha to fully opaque
  return chroma(config.FG).set('hsl.l', withRelativeSign(settings.autoAdjustment.light)).hex();
}
// Given a variant color, calculate the BG that would produce that variant
export function getButtonBgFromHoverVariant(hoverColor: string): string {
  return chroma(hoverColor).set('hsl.l', withRelativeSign(`${-HoverVariantSettings.autoAdjustment.dark}`)).hex();
}
export function getButtonBgFromFocusVariant(focusColor: string): string {
  return chroma(focusColor).set('hsl.l', withRelativeSign(`${-FocusVariantSettings.autoAdjustment.dark}`)).hex();
}
export function getButtonBgFromActiveVariant(activeColor: string): string {
  return chroma(activeColor).set('hsl.l', withRelativeSign(`${-ActiveVariantSettings.autoAdjustment.dark}`)).hex();
}
// Given a BG and FG, calculate the variant color
export function getButtonHoverBg(config: ButtonConfig): string {
  return getButtonBgVariant(config, HoverVariantSettings);
}
export function getButtonFocusBg(config: ButtonConfig): string {
  return getButtonBgVariant(config, FocusVariantSettings);
}
export function getButtonActiveBg(config: ButtonConfig): string {
  return getButtonBgVariant(config, ActiveVariantSettings);
}

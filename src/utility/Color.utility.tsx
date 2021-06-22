import chroma, { Color } from 'chroma-js';
import { DefaultTheme } from 'styled-components/macro';

type GenericTheme = DefaultTheme<string, string, string>;

const HoverVariantSettings: VariantSettings  = { customColorProp: 'HOVER',  autoAdjustment: { relativeLightness: 0.80, absoluteLightness: 0.9 } };
const ActiveVariantSettings: VariantSettings = { customColorProp: 'ACTIVE', autoAdjustment: { relativeLightness: 0.60, absoluteLightness: 0.7 } };

type ButtonConfig = GenericTheme["BUTTON"][keyof GenericTheme["BUTTON"]];
export interface VariantSettings {
  customColorProp: 'HOVER' | 'ACTIVE',
  autoAdjustment: {
    relativeLightness: number,
    absoluteLightness: number,
  },
}

function compositeChroma(fg: string = '#000000', bg: string = '#FFFFFF'): Color {
  const a: number  = chroma(fg).alpha();
  const fgc: Color = chroma(fg).alpha(1);
  const bgc: Color = chroma(bg);
  return chroma.mix(fgc, bgc, 1-a);
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
    return compositeChroma(config.BG).set('hsl.l', `*${settings.autoAdjustment.relativeLightness}`).hex();
  }

  // If BG color is white or fully transparent, use white tinted with that FG color
  // Note: Setting absolute lightness will set alpha to fully opaque
  return chroma(config.FG).set('hsl.l', settings.autoAdjustment.absoluteLightness).hex();
}
// Given a BG and FG, calculate the variant color
export function getButtonHoverBg(config: ButtonConfig): string {
  return getButtonBgVariant(config, HoverVariantSettings);
}
export function getButtonActiveBg(config: ButtonConfig): string {
  return getButtonBgVariant(config, ActiveVariantSettings);
}

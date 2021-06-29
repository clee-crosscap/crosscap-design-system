import styled from 'styled-components/macro';
import { Dropdown } from 'react-bootstrap';
import chroma from 'chroma-js';

import * as GU from '@utility/General.utility'
import * as CU from '@utility/Color.utility'
import * as SU from '@utility/Svg.utility';
import * as Assets from '@assets/.';
import '@components/Tooltip/Tooltip.scss';

export { Dropdown } from 'react-bootstrap';

interface WidthProp {
  $width?: number | string,
}
interface ValidProp {
  $valid?: boolean,
}
interface InlineIconProp {
  $inlineIcon?: boolean,
}
export const ComponentLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${p => p.theme.TEXT_DARK};
  margin-bottom: 11px;
`;
export const ComponentInvalid = styled.div`
  margin-top: 8px;
  color: ${p => p.theme.INVALID};
  font-size: 13px;
  font-size: 400;
  letter-spacing: 0.2px;
`;
export const Input = styled.input<ValidProp & WidthProp & InlineIconProp>`
  width: ${p => ((typeof p.$width === 'string') && p.$width) || `${p.$width ?? 275}px`};
  height: 36px;
  padding: 0px 18px 0 ${p => p.$inlineIcon ? 42 : 18}px;
  border: 2px solid ${p => p.$valid !== false ? p.theme.GRAY_D8 : p.theme.INVALID};
  border-radius: 6px;
  color: ${p => p.theme.TEXT_DARK};
  outline: none;
  transition: border-color 0.15s ease-out, background-color 0.15s ease-out, padding-left 0.15s ease-out;
  font-size: 15px;
  line-height: 1.2;
  font-family: 'Roboto', 'Arial', 'sans-serif';
  background-color: #FFFFFF;

  &.hover,
  &:hover {
    border-color: ${p => p.$valid !== false ? '#999999' : p.theme.INVALID};
  }
  &.focus,
  &:focus {
    ${p => p.$inlineIcon ? 'padding-left: 18px;' : ''}
    border-color: ${p => p.$valid !== false ? p.theme.TEXT_DARK : p.theme.INVALID}
  }
  &.disabled,
  &:disabled {
    color: ${p => chroma.hex(p.theme.GRAY_84).alpha(0.3).css()};
    border-color: ${p => chroma.hex(p.theme.GRAY_D8).alpha(0.3).css()};
  }
  &::placeholder {
    opacity: 0.3;
    color: ${p => p.theme.TEXT_DARK};
  }
`;
interface TextareaProps {
  $lines: number,
  $resize: boolean | 'both' | 'horizontal' | 'vertical' | 'none',
}
export const Textarea = styled(Input).attrs({ as: 'textarea' })<TextareaProps>`
  min-height: 36px;
  height: ${p => Math.round(p.$lines * 15 * 1.2) + 8 + 8}px;
  max-width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  resize: ${p => ((p.$resize === true) && 'both') || ((p.$resize === false) && 'none') || `${p.$resize}`};
`;

interface ButtonTypeProp {
  $type: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'custom',
}

export const Button = styled.button<ButtonTypeProp>`
  min-width: ${p => p.$type === 'icon' ? 0 : 134}px;
  height: 36px;
  padding: 0 ${p => p.$type === 'icon' ? 8 : 8}px;
  border-radius: 8px;
  display: inline-grid;
  place-content: center;
  text-align: center;
  font-family: 'Roboto', 'Arial', sans-serif;
  font-size: 15px;
  font-weight: 500;
  transition: background 0.3s ease-out, opacity 0.3s ease-out;
  cursor: pointer;
  
  &,
  &.active,
  &:active,
  &.hover,
  &:hover {
    border: 0px solid transparent;
    outline: none;
    ${p => p.theme.BUTTON[p.$type]?.FG ? `color: ${p.theme.BUTTON[p.$type]?.FG};` : ``}
  }

  ${p => p.theme.BUTTON[p.$type]?.BG ? `background: ${p.theme.BUTTON[p.$type]?.BG};` : ``}

  &.hover,
  &:hover {
    ${p => p.theme.BUTTON[p.$type] ? `background: ${CU.getButtonHoverBg(p.theme.BUTTON[p.$type]!)};` : ``}
  }
  &.active,
  &:active {
    ${p => p.theme.BUTTON[p.$type] ? `background: ${CU.getButtonActiveBg(p.theme.BUTTON[p.$type]!)};` : ``}
  }
  &.disabled,
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    ${p => p.theme.BUTTON[p.$type]?.BG ? `background: ${p.theme.BUTTON[p.$type]?.BG};` : ``}
  }
`;

export const FooterAction = styled.button`
  padding: 0 27px;
  border-radius: 0;
  text-align: center;
  font-family: 'Roboto', 'Arial', sans-serif;
  font-size: 15px;
  font-weight: 400;
  transition: background 0.3s ease-out, opacity 0.3s ease-out;
  cursor: pointer;

  & {
    border-top: none;
    border-bottom: none;
    border-left: 1px solid ${p => p.theme.GRAY_E6};
    border-right: 1px solid ${p => p.theme.GRAY_E6};
  
    & + & {
      border-left: 0px solid transparent;
    }
  }

  align-self: stretch;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 10px;
  place-content: center;
  align-items: center;
  
  &,
  &.active,
  &:active,
  &.hover,
  &:hover {
    outline: none;
    color: ${p => p.theme.TEXT_DARK};
  }

  background: #FFFFFF;

  &.hover,
  &:hover {
    background: ${p => CU.getButtonHoverBg(p.theme.BUTTON.footer)};
  }
  &.active,
  &:active {
    background: ${p => CU.getButtonActiveBg(p.theme.BUTTON.footer)};
  }
  &.disabled,
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: #FFFFFF;
  }
`;

interface TextButtonProps {
  $color?: string,
  $weight?: number,
  $size?: number,
}
export const TextButton = styled.button<TextButtonProps>`
  padding: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  font-family: 'Roboto', 'Arial', sans-serif;
  font-size: ${p => p.$size ?? 13}px;
  font-weight: ${p => p.$weight ?? 500};
  transition: opacity 0.3s ease-out, color 0.3s ease-out;

  &,
  &.hover,
  &:hover,
  &.active,
  &:active,
  &.focus,
  &:focus {
    outline: none;
    background: transparent;
    border: 0px solid transparent;
    box-shadow: none;
  }
  & {
    ${p => p.theme.BUTTON.text.FG ? `color: ${p.theme.BUTTON.text.FG};` : ``}
  }
  &.hover,
  &:hover {
    ${p => `color: ${CU.getButtonHoverBg(p.theme.BUTTON.text)};`}
  }
  &.active,
  &:active {
    ${p => `color: ${CU.getButtonActiveBg(p.theme.BUTTON.text)};`}
  }

  &.disabled,
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
interface RemoveBorderProp {
  $removeBorder?: boolean,
}
interface ValidProp {
  $valid?: boolean,
}
export const DropdownToggle = styled(Dropdown.Toggle)<RemoveBorderProp & WidthProp & ValidProp>`
  padding: ${p => p.$removeBorder ? `0px` : `7px 15px`};
  width: ${p => p.$width ? ((typeof p.$width === 'number') ? `${p.$width}px` : p.$width) : '275px'};
  border-radius: 6px;
  display: grid;
  grid-column-gap: 8px;
  grid-auto-flow: column;
  grid-template-columns: auto;
  grid-auto-columns: min-content;
  justify-content: stretch;
  justify-items: start;
  align-items: center;
  cursor: pointer;
  font-family: 'Roboto','Arial',sans-serif;
  font-size: 15px;
  
  &:after {
    content: initial;
  }

  > :not(svg) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  &,
  &.hover,
  &:hover,
  &.active,
  &:active,
  &.focus,
  &:focus {
    outline: none;
    background: transparent;
    border: ${p => p.$removeBorder ? 0 : 2}px solid ${p => p.$valid === false ? p.theme.INVALID : p.theme.GRAY_E6};
    color: ${p => p.theme.TEXT_DARK};
    box-shadow: none;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  &.active,
  &:active,
  &[aria-expanded="true"] {
    border-color: ${p => p.$valid === false ? p.theme.INVALID : p.theme.TEXT_DARK};
  }
  
  &[aria-expanded="true"] .cds-dropdown-chevron {
    transform: rotate(180deg);
  }
`;
export const DropdownChevron = styled(SU.themedSvg(
  theme => ({ default: { color: theme.ICON_DARK} })
)).attrs(p => ({
  ...Assets.ChevronDownSvg.styledAttrs.toWidth(10),
  className: 'cds-dropdown-chevron',
}))`
`;
export const DropdownMenu = styled(Dropdown.Menu).attrs(p => ({ role: 'menu' }))<WidthProp>`
  width: ${p => p.$width ? ((typeof p.$width === 'number') ? `${p.$width}px` : p.$width) : '275px'};
  max-height: 300px;
  padding: 8px 0;
  border: 0px solid transparent;
  border-radius: 10px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #FFFFFF;
  overflow-y: auto;

  &:not(.show) {
    display: none;
  }
  &.show {
    z-index: 1000;
  }
`;
interface DisableChildrenProp {
  $disableChildren?: boolean,
}
export const DropdownItem = styled(Dropdown.Item).attrs(p => ({
  role: 'menuitem',
  draggable: 'false'
}))<DisableChildrenProp>`
  width: 100%;
  padding: 5px 18px 5px 18px;
  display: block;
  cursor: pointer;
  font-size: 15px;
  line-height: 1.5;
  white-space: nowrap;

  display: grid;
  grid-column-gap: 8px;
  grid-auto-flow: column;
  grid-template-columns: auto;
  grid-auto-columns: min-content;
  justify-content: stretch;
  justify-items: start;
  align-items: center;

  &,
  &.focus,
  &:focus,
  &.active,
  &:active,
  &.disabled,
  &:disabled {
    outline: none;
    color: ${p => p.theme.TEXT_DARK};
    text-decoration: initial;
  }
  &.hover,
  &:hover {
    background-color: ${p => p.theme.HOVER};
  }
  &[aria-disabled="true"] {
    cursor: not-allowed;

    &,
    &:hover {
      background-color: #FFFFFF;
    }

    ${p => p.$disableChildren ? `
      > * {
        pointer-events: auto;
        cursor: not-allowed;
        background-color: transparent;
        opacity: 0.5;
      }
    ` : `
      pointer-events: auto;
      cursor: not-allowed;
      background-color: transparent;
      opacity: 0.5;
    `}
  }
`;
interface DisabledProp {
  disabled?: boolean,
}
export const DropdownItemCheck = styled(SU.themedSvg(
  theme => ({ default: { color: theme.MODULE_PRIMARY } })
)).attrs(p => ({ 
  as: Assets.CheckSvg,
  width: 15,
  height: 10.5,
}))<DisabledProp>`
`;

interface CheckboxProp {
  $checkbox: boolean | undefined,
}
export const Checkbox = styled(SU.themedSvg(
  theme => ({ default: { color: theme.ICON_DARK } })
)).attrs({
  as: Assets.CheckboxUnifiedSvg,
  width: 20,
  height: 20,
})<CheckboxProp & DisabledProp>`
  cursor: pointer;
  opacity: 1;

  & {
    transition: opacity 0.3s ease-out;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .checkbox-yes,
  .checkbox-no,
  .checkbox-maybe {
    transition: opacity 0.1s ease-out;
  }

  .checkbox-yes   { opacity: ${p => (p.$checkbox === true     ) ? 1 : 0}; }
  .checkbox-no    { opacity: ${p => (p.$checkbox === false    ) ? 1 : 0}; }
  .checkbox-maybe { opacity: ${p => (p.$checkbox === undefined) ? 1 : 0}; }
`;
interface ToggleProp {
  $toggle: boolean,
}
export const Toggle = styled.button<ToggleProp>`
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: ${p => chroma(p.theme.MODULE_DARK).set('hsl.l', GU.lerp(p.$toggle ? 0 : 0.75, chroma(p.theme.MODULE_DARK).get('hsl.l'), 1)).hex().toUpperCase()};
  position: relative;
  cursor: pointer;
  opacity: 1;
  transition: background-color 300ms ease-in-out;

  &,
  &:hover,
  &:focus,
  &:active {
    outline: none;
    border: none;
    background-image: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: #FFFFFF;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.17);
    transform: translate3d(${p => p.$toggle ? 30 : 0}px, 0, 0);
    transition: transform 300ms ease-in-out;
  }
`;
const badgeFormatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  useGrouping: true,
  maximumFractionDigits: 0,
});
const badgeValueMap: Map<number, string> = new Map();
const getBadgeValue = ((v: number): string => {
  if(!badgeValueMap.has(v)) {
    badgeValueMap.set(v, badgeFormatter.format(v));
  }
  return badgeValueMap.get(v)!;
});
interface BadgeProps {
  $active: boolean,
  $count: number,
  $countAnimationId?: number | string,
}
export const Badge = styled.div<BadgeProps>`
  display: inline-block;
  padding: 0 8px;
  background-color: ${p => p.$active ? p.theme.MODULE_DARK : p.theme.GRAY_E6  };
  color:            ${p => p.$active ? '#FFFFFF'           : p.theme.TEXT_DARK};
  border-radius: 9px;
  line-height: 18px;
  font-size: 13px;
  font-weight: 500;
  transition: color 0.3s ease-out, background-color 0.3s ease-out;

  ${p => p.$active || (p.$countAnimationId === undefined) ? '' : `
    @keyframes cdsBadgePulse-${p.$countAnimationId} {
      ${(100 * 0    / 1600).toFixed(3)}%  { background-color: ${p.theme.GRAY_E6};     color: ${p.theme.TEXT_DARK}; transition: all 0s linear; }
      ${(100 * 150  / 1600).toFixed(3)}%  { background-color: ${p.theme.MODULE_DARK}; color: #FFFFFF;              transition: all 0s linear; }
      ${(100 * 250  / 1600).toFixed(3)}%  { background-color: ${p.theme.MODULE_DARK}; color: #FFFFFF;              transition: all 0s linear; }
      ${(100 * 1600 / 1600).toFixed(3)}%  { background-color: ${p.theme.GRAY_E6};     color: ${p.theme.TEXT_DARK}; transition: all 0s linear; }
    }
    animation: 1600ms cubic-bezier(0.5, 0, 0.5, 1.0) cdsBadgePulse-${p.$countAnimationId} 1;
  `}

  &:before {
    content: '${p => getBadgeValue(p.$count)}';
  }
`;

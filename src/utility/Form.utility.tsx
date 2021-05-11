import styled from 'styled-components/macro';
import { Dropdown } from 'react-bootstrap';
import chroma from 'chroma-js';

import * as CU from '@utility/Color.utility'

interface ValidProp {
  $valid?: boolean,
}
export const Input = styled.input<ValidProp>`
  max-width: 312px;
  width: 100%;
  height: 36px;
  padding: 0px 18px;
  border: 2px solid ${p => p.$valid !== false ? p.theme.GRAY_E6 : p.theme.INVALID};
  border-radius: 6px;
  color: ${p => p.theme.TEXT_DARK};
  outline: none;
  transition: border-color 0.15s ease-out, background-color 0.15s ease-out;
  font-size: 15px;
  line-height: 1.2;
  font-family: 'Roboto', 'Arial', 'sans-serif';

  &.focus,
  &:focus {
    border-color: ${p => p.$valid !== false ? p.theme.MODULE_LIGHT : p.theme.INVALID}
  }
  &.disabled,
  &:disabled {
    background-color: ${p => p.theme.INPUT_DISABLED};
    border-color: ${p => chroma.hex(p.theme.GRAY_E6).alpha(0.3).css()};
  }
  &::placeholder {
    opacity: 0.3;
    color: ${p => p.theme.TEXT_DARK};
  }
`;
interface ButtonTypeProp {
  $type: 'primary' | 'secondary' | 'custom',
}

export const Button = styled.button<ButtonTypeProp>`
  min-width: 134px;
  height: 36px;
  padding: 0 8px;
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
  // &.focus,
  // &:focus,
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
  // &.focus,
  // &:focus {
  //   ${p => p.theme.BUTTON[p.$type] ? `background: ${CU.getButtonFocusBg(p.theme.BUTTON[p.$type]!)};` : ``}
  // }
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
  padding: 0 27px 0 37px;
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
  // &.focus,
  // &:focus,
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
    background: ${p => CU.getButtonHoverBg({ BG: CU.getButtonBgFromHoverVariant(p.theme.FOOTER_HOVER), FG: '' })};
  }
  // &.focus,
  // &:focus {
  //   background: ${p => CU.getButtonFocusBg({ BG: CU.getButtonBgFromHoverVariant(p.theme.FOOTER_HOVER), FG: '' })};
  // }  
  &.active,
  &:active {
    background: ${p => CU.getButtonActiveBg({ BG: CU.getButtonBgFromHoverVariant(p.theme.FOOTER_HOVER), FG: '' })};
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
  font-size: ${p => p.$size ?? 12}px;
  font-weight: ${p => p.$weight ?? 500};
  transition: opacity 0.3s ease-out;

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
    color: ${p => p.$color ? p.$color: p.theme.MODULE_DARK};
  }
  &.disabled,
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
export const DropdownToggle = styled(Dropdown.Toggle)`
  display: grid;
  grid-column-gap: 8px;
  grid-auto-flow: column;
  align-items: center;
  cursor: pointer;
  font-family: 'Roboto','Arial',sans-serif;

  &:after {
    content: initial;
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
    border: 0px solid transparent;
    color: ${p => p.theme.TEXT_DARK};
    box-shadow: none;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
export const DropdownMenu = styled(Dropdown.Menu)`
  min-width: 160px;
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
export const DropdownItem = styled(Dropdown.Item)`
  width: 100%;
  padding: 5px 18px 5px 18px;
  display: block;
  cursor: pointer;
  font-size: 15px;
  line-height: 1.5;
  white-space: nowrap;
  
  &,
  &.focus,
  &:focus,
  &.active,
  &:active,
  &.disabled,
  &:disabled {
    outline: none;
    color: ${p => p.theme.TEXT_DARK};
    background-color: #FFFFFF;
  }
  &,
  &.focus,
  &:focus {
    outline: none;
  }
  &.hover,
  &:hover {
    background-color: ${p => p.theme.HOVER};
  }
  &,
  &.focus,
  &:focus,
  &.hover,
  &:hover {
    text-decoration: initial;
  }
  &[aria-disabled="true"] {
    pointer-events: auto;
    cursor: not-allowed;
    background-color: transparent;
    opacity: 0.5;
  }
`;

import styled from 'styled-components/macro';
import chroma from 'chroma-js';

interface GridProps {
  $columns?: number,
  $rows?: number,
  $columnGap?: number,
  $rowGap?: number,
  $justifyContent?: string,
  $alignContent?: string,
  $placeContent?: string,
  $justifyItems?: string,
  $alignItems?: string,
  $placeItems?: string,
}
const Grid = styled.div<GridProps>`
  ${p => p.$columns        ? `grid-template-columns: ${'auto '.repeat(p.$columns)};` : ''}
  ${p => p.$rows           ? `grid-template-rows:    ${'auto '.repeat(p.$rows)};`    : ''}

  ${p => p.$columnGap      ? `grid-column-gap:       ${p.$columnGap}px;`             : ''}
  ${p => p.$rowGap         ? `grid-row-gap:          ${p.$rowGap}px;`                : ''}

  ${p => p.$justifyContent ? `justify-content:       ${p.$justifyContent};`          : ''}
  ${p => p.$alignContent   ? `align-content:         ${p.$alignContent};`            : ''}
  ${p => p.$placeContent   ? `place-content:         ${p.$placeContent};`            : ''}
  ${p => p.$justifyItems   ? `justify-items:         ${p.$justifyItems};`            : ''}
  ${p => p.$alignItems     ? `align-items:           ${p.$alignItems};`              : ''}
  ${p => p.$placeItems     ? `place-items:           ${p.$placeItems};`              : ''}
`;
export const BlockRowMajorGrid = styled(Grid)`
  display: grid;
  grid-auto-flow: row;
`;
export const InlineRowMajorGrid = styled(Grid)`
  display: inline-grid;
  grid-auto-flow: row;
`;
export const BlockColumnMajorGrid = styled(Grid)`
  display: grid;
  grid-auto-flow: column;
`;
export const InlineColumnMajorGrid = styled(Grid)`
  display: inline-grid;
  grid-auto-flow: column;
`;

interface MarginProp {
  $margin?: number,
  $marginLeft?: number,
  $marginRight?: number,
}
interface ColumnGapProp {
  $columnGap?: number,
}
export const TabRow = styled.div<MarginProp & ColumnGapProp>`
  width: calc(100% + ${p => (p.$marginLeft ?? p.$margin ?? 0) + (p.$marginRight ?? p.$margin ?? 0)});
  padding-left: ${p => -(p.$marginLeft ?? p.$margin ?? 0)}px;
  margin-left: ${p => p.$marginLeft ?? p.$margin ?? 0}px;
  margin-right: ${p => p.$marginRight ?? p.$margin ?? 0}px;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${p => p.$columnGap ?? 0}px;
  place-content: start;
  position: relative;
  overflow-x: auto;
  padding-bottom: 10px;
  margin-bottom: -10px;

  :before {
    content: '';
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    height: 40px;
  }
`;
interface SelectedProp {
  $selected: boolean,
}
export const Tab = styled.button<SelectedProp>`
  padding: 0 20px;
  height: 40px;
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 6px;
  align-items: center;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: ${p => p.$selected ? p.theme.MODULE_PRIMARY : p.theme.TEXT_DARK};
  cursor: pointer;
  position: relative;

  &,
  &:hover,
  &:focus,
  &:active {
    border: 0px solid transparent;
    outline: none;
    background: transparent;
  }

  [disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  :before {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    height: 3px;
    margin: 0 auto;
    background-color: ${p => p.theme.MODULE_DARK};
    width: ${p => p.$selected ? 100 : 0}%;
    opacity: ${p => p.$selected ? 1 : 0};
    transition: background 0.3s ease-out, width 0.3s ease-out, opacity 0.3s ease-out;
  }

  &:hover,
  &:active {
    :before {
      width: 100%;
      opacity: 1;
    }
  }
  &:active {
    :before {
      background-color: ${p => p.$selected ? p.theme.MODULE_DARK : chroma(p.theme.MODULE_DARK).set('hsl.l', '*0.5').hex().toUpperCase()}
    }
  }
`;
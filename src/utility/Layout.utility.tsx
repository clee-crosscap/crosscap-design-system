import { Popover } from 'react-bootstrap';
import styled from 'styled-components/macro';
import chroma from 'chroma-js';

import * as FU from '@utility/Form.utility';


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

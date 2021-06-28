import styled from 'styled-components/macro';

interface GridProps {
  $columns?: number,
  $rows?: number,
  $templateColumns?: string,
  $templateRows?: string,
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
  ${p => p.$templateColumns || p.$columns ? `grid-template-columns: ${p.$templateColumns ?? 'auto '.repeat(p.$columns ?? 0)};` : ''}
  ${p => p.$templateRows    || p.$rows    ? `grid-template-rows:    ${p.$templateRows    ?? 'auto '.repeat(p.$rows    ?? 0)};`    : ''}

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

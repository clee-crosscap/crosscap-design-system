import styled from 'styled-components/macro';

interface Settings {
  $stroke?: string,
  $fill?: string,
  $fillStroke?: string,
  $strokeWidth?: number,
  $hoverStroke?: string,
  $hoverFill?: string,
  $hoverFillStroke?: string,
  $activeStroke?: string,
  $activeFill?: string,
  $activeFillStroke?: string,
  $disabled?: boolean,
  $disabledStroke?: string,
  $disabledFill?: string,
  $disabledFillStroke?: string,
  $transitionMillis?: number,
}

const getConditionalRule = (rule: string, prop: string, value?: number | string): string => {
  return (value === undefined || value === null) ? '' : `${rule} { ${prop}: ${value}; }`;
}

// Lowercase to override the base type
export const styledSvg = (s?: Settings) => styled.div.attrs(props => s ?? {})<Settings>`
  // For convenience so styled-components padding can be defined
  // independently of width and height component props
  box-sizing: content-box;

  > * {
    pointer-events: none;
    line-height: 0;
  }

  [fill="#000"],
  [stroke="#000"] {
    ${p => Number.isFinite(p.$transitionMillis) ? `transition: fill ${p.$transitionMillis}ms ease-in-out, stroke ${p.$transitionMillis}ms ease-in-out;` : ``}
  }

  ${p => getConditionalRule('[stroke-width]', 'stroke-width', p.$strokeWidth)}
  
  ${p => getConditionalRule('[fill="#000"]',   'fill',   p.$fill   || p.$fillStroke)}
  ${p => getConditionalRule('[stroke="#000"]', 'stroke', p.$stroke || p.$fillStroke)}

  ${p => getConditionalRule('[fill="#000"]',   'fill',   p.$disabled ? (p.$disabledFill   || p.$disabledFillStroke) : undefined)}
  ${p => getConditionalRule('[stroke="#000"]', 'stroke', p.$disabled ? (p.$disabledStroke || p.$disabledFillStroke) : undefined)}

  &:hover {
    ${p => getConditionalRule('[fill="#000"]',   'fill',   p.$hoverFill   || p.$hoverFillStroke)}
    ${p => getConditionalRule('[stroke="#000"]', 'stroke', p.$hoverStroke || p.$hoverFillStroke)}
  }
  &.active {
    ${p => getConditionalRule('[fill="#000"]',   'fill',   p.$activeFill   || p.$activeFillStroke)}
    ${p => getConditionalRule('[stroke="#000"]', 'stroke', p.$activeStroke || p.$activeFillStroke)}
  }
`;


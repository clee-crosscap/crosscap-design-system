import styled, { DefaultTheme, ThemeProvider } from 'styled-components/macro';

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
export const styledSvg = (s?: Settings) => styled.svg.attrs(props => s ?? {})<Settings>`
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
    ${p => getConditionalRule('[fill="#000"]',   'fill',   p.$disabled ? undefined : (p.$hoverFill   || p.$hoverFillStroke))}
    ${p => getConditionalRule('[stroke="#000"]', 'stroke', p.$disabled ? undefined : (p.$hoverStroke || p.$hoverFillStroke))}
  }
  &.active {
    ${p => getConditionalRule('[fill="#000"]',   'fill',   p.$disabled ? undefined : (p.$activeFill   || p.$activeFillStroke))}
    ${p => getConditionalRule('[stroke="#000"]', 'stroke', p.$disabled ? undefined : (p.$activeStroke || p.$activeFillStroke))}
  }
`;

interface DynamicSettings {
  strokeWidth?: number,
  transitionMillis?: number,
  default?: {
    stroke?: string,
    fill?: string,
    color?: string,
  },
  disabled?: {
    stroke?: string,
    fill?: string,
    color?: string,
  },
  hover?: {
    stroke?: string,
    fill?: string,
    color?: string,
  },
  active?: {
    stroke?: string,
    fill?: string,
    color?: string,
  },
}
type GenericTheme = DefaultTheme<string, string, string>;
export const dynamicallyStyledSvg = (settingsFn: (theme: GenericTheme) => DynamicSettings) => styled.svg`
  ${props => {
    const p: DynamicSettings = settingsFn(props.theme);
    return `
      // For convenience so styled-components padding can be defined
      // independently of width and height component props
      box-sizing: content-box;

      > * {
        pointer-events: none;
        line-height: 0;
      }

      ${getConditionalRule('[stroke-width]', 'stroke-width', p.strokeWidth)}

      ${!Number.isFinite(p.transitionMillis) ? '' : `
        [fill="#000"],
        [stroke="#000"] {
          transition: fill ${p.transitionMillis}ms ease-in-out, stroke ${p.transitionMillis}ms ease-in-out;
        }
      `}

      &[disabled] {
        ${getConditionalRule('[fill="#000"]',   'fill',   p.disabled?.fill   || p.disabled?.color)}
        ${getConditionalRule('[stroke="#000"]', 'stroke', p.disabled?.stroke || p.disabled?.color)}
      }

      &:not([disabled]) {
        ${getConditionalRule('[fill="#000"]',   'fill',   p.default?.fill   || p.default?.color)}
        ${getConditionalRule('[stroke="#000"]', 'stroke', p.default?.stroke || p.default?.color)}

        &:hover {
          ${getConditionalRule('[fill="#000"]',   'fill',   p.hover?.fill   || p.hover?.color)}
          ${getConditionalRule('[stroke="#000"]', 'stroke', p.hover?.stroke || p.hover?.color)}
        }
        &.active {
          ${getConditionalRule('[fill="#000"]',   'fill',   p.active?.fill   || p.active?.color)}
          ${getConditionalRule('[stroke="#000"]', 'stroke', p.active?.stroke || p.active?.color)}
        }
      }
    }
  `}
}`;

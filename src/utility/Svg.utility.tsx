import styled, { DefaultTheme } from 'styled-components/macro';

const getConditionalRule = (rule: string, prop: string, value?: number | string): string => {
  return (value === undefined || value === null) ? '' : `${rule} { ${prop}: ${value}; }`;
}

interface ThemedSvgSettings {
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
export const themedSvg = (settingsFn?: (theme: GenericTheme) => ThemedSvgSettings) => styled.svg`
  ${props => {
    const p: ThemedSvgSettings = settingsFn?.(props.theme) ?? {};
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
interface DisabledProp {
  disabled?: boolean,
}
export const CommonBlackSvg = styled(themedSvg(
  theme => ({ default: { color: theme.ICON_DARK } })
))<DisabledProp>`
  cursor: ${p => p.disabled ? 'not-allowed' : 'pointer'};
`;
export const CommonRedSvg = styled(themedSvg(
  theme => ({ default: { color: theme.INVALID } })
))<DisabledProp>`
  cursor: ${p => p.disabled ? 'not-allowed' : 'pointer'};
`;
export const CommonInlineSvg = styled(themedSvg(
  theme => ({ default: { color: '#C2C2C2' }})
))`
  pointer-events: none;
`;
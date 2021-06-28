import React from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import chroma from 'chroma-js';

// import * as SU from '@utility/Svg.utility';
import * as Themes from '@components/Theme';

const Gallery = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 40px;
  display: grid;
  place-content: start;
  grid-auto-flow: row;
  grid-row-gap: 40px;
  overflow-y: auto;

  &:after {
    content: '';
    height: 1px;
  }
`;
const GallerySection = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 12px;
  place-content: start;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
// const SectionHeader = styled.div`
//   font-size: 18px;
//   color: ${p => p.theme.TEXT_DARK};
//   display: block;
// `;
const SectionGallery = styled.div`
  display: inline-grid;
  grid-auto-flow: row;
  grid-column-gap: 4px;
  grid-row-gap: 4px;
  justify-content: start;
  grid-template-columns: repeat(6, 80px);
  grid-auto-rows: 80px;
`;
const HR = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${p => p.theme.DIVIDER};
`;
interface ColorProp {
  $color: string,
}
const StyledPaletteColor = styled.div<ColorProp>`
  background-color: ${p => p.$color};
  display: grid;
  place-content: center;
  text-align: center;
  color: ${p => (chroma(p.$color).luminance() >= 0.5) ? '#000' : '#FFF'};
`;
interface MarginProps {
  $marginTop?: number,
  $marginBottom?: number,
}
const Line = styled.div<MarginProps>`
  display: block;
  margin-top: ${p => p.$marginTop ?? 0}px;
  margin-bottom: ${p => p.$marginBottom ?? 0}px;
`;
interface PaletteColor {
  color: string,
  text: string,
  tooltip: string,
}
type UncommonPaletteConfig = [ PaletteColor, ...PaletteColor[] ];
type CommonPaletteConfig = UncommonPaletteConfig & { length: 14 };
type GenericTheme = DefaultTheme<string, string, string>;

const createThemeConfig = ((theme: GenericTheme): CommonPaletteConfig => [
  { color: theme.MODULE_PRIMARY, text: 'Primary', tooltip: 'Module Primary' },
  { color: theme.MODULE_DARK, text: 'Dark', tooltip: 'Module Color Dark' },
  { color: theme.MODULE_LIGHT, text: 'Light', tooltip: 'Module Color Light' },
  { color: theme.HOVER, text: 'Hover', tooltip: 'Module Selection Hover' },
  { color: theme.TEXT_DARK, text: 'Text', tooltip: 'Text Dark' },
  { color: theme.ICON_DARK, text: 'Icon', tooltip: 'Icon Dark' },
  { color: theme.GRAY_84, text: 'Gray 84', tooltip: 'Gray 1' },
  { color: theme.GRAY_D8, text: 'Gray D8', tooltip: 'Gray 2' },
  { color: theme.GRAY_E6, text: 'Gray E6', tooltip: 'Gray 3' },
  { color: theme.DIVIDER, text: 'Divider', tooltip: 'Divider' },
  { color: theme.HIGHLIGHT, text: 'Highlight', tooltip: 'Highlight' },
  { color: theme.HIGHLIGHT_FOCUS, text: 'Highlight Focus', tooltip: 'Highlight Focus' },
  { color: theme.BANNER, text: 'Banner', tooltip: 'Banner' },
  { color: theme.INVALID, text: 'Invalid', tooltip: 'Invalid' },
]);

export default function PaletteGallery() {
  const createPalette = ((theme: GenericTheme): JSX.Element => (
    <>
      {
        createThemeConfig(theme).map(({ color, text, tooltip }, i) => (
          <OverlayTrigger
            key={i}
            placement="bottom"
            overlay={<Tooltip id={`Palette-${text}`}>{tooltip}</Tooltip>}
          >
            <StyledPaletteColor $color={color}>
              <Line>
                <Line>{color}</Line>
                <Line>{text}</Line>
              </Line>
            </StyledPaletteColor>
          </OverlayTrigger>
        ))
      }
    </>
  ));

  return (
    <Gallery>
      {
        Object.values(Themes).map((theme,i,arr) => (
          <React.Fragment key={theme.NAME}>
            <Title>{ theme.NAME }</Title>
            <SectionGallery>{ createPalette(theme) }</SectionGallery>
            {
              (i < (arr.length-1)) &&
              <HR />
            }
          </React.Fragment>
        ))
      }

      <HR/>

      <GallerySection>
        <Title>TODO: Proofing Palette</Title>
        <SectionGallery>
        </SectionGallery>
      </GallerySection>

      <HR />

      Note: #00000019 on #FFFFFF composites to #E6E6E6
    </Gallery>
  );
}


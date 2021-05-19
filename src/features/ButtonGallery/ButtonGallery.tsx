import React from 'react';
import styled from 'styled-components/macro';

import * as FU from '@utility/Form.utility';
import * as SU from '@utility/Svg.utility';
import CrosscapTheme from '@components/Theme/CrosscapTheme';
import * as Assets from '@assets/.';

const CommonRedSvg = styled(SU.styledSvg({ $fillStroke: CrosscapTheme.INVALID }))``;

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
const SectionHeader = styled.div`
  font-size: 18px;
  color: ${p => p.theme.TEXT_DARK};
  display: block;
`;
const SectionContent = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  justify-content: start;
  align-items: center;
`;
const RedButton = styled(FU.Button).attrs({
  theme: { BUTTON: { custom: { FG: CrosscapTheme.INVALID, BG: 'rgba(0, 0, 0, 0)' } } }
})`
  display: inline-grid;
  align-items: center;
  grid-auto-flow: column;
  grid-column-gap: 6px;
`;
const HR = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${p => p.theme.DIVIDER};
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
export default function ButtonGallery() {
  return (
    <Gallery>
      <GallerySection>
        <Title>Form Buttons</Title>
        <SectionHeader>
          Usually tied to changes within the application data. Often results in navigation on confirming or discarding the changes.
          May be accompanied by icons.
        </SectionHeader>
        <SectionContent>
          <RedButton $type="custom">
            <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
            <span>Delete</span>
          </RedButton>
          <FU.Button $type="secondary">Cancel</FU.Button>
          <FU.Button $type="primary">Submit</FU.Button>
        </SectionContent>
        <SectionContent>
          <RedButton $type="custom">
            <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
            <span>Generously Sized</span>
          </RedButton>
          <FU.Button $type="secondary">Generously Sized</FU.Button>
          <FU.Button $type="primary">Generously Sized</FU.Button>
        </SectionContent>
        <SectionHeader>
          <Line $marginBottom={6}>Has hovered, active, and disabled treatments.</Line>
          <Line>Hovered: -5% lightness of BG (absolute) if non-transparent/white - otherwise 97.0% lightness of FG (absolute)</Line>
          <Line>Active: -12% lightess of BG (absolute) if non-transparent/white - otherwise 92.5% lightness of FG (absolute)</Line>
          <Line>Disabled: 50% opacity</Line>
        </SectionHeader>

        <SectionContent>
          <RedButton $type="custom" className={`hover`}>
            <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
            <span>Hovered</span>
          </RedButton>
          <FU.Button $type="secondary" className={`hover`}>Hovered</FU.Button>
          <FU.Button $type="primary" className={`hover`}>Hovered</FU.Button>
        </SectionContent>
        <SectionContent>
          <RedButton $type="custom" className={`active`}>
            <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
            <span>Active</span>
          </RedButton>
          <FU.Button $type="secondary" className={`active`}>Active</FU.Button>
          <FU.Button $type="primary" className={`active`}>Active</FU.Button>
        </SectionContent>
        <SectionContent>
          <RedButton $type="custom" disabled>
            <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
            <span>Disabled</span>
          </RedButton>
          <FU.Button $type="secondary" disabled>Disabled</FU.Button>
          <FU.Button $type="primary" disabled>Disabled</FU.Button>
        </SectionContent>

        <SectionHeader>
          No RTL treatments have currently been defined.
        </SectionHeader>
      </GallerySection>

      <HR/>

      <GallerySection>
        <Title>Text Buttons</Title>
        <SectionHeader>
          Used to handle batch selections.
          No special treatments for hover or pressed states.
        </SectionHeader>
        <SectionContent>
          <FU.TextButton>Select All</FU.TextButton>
          <FU.TextButton>Clear</FU.TextButton>
        </SectionContent>
        <SectionHeader>
          Disabled state is used when no action would be performed, for example, when no items are available.
        </SectionHeader>
        <SectionContent>
          <FU.TextButton disabled>Select All</FU.TextButton>
          <FU.TextButton disabled>Clear</FU.TextButton>
        </SectionContent>

        <HR/>

        <SectionHeader>
          <Title>Icon Buttons</Title>
          TODO
        </SectionHeader>
      </GallerySection>
    </Gallery>
  );
}


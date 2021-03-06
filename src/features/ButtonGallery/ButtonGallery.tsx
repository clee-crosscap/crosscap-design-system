import React from 'react';
import styled from 'styled-components/macro';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import * as FU from '@utility/Form.utility';
import * as SU from '@utility/Svg.utility';
import * as LU from '@utility/Layout.utility';
import CrosscapTheme from '@components/Theme/CrosscapTheme';
import * as Assets from '@assets/.';

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
const FilterIcon     = styled(SU.CommonBlackSvg).attrs(p => Assets.FilterSvg.styledAttrs.toWidth(18))``;
const GearFilledIcon = styled(SU.CommonBlackSvg).attrs(p => Assets.GearFilledSvg.styledAttrs.toWidth(22))``;
const ExportIcon     = styled(SU.CommonBlackSvg).attrs(p => Assets.ExportSvg.styledAttrs.toWidth(22))``;

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
          <FU.Button $type="primary">Primary</FU.Button>
          <FU.Button $type="secondary">Secondary</FU.Button>
          <FU.Button $type="tertiary">Tertiary</FU.Button>
          <RedButton $type="custom">
            <SU.CommonRedSvg {...Assets.TrashSvg.styledAttrs.toWidth(19)} />
            <span>Custom</span>
          </RedButton>
        </SectionContent>
        <SectionContent>
          <FU.Button $type="primary">Generously Sized</FU.Button>
          <FU.Button $type="secondary">Generously Sized</FU.Button>
          <FU.Button $type="tertiary">Generously Sized</FU.Button>
          <RedButton $type="custom">
            <SU.CommonRedSvg {...Assets.TrashSvg.styledAttrs.toWidth(19)} />
            <span>Generously Sized</span>
          </RedButton>
        </SectionContent>
        <SectionHeader>
          <Line $marginBottom={6}>Has hovered, active, and disabled treatments.</Line>
          <Line>Hovered BG: 80% relative lightness of BG if non-transparent or white - otherwise 90% absolute lightness of FG</Line>
          <Line>Active BG: 60% relative lightess of BG if non-transparent or white - otherwise 70% absolute lightness of FG</Line>
          <Line>Disabled: 50% opacity</Line>
        </SectionHeader>

        <SectionContent>
          <FU.Button $type="primary" className={`hover`}>Hovered</FU.Button>
          <FU.Button $type="secondary" className={`hover`}>Hovered</FU.Button>
          <FU.Button $type="tertiary" className={`hover`}>Hovered</FU.Button>
          <RedButton $type="custom" className={`hover`}>
            <SU.CommonRedSvg {...Assets.TrashSvg.styledAttrs.toWidth(19)} />
            <span>Hovered</span>
          </RedButton>
        </SectionContent>
        <SectionContent>
          <FU.Button $type="primary" className={`active`}>Active</FU.Button>
          <FU.Button $type="secondary" className={`active`}>Active</FU.Button>
          <FU.Button $type="tertiary" className={`active`}>Active</FU.Button>
          <RedButton $type="custom" className={`active`}>
            <SU.CommonRedSvg {...Assets.TrashSvg.styledAttrs.toWidth(19)} />
            <span>Active</span>
          </RedButton>
        </SectionContent>
        <SectionContent>
          <FU.Button $type="primary" disabled>Disabled</FU.Button>
          <FU.Button $type="secondary" disabled>Disabled</FU.Button>
          <FU.Button $type="tertiary" disabled>Disabled</FU.Button>
          <RedButton $type="custom" disabled>
            <SU.CommonRedSvg {...Assets.TrashSvg.styledAttrs.toWidth(19)} />
            <span>Disabled</span>
          </RedButton>
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
        </SectionHeader>
        <SectionContent>
          <FU.TextButton>Select All</FU.TextButton>
          <FU.TextButton>Clear</FU.TextButton>
        </SectionContent>
        <SectionHeader>
          Text buttons also have multiple states.
        </SectionHeader>
        <SectionContent>
          <FU.TextButton>Default</FU.TextButton>
          <FU.TextButton className={'hover'}>Hovered</FU.TextButton>
          <FU.TextButton className={'active'}>Active</FU.TextButton>
          <FU.TextButton disabled>Disabled</FU.TextButton>
        </SectionContent>

        <HR/>

        <SectionHeader>
          <Title>Icon Buttons</Title>
        </SectionHeader>
        <SectionHeader>
          Icon buttons have multiple states.  Icon buttons should have a tooltip that appears after 0.5s delay indicating what the button represents.
          Icons may also need to be offset slightly if the perceptual centroid is not at the center of the svg asset.
        </SectionHeader>
        <SectionContent>
          <LU.InlineRowMajorGrid $columns={4} $alignItems="center" $columnGap={8} $rowGap={12}>
            <span>Default</span>
            <OverlayTrigger placement="top" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-filter">Filters</Tooltip>}>
              <FU.Button $type="icon"><FilterIcon /></FU.Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-gear">Settings</Tooltip>}>
              <FU.Button $type="icon"><GearFilledIcon /></FU.Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-export">Export</Tooltip>}>
              <FU.Button $type="icon"><ExportIcon /></FU.Button>
            </OverlayTrigger>

            <span>Hover</span>
            <OverlayTrigger placement="top" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-filter2">Filters</Tooltip>}>
              <FU.Button $type="icon" className="hover"><FilterIcon /></FU.Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-gear2">Settings</Tooltip>}>
              <FU.Button $type="icon" className="hover"><GearFilledIcon /></FU.Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-export2">Export</Tooltip>}>
              <FU.Button $type="icon" className="hover"><ExportIcon /></FU.Button>
            </OverlayTrigger>

            <span>Active</span>
            <OverlayTrigger placement="top" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-filter3">Filters</Tooltip>}>
              <FU.Button $type="icon" className="active"><FilterIcon /></FU.Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-gear3">Settings</Tooltip>}>
              <FU.Button $type="icon" className="active"><GearFilledIcon /></FU.Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-export3">Export</Tooltip>}>
              <FU.Button $type="icon" className="active"><ExportIcon /></FU.Button>
            </OverlayTrigger>

            <span>Disabled</span>
            <OverlayTrigger placement="top" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-filter4">Filters</Tooltip>}>
              <FU.Button $type="icon" disabled><FilterIcon /></FU.Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-gear4">Settings</Tooltip>}>
              <FU.Button $type="icon" disabled><GearFilledIcon /></FU.Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-export4">Export</Tooltip>}>
              <FU.Button $type="icon" disabled><ExportIcon /></FU.Button>
            </OverlayTrigger>
          </LU.InlineRowMajorGrid>
        </SectionContent>
      </GallerySection>
    </Gallery>
  );
}


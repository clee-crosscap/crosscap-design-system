import React from 'react';
import styled from 'styled-components/macro';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import * as SU from '@utility/Svg.utility';
import * as Assets from '@assets/.';
import CrosscapTheme from '@components/Theme/CrosscapTheme';

const {
  AlertSvg,
  CheckSvg,
  CheckboxUnifiedSvg,
  ChevronSvg,
  CloseSvg,
  ExportSvg,
  FilterSvg,
  GearFilledSvg,
  InfoSvg,
  MagnifyingGlassSvg,
  PencilSvg,
  TrashSvg,
  ..._otherSvgs
} = Assets;

const iconConfigs: Array<{ component: React.ComponentType, text: string }> = [
  { component: AlertSvg,           text: 'Alert'              },
  { component: CheckSvg,           text: 'Check'              },
  { component: CheckboxUnifiedSvg, text: 'Checkbox (unified)' },
  { component: ChevronSvg,         text: 'Chevron'            },
  { component: CloseSvg,           text: 'Close'              },
  { component: ExportSvg,          text: 'Export'             },
  { component: FilterSvg,          text: 'Filter'             },
  { component: GearFilledSvg,      text: 'Gear (Filled)'      },
  { component: InfoSvg,            text: 'Info'               },
  { component: PencilSvg,          text: 'Pencil'             },
  { component: MagnifyingGlassSvg, text: 'Magnifying Glass'   },
  { component: TrashSvg,           text: 'Trash'              },
];

const CommonBlackSvg = styled(SU.styledSvg({ $fillStroke: CrosscapTheme.ICON_DARK }))`
`;
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
const SectionGallery = styled.div`
  display: inline-grid;
  grid-auto-flow: row;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  justify-content: start;
  align-items: center;
  grid-template-columns: repeat(10, 40px);
  grid-auto-rows: 40px;
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
export default function IconGallery() {
  return (
    <Gallery>
      <GallerySection>
        <Title>Icons</Title>
        <SectionHeader>
          TODO: Group Icons By Sections?
        </SectionHeader>
        <SectionGallery>
          {
            iconConfigs.map((iconConfig, i) => {
              return (
                <OverlayTrigger
                  key={i}
                  placement="bottom"
                  overlay={<Tooltip id={`Icon-${iconConfig.text}`}>{iconConfig.text}</Tooltip>}
                >
                  <CommonBlackSvg as={iconConfig.component} />
                </OverlayTrigger>    
              )
            })
          }
        </SectionGallery>
      </GallerySection>
    </Gallery>
  );
}


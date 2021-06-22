import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import * as FU from '@utility/Form.utility';
import * as SU from '@utility/Svg.utility';
import CrosscapTheme from '@components/Theme/CrosscapTheme';
import * as Assets from '@assets/.';

const CommonBlackSvg = styled(SU.styledSvg({ $fillStroke: CrosscapTheme.ICON_DARK }))`
  cursor: pointer;
`;
const CommonModuleLightSvg = styled(SU.styledSvg({ $fillStroke: CrosscapTheme.MODULE_LIGHT }))`
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
const SectionContent = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 24px;
  justify-content: start;
  align-items: center;
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
const Info = styled(CommonBlackSvg)`
  cursor: help;

  && {
    opacity: 1;
  }
`;
const LabelledTooltip = styled.span`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 6px;
  place-content: start;
  align-items: center;
`;
const OverflowToggle = styled.div`
  margin: -8px;
  padding: 8px;
  overflow: hidden;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
`;
interface MaxWidthProp {
  $maxWidth: number | 'auto' | 'none',
}
const EllipsisContainer = styled.div<MaxWidthProp>`
  ${p => (p.$maxWidth === 'none') ? `` :
    `
      max-width: ${(p.$maxWidth === 'auto') ? 'auto' : `${p.$maxWidth}px`};
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `
  }
`;
const DropdownItemWithTooltip = styled(FU.DropdownItem)`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto;
`;
const DeleteAction = styled(DropdownItemWithTooltip)`
  && {
    color: ${p => p.theme.INVALID};
  }
`;
const LabelledCheckbox = styled.div`
  display: inline-grid;
  align-items: center;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  cursor: pointer;
`;

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vel est felis. Mauris ipsum ligula, accumsan vel fermentum sit amet, sodales eu augue. Maecenas vulputate malesuada mi eu blandit. Nullam at facilisis est. Duis a consequat ipsum. Maecenas ultrices in nibh quis laoreet. Praesent ante diam, placerat eleifend velit ac, iaculis tincidunt nisi. Nulla pharetra enim ac urna scelerisque, et iaculis magna sagittis. Fusce lectus nunc, aliquet quis elementum vel, facilisis nec sapien. Pellentesque eget magna eget orci eleifend commodo. Quisque ac nibh dignissim, convallis risus posuere, aliquam leo. Nullam commodo id massa sed sodales.`;

export default function ButtonGallery() {
  const [ inputRef, setInputRef ] = useState<HTMLDivElement | undefined>(undefined);
  const [ overflowShow, setOverflowShow ] = useState<boolean>(false);
  const [ overflowSmall, setOverflowSmall ] = useState<boolean>(false);
  
  return (
    <Gallery>
      <GallerySection>
        <Title>Icon Tooltips</Title>
        <SectionHeader>
          Label Tooltips
        </SectionHeader>
        <SectionContent>
          <LabelledTooltip>
            <span>Auto</span>
            <OverlayTrigger placement="auto" overlay={<Tooltip id="IconTooltips-auto">Tooltip Content</Tooltip>}>
              <Info as={Assets.InfoSvg} width={14} height={14} />
            </OverlayTrigger>
          </LabelledTooltip>

          <LabelledTooltip>
            <span>Above</span>
            <OverlayTrigger placement="top" overlay={<Tooltip id="IconTooltips-top">Tooltip Content</Tooltip>}>
              <Info as={Assets.InfoSvg} width={14} height={14} />
            </OverlayTrigger>
          </LabelledTooltip>

          <LabelledTooltip>
            <span>Below</span>
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="IconTooltips-bottom">Tooltip Content</Tooltip>}>
              <Info as={Assets.InfoSvg} width={14} height={14} />
            </OverlayTrigger>
          </LabelledTooltip>

          <LabelledTooltip>
            <span>Left</span>
            <OverlayTrigger placement="left" overlay={<Tooltip id="IconTooltips-left">Tooltip Content</Tooltip>}>
              <Info as={Assets.InfoSvg} width={14} height={14} />
            </OverlayTrigger>
          </LabelledTooltip>
        
          <LabelledTooltip>
            <span>Tooltip Right</span>
            <OverlayTrigger placement="right" overlay={<Tooltip id="IconTooltips-right">Tooltip Content</Tooltip>}>
              <Info as={Assets.InfoSvg} width={14} height={14} />
            </OverlayTrigger>
          </LabelledTooltip>
        </SectionContent>
        <SectionContent>
          <LabelledTooltip>
            <span>Lorem Ipsum</span>
            <OverlayTrigger placement="auto" overlay={
              <Tooltip id="IconTooltips-auto">
                {LOREM_IPSUM}
              </Tooltip>
            }>
              <Info as={Assets.InfoSvg} width={14} height={14} />
            </OverlayTrigger>
          </LabelledTooltip>
        </SectionContent>
      </GallerySection>

      <HR />

      <GallerySection>
        <Title>Icon Buttons</Title>
        <SectionHeader>
          Tooltips can be used to provide information about actions associated with icons.
        </SectionHeader>
        <SectionContent>
          <OverlayTrigger placement="bottom" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-filter">Filters</Tooltip>}>
            <FU.Button $type="icon">
              <CommonBlackSvg as={Assets.FilterSvg} width={18} height={18} />
            </FU.Button>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-gear">Settings</Tooltip>}>
            <FU.Button $type="icon">
              <CommonBlackSvg as={Assets.GearFilledSvg} width={22} height={22} />
            </FU.Button>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" delay={{ show: 500, hide: 0 }} overlay={<Tooltip id="IconTooltips-export">Export</Tooltip>}>
            <FU.Button $type="icon">
              <CommonBlackSvg as={Assets.ExportSvg} width={22} height={22} />
            </FU.Button>
          </OverlayTrigger>
        </SectionContent>
      </GallerySection>

      <HR/>

      <GallerySection>
        <Title>Dropdown Tooltips</Title>

        <SectionHeader>
          Tooltips may be used to provide additional information about selections or actions.
        </SectionHeader>
        <SectionContent>
          <FU.Dropdown>
            <FU.DropdownToggle>
              Dropdow Actions
              <CommonBlackSvg as={Assets.ChevronSvg} width={10} height={8} />
            </FU.DropdownToggle>
            <FU.DropdownMenu>
              <DropdownItemWithTooltip>
                Action 1
                <OverlayTrigger placement="auto" overlay={
                  <Tooltip id="IconTooltips-action1">
                    This action does something.
                  </Tooltip>
                }>
                  <Info as={Assets.InfoSvg} width={14} height={14} />
                </OverlayTrigger>
              </DropdownItemWithTooltip>
              <FU.DropdownItem>Action 2</FU.DropdownItem>
              <DropdownItemWithTooltip>
                Action 3
                <OverlayTrigger placement="auto" overlay={
                  <Tooltip id="IconTooltips-action3">
                    This action does a different thing.
                  </Tooltip>
                }>
                  <Info as={Assets.InfoSvg} width={14} height={14} />
                </OverlayTrigger>
              </DropdownItemWithTooltip>
            </FU.DropdownMenu>
          </FU.Dropdown>
        </SectionContent>

        <SectionHeader>
          Overflow content in the dropdown toggle or dropdown menu may be shown with a tooltip.
        </SectionHeader>
        <SectionContent>
          <FU.Dropdown>
            <FU.DropdownToggle>
              <OverlayTrigger placement="auto" overlay={
                <Tooltip id="IconTooltips-dropdownoverflow">
                  {LOREM_IPSUM}
                </Tooltip>
              }>
                <OverflowToggle>
                  <EllipsisContainer $maxWidth={250}>{LOREM_IPSUM}</EllipsisContainer>
                  <CommonBlackSvg as={Assets.ChevronSvg} width={10} height={8} />
                </OverflowToggle>
              </OverlayTrigger>
            </FU.DropdownToggle>
            <FU.DropdownMenu>
              <FU.DropdownItem>
                <OverlayTrigger placement="auto" overlay={
                  <Tooltip id="IconTooltips-dropdownoverflowitem1">
                    {LOREM_IPSUM}
                  </Tooltip>
                }>
                  <EllipsisContainer $maxWidth={300}>{LOREM_IPSUM}</EllipsisContainer>
                </OverlayTrigger>
              </FU.DropdownItem>
              <FU.DropdownItem>
                <OverlayTrigger placement="auto" overlay={
                  <Tooltip id="IconTooltips-dropdownoverflowitem2">
                    {LOREM_IPSUM}
                  </Tooltip>
                }>
                  <EllipsisContainer $maxWidth={300}>{LOREM_IPSUM}</EllipsisContainer>
                </OverlayTrigger>
              </FU.DropdownItem>
            </FU.DropdownMenu>
          </FU.Dropdown>
        </SectionContent>

        <SectionHeader>
          The tooltip may be used to provide information about disabled selections or actions.
        </SectionHeader>
        <SectionContent>
          <FU.Dropdown>
            <FU.DropdownToggle>
              Dropdown Selections
              <CommonBlackSvg as={Assets.ChevronSvg} width={10} height={8} />
            </FU.DropdownToggle>
            <FU.DropdownMenu>
              <DropdownItemWithTooltip disabled $disableChildren={true}>
                <span>Selection 1</span>
                <OverlayTrigger placement="auto" overlay={
                  <Tooltip id="IconTooltips-selection1">
                    This item may not be selected right now.
                  </Tooltip>
                }>
                  <Info as={Assets.InfoSvg} width={14} height={14} />
                </OverlayTrigger>
              </DropdownItemWithTooltip>
              <DropdownItemWithTooltip>
                <span>Selection 2</span>
                <CommonModuleLightSvg as={Assets.CheckSvg} width={12} height={12} />
              </DropdownItemWithTooltip>
              <DropdownItemWithTooltip>
                <span>Selection 3</span>
              </DropdownItemWithTooltip>
              <DropdownItemWithTooltip disabled $disableChildren={true}>
                <span>Selection 4</span>
                <OverlayTrigger placement="auto" overlay={
                  <Tooltip id="IconTooltips-selection4">
                    This item is unavailable.
                  </Tooltip>
                }>
                  <Info as={Assets.InfoSvg} width={14} height={14} />
                </OverlayTrigger>
              </DropdownItemWithTooltip>

              <HR />

              <DeleteAction disabled $disableChildren={true}>
                <span>Delete</span>
                <OverlayTrigger placement="auto" overlay={
                  <Tooltip id="IconTooltips-action3">
                    This action is unavailable.
                  </Tooltip>
                }>
                  <Info as={Assets.InfoSvg} width={14} height={14} />
                </OverlayTrigger>
              </DeleteAction>
            </FU.DropdownMenu>
          </FU.Dropdown>
        </SectionContent>
      </GallerySection>

      <HR/>

      <GallerySection>
        <Title>Dynamic Tooltips</Title>
        <SectionHeader>
          The tooltip may be conditionally enabled based on whether the content overflows.
        </SectionHeader>
        <SectionContent>
          <Line>
            <Line $marginTop={6}>
              <LabelledCheckbox onClick={() => setOverflowSmall(!overflowSmall)}>
                <FU.Checkbox $checkbox={overflowSmall} />
                <span>Truncate Content</span>
              </LabelledCheckbox>
            </Line>
            <Line $marginTop={12}>
              <OverlayTrigger placement="top"
                show={overflowShow}
                onToggle={nextShow => setOverflowShow(nextShow && !!inputRef && (inputRef.scrollWidth > inputRef.clientWidth))}
                overlay={<Tooltip id="IconTooltips-dynamic">{LOREM_IPSUM}</Tooltip>}
              >
                <OverflowToggle>
                  <EllipsisContainer $maxWidth={overflowSmall ? 200 : 'none'} ref={(ref: HTMLDivElement) => setInputRef(ref)}>
                    {LOREM_IPSUM}
                  </EllipsisContainer>
                </OverflowToggle>
              </OverlayTrigger>
            </Line>
          </Line>
        </SectionContent>
      </GallerySection>
    </Gallery>
  );
}


import React, { SyntheticEvent, useState } from 'react';
import styled from 'styled-components/macro';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import * as GU from '@utility/General.utility';
import * as SU from '@utility/Svg.utility';
import * as FU from '@utility/Form.utility';
// import CrosscapTheme from '@components/Theme/CrosscapTheme';
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
const SectionGallery = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 12px;
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
const DisabledInfo = styled(SU.CommonBlackSvg)`
  && {
    cursor: help;
    opacity: 1;
  }
`;
interface DropdownOption {
  name: string,
  disabled: boolean
}
const dropdownOptionMap: Record<number, DropdownOption> = {
  1:  { name: 'Mexican',       disabled: false },
  2:  { name: 'Italian',       disabled: false },
  3:  { name: 'Japanese',      disabled: false },
  4:  { name: 'Greek',         disabled: true  },
  5:  { name: 'French',        disabled: false },
  6:  { name: 'Thai',          disabled: false },
  7:  { name: 'Chinese',       disabled: true  },
  8:  { name: 'Spanish',       disabled: false },
  9:  { name: 'Indian',        disabled: true  },
  10: { name: 'Mediterranean', disabled: false },
  11: { name: 'American',      disabled: false },
};
const dropdownOptionIds: number[] = Object.keys(dropdownOptionMap)
  .map(k => +k)
  .sort((a,b) => (dropdownOptionMap[a].name).localeCompare(dropdownOptionMap[b].name))
;
const dropdownIdOrderMap: Record<number, number> = dropdownOptionIds.reduce((acc, id, i) => Object.assign(acc, { [id]: i }), {});


export default function GenericGallery() {
  const [ dropdownSingleSelectState, setDropdownSingleSelectState ] = useState<number | undefined>();
  const [ dropdownMultipleSelectState, setDropdownMultipleSelectState ] = useState<Set<number>>(new Set());

  const [ dropdownMultipleSelectOpenedState, setDropdownMultipleSelectOpenedState ] = useState<Set<number>>(new Set());

  const toggleMultipleSelectDropdown = ((id: number) => {
    const nextSelections: number[] = Array.from(dropdownMultipleSelectState);

    const idx = GU.getInsertPosition(nextSelections, id, (a,b) => dropdownIdOrderMap[a] - dropdownIdOrderMap[b]);
    if(dropdownMultipleSelectState.has(id)) {
      nextSelections.splice(idx, 1);
    } else {
      nextSelections.splice(idx, 0, id);
    }
    setDropdownMultipleSelectState(new Set(nextSelections));
  });

  const onMultiSelectToggled = ((id: number, isOpen: boolean, event: SyntheticEvent<FU.Dropdown>, metadata: { source: 'select' | 'click' | 'rootClose' | 'keydown' }) => {
    if(!/rootClose|click/.test(metadata.source)) return;
    const nextState = new Set(dropdownMultipleSelectOpenedState);
    if(nextState.has(id)) {
      nextState.delete(id);
    } else {
      nextState.add(id);
    }
    setDropdownMultipleSelectOpenedState(nextState);
  });

  return (
    <Gallery>
      <GallerySection>
        <Title>Dropdown: Single Selection</Title>
        <SectionHeader>
          Single selection dropdowns may have zero to one selections.  If the field is optional,
          clicking the existing selection will clear it.  If it is mandatory, clicking the existing
          will not clear the selection.
        </SectionHeader>
        <SectionGallery>
          <Line>
          <FU.ComponentLabel>Single Selection Dropdown</FU.ComponentLabel>
            <FU.Dropdown>
              <FU.DropdownToggle>
                  {
                    (dropdownSingleSelectState === undefined) &&
                    <span>Choose</span>
                  }
                  {
                    (dropdownSingleSelectState !== undefined) &&
                    <span>{dropdownOptionMap[dropdownSingleSelectState].name}</span>
                  }
                  <FU.DropdownChevron />
              </FU.DropdownToggle>
              <FU.DropdownMenu>
                {
                  dropdownOptionIds.map<[ number, DropdownOption ]>((id: number) => [ id, dropdownOptionMap[id] ]).map(([ id, o ]) => (
                    <FU.DropdownItem key={id}
                      disabled={o.disabled}
                      $disableChildren={true}
                      onClick={() => setDropdownSingleSelectState(dropdownSingleSelectState !== id ? id : undefined)}
                    >
                      <span>{o.name}</span>
                      {
                        o.disabled &&
                        <OverlayTrigger placement="top" overlay={<Tooltip id="IconTooltips-auto">This option is unavailable.</Tooltip>}>
                          <DisabledInfo {...Assets.InfoSvg.styledAttrs.default} />
                        </OverlayTrigger>
                      }
                      {
                        (dropdownSingleSelectState === id) &&
                        <FU.DropdownItemCheck />
                      }
                    </FU.DropdownItem>
                  ))
                }
              </FU.DropdownMenu>
            </FU.Dropdown>

            <br/>

            <FU.ComponentLabel>Required Single Selection Dropdown*</FU.ComponentLabel>
            <FU.Dropdown>
              <FU.DropdownToggle>
                  {
                    (dropdownSingleSelectState === undefined) &&
                    <span>Choose</span>
                  }
                  {
                    (dropdownSingleSelectState !== undefined) &&
                    <span>{dropdownOptionMap[dropdownSingleSelectState].name}</span>
                  }
                  <FU.DropdownChevron />
              </FU.DropdownToggle>
              <FU.DropdownMenu>
                {
                  dropdownOptionIds.map<[ number, DropdownOption ]>((id: number) => [ id, dropdownOptionMap[id] ]).map(([ id, o ]) => (
                    <FU.DropdownItem key={id}
                      disabled={o.disabled}
                      $disableChildren={true}
                      onClick={() => setDropdownSingleSelectState(id)}
                    >
                      <span>{o.name}</span>
                      {
                        o.disabled &&
                        <OverlayTrigger placement="top" overlay={<Tooltip id="IconTooltips-auto">This option is unavailable.</Tooltip>}>
                          <DisabledInfo {...Assets.InfoSvg.styledAttrs.default} />
                        </OverlayTrigger>
                      }
                      {
                        (dropdownSingleSelectState === id) &&
                        <FU.DropdownItemCheck />
                      }
                    </FU.DropdownItem>
                  ))
                }
              </FU.DropdownMenu>
            </FU.Dropdown>

            <br/>

            <FU.ComponentLabel>Invalid Single Selection Dropdown*</FU.ComponentLabel>
            <FU.Dropdown>
              <FU.DropdownToggle $valid={false}>
                  {
                    (dropdownSingleSelectState === undefined) &&
                    <span>Choose</span>
                  }
                  {
                    (dropdownSingleSelectState !== undefined) &&
                    <span>{dropdownOptionMap[dropdownSingleSelectState].name}</span>
                  }
                  <FU.DropdownChevron />
              </FU.DropdownToggle>
              <FU.DropdownMenu>
                {
                  dropdownOptionIds.map<[ number, DropdownOption ]>((id: number) => [ id, dropdownOptionMap[id] ]).map(([ id, o ]) => (
                    <FU.DropdownItem key={id}
                      disabled={o.disabled}
                      $disableChildren={true}
                      onClick={() => setDropdownSingleSelectState(id)}
                    >
                      <span>{o.name}</span>
                      {
                        o.disabled &&
                        <OverlayTrigger placement="top" overlay={<Tooltip id="IconTooltips-auto">This option is unavailable.</Tooltip>}>
                          <DisabledInfo {...Assets.InfoSvg.styledAttrs.default} />
                        </OverlayTrigger>          
                      }
                      {
                        (dropdownSingleSelectState === id) &&
                        <FU.DropdownItemCheck />
                      }
                    </FU.DropdownItem>
                  ))
                }
              </FU.DropdownMenu>
            </FU.Dropdown>
            <FU.ComponentInvalid>
              {
                dropdownSingleSelectState === undefined ?
                  'This field is required.'
                :
                  'This option is not available.'
              }
            </FU.ComponentInvalid>

            <br/>

            <FU.ComponentLabel>Disabled Single Selection Dropdown</FU.ComponentLabel>
            <FU.Dropdown>
              <FU.DropdownToggle disabled={true}>
                  {
                    (dropdownSingleSelectState === undefined) &&
                    <span>Choose</span>
                  }
                  {
                    (dropdownSingleSelectState !== undefined) &&
                    <span>{dropdownOptionMap[dropdownSingleSelectState].name}</span>
                  }
                  <FU.DropdownChevron />
              </FU.DropdownToggle>
              <FU.DropdownMenu>
                {
                  dropdownOptionIds.map<[ number, DropdownOption ]>((id: number) => [ id, dropdownOptionMap[id] ]).map(([ id, o ]) => (
                    <FU.DropdownItem key={id}
                      disabled={o.disabled}
                      $disableChildren={true}
                      onClick={() => setDropdownSingleSelectState(id)}
                    >
                      <span>{o.name}</span>
                      {
                        o.disabled &&
                        <OverlayTrigger placement="top" overlay={<Tooltip id="IconTooltips-auto">This option is unavailable.</Tooltip>}>
                          <DisabledInfo {...Assets.InfoSvg.styledAttrs.default} />
                        </OverlayTrigger>
                      }
                      {
                        (dropdownSingleSelectState === id) &&
                        <FU.DropdownItemCheck />
                      }
                    </FU.DropdownItem>
                  ))
                }
              </FU.DropdownMenu>
            </FU.Dropdown>
          </Line>
        </SectionGallery>
      </GallerySection>

      <HR/>

      <GallerySection>
        <Title>Dropdown: Multiple Selection</Title>
        <SectionHeader>
          Multiple selection dropdowns may have zero or more selections.  Generally, selecting
          an option will toggle it regardless of whether one or more selections are required. 
          Depending on business rules, a required option may have its selection state locked.
          The dropdown menu remains open when options are toggled.  The selected values in the
          dropdown toggle should appear in the same order as in the dropdown menu (e.g. not
          based on the order they were selected).
        </SectionHeader>
        <SectionGallery>
          <Line>
          <FU.ComponentLabel>Multiple Selection Dropdown</FU.ComponentLabel>
            <FU.Dropdown show={dropdownMultipleSelectOpenedState.has(1)} onToggle={(isOpen, event, metadata) => onMultiSelectToggled(1, isOpen, event, metadata)}>
              <FU.DropdownToggle>
                  {
                    (dropdownMultipleSelectState.size <= 0) &&
                    <span>Choose</span>
                  }
                  {
                    (dropdownMultipleSelectState.size > 0) &&
                    <span>{Array.from(dropdownMultipleSelectState).map(id => dropdownOptionMap[id].name).join(', ')}</span>
                  }
                  <FU.DropdownChevron />
              </FU.DropdownToggle>
              <FU.DropdownMenu>
                {
                  dropdownOptionIds.map<[ number, DropdownOption ]>((id: number) => [ id, dropdownOptionMap[id] ]).map(([ id, o ]) => (
                    <FU.DropdownItem key={id}
                      disabled={o.disabled}
                      $disableChildren={true}
                      onClick={() => toggleMultipleSelectDropdown(id)}
                    >
                      <span>{o.name}</span>
                      {
                        o.disabled &&
                        <OverlayTrigger placement="top" overlay={<Tooltip id="IconTooltips-auto">This option is unavailable.</Tooltip>}>
                          <DisabledInfo {...Assets.InfoSvg.styledAttrs.default} />
                        </OverlayTrigger>
                      }
                      {
                        dropdownMultipleSelectState.has(id) &&
                        <FU.DropdownItemCheck />
                      }
                    </FU.DropdownItem>
                  ))
                }
              </FU.DropdownMenu>
            </FU.Dropdown>

            <br/>

            <FU.ComponentLabel>Required Multiple Selection Dropdown*</FU.ComponentLabel>
            <FU.Dropdown show={dropdownMultipleSelectOpenedState.has(2)} onToggle={(isOpen, event, metadata) => onMultiSelectToggled(2, isOpen, event, metadata)}>
              <FU.DropdownToggle>
                  {
                    (dropdownMultipleSelectState.size <= 0) &&
                    <span>Choose</span>
                  }
                  {
                    (dropdownMultipleSelectState.size > 0) &&
                    <span>{Array.from(dropdownMultipleSelectState).map(id => dropdownOptionMap[id].name).join(', ')}</span>
                  }
                  <FU.DropdownChevron />
              </FU.DropdownToggle>
              <FU.DropdownMenu>
                {
                  dropdownOptionIds.map<[ number, DropdownOption ]>((id: number) => [ id, dropdownOptionMap[id] ]).map(([ id, o ]) => (
                    <FU.DropdownItem key={id}
                      disabled={o.disabled}
                      $disableChildren={true}
                      onClick={() => toggleMultipleSelectDropdown(id)}
                    >
                      <span>{o.name}</span>
                      {
                        o.disabled &&
                        <OverlayTrigger placement="top" overlay={<Tooltip id="IconTooltips-auto">This option is unavailable.</Tooltip>}>
                          <DisabledInfo {...Assets.InfoSvg.styledAttrs.default} />
                        </OverlayTrigger>
                      }
                      {
                        dropdownMultipleSelectState.has(id) &&
                        <FU.DropdownItemCheck />
                      }
                    </FU.DropdownItem>
                  ))
                }
              </FU.DropdownMenu>
            </FU.Dropdown>

            <br/>

            <FU.ComponentLabel>Invalid Multiple Selection Dropdown*</FU.ComponentLabel>
            <FU.Dropdown show={dropdownMultipleSelectOpenedState.has(3)} onToggle={(isOpen, event, metadata) => onMultiSelectToggled(3, isOpen, event, metadata)}>
              <FU.DropdownToggle $valid={false}>
                  {
                    (dropdownMultipleSelectState.size <= 0) &&
                    <span>Choose</span>
                  }
                  {
                    (dropdownMultipleSelectState.size > 0) &&
                    <span>{Array.from(dropdownMultipleSelectState).map(id => dropdownOptionMap[id].name).join(', ')}</span>
                  }
                  <FU.DropdownChevron />
              </FU.DropdownToggle>
              <FU.DropdownMenu>
                {
                  dropdownOptionIds.map<[ number, DropdownOption ]>((id: number) => [ id, dropdownOptionMap[id] ]).map(([ id, o ]) => (
                    <FU.DropdownItem key={id}
                      disabled={o.disabled}
                      $disableChildren={true}
                      onClick={() => toggleMultipleSelectDropdown(id)}
                    >
                      <span>{o.name}</span>
                      {
                        o.disabled &&
                        <OverlayTrigger placement="top" overlay={<Tooltip id="IconTooltips-auto">This option is unavailable.</Tooltip>}>
                          <DisabledInfo {...Assets.InfoSvg.styledAttrs.default} />
                        </OverlayTrigger>
                      }
                      {
                        dropdownMultipleSelectState.has(id) &&
                        <FU.DropdownItemCheck />
                      }
                    </FU.DropdownItem>
                  ))
                }
              </FU.DropdownMenu>
            </FU.Dropdown>
            <FU.ComponentInvalid>
              {
                (dropdownMultipleSelectState.size <= 0) ?
                    'This field is required.'
                  :
                    `${(dropdownMultipleSelectState.size === 1) ? `This option is` : `These options are`} not available.`
              }
            </FU.ComponentInvalid>

            <br/>

            <FU.ComponentLabel>Disabled Multiple Selection Dropdown</FU.ComponentLabel>
            <FU.Dropdown show={dropdownMultipleSelectOpenedState.has(4)} onToggle={(isOpen, event, metadata) => onMultiSelectToggled(4, isOpen, event, metadata)}>
              <FU.DropdownToggle disabled={true}>
                  {
                    (dropdownMultipleSelectState.size <= 0) &&
                    <span>Choose</span>
                  }
                  {
                    (dropdownMultipleSelectState.size >= 0) &&
                    <span>{Array.from(dropdownMultipleSelectState).map(id => dropdownOptionMap[id].name).join(', ')}</span>
                  }
                  <FU.DropdownChevron />
              </FU.DropdownToggle>
              <FU.DropdownMenu>
                {
                  dropdownOptionIds.map<[ number, DropdownOption ]>((id: number) => [ id, dropdownOptionMap[id] ]).map(([ id, o ]) => (
                    <FU.DropdownItem key={id}
                      disabled={o.disabled}
                      $disableChildren={true}
                      onClick={() => toggleMultipleSelectDropdown(id)}
                    >
                      <span>{o.name}</span>
                      {
                        o.disabled &&
                        <OverlayTrigger placement="top" overlay={<Tooltip id="IconTooltips-auto">This option is unavailable.</Tooltip>}>
                          <DisabledInfo {...Assets.InfoSvg.styledAttrs.default} />
                        </OverlayTrigger>
                      }
                      {
                        dropdownMultipleSelectState.has(id) &&
                        <FU.DropdownItemCheck />
                      }
                    </FU.DropdownItem>
                  ))
                }
              </FU.DropdownMenu>
            </FU.Dropdown>
          </Line>
        </SectionGallery>

        <br/>
        TODO: Show examples with tooltips
        <br/>
        TOOD: Show examples with disabled options and tooltips
        <br/>
        TOOD: Show examples with dividers
      </GallerySection>

      <pre>{`
        TODO: Dropdowns

        Actions Dropdown
        Single-Selection Dropdown
        Multi-Selection Dropdown
        Dropdowns with Dividers
        Dropdowns with Icons
        Dropdowns without frames
        Icon Toggle Dropdowns
        Autocomplete searchable dropdowns`
      }</pre>
    </Gallery>
  );
}


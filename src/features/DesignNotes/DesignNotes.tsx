import React, { useState } from 'react';
import styled from 'styled-components/macro';

import * as SU from '@utility/Svg.utility';
import * as FU from '@utility/Form.utility';
import * as LU from '@utility/Layout.utility';
import CrosscapTheme from '@components/Theme/CrosscapTheme';
import * as Assets from '@assets/.';

const RedButton = styled(FU.Button).attrs({
  theme: { BUTTON: { custom: { FG: CrosscapTheme.INVALID, BG: 'rgba(0, 0, 0, 0)' } } }
})`
  display: inline-grid;
  align-items: center;
  grid-auto-flow: column;
  grid-column-gap: 6px;
`;

const dropdownOptionMap: Record<number, { name: string }> = {
  1:  { name: 'Mexican'       },
  2:  { name: 'Italian'       },
  3:  { name: 'Japanese'      },
  4:  { name: 'Greek'         },
  5:  { name: 'French'        },
  6:  { name: 'Thai'          },
  7:  { name: 'Chinese'       },
  8:  { name: 'Spanish'       },
  9:  { name: 'Indian'        },
  10: { name: 'Mediterranean' },
  11: { name: 'American'      },
};
const dropdownOptionIds: number[] = Object.keys(dropdownOptionMap)
  .map(k => +k)
  .sort((a,b) => (dropdownOptionMap[a].name).localeCompare(dropdownOptionMap[b].name))
;

export default function DesignNotes() {
  const [ dropdownSingleSelectState, setDropdownSingleSelectState ] = useState<number | undefined>();

  return (
    <>
      <ul>
        <li>
          The red color was changed to make invalid text have more contrast.  However, the "Delete" button is also tied to this red.
          After the change, the button looks much dimmer.  Should these two reds be split for these different use cases?

          <div style={{ padding: '20px', borderLeft: '2px solid #d8d8d8', margin: '10px 0 40px 0' }}>
            <div>
              <FU.ComponentLabel>Invalid Input</FU.ComponentLabel>
              <FU.Input $valid={false} defaultValue={'Sample Value'} />
              <div style={{ marginTop: '8px', color: CrosscapTheme.INVALID, fontSize: '12px', letterSpacing: "0.18px" }}>
                Value must be unique.
              </div>
            </div>

            <hr />

            <LU.InlineRowMajorGrid $columns={5} $columnGap={15}>
              <RedButton $type="custom">
                <SU.CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                <span>Custom</span>
              </RedButton>

              <RedButton $type="custom">
                <SU.CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                <span>Generously Sized</span>
              </RedButton>

              <RedButton $type="custom" className={`hover`}>
                <SU.CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                <span>Hovered</span>
              </RedButton>

              <RedButton $type="custom" className={`active`}>
                <SU.CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                <span>Active</span>
              </RedButton>

              <RedButton $type="custom" disabled>
                <SU.CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                <span>Disabled</span>
              </RedButton>
            </LU.InlineRowMajorGrid>                
          </div>
        </li>
      </ul>

      <ul>
        <li>
          While not a major issue, I've also displayed a sample of the Tertiary and Custom buttons using the new systemized
          values (90%, 70% absolute lightness of FG) for review.

          <div style={{ padding: '20px', borderLeft: '2px solid #d8d8d8', margin: '10px 0 40px 0' }}>
            <LU.InlineRowMajorGrid $columns={5} $columnGap={15} $rowGap={12}>
              <FU.Button $type="tertiary">Custom</FU.Button>
              <FU.Button $type="tertiary">Generously Sized</FU.Button>
              <FU.Button $type="tertiary" className={`hover`}>Hovered</FU.Button>
              <FU.Button $type="tertiary" className={`active`}>Active</FU.Button>
              <FU.Button $type="tertiary" disabled>Disabled</FU.Button>

              <RedButton $type="custom">
                <SU.CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                <span>Custom</span>
              </RedButton>

              <RedButton $type="custom">
                <SU.CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                <span>Generously Sized</span>
              </RedButton>

              <RedButton $type="custom" className={`hover`}>
                <SU.CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                <span>Hovered</span>
              </RedButton>

              <RedButton $type="custom" className={`active`}>
                <SU.CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                <span>Active</span>
              </RedButton>

              <RedButton $type="custom" disabled>
                <SU.CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                <span>Disabled</span>
              </RedButton>
            </LU.InlineRowMajorGrid>                
          </div>
        </li>
      </ul>

      <ul>
        <li>
          Do dropdowns standardize on a minimum width of 275px (even if the toggle and options are much shorter)?
        </li>
        <li>
          Is there a 300px variant of the dropdown?  E.g. "Input With Navigation" standardizes on 300px width.
        </li>
        <li>
          In a multi-selection dropdown, does the toggle change in width depending on the multi-selected options?
        </li>
        <li>
          Dropdowns can open dynamically open upwards if there is not enough space to open it below.
          In these scenarios, the chevron will not point in the correct direction (e.g. when closed
          points down but opens upward, when opened points up but closes downward).  There is some
          complexity involved to 1) checking position on any ancestor scroll event, 2) determining
          the dropdown menu height to determine whether it will automatically open upwards, 3) pass
          this state information to the dropdown toggle chevron if it changes

          <div style={{ padding: '20px', borderLeft: '2px solid #d8d8d8', margin: '10px 0 40px 0' }}>
            <FU.ComponentLabel>Single Selection Dropdown</FU.ComponentLabel>
            <FU.Dropdown>
              <FU.DropdownToggle>
                  {
                    dropdownSingleSelectState === undefined &&
                    <span>Choose</span>
                  }
                  {
                    dropdownSingleSelectState !== undefined &&
                    <span>{dropdownOptionMap[dropdownSingleSelectState].name}</span>
                  }
                  <FU.DropdownChevron />
              </FU.DropdownToggle>
              <FU.DropdownMenu>
                {
                  dropdownOptionIds.map((id: number) => (
                    <FU.DropdownItem key={id} onClick={() => setDropdownSingleSelectState(id)}>
                      {dropdownOptionMap[id].name}
                      {
                        (dropdownSingleSelectState === id) &&
                        <FU.DropdownItemCheck />
                      }
                    </FU.DropdownItem>
                  ))
                }
              </FU.DropdownMenu>
            </FU.Dropdown>
          </div>
        </li>
        <li>
          Are we still going to keep searchable dropdowns or leave them separate until we revisit Attribute Permissions?
          These are switched dynamically if the number of available options exceeds 10 and only for block version attributes.
        </li>
      </ul>
    </>
  );
}


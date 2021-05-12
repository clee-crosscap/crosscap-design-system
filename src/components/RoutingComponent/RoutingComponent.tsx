import React, { useState } from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Dropdown } from 'react-bootstrap';

import * as FU from '@utility/Form.utility';
import * as SU from '@utility/Svg.utility';
import BaseTheme from '@components/Theme/BaseTheme';
import ButtonGallery from '@features/ButtonGallery/ButtonGallery';
import TooltipGallery from '@features/TooltipGallery/TooltipGallery';
import TextFieldGallery from '@features/TextFieldGallery/TextFieldGallery';

import { ReactComponent as ChevronSvg } from '@assets/chevron.svg';

const CommonBlackSvg = styled(SU.styledSvg({ $fillStroke: BaseTheme.ICON_DARK }))`
  cursor: pointer;
`;
const RoutingGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
`;
const RoutingGridLeft = styled.div`
  padding: 30px 60px 30px 40px;
  border-right: 1px solid ${p => p.theme.DIVIDER};
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  grid-auto-flow: row;
  grid-row-gap: 0px;
  align-content: start;
`;
interface BGProp {
  $bg: string,
}
const RoutingGridRight = styled.div<BGProp>`
  overflow: hidden;
  background-color: ${p => p.$bg};
`;
const RoutingLink = styled(FU.DropdownItem)`
  width: calc(100% + 100px);
  margin-left: -40px;
  padding-left: 40px;

  &,
  &:visited {
    text-decoration: none;
  }
`;
const HR = styled.hr`
  width: 100%;
  margin: 20px 0;
  border: none;
  border-top: 1px solid ${p => p.theme.DIVIDER};
`;
export default function RoutingComponent() {
  const [ galleryBG, setGalleryBG ] = useState<string>('#FFFFFF');
  return (
    <HashRouter>
      <RoutingGrid>
        <RoutingGridLeft>
          <Dropdown style={{ marginBottom: '4px' }}>
            <FU.DropdownToggle $removeBorder={true}>
              <span>Palette: Calendar</span>
              <CommonBlackSvg as={ChevronSvg} width={10} height={8} />
            </FU.DropdownToggle>
            <FU.DropdownMenu>
              <FU.DropdownItem onClick={() => {}}>
                Calendar
              </FU.DropdownItem>
            </FU.DropdownMenu>
          </Dropdown>

          <Dropdown>
            <FU.DropdownToggle $removeBorder={true}>
              <span>BG: {galleryBG}</span>
              <CommonBlackSvg as={ChevronSvg} width={10} height={8} />
            </FU.DropdownToggle>
            <FU.DropdownMenu>
            <FU.DropdownItem onClick={() => setGalleryBG('#FFFFFF')}>
              #FFFFFF
            </FU.DropdownItem>
            <FU.DropdownItem onClick={() => setGalleryBG('#F8F8F8')}>
              #F8F8F8
            </FU.DropdownItem>
            </FU.DropdownMenu>
          </Dropdown>

          <HR />

          <RoutingLink as={Link} to={`/buttons`}>Buttons</RoutingLink>
          <RoutingLink as={Link} to={`/tooltips`}>Tooltips</RoutingLink>
          <RoutingLink as={Link} to={`/text-fields`}>Text Fields</RoutingLink>

          <HR />

          <RoutingLink as={Link} to={`/footers`}>Footers</RoutingLink>
          <RoutingLink as={Link} to={`/palettes`}>Palettes</RoutingLink>
          <RoutingLink as={Link} to={`/dropdowns`}>Dropdowns</RoutingLink>

          <HR />

          <RoutingLink as={Link} to={`/selectors`}>
            TODO: Selectors
          </RoutingLink>
          <RoutingLink as={Link} to={`/modals`}>
            TODO: Modals
          </RoutingLink>
          <RoutingLink as={Link} to={`/drawers`}>
            TODO: Drawers
          </RoutingLink>
          <RoutingLink as={Link} to={`/icons`}>
            TODO: Icons
          </RoutingLink>
          <RoutingLink as={Link} to={`/loading-indicator`}>
            TODO: Loading Indicator
          </RoutingLink>
          <RoutingLink as={Link} to={`/notifications`}>
            TODO: Notifications
          </RoutingLink>
          <RoutingLink as={Link} to={`/trees`}>
            TODO: Trees
          </RoutingLink>
          <RoutingLink as={Link} to={`/searchables`}>
            TODO: Searchables
          </RoutingLink>
        </RoutingGridLeft>
        <RoutingGridRight $bg={galleryBG}>
          <Switch>
            <Route path="/buttons" component={ButtonGallery} />
            <Route path="/tooltips" component={TooltipGallery} />
            <Route path="/text-fields" component={TextFieldGallery} />

            <Route path="/palettes">
              <pre>
                {
                  `
                    TODO: Palettes

                    Calendar
                    Distro
                    Platform Admin
                    Common
                  `.split('\n').map(s => s.trim()).join('\n')
                }
              </pre>
            </Route>
            <Route path="/selectors">
              <pre>
                {
                  `
                    TODO: Selectors

                    Radio Buttons
                    Toggle Selectors
                    Yes/No Checkboxes
                    Yes/No + Indeterminate Checkboxes
                  `.split('\n').map(s => s.trim()).join('\n')
                }
              </pre>
            </Route>
            <Route path="/dropdowns">
              <pre>
                {
                  `
                    TODO: Dropdowns

                    Actions Dropdown
                    Single-Selection Dropdown
                    Multi-Selection Dropdown
                    Dropdowns with Dividers
                    Dropdowns with Icons
                    Dropdowns without frames
                    Icon Toggle Dropdowns
                    Autocomplete searchable dropdowns
                  `.split('\n').map(s => s.trim()).join('\n')
                }
              </pre>
            </Route>
            <Route path="/modals">
              <pre>
                {
                  `
                    TODO: Modals

                    Alert Modal + Icon
                    Unsaved Changes Modal
                    Yes/No Confirmation Modal
                    Workflow Modal
                    Scrolling in modals
                    Modals with footers
                    Modals where ESC / Backdrop dismissal should be disabled
                  `.split('\n').map(s => s.trim()).join('\n')
                }
              </pre>
            </Route>
            <Route path="/drawers">
              <pre>
                {
                  `
                    TODO: Drawers

                    Left Drawer
                    Right Drawer
                    Inline Drawer
                    Overlay Drawer
                  `.split('\n').map(s => s.trim()).join('\n')
                }
              </pre>
            </Route>

            <Route path="/icons">
              <pre>
                {
                  `
                    TODO: Icons

                    Gallery of all SVG icons checked into repository
                  `.split('\n').map(s => s.trim()).join('\n')
                }
              </pre>
            </Route>
            <Route path="/icons">
              <pre>
                {
                  `
                    TODO: Loading indicator

                    Loading indicator for full-screen workflows
                    Loading indicator for multi-pane workflows
                    Loading indicator for modal workflows
                    Loading indicator for individual components
                  `.split('\n').map(s => s.trim()).join('\n')
                }
              </pre>
            </Route>
          </Switch>
        </RoutingGridRight>
      </RoutingGrid>
    </HashRouter>
  );
}


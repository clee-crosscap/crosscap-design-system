import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import * as FU from '@utility/Form.utility';
import ButtonGallery from '@components/ButtonGallery/ButtonGallery';

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
const RoutingGridRight = styled.div`
  overflow: hidden;
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
  return (
    <BrowserRouter basename="/crosscap-design-system/build">
      <RoutingGrid>
        <RoutingGridLeft>
          <RoutingLink as={Link} to={`/buttons`}>
            Buttons
          </RoutingLink>

          <HR />


          <RoutingLink as={Link} to={`/text-fields`}>
            TODO: Text Fields
          </RoutingLink>
          <RoutingLink as={Link} to={`/selectors`}>
            TODO: Selectors
          </RoutingLink>
          <RoutingLink as={Link} to={`/dropdowns`}>
            TODO: Dropdowns
          </RoutingLink>
          <RoutingLink as={Link} to={`/modals`}>
            TODO: Modals
          </RoutingLink>
          <RoutingLink as={Link} to={`/drawers`}>
            TODO: Drawers
          </RoutingLink>
          <RoutingLink as={Link} to={`/palettes`}>
            TODO: Palettes
          </RoutingLink>
          <RoutingLink as={Link} to={`/icons`}>
            TODO: Icons
          </RoutingLink>
        </RoutingGridLeft>
        <RoutingGridRight>
          <Switch>
            <Route path="/buttons" component={ButtonGallery} />

            <Route path="/text-fields">
              <pre>
                {
                  `
                    TODO: Text Fields

                    Single line text field
                    Single line text field with icon (e.g. search)
                    Single line text field with placeholder text
                    Single line text field with focused state
                    Single line text field with invalid state
                    Single line text field in disabled state
                    Single line text field with built-in navigation (&lt; &gt; arrows)
                    Multiple line text field
                    Multiple line text field with placeholder text
                    Multiple line text field with focused state
                    Multiple line text field with invalid state
                    Multiple line text field in disabled state
                    Validation error messaging
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
          </Switch>
        </RoutingGridRight>
      </RoutingGrid>
    </BrowserRouter>
  );
}


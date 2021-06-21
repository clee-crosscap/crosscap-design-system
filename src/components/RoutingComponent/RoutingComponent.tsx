import React, { useState } from 'react';
import { useLocation, Switch, Route, Link } from 'react-router-dom';
import styled, { DefaultTheme, ThemeProvider } from 'styled-components/macro';
import { Dropdown } from 'react-bootstrap';

import * as FU from '@utility/Form.utility';
import * as SU from '@utility/Svg.utility';
import * as Assets from '@assets/.';
import * as Themes from '@components/Theme';

// Informational Galleries
import PaletteGallery from '@features/PaletteGallery/PaletteGallery';
import TooltipGallery from '@features/TooltipGallery/TooltipGallery';
import NotificationGallery from '@features/NotificationGallery/NotificationGallery';
import LoadingIndicatorGallery from '@features/LoadingIndicatorGallery/LoadingIndicatorGallery';
import BrandingGallery from '@features/BrandingGallery/BrandingGallery';

// Component Galleries
import TextFieldGallery from '@features/TextFieldGallery/TextFieldGallery';
import SelectionGallery from '@features/SelectionGallery/SelectionGallery';
import BadgeGallery from '@features/BadgeGallery/BadgeGallery';
import ButtonGallery from '@features/ButtonGallery/ButtonGallery';
import IconGallery from '@features/IconGallery/IconGallery';
import DropdownGallery from '@features/DropdownGallery/DropdownGallery';

// Structural Galleries
import FooterGallery from '@features/FooterGallery/FooterGallery';
import ModalGallery from '@features/ModalGallery/ModalGallery';
import TabGallery from '@features/TabGallery/TabGallery';
import DrawerGallery from '@features/DrawerGallery/DrawerGallery';

// Data Galleries
import TreeGallery from '@features/TreeGallery/TreeGallery';
import TableGallery from '@features/TableGallery/TableGallery';
import SearchableGallery from '@features/SearchableGallery/SearchableGallery';

const CommonBlackSvg = styled(SU.styledSvg({ $fillStroke: Themes.CrosscapTheme.ICON_DARK }))`
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
  overflow-y: auto;

  &:after {
    content: '';
    padding-bottom: 30px;
  }
`;
interface BGProp {
  $bg: string,
}
const RoutingGridRight = styled.div<BGProp>`
  overflow: hidden;
  background-color: ${p => p.$bg};
`;
interface WIPProp {
  $isWip: boolean,
}
const RoutingLink = styled(FU.DropdownItem)<WIPProp>`
  width: calc(100% + 100px);
  margin-left: -40px;
  padding-left: 40px;
  ${p => !p.$isWip ? '' : `color: #CCCCCC;`}

  &,
  &:visited {
    text-decoration: none;
  }
`;
const Heading = styled.h3`
  margin: 10px 0;
`;
const HR = styled.hr`
  width: 100%;
  margin: 20px 0;
  border: none;
  border-top: 1px solid ${p => p.theme.DIVIDER};
`;
const CommonRedSvg = styled(SU.styledSvg({ $fillStroke: Themes.CrosscapTheme.INVALID }))``;
const RedButton = styled(FU.Button).attrs({
  theme: { BUTTON: { custom: { FG: Themes.CrosscapTheme.INVALID, BG: 'rgba(0, 0, 0, 0)' } } }
})`
  display: inline-grid;
  align-items: center;
  grid-auto-flow: column;
  grid-column-gap: 6px;
`;
interface GridProps {
  $columns: number,
  $inline?: boolean,
  $columnGap?: number,
  $rowGap?: number,
  $justifyContent?: string,
  $alignContent?: string,
  $placeContent?: string,
  $justifyItems?: string,
  $alignItems?: string,
  $placeItems?: string,
}
const SectionGrid = styled.div<GridProps>`
  display: ${p => p.$inline ? 'inline-grid' : 'grid'};
  grid-template-columns: ${p => 'auto '.repeat(p.$columns)};
  grid-auto-flow: row;
  ${p => p.$columnGap      ? `grid-column-gap: ${p.$columnGap}px;`    : ''}
  ${p => p.$rowGap         ? `grid-row-gap:    ${p.$rowGap}px;`       : ''}
  ${p => p.$justifyContent ? `justify-content: ${p.$justifyContent};` : ''}
  ${p => p.$alignContent   ? `align-content:   ${p.$alignContent};`   : ''}
  ${p => p.$placeContent   ? `place-content:   ${p.$placeContent};`   : ''}
  ${p => p.$justifyItems   ? `justify-items:   ${p.$justifyItems};`   : ''}
  ${p => p.$alignItems     ? `align-items:     ${p.$alignItems};`     : ''}
  ${p => p.$placeItems     ? `place-items:     ${p.$placeItems};`     : ''}
`;
export default function RoutingComponent() {
  const location = useLocation();
  const [ theme, setTheme ] = useState<DefaultTheme<string, string, string>>(Themes.CalendarTheme);
  const [ galleryBG, setGalleryBG ] = useState<string>('#FFFFFF');

  interface LinkConfig {
    type: 'link',
    path: string,
    text: string,
    component?: React.ComponentType,
  }
  interface HrConfig {
    type: 'hr',
  }
  interface HeadingConfig {
    type: 'heading',
    text: string,
  }
  type SectionConfig = LinkConfig | HrConfig | HeadingConfig;
  const sectionsConfig: SectionConfig[] = [
    { type: 'hr' },
    { type: 'link',    text: 'Notes For Design',    path: `/notes-for-design` },
    { type: 'hr' },
    { type: 'heading', text: 'Informational' },
    { type: 'link',    text: 'Palettes',                path: `/palettes`,           component: PaletteGallery },
    { type: 'link',    text: 'Tooltips',                path: '/tooltips',           component: TooltipGallery },
    { type: 'link',    text: 'TODO: Notifications',     path: `/notifications`,      component: NotificationGallery },
    { type: 'link',    text: 'TODO: Loading Indicator', path: `/loading-indicator`,  component: LoadingIndicatorGallery },
    { type: 'link',    text: 'TODO: Branding',          path: `/branding`,           component: BrandingGallery },
    { type: 'hr' },
    { type: 'heading', text: 'Components' },
    { type: 'link',    text: 'Text Fields',             path: '/text-fields',        component: TextFieldGallery },
    { type: 'link',    text: 'Selections',              path: `/selections`,         component: SelectionGallery },
    { type: 'link',    text: 'Buttons',                 path: '/buttons',            component: ButtonGallery },
    { type: 'link',    text: 'Badges',                  path: '/badges',             component: BadgeGallery },
    { type: 'link',    text: 'Icons',                   path: `/icons`,              component: IconGallery },
    { type: 'link',    text: 'TODO: Dropdowns',         path: `/dropdowns`,          component: DropdownGallery },
    { type: 'hr' },
    { type: 'heading', text: 'Structural' },
    { type: 'link',    text: 'Footers',                 path: `/footers`,            component: FooterGallery },
    { type: 'link',    text: 'TODO: Modals',            path: `/modals`,             component: ModalGallery },
    { type: 'link',    text: 'TODO: Tabs',              path: `/tabs`,               component: TabGallery },
    { type: 'link',    text: 'TODO: Drawers',           path: `/drawers`,            component: DrawerGallery },
    { type: 'hr' },
    { type: 'heading', text: 'Data' },
    { type: 'link',    text: 'TODO: Trees',             path: `/trees`,              component: TreeGallery },
    { type: 'link',    text: 'TODO: Tables',            path: `/tables`,             component: TableGallery },
    { type: 'link',    text: 'TODO: Searchables',       path: `/searchables`,        component: SearchableGallery },
  ];

  return (
    <ThemeProvider theme={theme}>
      <RoutingGrid>
        <RoutingGridLeft>
          <Dropdown style={{ marginBottom: '4px' }}>
            <FU.DropdownToggle $removeBorder={true}>
              <span>Palette: {theme.NAME}</span>
              <CommonBlackSvg as={Assets.ChevronSvg} width={10} height={8} />
            </FU.DropdownToggle>
            <FU.DropdownMenu>
              {
                Object.values(Themes).map((theme: DefaultTheme<string, string, string>, i) => (
                  <FU.DropdownItem key={i} onClick={() => setTheme(theme)}>
                    { theme.NAME }
                  </FU.DropdownItem>
                ))
              }
            </FU.DropdownMenu>
          </Dropdown>

          <Dropdown>
            <FU.DropdownToggle $removeBorder={true}>
              <span>BG: {galleryBG}</span>
              <CommonBlackSvg as={Assets.ChevronSvg} width={10} height={8} />
            </FU.DropdownToggle>
            <FU.DropdownMenu>
              <FU.DropdownItem onClick={() => setGalleryBG('#FFFFFF')}>#FFFFFF</FU.DropdownItem>
              <FU.DropdownItem onClick={() => setGalleryBG('#F8F8F8')}>#F8F8F8</FU.DropdownItem>
            </FU.DropdownMenu>
          </Dropdown>

          {
            sectionsConfig.map((linkConfig, i) => {
              switch(linkConfig.type) {
                case 'hr':
                  return <HR key={i} />;
                case 'heading':
                  return <Heading key={i}>{linkConfig.text}</Heading>;
                case 'link':
                default:
                  return (
                    <RoutingLink
                      as={Link}
                      key={linkConfig.path}
                      to={linkConfig.path}
                      $isWip={linkConfig.text.indexOf('TODO') === 0}
                      className={location.pathname === linkConfig.path ? 'hover' : ''}
                    >
                      {linkConfig.text}
                    </RoutingLink>
                  );
              }
            })
          }
        </RoutingGridLeft>
        <RoutingGridRight $bg={galleryBG}>
          {
            sectionsConfig.map(linkConfig => {
              if(linkConfig.type === 'link') {
                return <Route key={linkConfig.path} path={linkConfig.path} component={linkConfig.component ?? undefined} />
              }
              return undefined;
            })
          }
          <Switch>
            <Route path="/notes-for-design">
              <ul>
                <li>
                  The red color was changed to make invalid text have more contrast.  However, the "Delete" button is also tied to this red.
                  After the change, the button looks much dimmer.  Should these two reds be split for these different use cases?

                  <div style={{ padding: '20px', borderLeft: '2px solid #d8d8d8', margin: '10px 0 40px 0' }}>
                    <div>
                      <FU.ComponentLabel>Invalid Input</FU.ComponentLabel>
                      <FU.Input $valid={false} defaultValue={'Sample Value'} />
                      <div style={{ marginTop: '8px', color: Themes.CrosscapTheme.INVALID, fontSize: '12px', letterSpacing: "0.18px" }}>
                        Value must be unique.
                      </div>
                    </div>

                    <hr />

                    <SectionGrid $inline={true} $columns={5} $columnGap={15}>
                      <RedButton $type="custom">
                        <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                        <span>Custom</span>
                      </RedButton>

                      <RedButton $type="custom">
                        <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                        <span>Generously Sized</span>
                      </RedButton>

                      <RedButton $type="custom" className={`hover`}>
                        <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                        <span>Hovered</span>
                      </RedButton>

                      <RedButton $type="custom" className={`active`}>
                        <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                        <span>Active</span>
                      </RedButton>

                      <RedButton $type="custom" disabled>
                        <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                        <span>Disabled</span>
                      </RedButton>
                    </SectionGrid>                
                  </div>
                </li>
              </ul>

              <ul>
                <li>
                  While not a major issue, I've also displayed a sample of the Tertiary and Custom buttons using the new systemized
                  values (90%, 70% absolute lightness of FG) for review.

                  <div style={{ padding: '20px', borderLeft: '2px solid #d8d8d8', margin: '10px 0 40px 0' }}>
                    <SectionGrid $inline={true} $columns={5} $columnGap={15} $rowGap={12}>
                      <FU.Button $type="tertiary">Custom</FU.Button>
                      <FU.Button $type="tertiary">Generously Sized</FU.Button>
                      <FU.Button $type="tertiary" className={`hover`}>Hovered</FU.Button>
                      <FU.Button $type="tertiary" className={`active`}>Active</FU.Button>
                      <FU.Button $type="tertiary" disabled>Disabled</FU.Button>

                      <RedButton $type="custom">
                        <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                        <span>Custom</span>
                      </RedButton>

                      <RedButton $type="custom">
                        <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                        <span>Generously Sized</span>
                      </RedButton>

                      <RedButton $type="custom" className={`hover`}>
                        <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                        <span>Hovered</span>
                      </RedButton>

                      <RedButton $type="custom" className={`active`}>
                        <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                        <span>Active</span>
                      </RedButton>

                      <RedButton $type="custom" disabled>
                        <CommonRedSvg as={Assets.TrashSvg} width={19} height={19} />
                        <span>Disabled</span>
                      </RedButton>
                    </SectionGrid>                
                  </div>
                </li>
              </ul>
            </Route>
          </Switch>
        </RoutingGridRight>
      </RoutingGrid>
    </ThemeProvider>
  );
}


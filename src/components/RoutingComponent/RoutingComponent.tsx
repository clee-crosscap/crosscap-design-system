import React, { useState } from 'react';
import { useLocation, Switch, Route, Link } from 'react-router-dom';
import styled, { DefaultTheme, ThemeProvider } from 'styled-components/macro';
import { Dropdown } from 'react-bootstrap';

import * as FU from '@utility/Form.utility';
import * as SU from '@utility/Svg.utility';
import * as Assets from '@assets/.';
import * as Themes from '@components/Theme';
import ButtonGallery from '@features/ButtonGallery/ButtonGallery';
import TooltipGallery from '@features/TooltipGallery/TooltipGallery';
import TextFieldGallery from '@features/TextFieldGallery/TextFieldGallery';
import FooterGallery from '@features/FooterGallery/FooterGallery';
import PaletteGallery from '@features/PaletteGallery/PaletteGallery';
import DropdownGallery from '@features/DropdownGallery/DropdownGallery';
import SelectionGallery from '@features/SelectionGallery/SelectionGallery';
import ModalGallery from '@features/ModalGallery/ModalGallery';
import DrawerGallery from '@features/DrawerGallery/DrawerGallery';
import IconGallery from '@features/IconGallery/IconGallery';
import LoadingIndicatorGallery from '@features/LoadingIndicatorGallery/LoadingIndicatorGallery';
import NotificationGallery from '@features/NotificationGallery/NotificationGallery';
import TreeGallery from '@features/TreeGallery/TreeGallery';
import SearchableGallery from '@features/SearchableGallery/SearchableGallery';
import BrandingGallery from '@features/BrandingGallery/BrandingGallery';
import TabGallery from '@features/TabGallery/TabGallery';
import TableGallery from '@features/TableGallery/TableGallery';

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
const RoutingLink = styled(FU.DropdownItem)`
  width: calc(100% + 100px);
  margin-left: -40px;
  padding-left: 40px;

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
export default function RoutingComponent() {
  const location = useLocation();
  const [ theme, setTheme ] = useState<DefaultTheme>(Themes.CrosscapTheme);
  const [ galleryBG, setGalleryBG ] = useState<string>('#FFFFFF');

  interface LinkConfig {
    type: 'link',
    path: string,
    text: string,
    component: React.ComponentType,
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
    { type: 'heading', text: 'Components' },
    { type: 'link',    text: 'Text Fields',             path: '/text-fields',        component: TextFieldGallery },
    { type: 'link',    text: 'TODO: Dropdowns',         path: `/dropdowns`,          component: DropdownGallery },
    { type: 'link',    text: 'Selections',              path: `/selections`,         component: SelectionGallery },
    { type: 'link',    text: 'Buttons',                 path: '/buttons',            component: ButtonGallery },
    { type: 'link',    text: 'Icons',                   path: `/icons`,              component: IconGallery },
    { type: 'hr' },
    { type: 'heading', text: 'Structural' },
    { type: 'link',    text: 'TODO: Modals',            path: `/modals`,             component: ModalGallery },
    { type: 'link',    text: 'TODO: Tabs',              path: `/tabs`,               component: TabGallery },
    { type: 'link',    text: 'TODO: Drawers',           path: `/drawers`,            component: DrawerGallery },
    { type: 'link',    text: 'TOOD: Footers',           path: `/footers`,            component: FooterGallery },
    { type: 'hr' },
    { type: 'heading', text: 'Data' },
    { type: 'link',    text: 'TODO: Trees',             path: `/trees`,              component: TreeGallery },
    { type: 'link',    text: 'TODO: Tables',            path: `/tables`,             component: TableGallery },
    { type: 'link',    text: 'TODO: Searchables',       path: `/searchables`,        component: SearchableGallery },
    { type: 'hr' },
    { type: 'heading', text: 'Informational' },
    { type: 'link',    text: 'Tooltips',                path: '/tooltips',           component: TooltipGallery },
    { type: 'link',    text: 'TODO: Notifications',     path: `/notifications`,      component: NotificationGallery },
    { type: 'link',    text: 'TODO: Loading Indicator', path: `/loading-indicator`,  component: LoadingIndicatorGallery },
    { type: 'link',    text: 'Palettes',                path: `/palettes`,           component: PaletteGallery },
    { type: 'link',    text: 'TODO: Branding',          path: `/branding`,           component: BrandingGallery },
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
                Object.values(Themes).map((theme: DefaultTheme, i) => (
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
          <Switch>
            {
              sectionsConfig.map(linkConfig => {
                if(linkConfig.type === 'link') {
                  return <Route key={linkConfig.path} path={linkConfig.path} component={linkConfig.component} />
                }
                return undefined;
              })
            }


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
    </ThemeProvider>
  );
}


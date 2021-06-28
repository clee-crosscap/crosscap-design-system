import React, { useState } from 'react';
import { useLocation, Route, Link } from 'react-router-dom';
import styled, { DefaultTheme, ThemeProvider } from 'styled-components/macro';

import * as FU from '@utility/Form.utility';
import * as Themes from '@components/Theme';

import DesignNotes from '@features/DesignNotes/DesignNotes';

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

export default function RoutingComponent() {
  const location = useLocation();
  const [ theme, setTheme ] = useState<DefaultTheme<string, string, string>>(Themes.CalendarTheme);
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
    { type: 'link',    text: 'Notes For Design',        path: '/notes-for-design',   component: DesignNotes },
    { type: 'hr' },
    { type: 'heading', text: 'Informational' },
    { type: 'link',    text: 'Palettes',                path: '/palettes',           component: PaletteGallery },
    { type: 'link',    text: 'Tooltips',                path: '/tooltips',           component: TooltipGallery },
    { type: 'link',    text: 'TODO: Notifications',     path: '/notifications',      component: NotificationGallery },
    { type: 'link',    text: 'TODO: Loading Indicator', path: '/loading-indicator',  component: LoadingIndicatorGallery },
    { type: 'link',    text: 'TODO: Branding',          path: '/branding',           component: BrandingGallery },
    { type: 'hr' },
    { type: 'heading', text: 'Components' },
    { type: 'link',    text: 'Text Fields',             path: '/text-fields',        component: TextFieldGallery },
    { type: 'link',    text: 'Selections',              path: '/selections',         component: SelectionGallery },
    { type: 'link',    text: 'Dropdowns',               path: '/dropdowns',          component: DropdownGallery },
    { type: 'link',    text: 'Buttons',                 path: '/buttons',            component: ButtonGallery },
    { type: 'link',    text: 'Badges',                  path: '/badges',             component: BadgeGallery },
    { type: 'link',    text: 'Icons',                   path: '/icons',              component: IconGallery },
    { type: 'hr' },
    { type: 'heading', text: 'Structural' },
    { type: 'link',    text: 'Tabs',                    path: '/tabs',               component: TabGallery },
    { type: 'link',    text: 'Footers',                 path: '/footers',            component: FooterGallery },
    { type: 'link',    text: 'TODO: Modals',            path: '/modals',             component: ModalGallery },
    { type: 'link',    text: 'TODO: Drawers',           path: '/drawers',            component: DrawerGallery },
    { type: 'hr' },
    { type: 'heading', text: 'Data' },
    { type: 'link',    text: 'TODO: Trees',             path: '/trees',              component: TreeGallery },
    { type: 'link',    text: 'TODO: Tables',            path: '/tables',             component: TableGallery },
    { type: 'link',    text: 'TODO: Searchables',       path: '/searchables',        component: SearchableGallery },
  ];

  return (
    <ThemeProvider theme={theme}>
      <RoutingGrid>
        <RoutingGridLeft>
          <FU.Dropdown style={{ marginBottom: '4px' }}>
            <FU.DropdownToggle $width="auto" $removeBorder={true}>
              <span>Palette: {theme.NAME}</span>
              <FU.DropdownChevron />
            </FU.DropdownToggle>
            <FU.DropdownMenu $width="auto">
              {
                Object.values(Themes).map((theme: DefaultTheme<string, string, string>, i) => (
                  <FU.DropdownItem key={i} onClick={() => setTheme(theme)}>
                    { theme.NAME }
                  </FU.DropdownItem>
                ))
              }
            </FU.DropdownMenu>
          </FU.Dropdown>

          <FU.Dropdown>
            <FU.DropdownToggle $width="auto" $removeBorder={true}>
              <span>BG: {galleryBG}</span>
              <FU.DropdownChevron />
            </FU.DropdownToggle>
            <FU.DropdownMenu $width="auto">
              <FU.DropdownItem onClick={() => setGalleryBG('#FFFFFF')}>#FFFFFF</FU.DropdownItem>
              <FU.DropdownItem onClick={() => setGalleryBG('#F8F8F8')}>#F8F8F8</FU.DropdownItem>
            </FU.DropdownMenu>
          </FU.Dropdown>

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
        </RoutingGridRight>
      </RoutingGrid>
    </ThemeProvider>
  );
}


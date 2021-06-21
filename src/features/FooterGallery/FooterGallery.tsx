import React, { useRef, useState } from 'react';
import styled from 'styled-components/macro';

import * as SU from '@utility/Svg.utility';
import * as CTU from '@utility/CSSTransition.utility';
import * as FU from '@utility/Form.utility';
import CrosscapTheme from '@components/Theme/CrosscapTheme';
import { CSSTransition } from 'react-transition-group';

import { ReactComponent as PencilSvg } from '@assets/pencil.svg';
import { ReactComponent as CloseSvg } from '@assets/close.svg';

const CommonBlackSvg = styled(SU.styledSvg({ $fillStroke: CrosscapTheme.ICON_DARK }))`
`;

const GalleryWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    " content "
    " footer "
  ;
  grid-template-rows: 1fr auto;
`;
const Gallery = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 40px;
  display: grid;
  grid-area: content;
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
  grid-template-columns: auto auto;
  grid-column-gap: 12px;
  grid-row-gap: 12px;
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
const Footer = styled(CTU.FooterTransition)`
  grid-area: footer;
  height: 75px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
  display: grid;
  grid-auto-flow: column;
  background-color: #FFFFFF;
  align-content: stretch;
  justify-content: start;
  grid-template-columns: auto auto 1fr auto;
  z-index: 1;
  grid-template-areas: " group1 group2 . group3 ";
`;
const FooterInformation = styled.div`
  padding: 0 34px;
  justify-self: center;
  border-right: 1px solid ${p => p.theme.DIVIDER};
  margin-right: -1px;
  display: inline-grid;
  grid-area: group1;
  place-content: center;
  font-size: 13px;
  color: ${p => p.theme.GRAY_84};
`;
const FooterLocalActions = styled.div`
  display: grid;
  grid-area: group2;
  grid-auto-flow: column;
  align-content: stretch;
  overflow-x: auto;
`;
const FooterFormActions = styled.div`
  display: grid;
  grid-area: group3;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  align-items: center;
  margin-right: 48px;
`;

const FOOTER_TIMEOUT = 300;

export default function GenericGallery() {
  const [ basicInformationEnabled,    setBasicInformationEnabled    ] = useState<boolean>(false);
  const [ basicLocalActionsEnabled,   setBasicLocalActionsEnabled   ] = useState<boolean>(false);
  const [ basicFormActionsEnabled,    setBasicFormActionsEnabled    ] = useState<boolean>(true);
  const [ stackedInformationEnabled,  setStackedInformationEnabled  ] = useState<boolean>(true);
  const [ stackedLocalActionsEnabled, setStackedLocalActionsEnabled ] = useState<boolean>(true);
  const [ stackedFormActionsEnabled,  setStackedFormActionsEnabled  ] = useState<boolean>(true);
  const [ basicFooterOpen,            setBasicFooterOpen            ] = useState<boolean>(true);
  const [ stackedFooterOpen,          setStackedFooterOpen          ] = useState<boolean>(false);

  const basicFooterNodeRef = useRef<HTMLDivElement>(null);
  const stackedFooterNodeRef = useRef<HTMLDivElement>(null);

  const toggleBasicFooter = (() => {
    if(basicFooterOpen) {
      setStackedFooterOpen(false);
    }
    setBasicFooterOpen(!basicFooterOpen);
  });

  return (
    <GalleryWrapper>
      <Gallery>
        <GallerySection>
          <Title>Basic Footer</Title>
          <SectionGallery>
            <SectionHeader onClick={() => setBasicInformationEnabled(!basicInformationEnabled)}>Informational</SectionHeader>
            <FU.Checkbox $checkbox={basicInformationEnabled} $disabled={false} onClick={() => setBasicInformationEnabled(!basicInformationEnabled)} />
            <SectionHeader onClick={() => setBasicLocalActionsEnabled(!basicLocalActionsEnabled)}>Actions (Local)</SectionHeader>
            <FU.Checkbox $checkbox={basicLocalActionsEnabled} $disabled={false} onClick={() => setBasicLocalActionsEnabled(!basicLocalActionsEnabled)} />
            <SectionHeader onClick={() => setBasicFormActionsEnabled(!basicFormActionsEnabled)}>Actions (Form)</SectionHeader>
            <FU.Checkbox $checkbox={basicFormActionsEnabled} $disabled={false} onClick={() => setBasicFormActionsEnabled(!basicFormActionsEnabled)} />

            <FU.Button $type={'primary'} onClick={toggleBasicFooter}>
              Toggle Footer
            </FU.Button>
          </SectionGallery>
        </GallerySection>

        <HR/>

        <GallerySection>
          <Title>Stacked Footer</Title>
          <SectionGallery>
          <SectionHeader>Informational</SectionHeader>
            <FU.Checkbox $checkbox={stackedInformationEnabled} $disabled={!basicFooterOpen} onClick={() => basicFooterOpen && setStackedInformationEnabled(!stackedInformationEnabled)} />
            <SectionHeader>Actions (Local)</SectionHeader>
            <FU.Checkbox $checkbox={stackedLocalActionsEnabled} $disabled={!basicFooterOpen} onClick={() => basicFooterOpen && setStackedLocalActionsEnabled(!stackedLocalActionsEnabled)} />
            <SectionHeader>Actions (Form)</SectionHeader>
            <FU.Checkbox $checkbox={stackedFormActionsEnabled} $disabled={!basicFooterOpen} onClick={() => basicFooterOpen && setStackedFormActionsEnabled(!stackedFormActionsEnabled)} />
            <FU.Button $type={'primary'} disabled={!basicFooterOpen} onClick={() => setStackedFooterOpen(!stackedFooterOpen)}>
              Toggle Stacked Footer
            </FU.Button>
          </SectionGallery>
        </GallerySection>

        <HR/>

        TODO: Add a tooltip to disabled local actions
      </Gallery>

      <CSSTransition
        in={basicFooterOpen}
        timeout={FOOTER_TIMEOUT}
        mountOnEnter
        unmountOnExit
        classNames="transition"
        nodeRef={basicFooterNodeRef}
      >
        <Footer ref={basicFooterNodeRef} $timeout={FOOTER_TIMEOUT}>
          {
            basicInformationEnabled &&
            <FooterInformation>9 Items Selected</FooterInformation>
          }
          {
            basicLocalActionsEnabled &&
            <FooterLocalActions>
              <FU.FooterAction disabled={true}>
                <CommonBlackSvg as={PencilSvg} width={16} height={16} />
                Revert
              </FU.FooterAction>
              <FU.FooterAction>
                <CommonBlackSvg as={PencilSvg} width={16} height={16} />
                Sync
              </FU.FooterAction>
              <FU.FooterAction>
                <CommonBlackSvg as={CloseSvg} width={16} height={16} />
                Remove
              </FU.FooterAction>
            </FooterLocalActions>
          }
          {
            basicFormActionsEnabled &&
            <FooterFormActions>
              <FU.Button $type="secondary">Cancel</FU.Button>
              <FU.Button $type="primary">Save</FU.Button>
            </FooterFormActions>
          }
        </Footer>
      </CSSTransition>

      <CSSTransition
        in={stackedFooterOpen}
        timeout={FOOTER_TIMEOUT}
        mountOnEnter
        unmountOnExit
        classNames="transition"
        nodeRef={stackedFooterNodeRef}
      >
        <Footer ref={stackedFooterNodeRef} $timeout={FOOTER_TIMEOUT}>
          {
            stackedInformationEnabled &&
            <FooterInformation>9 Filtered Items</FooterInformation>
          }
          {
            stackedLocalActionsEnabled &&
            <FooterLocalActions>
              <FU.FooterAction>
                <CommonBlackSvg as={PencilSvg} width={16} height={16} />
                Collate
              </FU.FooterAction>
              <FU.FooterAction>
                <CommonBlackSvg as={PencilSvg} width={16} height={16} />
                Sort
              </FU.FooterAction>
              <FU.FooterAction disabled={true}>
                <CommonBlackSvg as={PencilSvg} width={16} height={16} />
                Pivot
              </FU.FooterAction>
            </FooterLocalActions>
          }
          {
            stackedFormActionsEnabled &&
            <FooterFormActions>
              <FU.Button $type="secondary">Cancel</FU.Button>
              <FU.Button $type="primary">Apply</FU.Button>
            </FooterFormActions>
          }
        </Footer>
      </CSSTransition>

    </GalleryWrapper>
  );
}


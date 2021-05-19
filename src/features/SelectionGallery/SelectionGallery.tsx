import React, { useState } from 'react';
import styled from 'styled-components/macro';

import * as SU from '@utility/Svg.utility';
import * as FU from '@utility/Form.utility';
import * as Assets from '@assets/.';
import CrosscapTheme from '@components/Theme/CrosscapTheme';

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
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  grid-template-columns: auto auto;
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
export default function GenericGallery() {
  const [ binaryToggleState, setBinaryToggleState ] = useState<boolean>(true);
  const [ binaryCheckboxState, setBinaryCheckboxState ] = useState<boolean>(true);
  const [ ternaryCheckboxState, setTernaryCheckboxState ] = useState<boolean | undefined>(true);

  const toggleTernaryCheckbox = (() => {
    switch(ternaryCheckboxState) {
      case false:     setTernaryCheckboxState(true);      break;
      case true:      setTernaryCheckboxState(undefined); break;
      case undefined: setTernaryCheckboxState(false);     break;
    }
  });

  return (
    <Gallery>
      <GallerySection>
        <Title>Binary Checkboxes</Title>
        <SectionHeader>Binary checkboxes have three selection states: "on" and "off".</SectionHeader>
        <SectionGallery>
          <SectionHeader>Enabled</SectionHeader>
          <FU.Checkbox $checkbox={binaryCheckboxState} $disabled={false} onClick={() => setBinaryCheckboxState(!binaryCheckboxState)} />
          <SectionHeader>Disabled</SectionHeader>
          <FU.Checkbox $checkbox={binaryCheckboxState} $disabled={true} />
        </SectionGallery>
      </GallerySection>

      <HR/>

      <GallerySection>
        <Title>Ternary Checkboxes</Title>
        <SectionHeader>Ternary checkboxes have three selection states: "on", "off", and "partial".</SectionHeader>
        <SectionGallery>
          <SectionHeader>Enabled</SectionHeader>
          <FU.Checkbox $checkbox={ternaryCheckboxState} $disabled={false} onClick={toggleTernaryCheckbox} />
          <SectionHeader>Disabled</SectionHeader>
          <FU.Checkbox $checkbox={ternaryCheckboxState} $disabled={true} />
        </SectionGallery>
      </GallerySection>

      <HR/>

      <GallerySection>
        <Title>Toggle</Title>
        <SectionHeader>Toggles have two selection states: "on" and "off".</SectionHeader>
        <SectionGallery>
          <SectionHeader>Enabled</SectionHeader>
          <FU.Toggle $toggle={binaryToggleState} onClick={() => setBinaryToggleState(!binaryToggleState)} />
          <SectionHeader>Disabled</SectionHeader>
          <FU.Toggle $toggle={binaryToggleState} $disabled={true} />
        </SectionGallery>
      </GallerySection>

      <HR/>

      <GallerySection>
        <Title>TODO: Radio Buttons</Title>
        <SectionHeader>Radio buttons may have zero to one selections.</SectionHeader>
        <SectionGallery>
          <SectionHeader>Enabled</SectionHeader>
          <span>[Enabled Radio Button Example]</span>
          <SectionHeader>Disabled</SectionHeader>
          <span>[Disabled Radio Button Example]</span>
        </SectionGallery>
      </GallerySection>

      <HR/>

      <GallerySection>
        <Title>TODO: Dropdown Single Selection</Title>
        <SectionHeader>Single selection dropdowns may have zero to one selections.</SectionHeader>
        <SectionGallery>
          <SectionHeader>Enabled</SectionHeader>
          <span>[Enabled Dropdown Single Selection Example]</span>
          <SectionHeader>Disabled</SectionHeader>
          <span>[Disabled Dropdown Single Selection Example]</span>
        </SectionGallery>
      </GallerySection>

      <HR/>

      <GallerySection>
        <Title>TODO: Dropdown Multiple Selections</Title>
        <SectionHeader>
          Multiple selection dropdowns may have zero or more selections.
        </SectionHeader>
        <SectionGallery>
          <SectionHeader>Enabled</SectionHeader>
          <span>[Enabled Dropdown Multi Selection Example]</span>
          <SectionHeader>Disabled</SectionHeader>
          <span>[Disabled Dropdown Multi Selection Example]</span>
        </SectionGallery>
      </GallerySection>
    </Gallery>
  );
}


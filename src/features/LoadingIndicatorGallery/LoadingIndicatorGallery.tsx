import React from 'react';
import styled from 'styled-components/macro';

// import * as SU from '@utility/Svg.utility';
// import CrosscapTheme from '@components/Theme/CrosscapTheme';

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
// interface MarginProps {
//   $marginTop?: number,
//   $marginBottom?: number,
// }
// const Line = styled.div<MarginProps>`
//   display: block;
//   margin-top: ${p => p.$marginTop ?? 0}px;
//   margin-bottom: ${p => p.$marginBottom ?? 0}px;
// `;
export default function GenericGallery() {
  return (
    <Gallery>
      <GallerySection>
        <Title>Section Title</Title>
        <SectionHeader>
          Section Text
        </SectionHeader>
        <SectionGallery>
          <span>Item</span>
          <span>Item</span>
        </SectionGallery>
      </GallerySection>

      <HR/>

      <GallerySection>
        <Title>Section Title</Title>
        <SectionHeader>
          Section Text
        </SectionHeader>
        <SectionGallery>
          <span>Item</span>
          <span>Item</span>
        </SectionGallery>

        <pre>{`
          TODO: Loading indicator

          Loading indicator for full-screen workflows
          Loading indicator for multi-pane workflows
          Loading indicator for modal workflows
          Loading indicator for individual components`
        }</pre>
      </GallerySection>
    </Gallery>
  );
}


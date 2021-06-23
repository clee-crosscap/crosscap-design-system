import React, { useState } from 'react';
import styled from 'styled-components/macro';

import * as FU from '@utility/Form.utility';
import * as LU from '@utility/Layout.utility';

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
interface Tab {
  id: number,
  name: string,
  count: number,
  disabled: boolean,
};
const tabsList = [
  { id: 1, name: 'Promotions',   count: 3, disabled: false },
  { id: 2, name: 'Partnerships', count: 1, disabled: false },
  { id: 3, name: 'Archived',     count: 2, disabled: true },
  { id: 4, name: 'Retention',    count: 5, disabled: false },
];

export default function GenericGallery() {
  const [ selectedTabId, setSelectedTabId ] = useState<number>(tabsList[0].id);

  return (
    <Gallery>
      <GallerySection>
        <Title>Tabs</Title>
        <SectionHeader>
          Tabs have selected, hovered, and active states.
        </SectionHeader>
        <SectionGallery>
          <Line>
            <LU.TabRow $margin={-40} $columnGap={20}>
              {
                tabsList.map(tab => (
                  <LU.Tab key={tab.id}
                    $selected={selectedTabId === tab.id}
                    disabled={tab.disabled}
                    onClick={() => setSelectedTabId(tab.id)}
                  >
                    <span>{tab.name}</span>
                    <FU.Badge
                      $active={selectedTabId === tab.id}
                      $count={tab.count}
                    />
                  </LU.Tab>
                ))
              }
            </LU.TabRow>
          </Line>
        </SectionGallery>
      </GallerySection>
    </Gallery>
  );
}


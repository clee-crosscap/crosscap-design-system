import React, { useMemo, useState } from 'react';
import styled from 'styled-components/macro';

import * as FU from '@utility/Form.utility';
import * as LU from '@utility/Layout.utility';
import Tabset, { Tab, DisabledTabEventCatcher, TabsetOption, TabsetOptionName } from '@components/Tabset/Tabset';

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
// const SectionGallery = styled.div`
//   display: inline-grid;
//   grid-auto-flow: column;
//   grid-column-gap: 12px;
//   justify-content: start;
//   align-items: center;
// `;
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

const FolderTabsetOption = styled(TabsetOption)`
  height: 50px;
  display: grid;
  grid-column-gap: 8px;
  grid-auto-flow: column;
  grid-template-columns: auto;
  grid-auto-columns: min-content;
  justify-content: stretch;
  justify-items: start;
  align-items: center;
`;
const TabsetPath = styled.div`
  font-size: 12px;
  font-weight: 400;
`;
interface TabData {
  id: number,
  name: string,
  path: string,
  count: number,
  disabled: boolean,
};
const baseTabList: TabData[] = [
  { "id": 124, "disabled": false, "count": 22, "name": "World Topic Days", "path": "Ottobock > Global > World Topic Days" },
  { "id": 126, "disabled": false, "count": 6,  "name": "Global Events & Exhibitions", "path": "Ottobock > Global > Global Events & Exhibitions" },
  { "id": 96,  "disabled": true,  "count": 10, "name": "Key Strategic Initiatives", "path": "Ottobock > Global > Key Strategic Initiatives" },
  { "id": 129, "disabled": false, "count": 1,  "name": "Baseline Initiative", "path": "Ottobock > Global > Baseline Initiative" },
  { "id": 97,  "disabled": false, "count": 15, "name": "Product Launches", "path": "Ottobock > Global > Product Launches" },
  { "id": 123, "disabled": false, "count": 6,  "name": "Global Launch Process", "path": "Ottobock > Global > Global Launch Process" },
  { "id": 122, "disabled": false, "count": 19, "name": "Training", "path": "Ottobock > Global > Training" },
  { "id": 128, "disabled": true,  "count": 18, "name": "Social Media", "path": "Ottobock > Content > Social Media" },
  { "id": 119, "disabled": true,  "count": 1,  "name": "Blog", "path": "Ottobock > Content > Blog" },
  { "id": 120, "disabled": false, "count": 21, "name": "Video", "path": "Ottobock > Content > Video" },
  { "id": 121, "disabled": false, "count": 14, "name": "Other Content", "path": "Ottobock > Content > Other Content" },
  { "id": 125, "disabled": false, "count": 13, "name": "Nationwide Topic Days", "path": "Ottobock > Germany > Channel > Nationwide Topic Days" },
  { "id": 102, "disabled": false, "count": 19, "name": "Telemarketing", "path": "Ottobock > Germany > Channel > Telemarketing" },
  { "id": 103, "disabled": false, "count": 2,  "name": "Comm Svcs", "path": "Ottobock > Germany > Channel > Comm Svcs" },
  { "id": 100, "disabled": false, "count": 15, "name": "PCS", "path": "Ottobock > Germany > Channel > PCS" },
  { "id": 101, "disabled": false, "count": 18, "name": "Sales", "path": "Ottobock > Germany > Channel > Sales" },
  { "id": 98,  "disabled": false, "count": 8,  "name": "Initiative", "path": "Ottobock > Germany > Initiative" },
  { "id": 109, "disabled": false, "count": 18, "name": "Sales", "path": "Ottobock > USA > Sales" },
  { "id": 105, "disabled": false, "count": 8,  "name": "Initiative", "path": "Ottobock > USA > Initiative" },
  { "id": 106, "disabled": false, "count": 2,  "name": "Custom Svc", "path": "Ottobock > USA > Channel > Custom Svc" },
  { "id": 107, "disabled": false, "count": 2,  "name": "Comm Svcs", "path": "Ottobock > USA > Channel > Comm Svcs" },
  { "id": 108, "disabled": false, "count": 15, "name": "PCS", "path": "Ottobock > USA > Channel > PCS" },
  { "id": 112, "disabled": false, "count": 12, "name": "Marketing", "path": "Ottobock > USA > Channel > Marketing" },
  { "id": 114, "disabled": false, "count": 2,  "name": "CMO HQ Communication", "path": "Ottobock > Internal MKT Communication Steering > CMO HQ Communication" },
  { "id": 115, "disabled": false, "count": 14, "name": "OBA Communication", "path": "Ottobock > Internal MKT Communication Steering > OBA Communication" }
];
const baseTabIds: number[] = baseTabList.map(tab => tab.id);
const baseTabMap: Record<number, TabData> = baseTabList.reduce((acc, tab) => Object.assign(acc, { [tab.id]: tab }), {});

export default function GenericGallery() {
  const [ tabIds, setTabIds ] = useState<number[]>(baseTabIds);
  const [ selectedTabId, setSelectedTabId ] = useState<number>(tabIds[0]);
  const tabTexts = useMemo<string[]>(() => tabIds.map(id => baseTabMap[id]).flatMap(tab => [ tab.name, tab.path ]), [ tabIds ]);
  const tabTextY0s = useMemo<number[]>(() => tabIds.map((_,i) =>  i   *50).flatMap(v => [ v, v ]), [ tabIds ]);
  const tabTextY1s = useMemo<number[]>(() => tabIds.map((_,i) => (i+1)*50).flatMap(v => [ v, v ]), [ tabIds ]);
  const tabOrderMap = useMemo<Record<number, number>>(() => tabIds.reduce((acc, tabId, i) => Object.assign(acc, { [tabId]: i }), {}), [ tabIds ]);
  const tabsetEqualityRef = useMemo(() => ({ tabIds }), [ tabIds ]);

  return (
    <Gallery>
      <GallerySection>
        <Title>Header Tabset</Title>
        <SectionHeader>
          Header tabsets have a drop shadow unlike footer tabsets.
          Tabs have selected, hovered, active, and disabled states.
          <HR />
          Header tabs allow for horiontal mouse dragging.
          Hovering the tabset with horizontally overflowing content
          displays overlaid navigation chevrons.
          <HR />
          If the tabs overflow, an ellipsis icon dropdown dynamically appears
          aligned to the right of the tabset which opens a dropdown displaying
          a scrollable, searchable dropdown menu of all tabs.  Each dropdown
          item may display metadata related to what the tab represents below
          each item such as a breadcrumb of the tab's folder path.
          <HR />
        </SectionHeader>

        <Tabset
          margin={-40}
          gap={20}
          selectedTabId={selectedTabId}
          tabIds={tabIds}
          optionSearchTexts={tabTexts}
          optionSearchY0s={tabTextY0s}
          optionSearchY1s={tabTextY1s}
          equalityRef={tabsetEqualityRef}
          onSelectTabId={tabId => setSelectedTabId(tabId)}
          onRenderTab={(tabId: number, Component: typeof Tab, componentProps: React.ComponentProps<typeof Tab>) => (
            <Component disabled={baseTabMap[tabId].disabled} {...componentProps}>
              {
                baseTabMap[tabId].disabled &&
                <DisabledTabEventCatcher />
              }
              <span>{baseTabMap[tabId].name}</span>
              <FU.Badge $active={tabId === selectedTabId} $count={baseTabMap[tabId].count} />
            </Component>
          )}
          onRenderTabOption={(tabId: number, Component: typeof TabsetOption, componentProps: React.ComponentProps<typeof TabsetOption>, renderSearchableText: (text: string, optionSearchIndex: number) => JSX.Element) => (
            <FolderTabsetOption disabled={baseTabMap[tabId].disabled} {...componentProps}>
              <LU.BlockRowMajorGrid $rows={2} $justifyContent="start">
                <LU.BlockColumnMajorGrid $columns={2} $columnGap={6} $justifyContent="start" $alignItems="center">
                  <TabsetOptionName $selected={tabId === selectedTabId}>
                    { renderSearchableText(baseTabMap[tabId].name, (2*tabOrderMap[tabId])+0) }
                  </TabsetOptionName>
                  <FU.Badge $active={tabId === selectedTabId} $count={baseTabMap[tabId].count} />
                </LU.BlockColumnMajorGrid>
                <TabsetPath>
                  { renderSearchableText(baseTabMap[tabId].path, (2*tabOrderMap[tabId])+1) }
                </TabsetPath>
              </LU.BlockRowMajorGrid>
            </FolderTabsetOption>
          )}
        />

        <HR />

        <div>
          <FU.ComponentLabel>Adjust Shown Tabs (Max {baseTabIds.length})</FU.ComponentLabel>
          <FU.Input
            value={tabIds.length}
            onChange={({ target: { value: v }}: React.ChangeEvent<HTMLInputElement>) => (
              (0 < +v) && (+v <= baseTabIds.length) &&
              setTabIds(baseTabIds.slice(0, +v))
            )}
            min={1}
            max={baseTabIds.length}
            type="number"
          />
        </div>
      </GallerySection>
    </Gallery>
  );
}


import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import styled from 'styled-components/macro';

import * as FU from '@utility/Form.utility';

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
  grid-template-columns: auto;
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
const BadgeLine = styled(Line)`
  display: inline-grid;
  align-items: center;
  grid-auto-flow: column;
  justify-content: start;
  grid-column-gap: 8px;
`;

export default function GenericGallery() {
  const [ badgeCountState, setBadgeCountState ] = useImmer<number>(2345);

  const [ badgeUpdatingState, setBadgeUpdatingState ] = useState<boolean>(false);
  const [ badgeUpdateCounterState, setBadgeUpdateCounterState ] = useImmer<number | undefined>(undefined);

  const onUpdateBadgeCount = ((e: React.ChangeEvent<HTMLInputElement>) => {
    const val: string = e.target.value;
    if(Number.isFinite(+val)) {
      setBadgeCountState(_ => +val);
    }
  });
  
  const onUpdateInactiveBadge = (() => {
    setBadgeUpdatingState(true);
    setTimeout(() => {
      setBadgeCountState(v => v+1);
      setBadgeUpdatingState(false);
      setBadgeUpdateCounterState(v => (v ?? 0)+1);
    }, 1000);
  })

  return (
    <Gallery>
      <GallerySection>
        <Title>Badges</Title>
        <SectionHeader>
          Badges have an active and inactive state.  Badges may appear in their active state when it is part of
          a selected component such as an active tab.
          Badges a formatted with their locale-specific thousands separator.
        </SectionHeader>
        <SectionGallery>
          <BadgeLine>
            <span>Active Tasks</span>
            <FU.Badge $active={true} $count={badgeCountState} />
          </BadgeLine>
        </SectionGallery>

        <HR />

        <SectionGallery>
          <SectionHeader>
            When the badge count is updated (e.g. during a save), it momentarily animates to an active state to signal this.
          </SectionHeader>
          <BadgeLine>
            <span>Inactive Sub-Tasks</span>
            <FU.Badge $active={false} $count={badgeCountState} $countAnimationId={badgeUpdateCounterState} />
          </BadgeLine>
          <BadgeLine>
            <FU.Button $type="primary" disabled={badgeUpdatingState} onClick={onUpdateInactiveBadge}>Update</FU.Button>
          </BadgeLine>
        </SectionGallery>

        <HR />

        <SectionGallery>
          <FU.ComponentLabel>Badge Count</FU.ComponentLabel>
          <FU.Input value={badgeCountState} type="number" onChange={onUpdateBadgeCount} />
        </SectionGallery>
      </GallerySection>
    </Gallery>
  );
}


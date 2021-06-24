import React, { PropsWithChildren } from 'react';
import styled from 'styled-components/macro';
import { SegmentedText } from '@components/SearchableList/SearchableList';

interface SegmentProps {
  $matched?: boolean,
  $focused?: boolean,
}
const Segment = styled.span<SegmentProps>`
  padding: 2px 0;
  background-color: ${p => (p.$focused && p.theme.HIGHLIGHT_FOCUS) || (p.$matched && p.theme.HIGHLIGHT) || 'transparent'};
`;

interface Props {
  text: string,
  focusedMatchId: number | undefined,
  searchResults: SegmentedText | undefined,
  className?: string,
}
export default React.forwardRef<HTMLElement, PropsWithChildren<Props>>((props, ref) => {
  return (
    <span className={props.className} ref={ref}>
      {
        !props.searchResults
          ?
            <Segment>{props.text}</Segment>
          :
          props.searchResults.segments.map(({ matchIds, text }, i) => (
            <Segment key={i}
              $matched={matchIds?.length > 0}
              $focused={matchIds.includes(props.focusedMatchId)}
            >
              { text }
            </Segment>
          ))
      }
    </span>
  );
});

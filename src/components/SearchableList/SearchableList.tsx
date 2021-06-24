import React, { PropsWithChildren, useRef } from 'react';
import styled from 'styled-components/macro';
import kmpMatcher from 'kmp-matcher';

export interface Segment {
  matchIds: any[],
  text: string,
}
export interface SegmentedText {
  count: number,
  segments: Segment[],
  index?: number,
}
export interface SearchResults {
  resultCount: number,
  resultMap: Record<number, SegmentedText>,
  resultCursorMap: Record<number, { index: number, matchId: number }>,
}
const SearchableListComponent = styled.div`
  overflow-y: auto;
`;

interface Props {
  query: string,
  texts: string[],
  className?: string,
}
export default React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>((props, ref) => {
  return (
    <SearchableListComponent className={props.className} ref={ref}>
      { props.children }
    </SearchableListComponent>
  );
});


export function searchText(needle: string, haystack: string): SegmentedText {
	const lcNeedle:   string = needle.toLowerCase();
	const lcHaystack: string = haystack.toLowerCase();

	// Workaround library issue where an empty string needle '' matches as [ 1 ] unexpectedly
	const matchIndices: number[] = lcNeedle.length ? kmpMatcher.kmp(lcHaystack, lcNeedle) : [];
	const matchCount: number = matchIndices.length;

	const textSegments: Segment[] = [];
	const matchIndicesOrder: Record<number, number> = matchIndices.reduce((a,b,i) => Object.assign(a, { [b]: i }), {});

	// Divide the haystack string into highlighted or non-highlighted segments
	for(let currSegmentStart: number = 0; currSegmentStart < lcHaystack.length; ) {
		let currSegmentEnd: null | number = null;
		const matchIds: number[] = []

		if(!matchIndices.length || (currSegmentStart < matchIndices[0])) {
			// Current index is outside of a matching region: Segment until start of next match or end of string
			currSegmentEnd = matchIndices.length ? (matchIndices[0]-1) : (haystack.length-1);
		} else {
			const nextRangeIndex: number = matchIndices.findIndex(v => v > currSegmentStart);
			const currRangeStrIndices: number[] = (nextRangeIndex >= 0) ? matchIndices.slice(0, nextRangeIndex) : matchIndices;
			const nextRangeStrIndex: number = matchIndices[nextRangeIndex];

			currSegmentEnd = Math.min(                                                    // Segment where an active range closes or a new range opens
				...currRangeStrIndices.map(index => index + lcNeedle.length - 1),           // Ending indices of active ranges we've already opened
				...(typeof nextRangeStrIndex === 'number') ? [ nextRangeStrIndex-1 ] : [],  // Just before starting index of next range we haven't opened yet
			);

			matchIds.push(...currRangeStrIndices.map(idx => matchIndicesOrder[idx]));

			// Selected a completed match, drop it off the match list
			if(currSegmentEnd === (matchIndices[0] + lcNeedle.length - 1)) {
				matchIndices.shift();
			}
		}

		// Continue segmenting after the current added range
		textSegments.push({ matchIds, text: haystack.slice(currSegmentStart, currSegmentEnd + 1) });
		currSegmentStart = currSegmentEnd + 1;
	}

	return { count: matchCount, segments: textSegments };
}

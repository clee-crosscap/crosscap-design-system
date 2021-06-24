import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import styled from 'styled-components/macro';
import chroma from 'chroma-js';

import * as FU from '@utility/Form.utility';
import * as GU from '@utility/General.utility';
import * as SU from '@utility/Svg.utility';
import SearchableList, { SearchResults, searchText, SegmentedText } from '@components/SearchableList/SearchableList';
import SearchableSegmentedText from '@components/SearchableList/SearchableSegmentedText';
import NavigableSearchInput from '@components/NavigableSearchInput/NavigableSearchInput';
import * as Assets from '@assets/.';

interface MarginProp {
  $margin?: number,
  $marginLeft?: number,
  $marginRight?: number,
}
const TabsetRoot = styled.div<MarginProp>`
  width: calc(100% + ${p => -(p.$marginLeft ?? p.$margin ?? 0) + -(p.$marginRight ?? p.$margin ?? 0)}px);
  padding-left: ${p => -(p.$marginLeft ?? p.$margin ?? 0)}px;
  padding-bottom: 10px;
  margin-bottom: -10px;
  margin-left: ${p => p.$marginLeft ?? p.$margin ?? 0}px;
  margin-right: ${p => p.$marginRight ?? p.$margin ?? 0}px;
  display: grid;
  grid-template-columns: 1fr max-content;
  position: relative;
  overflow: hidden;

  :before {
    content: '';
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    height: 40px;
    pointer-events: none;
  }
`;

interface ColumnGapProp {
  $columnGap?: number,
}
const TabsetInner = styled.div<ColumnGapProp>`
  width: auto;
  max-width: 100%;
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: ${p => p.$columnGap ?? 0}px;
  place-content: start;
  overflow: hidden;
  position: relative;
  justify-self: start;
`;
interface SelectedProp {
  $selected: boolean,
}
const Tab = styled.button<SelectedProp>`
  padding: 0 20px;
  height: 40px;
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 6px;
  align-items: center;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: ${p => p.$selected ? p.theme.MODULE_PRIMARY : p.theme.TEXT_DARK};
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  transition: color 0.3s ease-out;

  &,
  &:hover,
  &:focus,
  &:active {
    border: 0px solid transparent;
    outline: none;
    background: transparent;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:not([disabled]) {
    :before {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 0;
      right: 0;
      height: 3px;
      margin: 0 auto;
      background-color: ${p => p.theme.MODULE_DARK};
      width: ${p => p.$selected ? 100 : 0}%;
      opacity: ${p => p.$selected ? 1 : 0};
      transition: background 0.3s ease-out, width 0.3s ease-out, opacity 0.3s ease-out;
    }
  
    &:hover,
    &:active {
      :before {
        width: 100%;
        opacity: 1;
      }
    }
    &:active {
      :before {
        background-color: ${p => p.$selected ? p.theme.MODULE_DARK : chroma(p.theme.MODULE_DARK).set('hsl.l', '*0.5').hex().toUpperCase()}
      }
    }
  }
`;
const TabsetEllipsisToggleWrapper = styled.div`
  position: relative;
`;
const TabsetEllipsisToggleMaskWrapper = styled.div`
  position: absolute;
  right: 100%;
  top: 0px;
  bottom: 0px;
  width: 100px;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;
const TabsetEllipsisToggleMask = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
`;
const TabsetEllipsisToggle = styled(FU.Button).attrs(p => ({ $type: 'icon' }))`
  margin: 0 20px;
  cursor: pointer;
`;
const TabsetEllipsisOverlayOuter = styled(Popover)`
  width: auto;
  max-width: 600px;
  padding: 8px 0;
  border: 0px solid transparent;
  border-radius: 10px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #FFFFFF;
  overflow: hidden;
`;
const TabsetEllipsisOverlayInner = styled(Popover.Content)`
  display: inline-grid;
  grid-auto-flow: row;
  overflow: hidden;
`;
const TabsetEllipsisOverlayInnerSearch = styled.div`
  border-bottom: 1px solid ${p => p.theme.DIVIDER};
`;
const TabsetEllipsisOverlayInnerOptions = styled(SearchableList)`
  max-height: 300px;
  display: grid;
  grid-auto-flow: row;
  overflow-y: auto;
`;

interface DisableChildrenProp {
  disabled?: boolean,
  $disableChildren?: boolean,
}
export const TabsetOption = styled.button<DisableChildrenProp>`
  width: 100%;
  padding: 5px 18px 5px 18px;
  cursor: pointer;
  font-size: 15px;
  line-height: 1.5;
  white-space: nowrap;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 15px;
  font-weight: 500;

  &,
  &.focus,
  &:focus,
  &.active,
  &:active,
  &.disabled,
  &:disabled {
    border: none;
    outline: none;
    color: ${p => p.theme.TEXT_DARK};
    text-decoration: initial;
    background: transparent;
  }
  &.hover,
  &:hover {
    background-color: ${p => p.theme.HOVER};
  }
  &[disabled] {
    cursor: not-allowed;

    &,
    &:hover {
      background-color: #FFFFFF;
    }

    ${p => p.$disableChildren ? `
      > * {
        pointer-events: auto;
        cursor: not-allowed;
        background-color: transparent;
        opacity: 0.5;
      }
    ` : `
      pointer-events: auto;
      cursor: not-allowed;
      background-color: transparent;
      opacity: 0.5;
    `}
  }
`;
export const TabsetOptionName = styled.div<SelectedProp>`
  color: ${p => p.$selected ? p.theme.MODULE_PRIMARY : p.theme.TEXT_DARK};
  transition: color 0.3s ease-out;
`;
const StyledNavigableSearchInput = styled(NavigableSearchInput)`
  input {
    border: 0px solid transparent;
  }
`;

interface Props {
  selectedTabId: number,
  tabIds: number[],
  optionSearchTexts: string[],
  optionSearchY0s: number[],
  optionSearchY1s: number[],
  equalityRef: any,
  onSelectTabId: (tabId: number) => void,
  onRenderTab: (tabId: number) => JSX.Element,
  onRenderTabOption: (tabId: number, renderSearchableText: (text: string, optionSearchIndex: number) => JSX.Element) => JSX.Element,
  onFocusSearchIndex?: (index: number) => void,
  margin?: number,
  gap?: number,
}
export default function Tabset(props: Props) {
  const [ tabsetEllipsisShown, setTabsetEllipsisShown ] = useState<boolean>(false);
  const [ tabsetEllipsisOverlayOpen, setTabsetEllipsisOverlayOpen ] = useState<boolean>(false);
  const [ tabsetQuery, setTabsetQuery ] = useState<string>('');
  const [ tabSearchResults, setTabSearchResults ] = useState<SearchResults>({ resultCount: 0, resultCursorMap: {}, resultMap: {} });

  const tabsetInnerRef = useRef<HTMLDivElement>(null);
  const tabRefMap = useRef<Record<number, HTMLButtonElement>>({});
  const optionsListRef = useRef<HTMLDivElement>(null);

  const [ tabSearchCursor, setTabSearchCursor ] = useState<number>(0);

  const tabsetEllipsisShownRef = useRef<boolean>(false);
  tabsetEllipsisShownRef.current = tabsetEllipsisShown;

  const refreshEllipsisShown = (() => {
    const ele: HTMLDivElement | null = tabsetInnerRef.current;
    const isOverflow: boolean = !!ele && (ele.scrollWidth > ele.clientWidth);

    if(isOverflow !== tabsetEllipsisShownRef.current) {
      setTabsetEllipsisShown(isOverflow);
    }
  });

  // Update searchable texts when tabset client signals change in inputs
  useEffect(() => {
    onSetTabsetQuery('');
  }, [ props.tabIds, props.equalityRef ]);

  // Check if tabset ellipsis should be shown if tabset client signals change in inputs
  useLayoutEffect(refreshEllipsisShown, [ props.equalityRef ]);

  // Check if tabset ellipsis should be shown whenever viewport changes size
  useEffect(() => {
    refreshEllipsisShown();
    window.addEventListener('resize', refreshEllipsisShown);
    return () => window.removeEventListener('resize', refreshEllipsisShown);
  }, []);

  // Scroll the tab into view when selected id changes
  useEffect(() => {
    tabRefMap.current[props.selectedTabId]?.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    setTabsetEllipsisOverlayOpen(false);
  }, [ props.selectedTabId ]);

  // Perform search query
  const onSetTabsetQuery = ((query: string) => {
    setTabsetQuery(query);

    const nextSearchResults: SearchResults = { resultCount: 0, resultCursorMap: {}, resultMap: {} };

    if(query.length) {
      props.optionSearchTexts.forEach((text, i) => {
        const { count, segments }: SegmentedText = searchText(query, text);
        if(count > 0) {
          for(let j=0; j<count; ++j) {
            nextSearchResults.resultCursorMap[nextSearchResults.resultCount + j] = {
              index: i,
              matchId: j,
            };
          }
          nextSearchResults.resultMap[i] = { count, segments, index: nextSearchResults.resultCount };
          nextSearchResults.resultCount += count;
        }
      });
    }
    setTabSearchResults(nextSearchResults);
  });

  const onSelectTabByIdMap: Record<number, () => void> = useMemo(() => (
    props.tabIds.reduce((acc, tabId) => (
      Object.assign(acc, { [tabId]: () => props.onSelectTabId(tabId)})
    ),{})
  ), [ props.tabIds, props.onSelectTabId ]);

  const getOptionSearchIndexMatchId = ((optionSearchIndex: number): number | undefined => {
    const result = tabSearchResults.resultCursorMap[tabSearchCursor];
    return result?.index === optionSearchIndex ? result.matchId : undefined;
  });

  return (
    <TabsetRoot $margin={props.margin}>
      <TabsetInner $columnGap={props.gap} ref={tabsetInnerRef}>
        {
          props.tabIds.map(tabId => (
            <Tab key={tabId}
              $selected={props.selectedTabId === tabId}
              ref={ref => ref ? tabRefMap.current[tabId] = ref : delete tabRefMap.current[tabId]}
              onClick={onSelectTabByIdMap[tabId]}
            >
              { props.onRenderTab(tabId) }
            </Tab>
          ))
        }
      </TabsetInner>
      {
        tabsetEllipsisShown &&
        <OverlayTrigger
          placement="bottom-end"
          trigger="click"
          rootClose={true}
          show={tabsetEllipsisOverlayOpen}
          onToggle={isOpen => setTabsetEllipsisOverlayOpen(isOpen)}
          overlay={
            <TabsetEllipsisOverlayOuter id="Tabset-More-Popover-1">
              <TabsetEllipsisOverlayInner>
                <TabsetEllipsisOverlayInnerSearch>
                  <StyledNavigableSearchInput
                    value={tabsetQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSetTabsetQuery(e.target.value)}
                    placeholder="Search Tabs"
                    resultCount={tabSearchResults.resultCount}
                    onNavigate={(cursorIndex: number) => {
                      setTabSearchCursor(cursorIndex);

                      if(!optionsListRef.current) return;

                      const { index: optionSearchIndex } = tabSearchResults.resultCursorMap[cursorIndex];


                      const y0: number = props.optionSearchY0s[optionSearchIndex]
                      const y1: number = props.optionSearchY1s[optionSearchIndex];
                      const min: number = 0.2;
                      const max: number = 0.8;
                      const h:  number = y1 - y0;
                      const { clientHeight, scrollTop } = optionsListRef.current;

                      // Note: upper limit's scroll top < lower limit's scroll top
                      const scrollTopLowerLimit = y0 + min * (-clientHeight + h);
                      const scrollTopUpperLimit = y0 + max * (-clientHeight + h);
                      const nextScrollTop = GU.clamp(scrollTop, scrollTopUpperLimit, scrollTopLowerLimit);

                      optionsListRef.current.scrollTo({ top: nextScrollTop, behavior: 'smooth' });
                    }}
                    borderless={true}
                  />
                </TabsetEllipsisOverlayInnerSearch>
                <TabsetEllipsisOverlayInnerOptions
                  query={tabsetQuery}
                  texts={props.optionSearchTexts}
                  ref={optionsListRef}
                >
                  {
                    props.tabIds.map(tabId => props.onRenderTabOption(
                      tabId,
                      (text: string, optionSearchIndex: number) => (
                        <SearchableSegmentedText
                          key={optionSearchIndex}
                          text={text}
                          focusedMatchId={getOptionSearchIndexMatchId(optionSearchIndex)}
                          searchResults={tabSearchResults.resultMap[optionSearchIndex]}
                        />
                      ))
                    )
                  }
                </TabsetEllipsisOverlayInnerOptions>
              </TabsetEllipsisOverlayInner>
            </TabsetEllipsisOverlayOuter>
          }
        >
          <TabsetEllipsisToggleWrapper>
            <TabsetEllipsisToggleMaskWrapper>
              <TabsetEllipsisToggleMask />
            </TabsetEllipsisToggleMaskWrapper>

            <OverlayTrigger
              placement="top"
              delay={{ show: 500, hide: 0 }}
              overlay={<Tooltip id="Tabset-More-1">More Tabs</Tooltip>}
            >
              <TabsetEllipsisToggle>
                <SU.CommonBlackSvg as={Assets.EllipsisSvg} width={20} height={4} />
              </TabsetEllipsisToggle>
            </OverlayTrigger>
          </TabsetEllipsisToggleWrapper>
        </OverlayTrigger>
      }
    </TabsetRoot>
  );
}


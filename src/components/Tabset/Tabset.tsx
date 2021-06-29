import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components/macro';
import chroma from 'chroma-js';

import * as GU from '@utility/General.utility';
import * as IU from '@utility/Intl.utility';
import * as FU from '@utility/Form.utility';
import * as SU from '@utility/Svg.utility';
import * as CTU from '@utility/CSSTransition.utility';
import useKineticScroll from '@utility/UseKineticScroll.utility';
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
  user-select: none;

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
interface OverflowProp {
  $overflowLeft: boolean,
  $overflowRight: boolean,
}
const TabsetInner = styled.div<ColumnGapProp & OverflowProp>`
  width: auto;
  max-width: 100%;
  display: inline-grid;
  grid-column: 1;
  grid-row: 1;
  grid-auto-flow: column;
  grid-column-gap: ${p => p.$columnGap ?? 0}px;
  place-content: start;
  overflow: hidden;
  position: relative;
  justify-self: start;

  ~ .tabset-inner-scroll-control {
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }
  &:hover ~ .tabset-inner-scroll-control {
    opacity: 1;
  }

  ${p => !p.$overflowLeft && !p.$overflowRight ? '' : `
    mask-image: linear-gradient(
      to right,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,1) ${0   + (p.$overflowLeft  ? 10 : 0)}%,
      rgba(0,0,0,1) ${100 - (p.$overflowRight ? 10 : 0)}%,
      rgba(0,0,0,0) 100%
    );
    mask-size: 100% 100%;
    mask-repeat: no-repeat;
    mask-position: left top, left bottom;
  `}
`;
// @ts-ignore
const TabsetInnerScrollControl = styled(CTU.fadeTransition(SU.CommonBlackSvg)).attrs(p => ({
  className: 'tabset-inner-scroll-control',
}))`
  padding: 6px;
  width: 26px;
  height: 26px;
  top: -1px;
  position: relative;
  grid-column: 1;
  grid-row: 1;
  align-self: center;
  border-radius: 50%;
  position: relative;   // for z-ordering atop TabsetInner
  box-sizing: border-box;
  background-color: #FFFFFF;
  box-shadow: 0 0 4px rgb(0, 0, 0, 0.3), 0 0 12px 4px #FFFFFF;

  &:hover {
    opacity: 1;
  }

  &[disabled] {
    background-color: ${p => chroma.mix(p.theme.GRAY_D8, '#FFFFFF', 0.75).hex().toUpperCase()};

    > * {
      cursor: not-allowed;
      opacity: 0.2;
    }
  }
`
const TabsetInnerScrollLeft = styled(TabsetInnerScrollControl).attrs(p => ({
  as: Assets.ChevronLeftSvg,
  width: 26,
  height: 26,
}))`
  justify-self: start;
`;
const TabsetInnerScrollRight = styled(TabsetInnerScrollControl).attrs(p => ({
  as: Assets.ChevronRightSvg,
  width: 26,
  height: 26,
}))`
  justify-self: end;
`;
interface SelectedProp {
  $selected: boolean,
}
export const Tab = styled.button<SelectedProp>`
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
// If the tab is disabled and the click falls outside a child element, the mouseup event is NOT sent by the browser
// which will break kinetic scroll event handling... Using a :before or :after pseudo-element also fails to catch
// the event properly so we need to ensure the event is dispatched to an element that can receive the mouseup event
// so it $overflow={tabsetOverflow} propagates up to document
export const DisabledTabEventCatcher = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;
const TabsetEllipsisToggleWrapper = styled.div`
  position: relative;
  grid-row: 1;
  grid-column: 2;
`;
const TabsetEllipsisToggle = styled(FU.Button).attrs(p => ({ $type: 'icon' }))`
  margin: 0 20px;
  cursor: pointer;
`;
const TabsetEllipsisOverlayOuter = styled(Popover)`
  width: auto;
  max-width: 600px;
  padding: 0;
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
  border-bottom: 2px solid ${p => p.theme.GRAY_E6};
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
  grid-template-columns: 1fr;

  input {
    border: 0px solid transparent;
    width: 100%;
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
  onRenderTab: (tabId: number, baseComponent: typeof Tab, baseProps: React.ComponentProps<typeof Tab>) => JSX.Element,
  onRenderTabOption: (tabId: number, baseComponent: typeof TabsetOption, baseProps: React.ComponentProps<typeof TabsetOption>, renderSearchableText: (text: string, optionSearchIndex: number) => JSX.Element) => JSX.Element,
  onFocusSearchIndex?: (index: number) => void,
  margin?: number,
  gap?: number,
}
export default function Tabset(props: Props) {
  const [ tabsetOverflow, setTabsetOveflow ] = useState<boolean>(false);
  const [ tabsetOverflowDropdownOpen, setTabsetOverflowDropdownOpen ] = useState<boolean>(false);
  const [ tabsetOverflowDropdownSearchQuery, setTabsetOverflowDropdownSearchQuery ] = useState<string>('');
  const [ tabsetOverflowDropdownSearchResults, setTabsetOverflowDropdownSearchResults ] = useState<SearchResults>({ resultCount: 0, resultCursorMap: {}, resultMap: {} });

  const [ canScrollLeft, setCanScrollLeft ] = useState<boolean>(false);
  const [ canScrollRight, setCanScrollRight ] = useState<boolean>(false);

  const scrollLeftRef = useRef<HTMLElement>(null);
  const scrollRightRef = useRef<HTMLElement>(null);

  const tabsetScrollableRef = useRef<HTMLDivElement>(null);
  const tabsetScrollableTabRefMap = useRef<Record<number, HTMLButtonElement>>({});
  const tabsetOverflowDropdownScrollableRef = useRef<HTMLDivElement>(null);

  const [ tabsetOverflowDropdownSearchCursor, setTabsetOverflowDropdownSearchCursor ] = useState<number>(0);

  const tabsetOverflowRef = useRef<boolean>(false);
  tabsetOverflowRef.current = tabsetOverflow;

  const [ stopKineticScroll ] = useKineticScroll(tabsetScrollableRef.current);

  const { optionSearchTexts, tabIds, onSelectTabId } = props;

  const navigableSearchInputProps = useMemo<React.ComponentProps<typeof StyledNavigableSearchInput>['inputProps']>(() => ({
    value: tabsetOverflowDropdownSearchQuery,
    placeholder: IU.intl.formatMessage({ id: "CDS.Tabset.Dropdown.Search.Placeholder", defaultMessage: "Search Tabs" }),
    onChange: ((e: React.ChangeEvent<HTMLInputElement>) => {
      // Perform search query
      const query: string = e.target.value;
      setTabsetOverflowDropdownSearchQuery(query);

      const nextSearchResults: SearchResults = { resultCount: 0, resultCursorMap: {}, resultMap: {} };
  
      if(query.length) {
        optionSearchTexts.forEach((text, i) => {
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
      setTabsetOverflowDropdownSearchResults(nextSearchResults);
    }),
    $width: '100%',
    $borderless: true,
  }), [ tabsetOverflowDropdownSearchQuery, optionSearchTexts ]);

  const onScrollByUnit = ((unit: number) => {
    stopKineticScroll();
    tabsetScrollableRef.current?.scrollBy({
      behavior: 'smooth',
      left: unit * tabsetScrollableRef.current?.clientWidth,
    });
  });

  // Memoized callback callbacks so searchable options avoid rerenders due to prop changes
  const onSelectTabByIdMap = useMemo<Record<number, () => void>>(() => (
    tabIds.reduce((acc, tabId) => Object.assign(acc, { [tabId]: () => onSelectTabId(tabId)}),{})
  ), [ tabIds, onSelectTabId ]);

  const getOptionSearchIndexMatchId = ((optionSearchIndex: number): number | undefined => {
    const result = tabsetOverflowDropdownSearchResults.resultCursorMap[tabsetOverflowDropdownSearchCursor];
    return result?.index === optionSearchIndex ? result.matchId : undefined;
  });

  const refreshEllipsisShown = (() => {
    const ele: HTMLDivElement | null = tabsetScrollableRef.current;
    const tabsetOverflow: boolean = !!ele && (ele.scrollWidth > ele.clientWidth);

    if(tabsetOverflow !== tabsetOverflowRef.current) {
      setTabsetOveflow(tabsetOverflow);
    }
  });
  const refreshCanScroll = (() => {
    const scrollableEle = tabsetScrollableRef.current;
    if(!scrollableEle) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollableEle;
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  });

  useEffect(() => {
    const tabsetScrollableEle: HTMLDivElement | null = tabsetScrollableRef.current;

    // Carousel button checks when current scroll position changes or on resizes
    refreshCanScroll();
    window.addEventListener('resize', refreshCanScroll);
    tabsetScrollableEle?.addEventListener('scroll', refreshCanScroll);

    // Tabset ellipsis visibility checks when viewport changes size
    refreshEllipsisShown();
    window.addEventListener('resize', refreshEllipsisShown);

    return () => {
      window.removeEventListener('resize', refreshCanScroll);
      tabsetScrollableEle?.removeEventListener('scroll', refreshCanScroll);
      window.removeEventListener('resize', refreshEllipsisShown);
    };
  }, []);

  // Scroll the tab into view when selected id changes
  useEffect(() => {
    tabsetScrollableTabRefMap.current[props.selectedTabId]?.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    setTabsetOverflowDropdownOpen(false);
  }, [ props.selectedTabId ]);

  // Update searchable texts when tabset client signals change in inputs
  useEffect(() => {
    setTabsetOverflowDropdownSearchQuery('');
    setTabsetOverflowDropdownSearchResults({ resultCount: 0, resultCursorMap: {}, resultMap: {} });
  }, [ props.tabIds, props.optionSearchTexts, props.equalityRef ]);

  // Check if tabset ellipsis should be shown if tabset client signals change in inputs
  useLayoutEffect(refreshEllipsisShown, [ props.equalityRef ]);

  return (
    <TabsetRoot $margin={props.margin}>
      <TabsetInner
        $columnGap={props.gap}
        $overflowLeft={tabsetOverflow && canScrollLeft}
        $overflowRight={tabsetOverflow && canScrollRight}
        ref={tabsetScrollableRef}
      >
        {
          props.tabIds.map(tabId => (
            props.onRenderTab(tabId, Tab, {
              key: tabId,
              $selected: props.selectedTabId === tabId,
              ref: ((ref: HTMLButtonElement | null) => ref ? tabsetScrollableTabRefMap.current[tabId] = ref : delete tabsetScrollableTabRefMap.current[tabId]),
              onClick: onSelectTabByIdMap[tabId],
            })
          ))
        }
      </TabsetInner>
      <CSSTransition
        in={tabsetOverflow && canScrollLeft}
        timeout={150}
        mountOnEnter
        unmountOnExit
        classNames="transition"
        nodeRef={scrollLeftRef}
      >
        <TabsetInnerScrollLeft ref={scrollLeftRef as any} $timeout={150} onClick={() => onScrollByUnit(-1)} />
      </CSSTransition>
      <CSSTransition
        in={tabsetOverflow && canScrollRight}
        timeout={150}
        mountOnEnter
        unmountOnExit
        classNames="transition"
        nodeRef={scrollRightRef}
      >
        <TabsetInnerScrollRight ref={scrollRightRef as any} $timeout={150} onClick={() => onScrollByUnit(1)} />
      </CSSTransition>

      {
        tabsetOverflow &&
        <OverlayTrigger
          placement="bottom-end"
          trigger="click"
          rootClose={true}
          show={tabsetOverflowDropdownOpen}
          onToggle={isOpen => setTabsetOverflowDropdownOpen(isOpen)}
          overlay={
            <TabsetEllipsisOverlayOuter id="Tabset-More-Popover-1">
              <TabsetEllipsisOverlayInner>
                <TabsetEllipsisOverlayInnerSearch>
                  <StyledNavigableSearchInput
                    inputProps={navigableSearchInputProps}
                    resultCount={tabsetOverflowDropdownSearchResults.resultCount}
                    onNavigate={(cursorIndex: number) => {
                      setTabsetOverflowDropdownSearchCursor(cursorIndex);

                      if(!tabsetOverflowDropdownScrollableRef.current) return;

                      const isIncrementalNavigation = (Math.abs(tabsetOverflowDropdownSearchCursor - cursorIndex) <= 1);

                      const { index: optionSearchIndex } = tabsetOverflowDropdownSearchResults.resultCursorMap[cursorIndex];

                      const y0: number = props.optionSearchY0s[optionSearchIndex]
                      const y1: number = props.optionSearchY1s[optionSearchIndex];
                      const min: number = 0.2;
                      const max: number = 0.8;
                      const h:  number = y1 - y0;
                      const { clientHeight, scrollTop } = tabsetOverflowDropdownScrollableRef.current;

                      // Note: upper limit's scroll top < lower limit's scroll top
                      const scrollTopLowerLimit = y0 + min * (-clientHeight + h);
                      const scrollTopUpperLimit = y0 + max * (-clientHeight + h);
                      const nextScrollTop = GU.clamp(scrollTop, scrollTopUpperLimit, scrollTopLowerLimit);

                      tabsetOverflowDropdownScrollableRef.current.scrollTo({ top: nextScrollTop, behavior: isIncrementalNavigation ? 'smooth' : 'auto' });
                    }}
                  />
                </TabsetEllipsisOverlayInnerSearch>
                <TabsetEllipsisOverlayInnerOptions
                  query={tabsetOverflowDropdownSearchQuery}
                  texts={props.optionSearchTexts}
                  ref={tabsetOverflowDropdownScrollableRef}
                >
                  {
                    props.tabIds.map(tabId => (
                      props.onRenderTabOption(tabId, TabsetOption, {
                        key: tabId,
                        onClick: () => props.onSelectTabId(tabId),
                      }, (text: string, optionSearchIndex: number) => (
                        <SearchableSegmentedText
                          text={text}
                          focusedMatchId={getOptionSearchIndexMatchId(optionSearchIndex)}
                          searchResults={tabsetOverflowDropdownSearchResults.resultMap[optionSearchIndex]}
                        />
                      ))
                    ))
                  }
                </TabsetEllipsisOverlayInnerOptions>
              </TabsetEllipsisOverlayInner>
            </TabsetEllipsisOverlayOuter>
          }
        >
          <TabsetEllipsisToggleWrapper>
            <OverlayTrigger
              placement="top"
              delay={{ show: 500, hide: 0 }}
              overlay={
                <Tooltip id="Tabset-More-1">
                  <FormattedMessage
                    id="CDS.Tabset.Dropdown.Toggle"
                    defaultMessage={"More Tabs"}
                  />
                </Tooltip>
              }
            >
              <TabsetEllipsisToggle>
                <SU.CommonBlackSvg { ...Assets.EllipsisSvg.styledAttrs.default} />
              </TabsetEllipsisToggle>
            </OverlayTrigger>
          </TabsetEllipsisToggleWrapper>
        </OverlayTrigger>
      }
    </TabsetRoot>
  );
}


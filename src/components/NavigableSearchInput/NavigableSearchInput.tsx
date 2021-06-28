import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import * as FU from '@utility/Form.utility';
import * as SU from '@utility/Svg.utility';
import * as LU from '@utility/Layout.utility';
import * as GU from '@utility/General.utility';
import * as Assets from '@assets/.';

interface BorderlessProp {
  $borderless?: boolean,
}
const InputWithIcon = styled(FU.Input)<BorderlessProp>`
  grid-column: 1;
  grid-row: 1;

  + svg {
    transition: opacity 0.15s ease-out;
    pointer-events: none;
  }
  &:focus + svg {
    opacity: 0;
  }
  ~ svg {
    ${p => p.$borderless ? `border-color: ${p.theme.GRAY_E6}` : ''};
  }
  &:hover ~ svg {
    border-color: ${p => p.$borderless ? p.theme.GRAY_E6 : '#999999'};
  }
  &:focus ~ svg {
    border-color: ${p => p.$borderless ? p.theme.GRAY_E6 : p.theme.TEXT_DARK};
  }
`;
const SearchIcon = styled(SU.CommonInlineSvg).attrs(Assets.MagnifyingGlassSvg.styledAttrs.default)`
  margin-left: ${0.5*(42 - 16)}px;
  align-items: center;
  justify-self: start;
  pointer-events: none;
  grid-column: 1;
  grid-row: 1;
`;
interface HasInputProp {
  $hasInput: boolean
}
const InputWithNavigation = styled(InputWithIcon)<HasInputProp & BorderlessProp>`
  ${p => !p.$hasInput ? `` : `padding-right: 120px;`}
  ${p => !p.$borderless ? `` : `border: 0px solid transparent;`}
`;
const InputNavigationCursor = styled(FU.TextButton)`
  padding: 0 7px;
  margin-right: 68px;
  line-height: 36px;
  grid-column: 1;
  grid-row: 1;
  justify-self: end;
  align-items: center;
  font-size: 13px;
  font-weight: 300;
  cursor: pointer;

  &,
  &:hover,
  &:focus {
    color: ${p => p.theme.TEXT_DARK};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
interface DisabledProp {
  disabled?: boolean,
}
const InputNavigation = styled(SU.themedSvg(
  theme => ({
    default: { color: '#C2C2C2' },
    hover: { color: theme.ICON_DARK },
    disabled: { color: '#C2C2C2' },
    transitionMillis: 150
  })
))<DisabledProp>`
  grid-column: 1;
  grid-row: 1;
  justify-self: end;
  align-items: center;
  transition: border-color 0.15s ease-out;
  cursor: pointer;
  opacity: 1;

  height: 100%;
  padding: 0 11px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
const InputNavigationLeft = styled(InputNavigation).attrs(p => Assets.ChevronLeftSvg.styledAttrs.default)`
  margin-right: 33px;
  border-left: 2px solid ${p => p.theme.GRAY_E6};
`;
const InputNavigationRight = styled(InputNavigation).attrs(p => Assets.ChevronRightSvg.styledAttrs.default)`
`;

interface Props {
  inputProps: React.ComponentProps<typeof InputWithNavigation>,
  resultCount: number,
  onNavigate: (index: number) => void,
  className?: string,
}
export default function ButtonGallery(props: Props) {
  const [ navigationIndex, setNavigationIndex ] = useState<number>(0);

  const getCurrIndex = (() =>  navigationIndex);
  const getPrevIndex = (() => (navigationIndex-1+props.resultCount) % props.resultCount);
  const getNextIndex = (() => (navigationIndex+1                  ) % props.resultCount);

  const setIndex = ((index: number) => {
    if(index !== navigationIndex) {
      setNavigationIndex(index);
    }
    props.onNavigate(index);
  });

  const onInputKeydown = ((e: React.KeyboardEvent<any>) => {
    switch(e.key) {
        // Enter: Cycle through search results
        case 'Enter':
          if(props.resultCount) {
            if(!e.shiftKey) {
              // Increment and modulus
              setIndex(getNextIndex());
            } else {
              // Decrement and modulus
              setIndex(getPrevIndex());
            }
          }
          break;
        // Escape: Clear search results
        case 'Escape':
          setNavigationIndex(0);
    
          // Prevent the popover from closing
          e.stopPropagation();
          e.preventDefault();
          break;
        // Ctrl + F: Suppress loading browser's search while focused on the search field
        case 'f':
        case 'F':
          const { isCtrl } = GU.getMetakeys(e);
          if(isCtrl) {
            e.stopPropagation();
            e.preventDefault();
          }
    }
  });

  // Reset the cursor if the query changes
  useEffect(() => setNavigationIndex(0), [ props.inputProps.value ]);

  const hasResults: boolean = props.resultCount > 0;

  return (
    <LU.BlockColumnMajorGrid
      $justifyContent="start"
      $alignItems="center"
      $templateColumns="min-content"
      className={props.className}
    >
      <InputWithNavigation
        onKeyDown={onInputKeydown}
        $width={300}
        $hasInput={`${props.inputProps.value ?? ''}`.trim().length > 0}
        $inlineIcon={true}
        {...props.inputProps}
      />
      <SearchIcon />
      {
        `${props.inputProps.value ?? ''}`.trim().length > 0 &&
        <>
          <InputNavigationCursor onClick={() => setIndex(getCurrIndex())}>
            { hasResults ? (getCurrIndex()+1) : 0 } / {props.resultCount}
          </InputNavigationCursor>
          <InputNavigationLeft  disabled={!hasResults} onClick={hasResults ? () => setIndex(getPrevIndex()) : undefined} />
          <InputNavigationRight disabled={!hasResults} onClick={hasResults ? () => setIndex(getNextIndex()) : undefined} />
        </>
      }
    </LU.BlockColumnMajorGrid>
  );
}


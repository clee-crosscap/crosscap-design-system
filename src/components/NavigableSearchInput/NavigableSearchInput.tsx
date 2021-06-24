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
const SearchIcon = styled(SU.CommonInlineSvg)`
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
const InputNavigation = styled(SU.themedSvg(
  theme => ({
    default: { color: '#C2C2C2' },
    hover: { color: theme.ICON_DARK },
    disabled: { color: '#C2C2C2' },
    transitionMillis: 150
  })
)).attrs(p => ({
  as: Assets.ChevronSvg,
  width: 6,
  height: 10,
}))`
  width: 30px;
  padding: 11px 2px;
  grid-column: 1;
  grid-row: 1;
  justify-self: end;
  align-items: center;
  transition: border-color 0.15s ease-out;
  cursor: pointer;
  opacity: 1;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
const InputNavigationLeft = styled(InputNavigation)`
  transform: rotate(90deg);
  margin-right: 33px;
  border-bottom: 2px solid ${p => p.theme.GRAY_E6};
`;
const InputNavigationRight = styled(InputNavigation)`
  transform: rotate(-90deg);
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  borderless?: boolean,
  resultCount: number,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
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

  const onInputKeydown = ((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
				// Enter: Cycle through search results
				case 13:
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
				case 27:
          setNavigationIndex(0);
		
					// Prevent the popover from closing
					e.stopPropagation();
					e.preventDefault();
					break;
				// Ctrl + F: Suppress loading browser's search while focused on the search field
				case 70:
					const { isCtrl } = GU.getMetakeys(e);
					if(isCtrl) {
						e.stopPropagation();
						e.preventDefault();
					}
    }
  });

  // Reset the cursor if the query changes
  useEffect(() => setNavigationIndex(0), [ props.value ]);

  return (
    <LU.BlockColumnMajorGrid
      $justifyContent="start"
      $alignItems="center"
      style={{ gridTemplateColumns: '1fr' }}
      className={props.className}
    >
      <InputWithNavigation
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onKeyDown={onInputKeydown}
        $width={300}
        $hasInput={`${props.value ?? ''}`.trim().length > 0}
        $inlineIcon={true}
        $borderless={props.borderless}
      />
      <SearchIcon
        as={Assets.MagnifyingGlassSvg}
        width={16}
        height={16}
      />
      {
        `${props.value ?? ''}`.trim().length > 0 &&
        <>
          <InputNavigationCursor onClick={() => setIndex(getCurrIndex())}>
            { props.resultCount > 0 ? (getCurrIndex()+1) : 0 } / {props.resultCount}
          </InputNavigationCursor>
          <InputNavigationLeft onClick={() => setIndex(getPrevIndex())} />
          <InputNavigationRight onClick={() => setIndex(getNextIndex())} />
        </>
      }
    </LU.BlockColumnMajorGrid>
  );
}


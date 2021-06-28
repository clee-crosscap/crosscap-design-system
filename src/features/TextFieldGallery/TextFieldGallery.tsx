import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components/macro';

import * as FU from '@utility/Form.utility';
import * as SU from '@utility/Svg.utility';
import * as LU from '@utility/Layout.utility';
import NavigableSearchInput from '@components/NavigableSearchInput/NavigableSearchInput';
import * as Assets from '@assets/.';

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
// const SectionHeader = styled.div`
//   font-size: 18px;
//   color: ${p => p.theme.TEXT_DARK};
//   display: block;
// `;
const SectionContent = styled.div`
`;
const InputWithIconGrid = styled.div`
  display: grid;
  justify-content: start;
  align-items: center;
`;
const InputWithIcon = styled(FU.Input)`
  grid-column: 1;
  grid-row: 1;

  + svg {
    transition: opacity 0.15s ease-out;
    pointer-events: none;
  }
  &:focus + svg {
    opacity: 0;
  }
  &:hover ~ svg {
    border-color: #999999;
  }
  &:focus ~ svg {
    border-color: ${p => p.theme.TEXT_DARK};
  }
`;
const SearchIcon = styled(SU.CommonInlineSvg).attrs(p => Assets.MagnifyingGlassSvg.styledAttrs.default)`
  margin-left: ${0.5*(42 - 16)}px;
  align-items: center;
  justify-self: start;
  pointer-events: none;
  grid-column: 1;
  grid-row: 1;
`;
interface SelectedProp {
  $selected: boolean,
}
const InputNavigationCursorValue = styled.div<SelectedProp>`
  padding: 2px 8px;
  background-color: ${p => p.$selected ? p.theme.HIGHLIGHT : ''};
  user-select: none;
`;
const InputNavigationCursorValueContainer = styled.div`
  padding: 4px 8px;
  border: 2px solid ${p => p.theme.GRAY_E6};
  border-radius: 8px;
  display: grid;
  grid-auto-flow: column;
  max-width: 150px;
  overflow-x: auto;
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

export default function ButtonGallery() {
  const navigationRef = useRef<Record<number, HTMLDivElement>>({});
  const [ inputValue, setInputValue ] = useState<string>('');
  const [ textareaValue, setTextareaValue ] = useState<string>('');
  const [ navigationInput, setNavigationInput ] = useState<string>('');
  const [ navigationIndex, setNavigationIndex ] = useState<number>(0);
  const [ hasNavigationResults, setHasNavigationResults ] = useState<boolean>(true);

  const inputLen:    number = inputValue.trim().length;
  const textareaLen: number = textareaValue.trim().length;

  const NAVIGATION_MAX: number = 10;

  const navigableSearchInputProps = useMemo<React.ComponentProps<typeof NavigableSearchInput>['inputProps']>(() => ({
    value: navigationInput,
    onChange: ((e: React.ChangeEvent<HTMLInputElement>) => setNavigationInput(e.target.value)),
  }), [ navigationInput ])

  const onNavigate = ((index: number) => {
    setNavigationIndex(index);
    const isIncrementalNavigation: boolean = Math.abs(navigationIndex - index) <= 1;

    if(index !== navigationIndex) {
      navigationRef.current[index]?.scrollIntoView({
        behavior: isIncrementalNavigation ? 'smooth' : 'auto',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  });

  return (
    <Gallery>
      <GallerySection>
        <Title>Single Line Text Field</Title>

        <SectionContent>
          <FU.ComponentLabel>Basic Input</FU.ComponentLabel>
          <FU.Input />
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Placeholder Text</FU.ComponentLabel>
          <FU.Input placeholder={`Default Value`} />
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Hovered Input</FU.ComponentLabel>
          <FU.Input className={'hover'} />
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Focused Input</FU.ComponentLabel>
          <FU.Input className={'focus'} />
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Invalid Input</FU.ComponentLabel>
          <FU.Input $valid={false} value={inputValue} onChange={e => setInputValue(e.target.value)} />
          <FU.ComponentInvalid>
            {
              (0 >= inputLen) &&
              `Value may not be empty.`
            }
            {
              ((0 < inputLen) && (inputLen < 3)) &&
              `Value must be unique.`
            }
            {
              (inputLen >= 3) &&
              `Value must be be 3 characters or less.`
            }
          </FU.ComponentInvalid>
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Disabled Input</FU.ComponentLabel>
          <FU.Input disabled value={'Content'} />
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Input With Icon</FU.ComponentLabel>
          <InputWithIconGrid>
            <InputWithIcon $inlineIcon={true} />
            <SearchIcon />
          </InputWithIconGrid>
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Input With Navigation</FU.ComponentLabel>
          <NavigableSearchInput
            inputProps={navigableSearchInputProps} 
            resultCount={hasNavigationResults ? NAVIGATION_MAX : 0}
            onNavigate={onNavigate}
          />
        </SectionContent>
        <SectionContent>
          <LU.BlockRowMajorGrid $columns={4} $columnGap={10} $alignItems={'center'}>
            <InputNavigationCursorValueContainer>
              {
                Array(NAVIGATION_MAX).fill(0).map((v,i) => (
                  <InputNavigationCursorValue
                    $selected={hasNavigationResults && (navigationInput.trim().length > 0) && (navigationIndex === i)}
                    ref={ref => ref ? (navigationRef.current[i] = ref) : (delete navigationRef.current[i])}
                  >
                    {i+1}
                  </InputNavigationCursorValue>
                ))
              }
            </InputNavigationCursorValueContainer>
            <span></span>
            <span>Toggle Matches</span>
            <FU.Toggle $toggle={hasNavigationResults} onClick={() => setHasNavigationResults(!hasNavigationResults)} />
          </LU.BlockRowMajorGrid>
        </SectionContent>
      </GallerySection>

      <HR/>

      <GallerySection>
        <Title>Multiple Line Text Field</Title>
        <SectionContent>
          <FU.ComponentLabel>Single Line (1 line)</FU.ComponentLabel>
          <FU.Textarea $lines={1} $resize={true} />
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Multiple Lines (3 lines)</FU.ComponentLabel>
          <FU.Textarea $lines={3} $resize={true} />
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Multiple Lines (5 lines)</FU.ComponentLabel>
          <FU.Textarea $lines={5} $resize={true} />
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Non-resizable</FU.ComponentLabel>
          <FU.Textarea $lines={3} $resize={false} />
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Vertically Resizable</FU.ComponentLabel>
          <FU.Textarea $lines={3} $resize={'vertical'} />
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Horizontally Resizable</FU.ComponentLabel>
          <FU.Textarea $lines={3} $resize={'horizontal'} />
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Placeholder Text</FU.ComponentLabel>
          <FU.Textarea $lines={3} $resize={true} placeholder={`Default Value`} />
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Hovered Input</FU.ComponentLabel>
          <FU.Textarea $lines={3} $resize={true} className={'hover'} />
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Focused Input</FU.ComponentLabel>
          <FU.Textarea $lines={3} $resize={true} className={'focus'} />
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Invalid Input</FU.ComponentLabel>
          <Line>
            <FU.Textarea value={textareaValue} onChange={e => setTextareaValue(e.target.value)} $lines={3} $resize={true} $valid={false} />
            <FU.ComponentInvalid>
            {
                (0 >= textareaLen) &&
                `Value may not be empty.`
              }
              {
                ((0 < textareaLen) && (textareaLen < 3)) &&
                `Value must be unique.`
              }
              {
                (textareaLen >= 3) &&
                `Value must be be 3 characters or less.`
              }
            </FU.ComponentInvalid>
          </Line>
        </SectionContent>

        <SectionContent>
          <FU.ComponentLabel>Disabled Input</FU.ComponentLabel>
          <FU.Textarea value={'Content'} $lines={3} $resize={true} disabled />
        </SectionContent>
      </GallerySection>
    </Gallery>
  );
}


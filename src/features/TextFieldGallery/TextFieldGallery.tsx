import React, { useRef, useState } from 'react';
import styled from 'styled-components/macro';

import * as FU from '@utility/Form.utility';
import * as SU from '@utility/Svg.utility';
import CrosscapTheme from '@components/Theme/CrosscapTheme';
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
const SectionHeader = styled.div`
  font-size: 18px;
  color: ${p => p.theme.TEXT_DARK};
  display: block;
`;
const SectionContent = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  justify-content: start;
  align-items: center;
`;
const InputWithIcon = styled(FU.Input)`
  padding-left: 42px;
  grid-column: 1;
  grid-row: 1;
`;
const SearchIcon = styled(SU.styledSvg({ $fillStroke: '#C2C2C2' }))`
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
const InputWithNavigation = styled(InputWithIcon)<HasInputProp>`
  ${p => !p.$hasInput ? `` : `padding-right: 115px;`}

  &:focus ~ svg {
    border-color: ${p => p.theme.MODULE_PRIMARY};
  }
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
interface SelectedProp {
  $selected: boolean,
}
const InputNavigationCursorValue = styled.div<SelectedProp>`
  padding: 2px 8px;
  background-color: ${p => p.$selected ? p.theme.HIGHLIGHT : ''};
  user-select: none;
`;
const InputNavigation = styled(SU.styledSvg({ $fillStroke: '#C2C2C2', $hoverFillStroke: CrosscapTheme.ICON_DARK, $disabledFillStroke: '#C2C2C2', $transitionMillis: 150 }))`
  width: 30px;
  padding: 11px 2px;
  grid-column: 1;
  grid-row: 1;
  justify-self: end;
  align-items: center;
  transition: border-color 0.15s ease-out;
  cursor: ${p => p.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${p => p.$disabled ? 0.5 : 1};
`;
const InputNavigationLeft = styled(InputNavigation)`
  margin-right: 33px;
  transform: rotate(90deg);
  border-bottom: 2px solid ${p => p.theme.GRAY_E6};
`;
const InputNavigationRight = styled(InputNavigation)`
  transform: rotate(-90deg);
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
const InputError = styled.div`
  margin-top: 8px;
  color: ${p => p.theme.INVALID};
  font-size: 12px;
  letter-spacing: 0.18px;
`;
export default function ButtonGallery() {
  const navigationRef = useRef<Record<number, HTMLDivElement>>({});
  const [ inputValue, setInputValue ] = useState<string>('');
  const [ textareaValue, setTextareaValue ] = useState<string>('');
  const [ navigationInput, setNavigationInput ] = useState<string>('');
  const [ navigationIndex, setNavigationIndex ] = useState<number>(0);
  const [ hasNavigationResults, setHasNavigationResults ] = useState<boolean>(true);

  const inputLen: number    = inputValue.trim().length;
  const textareaLen: number = textareaValue.trim().length;

  const NAVIGATION_MAX: number = 10;

  const onNavigationLeft = (() => {
    if(!hasNavigationResults) return;
    const nextIndex = (navigationIndex-1+NAVIGATION_MAX) % NAVIGATION_MAX;
    setNavigationIndex(nextIndex);
    navigationRef.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  });
  const onNavigationRight = (() => {
    if(!hasNavigationResults) return;
    const nextIndex = (navigationIndex+1) % NAVIGATION_MAX;
    setNavigationIndex(nextIndex);
    navigationRef.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  });
  const onNavigationFocus = (() => {
    if(!hasNavigationResults) return;
    navigationRef.current[navigationIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  });

  return (
    <Gallery>
      <GallerySection>
        <Title>Single Line Text Field</Title>

        <SectionHeader>Basic Input</SectionHeader>
        <SectionContent>
          <FU.Input />
        </SectionContent>

        <SectionHeader>Placeholder Text</SectionHeader>
        <SectionContent>
          <FU.Input placeholder={`Default Value`} />
        </SectionContent>

        <SectionHeader>Focused Input</SectionHeader>
        <SectionContent>
          <FU.Input className={'focus'} />
        </SectionContent>

        <SectionHeader>Invalid Input</SectionHeader>
        <SectionContent>

          <Line>
            <FU.Input $valid={false} value={inputValue} onChange={e => setInputValue(e.target.value)} />
            <InputError>
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
            </InputError>
          </Line>
        </SectionContent>

        <SectionHeader>Disabled Input</SectionHeader>
        <SectionContent>
          <FU.Input disabled value={'Content'} />
        </SectionContent>

        <SectionHeader>Input With Icon</SectionHeader>
        <SectionContent>
          <InputWithIcon />
          <SearchIcon
            as={Assets.MagnifyingGlassSvg}
            width={16}
            height={16}
          />
        </SectionContent>

        <SectionHeader>Input With Navigation</SectionHeader>
        <SectionContent>
          <InputWithNavigation
            value={navigationInput}
            onChange={e => setNavigationInput(e.target.value)}
            $width={300}
            $hasInput={navigationInput.trim().length > 0}
          />
          <SearchIcon
            as={Assets.MagnifyingGlassSvg}
            width={16}
            height={16}
          />
          {
            navigationInput.trim().length > 0 &&
            <>
              <InputNavigationCursor onClick={onNavigationFocus}>
                {
                  hasNavigationResults &&
                  <>{ navigationIndex+1 } / {NAVIGATION_MAX}</>
                }
                {
                  !hasNavigationResults &&
                  <>0 / 0</>
                }
              </InputNavigationCursor>
              <InputNavigationLeft as={Assets.ChevronSvg} width={6} height={10} onClick={onNavigationLeft} $disabled={!hasNavigationResults} />
              <InputNavigationRight as={Assets.ChevronSvg} width={6} height={10} onClick={onNavigationRight} $disabled={!hasNavigationResults} />
            </>
          }
        </SectionContent>
        <SectionContent>
          <InputNavigationCursorValueContainer>
            {
              Array(NAVIGATION_MAX).fill(0).map((v,i) => (
                <InputNavigationCursorValue
                  $selected={hasNavigationResults && (navigationIndex === i)}
                  ref={ref => ref ? (navigationRef.current[i] = ref) : (delete navigationRef.current[i])}
                >
                  {i+1}
                </InputNavigationCursorValue>
              ))
            }
          </InputNavigationCursorValueContainer>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span>Toggle Matches</span>
          <FU.Toggle $toggle={hasNavigationResults} onClick={() => setHasNavigationResults(!hasNavigationResults)} />
        </SectionContent>
      </GallerySection>

      <HR/>

      <GallerySection>
        <Title>Multiple Line Text Field</Title>
        <SectionHeader>
          Single Line (1 line)
        </SectionHeader>
        <SectionContent>
          <FU.Textarea $lines={1} $resize={true} />
        </SectionContent>

        <SectionHeader>
          Multiple Lines (3 lines)
        </SectionHeader>
        <SectionContent>
          <FU.Textarea $lines={3} $resize={true} />
        </SectionContent>

        <SectionHeader>
          Multiple Lines (5 lines)
        </SectionHeader>
        <SectionContent>
          <FU.Textarea $lines={5} $resize={true} />
        </SectionContent>

        <SectionHeader>
          Non-resizable
        </SectionHeader>
        <SectionContent>
          <FU.Textarea $lines={3} $resize={false} />
        </SectionContent>

        <SectionHeader>
          Vertically Resizable
        </SectionHeader>
        <SectionContent>
          <FU.Textarea $lines={3} $resize={'vertical'} />
        </SectionContent>

        <SectionHeader>
          Horizontally Resizable
        </SectionHeader>
        <SectionContent>
          <FU.Textarea $lines={3} $resize={'horizontal'} />
        </SectionContent>

        <SectionHeader>Placeholder Text</SectionHeader>
        <SectionContent>
          <FU.Textarea $lines={3} $resize={true} placeholder={`Default Value`} />
        </SectionContent>

        <SectionHeader>Focused Input</SectionHeader>
        <SectionContent>
          <FU.Textarea $lines={3} $resize={true} className={'focus'} />
        </SectionContent>

        <SectionHeader>Invalid Input</SectionHeader>
        <SectionContent>
          <Line>
            <FU.Textarea value={textareaValue} onChange={e => setTextareaValue(e.target.value)} $lines={3} $resize={true} $valid={false} />
            <InputError>
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
            </InputError>
          </Line>
        </SectionContent>

        <SectionHeader>Disabled Input</SectionHeader>
        <SectionContent>
          <FU.Textarea value={'Content'} $lines={3} $resize={true} disabled />
        </SectionContent>
      </GallerySection>
    </Gallery>
  );
}


import React from 'react';
import styled from 'styled-components/macro';

import * as FU from '@utility/Form.utility';
import * as SU from '@utility/Svg.utility';

import { ReactComponent as SearchSvg } from '@assets/magnifying-glass.svg';

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
  margin-right: ${-(42 - 18)}px;
  grid-column: 1;
  grid-row: 1;
`;
const SearchIcon = styled(SU.styledSvg({ $fillStroke: '#C2C2C2' }))`
  margin-left: ${0.5*(42 - 16)}px;
  grid-area: search;
  align-items: center;
  justify-self: start;
  pointer-events: none;
  grid-column: 1;
  grid-row: 1;
`;
const HR = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${p => p.theme.DIVIDER};
`;


export default function ButtonGallery() {
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
          <FU.Input $valid={false} />
        </SectionContent>

        <SectionHeader>Disabled Input</SectionHeader>
        <SectionContent>
          <FU.Input disabled value={'Content'} />
        </SectionContent>

        <SectionHeader>Input With Icon</SectionHeader>
        <SectionContent>
          <InputWithIcon />
          <SearchIcon
            as={SearchSvg}
            width={16}
            height={16}
          />
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
          <FU.Textarea $lines={3} $resize={true} $valid={false} />
        </SectionContent>

        <SectionHeader>Disabled Input</SectionHeader>
        <SectionContent>
          <FU.Textarea value={'Content'} $lines={3} $resize={true} disabled />
        </SectionContent>

      </GallerySection>

      <HR/>

      <pre>
        {
          ` TODO:
            Single line text field with built-in navigation (&lt; &gt; arrows)
            Single Line Validation error messaging
            Multiple Line Validation error messaging
          `.split('\n').map(s => s.trim()).join('\n')
        }
      </pre>

    </Gallery>
  );
}


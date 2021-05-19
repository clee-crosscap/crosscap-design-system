import React from 'react';
import styled from 'styled-components/macro';
import ReactModal from 'react-modal';

import * as SU from '@utility/Svg.utility';
import * as Assets from '@assets/.';

export const TIMEOUT_MS = 200;

interface OP {
  namespace: string,
}
const ModalOverlay = styled.div`
  display: grid;
  place-content: center;
  padding: 60px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &.ReactModal__Overlay--after-open:before {
    opacity: 1;
    transition: opacity ${TIMEOUT_MS}ms ease-in-out;
  }
  &.ReactModal__Overlay--before-close:before {
    opacity: 0;
  }
`;
const ModalContent = styled.div`
  transform: translateY(-10px);
  opacity: 0;
  outline: none;

  &.ReactModal__Content--after-open {
    opacity: 1;
    transform: translateY(0);
    transition: all ${TIMEOUT_MS}ms ease-in-out;
  }
  &.ReactModal__Content--before-close {
    opacity: 0;
    transform: translateY(-10px);
  }
`;
interface MP {
  $maxWidth?: number,
}
export const Modal = styled(ReactModal)<MP>`
  max-height: 100%;
  ${p => p.$maxWidth ? `max-width: ${p.$maxWidth}px;` : ''}
  height: auto;
  overflow-y: auto;
  display: grid;
  grid-template-areas:
    "alert"
    "header"
    "divider"
    "body"
    "footer"
  ;
  border-radius: 10px;
  background-color: #FFFFFF;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);

  > :first-child {
    padding-top: 35px;
  }
  > :last-child {
    padding-bottom: 25px;
  }
  > * {
    padding-left: 25px;
    padding-right: 25px;
  }
`;

export const ModalProps = {
  ariaHideApp: false,
  className: ` `,
  overlayClassName: ` `,
  closeTimeoutMS: TIMEOUT_MS,
  overlayElement: ((props: any, contentElement: React.ReactNode) => <ModalOverlay {...props}>{contentElement}</ModalOverlay>),
  contentElement: ((props: any, children: React.ReactNode) => <ModalContent {...props}>{children}</ModalContent>),
};
export const ModalAlert = styled(SU.styledSvg()).attrs({ as: Assets.AlertSvg })`
  width: 30px;
  height: 27px;
  margin-bottom: 15px;
  grid-area: alert;
  justify-self: center;
`;
export const ModalHeader = styled.div`
  margin-bottom: 19px;
  grid-area: header;
  font-size: 24px;
  font-weight: 500;
  color: ${p => p.theme.TEXT_DARK};
  letter-spacing: 0.37px;
`;
export const ModalAlertHeader = styled(ModalHeader)`
  margin-bottom: 3px;
  font-size: 17px;
  font-weight: 400;
  text-align: center;
  color: #000000;
`;
export const ModalDivider = styled.div`
  margin-top: 16px;
  border-top: 1px solid ${p => p.theme.GRAY_E6};
  grid-area: divider;
`;

export const ModalBody = styled.div`
  margin-top: 16px;
  grid-area: body;
  font-size: 14px;
  font-weight: 400;
  color: ${p => p.theme.GRAY_84};
`;
export const ModalAlertBody = styled(ModalBody)`
  text-align: center;
  line-height: 1.4;
`;

export const ModalFooter = styled.div`
  margin-top: 35px;
  grid-area: footer;
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 15px;
  align-items: center;
`;


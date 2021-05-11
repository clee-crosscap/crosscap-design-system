import styled from 'styled-components/macro';

interface TimeoutProp {
  $timeout: number,
}
// Lowercase to override the base type
export const fadeTransition = (base = styled.div``) => styled(base)<TimeoutProp>`
  &.transition-exit,
  &.transition-enter-done,
  &&.transition-enter-active {
    opacity: 1;
  }
  &.transition-enter,
  &.transition-exit-done,
  &&.transition-exit-active {
    opacity: 0;
  }
  &.transition-enter-active,
  &.transition-exit-active {
    transition: opacity ${p => p.$timeout}ms ease-in-out;
  }
`;
// Upper case to get the instantiated default
export const FadeTransition = fadeTransition();

interface FooterProps extends TimeoutProp {
}
export const footerTransition = (base = styled.div``) => styled(base)<FooterProps>`
  &.transition-exit,
  &.transition-enter-done,
  &&.transition-enter-active {
    opacity: 1;
    position: relative;
    top: 0;
  }
  &.transition-enter,
  &.transition-exit-done,
  &&.transition-exit-active {
    opacity: 0;
    position: relative;
    top: 100%;
  }
  &.transition-enter-active,
  &.transition-exit-active {
    transition: opacity ${p => p.$timeout}ms ease-out, top ${p => p.$timeout}ms ease-out;
  }
`;
export const FooterTransition = footerTransition();


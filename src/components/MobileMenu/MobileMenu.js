/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components/macro';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import { WEIGHTS } from '../../constants';

import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

const MobileMenu = ({ isOpen, onDismiss }) => {
  return (
    <Overlay isOpen={isOpen} onDismiss={onDismiss}>
      <Content aria-label="Menu">
        <CloseButton onClick={onDismiss} style={{'--counter': 0}}>
          <Icon id="close" />
          <VisuallyHidden>Dismiss menu</VisuallyHidden>
        </CloseButton>
        <Filler />
        <Nav>
          <NavLink href="/sale" style={{'--counter': 1}}>Sale</NavLink>
          <NavLink href="/new" style={{'--counter': 2}}>New&nbsp;Releases</NavLink>
          <NavLink href="/men" style={{'--counter': 3}}>Men</NavLink>
          <NavLink href="/women" style={{'--counter': 4}}>Women</NavLink>
          <NavLink href="/kids" style={{'--counter': 4}}>Kids</NavLink>
          <NavLink href="/collections" style={{'--counter': 6}}>Collections</NavLink>
        </Nav>
        <Footer>
          <SubLink href="/terms" style={{'--counter': 7}}>Terms and Conditions</SubLink>
          <SubLink href="/privacy" style={{'--counter': 8}}>Privacy Policy</SubLink>
          <SubLink href="/contact" style={{'--counter': 9}}>Contact Us</SubLink>
        </Footer>
      </Content>
    </Overlay>
  );
};

const Overlay = styled(DialogOverlay)`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  perspective: 800px;
  transform-style: preserve-3d;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-backdrop);
  display: flex;
  justify-content: flex-end;
  animation: fade-in 400ms both;
`;

const Content = styled(DialogContent)`
  @keyframes slide-left {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes hinge-left {
    from {
      transform: rotateY(-180deg);
      background: var(--color-gray-900);
    }
    to {
      transform: rotateY(0deg);
    }
  }

  transform-origin: 100% 50%;

  background: white;
  width: 300px;
  height: 100%;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;

  @media (prefers-reduced-motion: no-preference) {
    animation: hinge-left 600ms both cubic-bezier(.65,.05,.48,1.01);

    // & a, & button {
    //   animation: fade-in 300ms both;
    //   animation-delay: calc(300ms + 40ms * var(--counter, 0));
    // }
  }

`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 16px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavLink = styled.a`
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const Filler = styled.div`
  flex: 1;
`;
const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;
`;

export default MobileMenu;

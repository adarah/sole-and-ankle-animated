import styled from 'styled-components';
import { WEIGHTS } from '../../constants';

const NavLink = ({ children, ...props }) => {
  let textContent;
  if (typeof children === "string") {
    textContent = children;
    console.log(textContent);
  }

  return (
    <NativeLink {...props} textContent={textContent}>
      <ChildWrapper>{children}</ChildWrapper>
    </NativeLink>
  );
};

const ChildWrapper = styled.span`
  display: inline-block;
  will-change; transform;
  transform: translateY(0);
  transition: transform var(--transition-duration);
`;

const NativeLink = styled.a`
  --transition-duration: 400ms;
  --base-color: --color-gray-900;
  position: relative;
  /* Hides the before content that slides up */
  overflow: hidden;

  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--base-color);
  font-weight: ${WEIGHTS.medium};

  &:hover, &:focus {
    color: var(--color-secondary);
  }


  &::before {
    content: '${(props) => props.textContent}';
    position: absolute;
    transition: transform var(--transition-duration);
    transform: translateY(100%);
    will-change: transform;
    color: var(--color-secondary);
  }

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    &:hover, &:focus {
        color: var(--base-color);
    }

    &:hover ${ChildWrapper},
    &:focus ${ChildWrapper} {
        transform: translateY(-100%);
    }

    &:hover::before,
    &:focus::before {
        transform: translateY(0);
    }
  }
`;

export default NavLink;
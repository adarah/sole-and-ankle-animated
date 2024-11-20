import styled from 'styled-components';
import { WEIGHTS } from '../../constants';

const NavLink = ({ animation="cubic", children, ...props }) => {
  const textContent = typeof children === 'string'? children : null;
  const animationProps = getAnimationProps(animation, textContent);

  return (
    <NativeLink {...props} animation={animationProps.nativeLink}>
      <ChildWrapper animation={animationProps.childWrapper}>{children}</ChildWrapper>
    </NativeLink>
  );
};

function getAnimationProps(animation, textContent) {
    switch (animation) {
      case 'cubic':
        return {
          nativeLink: `
            @media (hover: hover) and (prefers-reduced-motion: no-preference) {
              perspective: 500px;
              transform-style: preserve-3d;
              will-change: transform;

              & ${ChildWrapper}::before {
                padding: 8px;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                display: block;
                background: var(--color-gray-700);
                content: '${textContent}';
                transform: rotateX(-90deg);
                transform-origin: 50% 0;
                transition: background-color var(--transition-duration);
                will-change: background-color;
              }
              
              &:hover ${ChildWrapper}::before {
                background-color: var(--color-gray-300);
              }

              &:hover ${ChildWrapper} {
                transform: rotateX(90deg) translateY(-50%);
              }
            }
          `,
          childWrapper: `
            padding: 8px;
            transform-origin: 50% 0;
            transform-style: preserve-3d;
            background: var(--color-gray-300);
          `,
        }
        case 'slide-up':
        default:
        return {
          nativeLink: `
            /* Hides the before content that slides up */
            overflow: hidden;

            @media (hover: hover) and (prefers-reduced-motion: no-preference) {
              &:hover, &:focus {
                  color: var(--base-color);
              }

              &::before {
                content: '${textContent}';
                position: absolute;
                transition: transform var(--transition-duration);
                transform: translateY(100%);
                will-change: transform;
                color: var(--color-secondary);
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
          `,
          childWrapper: `
            transform: translateY(0);
        `
        }
    }
}

const ChildWrapper = styled.span`
  display: inline-block;
  will-change; transform;
  transition: transform var(--transition-duration);
  ${props => props.animation}
`;

const NativeLink = styled.a`
  --transition-duration: 400ms;
  --base-color: --color-gray-900;
  position: relative;

  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--base-color);
  font-weight: ${WEIGHTS.medium};

  &:hover, &:focus {
    color: var(--color-secondary);
  }

  ${props => props.animation}
`;

export default NavLink;
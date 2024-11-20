import React from "react";
import styled from "styled-components/macro";

import { WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <ScaleTransform>
            <Image alt="" src={imageSrc} />
          </ScaleTransform>
        </ImageWrapper>
        {variant === "on-sale" && <SaleFlag>Sale</SaleFlag>}
        {variant === "new-release" && <NewFlag>Just released!</NewFlag>}
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--color":
                variant === "on-sale" ? "var(--color-gray-700)" : undefined,
              "--text-decoration":
                variant === "on-sale" ? "line-through" : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background: red;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  font-size: ${14 / 18}rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-white);
  border-radius: 2px;

  transition: transform var(--transition-exit-duration);
  transform-origin: bottom right;
  will-change: transform;
`;

const ScaleTransform = styled.div`
  transition: transform var(--transition-exit-duration);
  transform-origin: 50% 75%;
  will-change: transform;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  transition: transform var(--transition-exit-duration);
  transform-origin: 50% 75%;
  will-change: transform;
`;

const Link = styled.a`
  --transition-exit-duration: 500ms;

  text-decoration: none;
  color: inherit;

  @keyframes twinkle {
    0% {
      transform: translateX(-80%) rotate(45deg) scale(0);
    }
    5% {
      transform: translateX(-80%) rotate(90deg) scale(0.5);
    }
    9% {
      transform: translateX(-80%) rotate(135deg) scale(1);
    }
    17% {
      transform: translateX(-80%) rotate(225deg) scale(0);
    }
    100% {
      transform: translateX(-80%) rotate(45deg) scale(0);
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    5% {
      transform: rotate(-0.9deg);
    }
    9% {
      transform: rotate(0.9deg);
    }
    13% {
      transform: rotate(0deg);
    }
  }

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    &:hover ${ScaleTransform},
    &:focus ${ScaleTransform}
    {
      transform: scale(1.1);
      transition: transform 200ms;
    }

    &:hover ${Image},
    &:focus ${Image}
    {
      animation: shake 3000ms infinite;
      animation-delay: 1000ms;
    }
  }

  &:hover ${Flag},
  &:focus ${Flag} {
    // Tilts the flag
    transform: rotate(3deg);
    transition: transform 200ms;

    ::before {
      position: absolute;
      top: 3px;
      right: 10px;
      content: "";
      height: 10px;
      width: 8px;
      background: #edc951;
      mask: radial-gradient(#0000 71%, #000 72%) 10000% 10000%/99.5% 99.5%;
      animation: twinkle 5000ms infinite linear backwards;
      animation-delay: 1200ms;
      will-change: transform;
    }

    ::after {
      position: absolute;
      content: "";
      height: 15px;
      width: 12px;
      background: #edc951;
      mask: radial-gradient(#0000 71%, #000 72%) 10000% 10000%/99.5% 99.5%;
      animation: twinkle 5000ms infinite linear backwards;
      animation-delay: 1000ms;
      will-change: transform;
    }
  }


`;

const Wrapper = styled.article`
  position: relative;
`;

const SaleFlag = styled(Flag)`
  background-color: var(--color-primary);
`;
const NewFlag = styled(Flag)`
  background-color: var(--color-secondary);
`;

const ImageWrapper = styled.div`
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-gray-900);
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: var(--color-gray-700);
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-primary);
`;

export default ShoeCard;

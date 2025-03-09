import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import logo from './assets/logo.svg?url';

const Wrapper = styled.div`
  position: relative;
  width: calc(14em + 20px);
  height: calc(14em + 20px);
  cursor: pointer;
  background: black;
  border-radius: 50%;
  user-select: none;
`;

const MaskContainer = styled.div`
  position: absolute;
  inset: 1.5em;
  mask-image: url(${logo});
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
`;

const slideBackground = keyframes`
  from {
    background-position: 0% 50%;
  }
  to {
    background-position: 175% 50%;
  }
`;

const RotatingGradient = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    37deg,
    #ff2e63 0% 8%,
    #ff9900 8% 16%,
    #fddb3a 16% 24%,
    #00f5d4 24% 32%,
    #00d9f9 32% 40%,
    #00b4ff 40% 48%,
    #6a00f4 48% 56%,
    #3a0ca3 56% 64%,
    #ff2e63 64% 72%,
    #ff9900 72% 80%,
    #fddb3a 80% 88%,
    #00f5d4 88% 94%,
    #00d9f9 94% 100%
  );
  background-size: 236% auto;
  background-repeat: repeat;
  animation: ${slideBackground} 3s linear infinite;
`;

type Props = {
  onClick: () => void;
};

const Logo = ({ onClick }: Props) => (
  <Wrapper onClick={onClick}>
    <MaskContainer>
      <RotatingGradient />
    </MaskContainer>
  </Wrapper>
);

export default Logo;

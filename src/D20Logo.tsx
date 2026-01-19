import styled from '@emotion/styled';

// Icosahedron geometry
const PHI = (1 + Math.sqrt(5)) / 2; // Golden ratio ≈ 1.618

const containerWidth = 10;
const containerHeight = containerWidth;
const faceWidth = containerWidth * 0.5;
const faceHeight = faceWidth * (Math.sqrt(3) / 2);
const angle = 53;
const sideAngle = 360 / 5;

const rotateX = -angle;
const translateZ = faceWidth * (1 / (2 * PHI)) * 1.15;

const Wrapper = styled.div`
  position: relative;
  width: 14em;
  height: 14em;
  cursor: pointer;
  user-select: none;
  perspective: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const D20Container = styled.div`
  position: absolute;
  width: ${containerWidth}em;
  height: ${containerHeight}em;
  transform-style: preserve-3d;
  transform: rotateY(-15deg) rotateX(${rotateX - 10}deg);
  animation: float 3s ease-in-out infinite;
  counter-reset: steps 0;
  border-top: 10px solid white;
  border-right: 10px solid white;
  border-radius: 50%;
  padding: 2em 4em 2em 1em;
  aspect-ratio: 1;

  @keyframes float {
    0%,
    100% {
      transform: rotateY(-15deg) rotateX(${rotateX - 10}deg) translateY(0px);
    }
    50% {
      transform: rotateY(-15deg) rotateX(${rotateX - 10}deg) translateY(-10px);
    }
  }
`;

const Face = styled.figure<{ faceNumber: number }>`
  position: absolute;
  left: 50%;
  top: 0;
  margin: 0 ${-faceWidth * 0.5}em;
  border-left: ${faceWidth * 0.5}em solid transparent;
  border-right: ${faceWidth * 0.5}em solid transparent;
  border-bottom: ${faceHeight}em solid rgba(240, 46, 170, 0.75);
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  counter-increment: steps 1;
  box-sizing: border-box;

  ${({ faceNumber }) => {
    if (faceNumber === 1) {
      return `transform: rotateY(0deg) translateZ(${translateZ}em) rotateX(${angle}deg);`;
    }

    if (faceNumber === 19) {
      return `transform: rotateY(${-sideAngle * 4}deg) translateZ(${translateZ}em) rotateX(${angle}deg);`;
    }
  }}

  &:after {
    content: '${({ faceNumber }) => faceNumber}';
    position: absolute;
    height: ${faceHeight}em;
    line-height: ${faceHeight * 1.3333}em;
    width: ${faceWidth}em;
    font-weight: bold;
    text-align: center;
    font-family: 'Courier New', monospace;
    transform-origin: center bottom;
    left: -2.5em;
    bottom: ${({ faceNumber }) =>
      faceNumber === 19 ? '0.1em' : `-${faceHeight}em`};
    transform: ${({ faceNumber }) =>
      faceNumber === 19 ? 'rotateZ(120deg) translateX(50%)' : 'rotateZ(0deg)'};
  }
`;

type Props = {
  onClick: () => void;
};

const D20Logo = ({ onClick }: Props) => (
  <Wrapper onClick={onClick}>
    <D20Container>
      <Face key={0} faceNumber={1} />
      <Face key={1} faceNumber={19} />
    </D20Container>
  </Wrapper>
);

export default D20Logo;

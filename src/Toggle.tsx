import { useState } from 'react';
import styled from '@emotion/styled';

// Styled components
const StyledToggle = styled.div`
  width: 40px;
  height: 20px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  position: relative;
  margin: 0 1em;
  cursor: pointer;
`;

const rainbow = `
  background: repeating-linear-gradient(
    45deg,
    rgba(255, 105, 97, 0.3),
    rgba(255, 179, 71, 0.3),
    rgba(255, 209, 102, 0.3),
    rgba(6, 214, 160, 0.3),
    rgba(27, 154, 170, 0.3),
    rgba(61, 90, 128, 0.3),
    rgba(119, 71, 135, 0.3)
  );
`;
const lego = `
  position: relative;
  border-radius: 50%;
  background-color: yellow;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: 'LEGO';
    position: absolute;
    color: grey;
    top: 2.5px;
    left: 2.5px;
    width: 15px;
    height: 15px;
    background-color: yellow;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    font-size: 5px;
  }
`;
const defaultCircle = `
  background-color: #fff5;
`;

const StyledCircle = styled.div<{ state: number; isRight: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all 0.2s ease-in-out;
  transform: ${({ isRight }) => (isRight ? 'translateX(20px)' : 'translateX(0)')};

  ${({ state }) => {
    if (state === 1) return rainbow;
    if (state === 2) return lego;
    return defaultCircle;
  }}}
`;

// Component
type Props = {
  state: number;
  nextState: () => void;
};

const Toggle = ({ state, nextState }: Props) => {
  const [isRight, setLeft] = useState(false);

  const handleClick = () => {
    setLeft(!isRight);
    nextState();
  };
  return (
    <StyledToggle onClick={handleClick}>
      <StyledCircle state={state} isRight={isRight} />
    </StyledToggle>
  );
};

export default Toggle;

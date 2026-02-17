import { useState } from 'react';
import styled from '@emotion/styled';
import faceUrl from '../assets/face-tinyfied.jpg';
import logoUrl from '../assets/logo.svg?url';
import logo2026Url from '../assets/logo2026.svg?url';
import RainbowLogo from './RainbowLogo';
import D20Logo from './D20Logo';

const FaceImg = styled.img`
  width: 14em;
  height: 14em;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  z-index: 100;
  cursor: pointer;
  user-select: none;
  box-shadow:
    rgba(240, 46, 170, 0.4) 5px 3px,
    rgba(240, 46, 170, 0.3) 10px 6px,
    rgba(240, 46, 170, 0.2) 15px 9px,
    rgba(240, 46, 170, 0.1) 20px 12px,
    rgba(240, 46, 170, 0.05) 25px 15px;
`;

enum LogoState {
  Face = 'face',
  Logo = 'logo',
  Logo2026 = 'logo2026',
  D20 = 'd20',
}

const LogoSwapper = () => {
  const [logoState, setLogoState] = useState<LogoState>(LogoState.Face);

  if (logoState === LogoState.Logo) {
    return (
      <RainbowLogo
        maskUrl={logoUrl}
        onClick={() => setLogoState(LogoState.Logo2026)}
      />
    );
  }

  if (logoState === LogoState.Logo2026) {
    return (
      <RainbowLogo
        maskUrl={logo2026Url}
        onClick={() => setLogoState(LogoState.D20)}
      />
    );
  }

  if (logoState === LogoState.D20) {
    return <D20Logo onClick={() => setLogoState(LogoState.Face)} />;
  }

  return (
    <FaceImg
      src={faceUrl}
      alt="John Drew Showalter"
      onClick={() => setLogoState(LogoState.Logo)}
    />
  );
};

export default LogoSwapper;

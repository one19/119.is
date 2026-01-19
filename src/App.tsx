import { useState } from 'react';
import styled from '@emotion/styled';
import resumeUrl from '/Resume - apr 2025.pdf';
import BackgroundSpinner from './backgrounds/spinner/BasicSpinner';
import BackgroundSpiral from './backgrounds/spiral/BasicSpiral';
import LegoBackground from './backgrounds/lego/Map';
import DescriptorRoller from './DescriptorRoller';
import faceUrl from './assets/face-tinyfied.jpg';
import Footer from './Footer';
import Toggle from './Toggle';
import Logo from './Logo';
import D20Logo from './D20Logo';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  padding: 3.5em 0 0 calc(50% - 8rem);
  height: 100%;
`;

const Card = styled.div`
  padding: 2em;
  display: flex;
  z-index: 100;
  flex-direction: column;
  align-items: flex-start;
`;

const Face = styled.img`
  width: 14em;
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

const renderBackground = (state: number) => {
  if (state === 1) return <BackgroundSpinner />;
  if (state === 2) return <LegoBackground />;
  return <BackgroundSpiral />;
};

enum LogoState {
  Face = 'face',
  Logo = 'logo',
  D20 = 'd20',
}

const App = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [logoState, setLogoState] = useState<LogoState>(LogoState.Face);

  const handleBackgroundChange = () => {
    setBackgroundIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  return (
    <>
      <Wrapper>
        {renderBackground(backgroundIndex)}
        <h1>John Drew Showalter</h1>
        <DescriptorRoller />
        {logoState === LogoState.Face ? (
          <Face
            src={faceUrl}
            alt="John Drew Showalter"
            onClick={() => setLogoState(LogoState.Logo)}
          />
        ) : logoState === LogoState.Logo ? (
          <Logo onClick={() => setLogoState(LogoState.D20)} />
        ) : (
          <D20Logo onClick={() => setLogoState(LogoState.Face)} />
        )}
        <Card>
          <p>
            Lead developer with 10 years of experience in full-stack web
            development.
          </p>
          <ul>
            <li>
              <a href={resumeUrl} target="_blank">
                My resume
              </a>
            </li>
            <li>
              <a href="https://github.com/one19" target="_blank">
                My GitHub profile
              </a>
            </li>
            {/* <li>
              <a href="/blogging">My blog</a>
            </li> */}
            <li>
              <a href="mailto:drew@119.is">Email me</a> anytime!
            </li>
          </ul>
        </Card>
      </Wrapper>
      <Footer>
        <Toggle state={backgroundIndex} nextState={handleBackgroundChange} />
      </Footer>
    </>
  );
};

export default App;

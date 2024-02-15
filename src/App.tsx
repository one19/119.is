import { useState } from 'react';
import BackgroundSpinner from './backgrounds/spinner/BasicSpinner';
import BackgroundSpiral from './backgrounds/spiral/BasicSpiral';
import LegoBackground from './backgrounds/lego/Map';
import Footer from './Footer';
import Toggle from './Toggle';
import faceUrl from './assets/face-tinyfied.jpg';
import resumeUrl from './assets/resume.pdf';
import styled from '@emotion/styled';

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

const App = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const handleBackgroundChange = () => {
    setBackgroundIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  return (
    <>
      {renderBackground(backgroundIndex)}
      <h1>John Drew Showalter</h1>
      <Face src={faceUrl} alt="John Drew Showalter" />
      <Card>
        <p>Lead developer with 8+ years of experience in full-stack web development.</p>
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
          <li>
            <a href="mailto:drew@119.is">Email me</a> anytime!
          </li>
        </ul>
      </Card>
      <Footer>
        <Toggle state={backgroundIndex} nextState={handleBackgroundChange} />
      </Footer>
    </>
  );
};

export default App;

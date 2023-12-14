import { useState } from 'react';
import BackgroundSpinner from './backgrounds/spinner/BasicSpinner';
import BackgroundSpiral from './backgrounds/spiral/BasicSpiral';
import LegoBackground from './backgrounds/lego/Map';
import Footer from './Footer';
import Toggle from './Toggle';
import faceUrl from './assets/face-tinyfied.jpg';
import resumeUrl from './assets/resume.pdf';
import './App.css';

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
      <img className="face" src={faceUrl} alt="John Drew Showalter" />
      <div className="card">
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
      </div>
      <Footer>
        <Toggle state={backgroundIndex} nextState={handleBackgroundChange} />
      </Footer>
    </>
  );
};

export default App;

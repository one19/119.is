import { useState } from 'react';
import BackgroundSpinner from './backgrounds/spinner/BasicSpinner';
import BackgroundSpiral from './backgrounds/spiral/BasicSpiral';
import Footer from './Footer';
import Toggle from './Toggle';
import faceUrl from './assets/face-tinyfied.jpg';
import resumeUrl from './assets/resume.pdf';
import './App.css';

const App = () => {
  const [spinnerGo, setSpinnerGo] = useState(false);

  return (
    <>
      {spinnerGo ? <BackgroundSpinner /> : <BackgroundSpiral />}
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
        <Toggle isOn={spinnerGo} setIsOn={setSpinnerGo} />
      </Footer>
    </>
  );
};

export default App;

import BackgroundSpiral from './BackgroundSpiral';
import Footer from './Footer';
import faceUrl from './assets/face-tinyfied.jpg';
import resumeUrl from './assets/resume.pdf';
import './App.css';

const App = () => (
  <>
    <BackgroundSpiral />
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
          I'm looking for a job! <a href="mailto:drew@119.is">Email me!</a>
        </li>
      </ul>
    </div>
    <Footer />
  </>
);

export default App;

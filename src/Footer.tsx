import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import githubLogo from './assets/octocat.svg';
import npmLogo from './assets/npm.svg';
import eslintLogo from './assets/eslint.svg';
import prettierLogo from './assets/prettier.svg';
import cloudflareLogo from './assets/cloudflare.svg';
import './Footer.css';

const Footer = () => (
  <div className="footer">
    <p>
      Made with <span className="heart">♥</span> with the following technologies:
    </p>
    <a href="https://vitejs.dev" target="_blank">
      <img src={viteLogo} className="logo vite" alt="Vite logo" />
    </a>
    <a href="https://react.dev" target="_blank">
      <img src={reactLogo} className="logo react" alt="React logo" />
    </a>
    <a href="https://github.com/one19" target="_blank">
      <img src={githubLogo} className="logo github" alt="GitHub logo" />
    </a>
    <a href="https://www.npmjs.com/~one19" target="_blank">
      <img src={npmLogo} className="logo npm" alt="NPM logo" />
    </a>
    <a href="https://prettier.io/" target="_blank">
      <img src={prettierLogo} className="logo prettier" alt="Prettier logo" />
    </a>
    <a href="https://eslint.org/" target="_blank">
      <img src={eslintLogo} className="logo eslint" alt="Eslint logo" />
    </a>
    <a href="https://www.cloudflare.com/" target="_blank">
      <img src={cloudflareLogo} className="logo cloudflare" alt="Cloudflare logo" />
    </a>
  </div>
);

export default Footer;

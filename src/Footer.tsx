import styled from '@emotion/styled';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import githubLogo from './assets/octocat.svg';
import npmLogo from './assets/npm.svg';
import eslintLogo from './assets/eslint.svg';
import prettierLogo from './assets/prettier.svg';
import cloudflareLogo from './assets/cloudflare.svg';
import tanstackLogo from './assets/tanstack.png';

const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const LinkHolster = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img<{ hoverGlow: string }>`
  height: 2em;
  padding: 0.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 1em ${({ hoverGlow }) => hoverGlow});
  }

  &.react {
    @media (prefers-reduced-motion: no-preference) {
      animation: logo-spin infinite 20s linear;
    }
  }

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Heart = styled.span`
  color: red;
`;

type Props = {
  children?: React.ReactNode;
};

const Footer = ({ children }: Props) => (
  <FooterContainer>
    <p>
      Made with <Heart>♥</Heart> with the following technologies:
    </p>
    <LinkHolster>
      <a href="https://vitejs.dev" target="_blank">
        <LogoImg src={viteLogo} alt="Vite logo" hoverGlow="#646cffaa" />
      </a>
      <a href="https://react.dev" target="_blank">
        <LogoImg
          src={reactLogo}
          alt="React logo"
          hoverGlow="#61dafbaa"
          className="react"
        />
      </a>
      <a href="https://github.com/one19" target="_blank">
        <LogoImg src={githubLogo} alt="GitHub logo" hoverGlow="#fffa" />
      </a>
      <a href="https://www.npmjs.com/~one19" target="_blank">
        <LogoImg src={npmLogo} alt="NPM logo" hoverGlow="#f00a" />
      </a>
      <a href="https://prettier.io/" target="_blank">
        <LogoImg
          src={prettierLogo}
          alt="Prettier logo"
          hoverGlow="rgba(248, 190, 76, 0.8)"
        />
      </a>
      <a href="https://eslint.org/" target="_blank">
        <LogoImg src={eslintLogo} alt="Eslint logo" hoverGlow="#646cffaa" />
      </a>
      <a href="https://www.cloudflare.com/" target="_blank">
        <LogoImg
          src={cloudflareLogo}
          alt="Cloudflare logo"
          hoverGlow="rgba(248, 190, 76, 0.8)"
        />
      </a>
      <a href="https://tanstack.com/router/latest" target="_blank">
        <LogoImg
          src={tanstackLogo}
          alt="Tanstack router logo"
          hoverGlow="rgba(52, 211, 153, 0.8)"
        />
      </a>
      {children}
    </LinkHolster>
  </FooterContainer>
);

export default Footer;

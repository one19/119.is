import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Global, css } from '@emotion/react';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const globalStyles = css`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    --main-header-font-size: 3.2em;
    --main-header-line-height: 1.1;
  }

  #root {
    max-width: 1280px;
    padding: 3.5em 0 0 calc(50% - 8rem);
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
  }

  h1 {
    font-size: var(--main-header-font-size);
    line-height: var(--main-header-line-height);
  }

  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
  }

  canvas {
    z-index: -1;
  }

  ul {
    margin-top: 0;
    padding-left: 0.75em;
  }

  li {
    margin-bottom: 0.5em;
  }

  * {
    min-width: 0;
  }
`;

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

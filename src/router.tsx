import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Blogs from './ranting-about';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/ranting-abbout/:blogSlug',
    element: <Blogs />,
  },
]);

export default router;

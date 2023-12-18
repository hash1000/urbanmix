import { RouteObject } from 'react-router-dom';

import NotFound from '@/pages/NotFound';

import HomePage from '@/pages/Home';
import MainLayout from '@/layouts/MainLayout';
import Projects from '@/pages/projects';

const authRoutes: RouteObject[] = [
  {
    path: '/',
    // Auth layout without a navbar can be added here or inside the AuthPage component
    element: <HomePage />,
    children: [],
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      // Main App layout with Nav Bar
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
    errorElement: <NotFound />,
    children: [],
  },
  {
    path: '/projects',
    element: (
      // Main App layout with Nav Bar
      <MainLayout>
        <Projects />
      </MainLayout>
    ),
    errorElement: <NotFound />,
    children: [],
  },
];

const publicRoutes: RouteObject[] = [
  //  Public layout without a navbar can be added here
  {
    path: '/',
    element: (
      // Main App layout with Nav Bar
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
    errorElement: <NotFound />,
    children: [],
  },
];

const routes: RouteObject[] = [
  ...authRoutes,
  ...privateRoutes,
  ...publicRoutes,
];

export default routes;

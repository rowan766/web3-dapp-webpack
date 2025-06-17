import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

import MainLayout from '@/layouts/Layout';
import Loading from '@components/common/Loading';

import Home from '@/pages/Home';
import Abis from '@/pages/Abis';
import CodeRevi from '@/pages/codeRevi/codeRevi';
import PageNotFoundView from '@/components/common/PageNotFoundView';
import Ydcoin from '@pages/YdCoin';
import Course from '@pages/course';

const Layout = () => (
  <Suspense fallback={<Loading />}>
    <MainLayout />
  </Suspense>
);

const Test = lazy(() => import('@components/common/Test'));
const Routes: RouteObject[] = [];

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { path: '/', element: <Home /> },
    { path: '/home', element: <Home /> },
    { path: '/code', element: <CodeRevi /> },
    { path: '/abis', element: <Abis /> },
    { path: '/ydcoin', element: <Ydcoin /> },
    { path: '/course', element: <Course /> },
    { path: '404', element: <PageNotFoundView /> },
    { path: '*', element: <PageNotFoundView /> },
  ],
};

const DemoRoutes = {
  path: '/yideng',
  element: <Layout />,
  children: [
    { path: 'test', element: <Test /> },
    { path: '*', element: <PageNotFoundView /> },
  ],
};

Routes.push(mainRoutes, DemoRoutes);

export default Routes;

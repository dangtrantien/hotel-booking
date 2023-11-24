import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from './store/store';
import MainLayout from './pages/Layout/MainLayout';
import MiniLayout from './pages/Layout/MiniLayout';
import Error from './components/UI/Error';
import IsLoading from './components/UI/IsLoading';

const DashboardPage = lazy(() => import('./pages/Dashboard'));
const UsersPage = lazy(() => import('./pages/Users'));
const HotelsPage = lazy(() => import('./pages/Hotel/Hotels'));
const NewHotelPage = lazy(() => import('./pages/Hotel/NewHotel'));
const RoomsPage = lazy(() => import('./pages/Room/Rooms'));
const NewRoomPage = lazy(() => import('./pages/Room/NewRoom'));
const TransactionsPage = lazy(() => import('./pages/Transactions'));
const LoginPage = lazy(() => import('./pages/Auth/Login'));

// ==================================================

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<IsLoading />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <Suspense fallback={<IsLoading />}>
            <UsersPage />
          </Suspense>
        ),
      },
      {
        path: 'hotels',
        element: (
          <Suspense fallback={<IsLoading />}>
            <HotelsPage />
          </Suspense>
        ),
      },
      {
        path: 'new-hotel',
        element: (
          <Suspense fallback={<IsLoading />}>
            <NewHotelPage />
          </Suspense>
        ),
      },
      {
        path: 'rooms',
        element: (
          <Suspense fallback={<IsLoading />}>
            <RoomsPage />
          </Suspense>
        ),
      },
      {
        path: 'new-room',
        element: (
          <Suspense fallback={<IsLoading />}>
            <NewRoomPage />
          </Suspense>
        ),
      },
      {
        path: 'transactions',
        element: (
          <Suspense fallback={<IsLoading />}>
            <TransactionsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <MiniLayout />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<IsLoading />}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

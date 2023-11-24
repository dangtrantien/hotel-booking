import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from './store/store';
import MainLayout from './pages/Layout/MainLayout';
import MiniLayout from './pages/Layout/MiniLayout';
import Error from './components/UI/Error';
import IsLoading from './components/UI/IsLoading';

const HomePage = lazy(() => import('./pages/Home'));
const HotelDetailPage = lazy(() => import('./pages/HotelDetail'));
const SearchPage = lazy(() => import('./pages/Search'));
const TransactionPage = lazy(() => import('./pages/Transaction'));
const LoginPage = lazy(() => import('./pages/Auth/Login'));
const RegisterPage = lazy(() => import('./pages/Auth/Register'));

// ==================================================

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<IsLoading />}>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: 'hotels',
            element: (
              <Suspense fallback={<IsLoading />}>
                <SearchPage />
              </Suspense>
            ),
          },
          {
            path: 'hotel/:hotelId',
            element: (
              <Suspense fallback={<IsLoading />}>
                <HotelDetailPage />
              </Suspense>
            ),
          },
          {
            path: 'transaction',
            element: (
              <Suspense fallback={<IsLoading />}>
                <TransactionPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <MiniLayout />,
        children: [
          {
            path: 'login',
            element: (
              <Suspense fallback={<IsLoading />}>
                <LoginPage />
              </Suspense>
            ),
          },
          {
            path: 'register',
            element: (
              <Suspense fallback={<IsLoading />}>
                <RegisterPage />
              </Suspense>
            ),
          },
        ],
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

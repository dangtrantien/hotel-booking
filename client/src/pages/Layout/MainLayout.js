import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { getUser } from '../../store/user/user-actions';

import Navbar from '../../components/Layout/Navbar/Navbar';
import NavbarLink from '../../components/Layout/Navbar/NavbarLink';
import Footer from '../../components/Layout/Footer/Footer';

// ==================================================

const MainLayout = () => {
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    } else {
      dispatch(getUser());
    }
  }, [token, dispatch]);

  return (
    <>
      <Navbar />

      <NavbarLink />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;

import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar/Sidebar';

// ==================================================

const MainLayout = () => {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className='layout-container'>
      <Header />

      <Sidebar />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

import { Outlet } from 'react-router-dom';

import Navbar from '../../components/Layout/Navbar/Navbar';

// ==================================================

const MiniLayout = () => {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MiniLayout;

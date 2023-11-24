import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Sidebar.module.css';
import { RiDashboardFill } from 'react-icons/ri';
import { FaRegUser, FaHotel, FaTruck } from 'react-icons/fa';
import { TfiCreditCard } from 'react-icons/tfi';
import { BiLogIn } from 'react-icons/bi';

// ==================================================

const Sidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    sessionStorage.removeItem('token');

    return navigate('/login', { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles['list-container']}>
        <p>Main</p>

        <NavLink
          to='/dashboard'
          className={({ isActive }) => (isActive ? styles.active : null)}
        >
          <RiDashboardFill className={styles.icon} />

          <span>Dashboard</span>
        </NavLink>
      </div>

      <div className={styles['list-container']}>
        <p>Lists</p>

        <ul>
          <li>
            <NavLink
              to='/users'
              className={({ isActive }) => (isActive ? styles.active : null)}
            >
              <FaRegUser className={styles.icon} />

              <span>Users</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/hotels'
              className={({ isActive }) => (isActive ? styles.active : null)}
            >
              <FaHotel className={styles.icon} />

              <span>Hotels</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/rooms'
              className={({ isActive }) => (isActive ? styles.active : null)}
            >
              <TfiCreditCard className={styles.icon} />

              <span>Rooms</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/transactions'
              className={({ isActive }) => (isActive ? styles.active : null)}
            >
              <FaTruck className={styles.icon} />

              <span>Transactions</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={styles['list-container']}>
        <p>New</p>

        <ul>
          <li>
            <NavLink
              to='/new-hotel'
              className={({ isActive }) => (isActive ? styles.active : null)}
            >
              <FaHotel className={styles.icon} />

              <span>New Hotel</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/new-room'
              className={({ isActive }) => (isActive ? styles.active : null)}
            >
              <TfiCreditCard className={styles.icon} />

              <span>New Room</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={styles['list-container']}>
        <p>User</p>

        <button onClick={logoutHandler}>
          <BiLogIn className={styles.icon} />

          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

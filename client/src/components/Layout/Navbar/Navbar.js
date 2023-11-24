import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { userActions } from '../../../store/user/user-slice';

import styles from './Navbar.module.css';

// ==================================================

const Navbar = () => {
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.user.email);

  const logoutHandler = () => {
    dispatch(userActions.logOut());

    return navigate('/', { replace: true });
  };

  return (
    <nav className={styles['nav-container']}>
      <div className={`container ${styles.container}`}>
        <Link to='/' className={styles['nav-link']}>
          Booking Website
        </Link>

        {!token && (
          <div className={styles['action-container']}>
            <button
              type='button'
              onClick={() => navigate('/register', { replace: true })}
            >
              Register
            </button>
            <button
              type='button'
              onClick={() => navigate('/login', { replace: true })}
            >
              Login
            </button>
          </div>
        )}

        {token && (
          <div className={styles['action-container']}>
            <p>{email}</p>

            <button
              type='button'
              onClick={() => navigate('/transaction', { replace: true })}
            >
              Transactions
            </button>

            <button type='button' onClick={logoutHandler}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

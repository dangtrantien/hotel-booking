import { Link } from 'react-router-dom';

import styles from './Error.module.css';

// ==================================================

const Error = () => {
  return (
    <div className={styles['notfound-container']}>
      <h1>404 - Page not found</h1>

      <p>
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>

      <Link className='btn' to='/'>
        Go To Home
      </Link>
    </div>
  );
};

export default Error;

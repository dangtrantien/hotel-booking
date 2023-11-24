import styles from './AuthWrapper.module.css';

// ==================================================

const AuthWrapper = ({ children, path }) => {
  return (
    <div className={styles.container}>
      <h1>{path === 'login' ? 'Login' : 'Sign Up'}</h1>

      {children}
    </div>
  );
};

export default AuthWrapper;

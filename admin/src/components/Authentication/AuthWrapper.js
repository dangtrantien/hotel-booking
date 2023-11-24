import styles from './AuthWrapper.module.css';

// ==================================================

const AuthWrapper = ({ children }) => {
  return (
    <div className={styles.container}>
      <h1>Login</h1>

      {children}
    </div>
  );
};

export default AuthWrapper;

import AuthWrapper from '../../components/Authentication/AuthWrapper';
import LoginForm from '../../components/Authentication/LoginForm';

// ==================================================

const LoginPage = () => {
  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
};

export default LoginPage;

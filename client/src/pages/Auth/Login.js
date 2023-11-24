import AuthWrapper from '../../components/Authentication/AuthWrapper';
import LoginForm from '../../components/Authentication/AuthForm/LoginForm';

// ==================================================

const LoginPage = () => {
  return (
    <AuthWrapper path='login'>
      <LoginForm />
    </AuthWrapper>
  );
};

export default LoginPage;

import AuthWrapper from '../../components/Authentication/AuthWrapper';
import RegisterForm from '../../components/Authentication/AuthForm/RegisterForm';

// ==================================================

const RegisterPage = () => {
  return (
    <AuthWrapper path='register'>
      <RegisterForm />
    </AuthWrapper>
  );
};

export default RegisterPage;

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CardContent } from '@mui/material';
import { AuthHeader } from 'src/infrastructure/shared/components/AuthHeader/AuthHeader';
import { FormLogin } from './components';
import { Main, CardForm } from './style';

//services
import { signinService } from 'src/domain/auth.services';
// hooks
import { useAuth } from 'src/infrastructure/shared/hooks/useAuth';

export const Login = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [asyncErrors, setAsyncErrors] = useState('');

  useEffect(() => {
    if (auth === 'authorized') {
      navigate('/home', { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const handlerShowPassword = () => setShowPassword((pre) => !pre);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = await signinService({ ...data });
    if (response?.msg) {
      setAsyncErrors(response.msg);
      setIsLoading(false);
    }
  };

  return (
    <Main>
      <CardForm elevation={0}>
        <CardContent sx={{ padding: '2rem 3rem' }}>
          <AuthHeader
            title="BEHOLD"
            subtitle="Bienvenido a BEHOLD"
            text="Adentrate en la mejor plataforma de manga japones del momento"
          />
          <FormLogin
            handlerShowPassword={handlerShowPassword}
            showPassword={showPassword}
            isLoading={isLoading}
            useForm={{
              register,
              handleSubmit,
              errors,
              onSubmit,
              control,
              asyncErrors
            }}
          />
        </CardContent>
      </CardForm>
    </Main>
  );
};

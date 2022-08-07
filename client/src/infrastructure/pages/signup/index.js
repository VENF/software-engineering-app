import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CardContent } from '@mui/material';
import { AuthHeader } from 'src/infrastructure/shared/components/AuthHeader/AuthHeader';
import { FormSignup } from './components';
import { Main, CardForm } from './style';

//services
import { signupService } from 'src/domain/auth.services';
// hooks
import { useAuth } from 'src/infrastructure/shared/hooks/useAuth';

export const Signup = () => {
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
  //yelean@gmail.com
  const onSubmit = async (data) => {
    if (data.confirm !== data.password)
      return setAsyncErrors('Las contrasenas no coinciden');
    setIsLoading(true)
    const response = await signupService({
      name: data.name,
      password: data.password,
      email: data.email
    });
    response?.error
      ? setAsyncErrors('Este usuario ya existe')
      : navigate('/', { replace: true });
    setIsLoading(false)
  };

  return (
    <Main>
      <CardForm elevation={0}>
        <CardContent sx={{ padding: '2rem 3rem' }}>
          <AuthHeader
            title="BEHOLD"
            subtitle="Bienvenido a BEHOLD"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          />
          <FormSignup
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

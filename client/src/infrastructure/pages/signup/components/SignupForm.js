import { Link } from 'react-router-dom';

import { Box, Typography, IconButton } from '@mui/material';

import { Button } from 'src/infrastructure/shared/components/Button/Button';
import { Field } from 'src/infrastructure/shared/components/Field/Field';
import { Controller } from 'react-hook-form';

import { EyeOff, Eye } from 'mdi-material-ui';
import { styled } from '@mui/material/styles';

const LinkFormat = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 400,
  textDecoration: 'none'
}));

export const FormSignup = ({ useForm, showPassword, handlerShowPassword, isLoading }) => {
  const { handleSubmit, onSubmit, control, errors, asyncErrors } = useForm;
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Box style={{ margin: '20px 0px' }}>
        {asyncErrors && (
          <Box style={{ padding: '10px' }}>
            <Typography color="error" variant="body2">
              {asyncErrors}
            </Typography>
          </Box>
        )}
        {errors?.email && (
          <Box style={{ padding: '10px' }}>
            <Typography color="error" variant="body2">
              {errors?.email?.message}
            </Typography>
          </Box>
        )}
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Debes ingresar tu correo!',
            pattern: {
              value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Debes ingresar una direccion de correo valida'
            }
          }}
          render={({ field }) => (
            <Field
              {...field}
              width="100%"
              type="text"
              placeholder="email"
              autoComplete="off"
            />
          )}
        />
      </Box>
      <Box style={{ margin: '20px 0px' }}>
        {errors?.name && (
          <Box style={{ padding: '10px' }}>
            <Typography color="error" variant="body2">
              {errors?.name?.message}
            </Typography>
          </Box>
        )}
        <Controller
          name="name"
          control={control}
          rules={{
            required: 'Este campo es obligatorio'
          }}
          render={({ field }) => (
            <Field
              {...field}
              width="100%"
              type="text"
              placeholder="name"
              autoComplete="off"
            />
          )}
        />
      </Box>
      <Box style={{ margin: '20px 0px' }}>
        {errors?.password && (
          <Box style={{ padding: '10px' }}>
            <Typography color="error" variant="body2">
              {errors?.password?.message}
            </Typography>
          </Box>
        )}
        <Controller
          name="password"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Este campo no puede estar vacio!'
            },
            minLength: {
              value: 6,
              message: 'debe tener minimo 8 characteres'
            }
          }}
          render={({ field }) => (
            <Field
              autoComplete="new-password"
              icon={
                <IconButton onClick={handlerShowPassword}>
                  {showPassword ? <Eye /> : <EyeOff />}
                </IconButton>
              }
              width="100%"
              type={showPassword ? 'text' : 'password'}
              placeholder="contraseña"
              {...field}
            />
          )}
        />
      </Box>
      <Box style={{ margin: '20px 0px' }}>
        {errors?.confirm && (
          <Box style={{ padding: '10px' }}>
            <Typography color="error" variant="body2">
              {errors?.confirm?.message}
            </Typography>
          </Box>
        )}
        <Controller
          name="confirm"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Este campo no puede estar vacio!'
            },
            minLength: {
              value: 6,
              message: 'debe tener minimo 8 characteres'
            }
          }}
          render={({ field }) => (
            <Field
              autoComplete="new-password"
              icon={
                <IconButton onClick={handlerShowPassword}>
                  {showPassword ? <Eye /> : <EyeOff />}
                </IconButton>
              }
              width="100%"
              type={showPassword ? 'text' : 'password'}
              placeholder="contraseña"
              {...field}
            />
          )}
        />
      </Box>
      <Box style={{ margin: '20px 0px' }}>
        <Button isLoading={isLoading} type="submit" width="100%">
          Registrarme
        </Button>
      </Box>
      <Box
        style={{
          margin: '20px 0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography style={{ margin: '0px 10px' }} color="textSecondary" variant="body1">
          Ya tienes cuenta ?
        </Typography>
        <LinkFormat to="/">Inicia sesion</LinkFormat>
      </Box>
    </form>
  );
};

import { Grid, IconButton } from '@mui/material';
import { CreditCard, Shopping, Logout } from 'mdi-material-ui';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const ImgStyled = styled('img')(({ theme }) => ({
  width: 40,
  height: 40,
  marginRight: theme.spacing(6.25),
  borderRadius: '50%',
  border: `2px solid ${theme.palette.primary.main}`
}));

const Active = styled('div')(({ theme }) => ({
  width: '10px',
  height: '10px',
  background: theme.palette.primary.main,
  borderRadius: '50%',
  position: 'absolute',
  left: '10px',
  top: '13px'
}));

const ShoppingCard = styled(IconButton)(({ theme }) => ({
  position: 'relative'
}));

export const UserActions = ({ pathname }) => {
  const navigate = useNavigate();
  const avatar =
    'https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/2/c/1/9/2c192dc4d06895bda3f2190ff32a04ca.jpg';
  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
      item
      xs={3}
    >
      <IconButton onClick={() => navigate('/balance', { replace: true })} size="large">
        <CreditCard
          style={{
            color: pathname === '/balance' ? 'red' : '#FFF'
          }}
          fontSize="inherit"
        />
      </IconButton>

      <ShoppingCard
        onClick={() => alert('open dialog shoping')}
        style={{ margin: '0px 20px' }}
        size="large"
      >
        <Active></Active>
        <Shopping fontSize="inherit" />
      </ShoppingCard>

      <ImgStyled src={avatar} alt="Profile Pic" />

      <IconButton
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/', { replace: true });
        }}
        size="large"
      >
        <Logout fontSize="inherit" />
      </IconButton>
    </Grid>
  );
};

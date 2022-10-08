import { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import { CreditCard, Shopping, Logout } from 'mdi-material-ui';
import { DialogShopping } from 'src/infrastructure/shared/components/DialogShopping/DialogShopping';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

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
  const [openShopping, setOpenShopping] = useState(false);
  const navigate = useNavigate();
  const handlerDialog = () => {
    setOpenShopping((pre) => !pre);
  };
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

      <ShoppingCard onClick={handlerDialog} style={{ margin: '0px 20px' }} size="large">
        <Active></Active>
        <Shopping fontSize="inherit" />
      </ShoppingCard>

      <IconButton
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/', { replace: true });
        }}
        size="large"
      >
        <Logout fontSize="inherit" />
      </IconButton>
      <DialogShopping open={openShopping} handlerClouse={handlerDialog} />
    </Grid>
  );
};

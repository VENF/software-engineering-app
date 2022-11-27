import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  Grid,
  Typography,
  LinearProgress,
  Box
} from '@mui/material';
import { Manga } from 'src/infrastructure/shared/components/Manga';
import { getShoppingCard, removeToCarManga, buyServices } from 'src/domain/shopping.services';
import { Button } from 'src/infrastructure/shared/components/Button/Button';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(DialogContent)(({ theme }) => ({
  background: theme.palette.background.paper
}));

const calculateTotalToBuy = (products) => {
  let total = 0;
  products.forEach((el) => {
    total += el.price;
  });
  return total;
};

export const DialogShopping = ({ open, handlerClouse }) => {
  const navigate = useNavigate();
  const [shopping, setShopping] = useState({
    isLoading: true,
    data: [],
    total: 0,
    error: false,
    success: false
  });

  const hanlderDeleteManga = (id) => {
    removeToCarManga(id).then((res) => {
      setShopping({
        isLoading: false,
        data: res.updated.products,
        total: calculateTotalToBuy(res.updated.products)
      });
    });
  };

  useEffect(() => {
    getShoppingCard().then((data) => {
      setShopping({
        isLoading: false,
        data: data.products,
        total: calculateTotalToBuy(data.products),
        error: false,
        success: false
      });
    });
  }, []);

  const handlerBuy = () => {
    setShopping(pre => ({
      ...pre,
      isLoading: true
    }))
    const productsIds = shopping.data.map((manga) => manga._id)
    buyServices(productsIds)
    .then(res => {
      if(res.msg === 'Saldo insuficiente') {
        setShopping(pre => ({
          ...pre,
          isLoading: false,
          error: true
        }))
      } else {
        setShopping(({
          isLoading: false,
          data: [],
          total: 0,
          error: false,
          success: true 
        }))
        setTimeout(() => {
          setTimeout(() => {
            navigate(0)
          }, 1000);
        }, 1000);
      }
    })
  }
  return (
    <Dialog fullWidth={true} open={open} onClose={handlerClouse}>
      <StyledDialog>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant="h4">Behold</Typography>
          </Grid>
          <Grid item xs={12}>
            {shopping.isLoading && (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            )}
            {shopping.success && (
              <Box sx={{ width: '100%' }}>
                  <Typography variant="h4">
                      Compra exitosa!
                  </Typography>
              </Box>
            )}
            {!shopping.isLoading && shopping.data.length > 0 && (
              <Box sx={{ width: '100%', margin: '5px 0px' }}>
                {!shopping.isLoading && shopping.error && (
                  <Box sx={{ width: '100%' }}>
                    <Typography color="error" variant="body1">
                      Saldo insuficiente
                    </Typography>
                  </Box>
                )}
                {shopping.data.map((manga, i) => (
                  <Manga
                    key={i}
                    variant="item"
                    onDelete={hanlderDeleteManga}
                    id={manga._id}
                    {...manga}
                  />
                ))}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'centers' }}>
                    <Typography variant="h6">Total a pagar:</Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      style={{ margin: '0px 5px' }}
                    >
                      {shopping.total.toFixed(2)}$
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'centers' }}>
                    <Button isLoading={shopping.isLoading} onClick={handlerBuy}>pagar</Button>
                  </Box>
                </Box>
              </Box>
            )}
            {shopping.data.length < 1 && !shopping.success && (
              <Box sx={{ width: '100%' }}>
                <Typography variant="h6">Aun no tienes mangas!</Typography>
                <Typography variant="body2">
                  Agrega Mangas a tu carrito de compra y disfruta de tu lectura
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </StyledDialog>
    </Dialog>
  );
};

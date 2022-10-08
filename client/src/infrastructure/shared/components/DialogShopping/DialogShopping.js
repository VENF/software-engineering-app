import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Grid,
  Typography,
  LinearProgress,
  Box
} from '@mui/material';
import { Manga } from 'src/infrastructure/shared/components/Manga';
import { Button } from 'src/infrastructure/shared/components/Button/Button';
import { getShoppingCard } from 'src/domain/shopping.services';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(DialogContent)(({ theme }) => ({
  background: theme.palette.background.paper
}));

export const DialogShopping = ({ open, handlerClouse }) => {
  const [shopping, setShopping] = useState({
    isLoading: true
  });

  useEffect(() => {
    getShoppingCard().then((data) => {
      setShopping({
        isLoading: false,
        data: data.products
      });
    });
  }, []);

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
            {shopping.data.length > 0 && (
              <Box sx={{ width: '100%' }}>
                {shopping.data.map((manga, i) => (
                  <Manga key={i} variant="item" />
                ))}
              </Box>
            )}
            {shopping.data.length < 1 && (
              <Box sx={{ width: '100%' }}>
                <Typography variant="h6">Aun no tienes mangas!</Typography>
                <Typography variant="body2">Agrega Mangas a tu carrito de compra y disfruta de tu lectura</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </StyledDialog>
    </Dialog>
  );
};

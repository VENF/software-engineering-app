import { Box, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Main = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'grid',
  placeItems: 'center'
}));

export const CardForm = styled(Card)(({ theme }) => ({
  width: '450px'
}));

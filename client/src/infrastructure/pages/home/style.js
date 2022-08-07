import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PopularWrapper = styled(Box)(({ theme }) => ({
  width: '1200px',
  overflowX: 'scroll',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

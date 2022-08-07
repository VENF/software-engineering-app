import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Wrapper = styled(Box)(({ theme, width, invert }) => ({
  border: `2px solid ${
    invert ? theme.palette.background.paper : theme.palette.background.default
  }`,
  display: 'flex',
  width: width,
  borderRadius: '20px',
  padding: '2px',
  transition: "all ease .3s",
  '&:focus-within': {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  position: "relative"
}));

export const Container = styled(Box)(({ theme, invert }) => ({
  display: 'flex',
  background: invert ? theme.palette.background.paper : theme.palette.background.default,
  borderRadius: '15px',
}));


export const Input = styled('input')(({ theme, invert }) => ({
  width: '100%',
  height: '50px',
  borderRadius: '20px',
  border: 'none',
  outline: 'none',
  padding: '0px 15px',
  background: 'transparent',
  color: theme.palette.text.primary,
}));

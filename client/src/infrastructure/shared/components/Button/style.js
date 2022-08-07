import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';

export const Filter = styled('div')(({ theme, disabled }) => ({
  width: '90%',
  height: '10px',
  position: 'relative',
  top: '-5px',
  borderRadius: '10px',
  background: theme.palette.customColors.primaryGradient,
  filter: 'blur(5px)',
  display: disabled ? 'none' : 'initial'
}));

export const Wrapper = styled(Box)(({ width }) => ({
  width: width,
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  transition: 'all ease 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)'
  }
}));

export const Base = styled(LoadingButton)(({ theme, disabled }) => ({
  background: disabled
    ? 'transparent !important'
    : theme.palette.customColors.primaryGradient,
  zIndex: 100,
  borderRadius: "10px"
}));

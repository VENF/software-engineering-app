import { Grid, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserActions } from './UserActions'

import { styled } from '@mui/material/styles';

const Main = styled(Grid)(({ theme }) => ({
  height: '100%',
  borderBottom: `1px solid #47495A`,
  background: theme.palette.background.paper,
  padding: '0rem 2rem',
  display: "flex",
  justifyContent: "space-between"
}));

export const Navbar = ({ pathname }) => {
  const navigate = useNavigate();
  return (
    <Main container spacing={0}>
      <Grid
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
        item
        xs={3}
      >
        <Typography 
          style={{
            cursor: "pointer"
          }}
          onClick={() => navigate('/home', { replace: true })} 
          sx={{ fontWeight: 600 }} 
          color="primary" 
          variant="h5"
        >
          BEHOLD
        </Typography>
      </Grid>
      <UserActions pathname={pathname} />
    </Main>
  );
};

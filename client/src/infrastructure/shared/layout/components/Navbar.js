import { Grid, Typography} from '@mui/material';

import { Links } from './Links'
import { UserActions } from './UserActions'

import { styled } from '@mui/material/styles';

const Main = styled(Grid)(({ theme }) => ({
  height: '100%',
  borderBottom: `1px solid #47495A`,
  background: theme.palette.background.paper,
  padding: '0rem 2rem'
}));

export const Navbar = ({ pathname }) => {
  return (
    <Main container spacing={0}>
      <Grid
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
        item
        xs={3}
      >
        <Typography sx={{ fontWeight: 600 }} color="primary" variant="h5">
          BEHOLD
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Links pathname={pathname} />
      </Grid>
      <UserActions pathname={pathname} />
    </Main>
  );
};

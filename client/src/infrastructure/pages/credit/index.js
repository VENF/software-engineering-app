import {
  Grid,
  Box,
  Skeleton
} from '@mui/material';
// hooks
import { useAuth } from 'src/infrastructure/shared/hooks/useAuth';

const Loading = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Box
          sx={{
            height: '20vh',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Skeleton
            variant="rect"
            width={700}
            height={30}
            style={{ borderRadius: '5px', margin: '5px 0px' }}
          />
          <Skeleton
            variant="rect"
            width={600}
            height={30}
            style={{ borderRadius: '5px', margin: '5px 0px' }}
          />
          <Skeleton
            variant="rect"
            width={400}
            height={30}
            style={{ borderRadius: '5px', margin: '5px 0px' }}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Skeleton
            variant="rect"
            width={'40%'}
            height={30}
            style={{ borderRadius: '5px', margin: '0px 7px' }}
          />
          <Skeleton
            variant="rect"
            width={'20%'}
            height={30}
            style={{ borderRadius: '5px' }}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(350px, 1fr))',
            gap: '1rem',
            margin: '2rem 0rem'
          }}
        >
          <Skeleton
            variant="rect"
            width={350}
            height={500}
            style={{ borderRadius: '5px', margin: '0px 7px' }}
          />
          <Skeleton
            variant="rect"
            width={350}
            height={500}
            style={{ borderRadius: '5px', margin: '0px 7px' }}
          />
          <Skeleton
            variant="rect"
            width={350}
            height={500}
            style={{ borderRadius: '5px', margin: '0px 7px' }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export const Credit = () => {
  const { auth } = useAuth();
  if (auth === 'loading') {
    return <Loading />;
  } else {
    return <div>balance</div>;
  }
};

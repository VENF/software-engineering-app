import { Fragment } from 'react';
import { Box, Typography } from '@mui/material';

export const AuthHeader = ({ title, subtitle, text }) => {
  return (
    <Fragment>
      <Box sx={{ marginBottom: '1rem' }}>
        <Typography align="center" sx={{ fontWeight: 600 }} variant="h4">
          {title}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 600 }} variant="h5">
          {subtitle}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {text}
        </Typography>
      </Box>
    </Fragment>
  );
};

import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const LinkNav = styled(Link)(({ theme, path }) => ({
  color: path === 'true' ? theme.palette.primary.main : theme.palette.text.secondary,
  textDecoration: 'none',
  textTransform: 'uppercase',
  fontWeight: 600,
  fontSize: '1.4rem',
  margin: '0px 10px',
  transition: 'all ease .3s',
  ':hover': {
    color: theme.palette.primary.main
  }
}));

const links = [
  {
    name: 'Home',
    to: '/home'
  },
  {
    name: 'Mangas',
    to: '/mangas'
  }
];

export const Links = ({ pathname }) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {links.map((item, i) => (
        <LinkNav path={(pathname === item.to).toString()} key={i} to={item.to}>
          {item.name}
        </LinkNav>
      ))}
    </Box>
  );
};

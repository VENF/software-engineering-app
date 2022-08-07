import { Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Content } from './components/Content';

const Main = styled(Paper)(({ theme, navbaroff }) => ({
  height: '100vh',
  borderRadius: '0px',
  background: theme.palette.background.default,
  display: 'grid',
  gridTemplateRows: navbaroff === 'true' ? '1fr' : '80px 1fr'
}));

export const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const paths = {
    '/': true,
    '/signup': true,
    '/home': false,
    '/mangas': false,
    '/balance': false,
    '/manga/': false
  };
  const regManga = /manga|manga/;
  const conditionNavbarOff = regManga.test(pathname) ? false : paths[pathname];
  const navbaroff = conditionNavbarOff === undefined ? true : conditionNavbarOff;
  return (
    <Main navbaroff={navbaroff.toString()} elevation={0}>
      {!navbaroff && (
        <Box>
          <Navbar pathname={pathname} />
        </Box>
      )}
      <Content navbaroff={navbaroff}>{children}</Content>
    </Main>
  );
};

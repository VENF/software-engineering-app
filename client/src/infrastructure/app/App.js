import { Routes, Route } from 'react-router-dom';
import { theme } from 'src/infrastructure/global/theme';
// pages
import { Login } from 'src/infrastructure/pages/login';
import { Signup } from 'src/infrastructure/pages/signup';
import { Home } from 'src/infrastructure/pages/home';
import { Products } from 'src/infrastructure/pages/products';
import { Manga } from 'src/infrastructure/pages/products/manga';
import { Balance } from 'src/infrastructure/pages/balance';
import { PageNotFound } from 'src/infrastructure/pages/pageNotFound';
// layout
import { Layout } from 'src/infrastructure/shared/layout/Layout';
// theme
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mangas" element={<Products />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/manga/:name" element={<Manga />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;


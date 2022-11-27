import { Routes, Route } from 'react-router-dom';
import { theme } from 'src/infrastructure/global/theme';
// pages
import { Login } from 'src/infrastructure/pages/login';
import { Signup } from 'src/infrastructure/pages/signup';
import { Products } from 'src/infrastructure/pages/products';
import { PageNotFound } from 'src/infrastructure/pages/pageNotFound';
import { Credit } from "src/infrastructure/pages/credit"
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
          <Route path="/home" element={<Products />} />
          <Route path="/balance" element={<Credit/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;


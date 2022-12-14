import { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Skeleton
} from '@mui/material';
import { BookSearch } from 'mdi-material-ui';
import { Field } from 'src/infrastructure/shared/components/Field/Field';

// hooks
import { useAuth } from 'src/infrastructure/shared/hooks/useAuth';
import { useManga } from './hooks/useManga';
import { useDebouncer } from './hooks/useDebouncer';
import { Manga } from 'src/infrastructure/shared/components/Manga';

const CategorySelect = ({ category, handleChange }) => {
  const options = [
    'accion',
    'demonios',
    'terror',
    'shounen',
    'aventura',
    'fantasia',
    'misterio',
    'terror',
    'psicologico',
    'ciencia-ficcion'
  ];

  return (
    <Box sx={{ width: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">Filtra por categorias</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={category}
          label="Filtra por categorias"
          onChange={handleChange}
          sx={{ borderRadius: '20px' }}
        >
          {options.map((op) => (
            <MenuItem key={op} value={op}>
              {op}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

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

export const Content = () => {
  const [value, setValue] = useState({
    term: '',
    category: ''
  });
  const searchTerm = useDebouncer(value.term, 500);
  const { mangas } = useManga(searchTerm, value.category);

  const updateSearTerm = (e) =>
    setValue((pre) => ({
      ...pre,
      term: e.target.value
    }));

  const updateSearCategory = (e) =>
    setValue((pre) => ({
      ...pre,
      category: e.target.value
    }));
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
          <Typography align="center" variant="h4">
            El mejor catalogo de Mangas de la web
          </Typography>
          <Typography
            align="center"
            sx={{ width: '45%', margin: '.5rem 0rem' }}
            variant="body2"
            color="textSecondary"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad
          </Typography>
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
          <Box style={{ margin: '0rem 1rem' }}>
            <Field
              iconLeft={true}
              icon={<BookSearch />}
              placeholder="Busca tus mangas preferidos"
              invert={true}
              width="600px"
              onChange={updateSearTerm}
            />
          </Box>
          <Box>
            <CategorySelect category={value.category} handleChange={updateSearCategory} />
          </Box>
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
          {mangas.map((manga) => (
            <Manga
              key={manga._id}
              title={manga.title}
              img={manga.img}
              rating={manga.rating}
              sinopsis={manga.sinopsis}
              votes={manga.votes}
              id={manga._id}
              price={manga.price}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export const Products = () => {
  const { auth } = useAuth();
  if (auth === 'loading') {
    return <Loading />;
  } else {
    return <Content />;
  }
};

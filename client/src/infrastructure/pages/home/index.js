import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography, Grid, Box } from '@mui/material';
import { getDashobardInfo } from 'src/domain/home.services';
import { useAuth } from 'src/infrastructure/shared/hooks/useAuth';
import { Manga } from 'src/infrastructure/shared/components/Manga';
import { PopularWrapper } from "./style"

const Loading = () => {
  return <div>loading</div>;
};

const Content = () => {
  const [data, setData] = useState({
    popular: [],
    recomended: []
  });
  useEffect(() => {
    getDashobardInfo().then((data) => {
      setData({
        ...data
      });
    });
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card
          style={{
            padding: '2rem',
            width: '70%',
            borderRadius: '10px'
          }}
          elevation={0}
        >
          <CardHeader
            title={
              <Typography variant="h5">
                Un gusto tenert por aqui <span style={{ color: '#F2031D' }}>John!</span>{' '}
                🎉
              </Typography>
            }
          />
          <CardContent>
            <Typography variant="body1" color="textSecondary">
              Lorem ipsum dolor sit amet 😎 consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <PopularWrapper>
          {data.popular.map((manga) => (
            <Box
              sx={{
                display: "inline-block",
                marginRight: "1rem"
              }}
              key={manga._id}
            >
              <Manga
                title={manga.title}
                img={manga.img}
                price={manga.price}
                sinopsis={manga.sinopsis}
                id={manga._id}
                variant="popular"
              />
            </Box>
          ))}
        </PopularWrapper>
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
          {data.recomended.map((manga) => (
            <Manga
              key={manga._id}
              title={manga.title}
              img={manga.img}
              price={manga.price}
              sinopsis={manga.sinopsis}
              id={manga._id}
              votes={manga.votes}
              rating={manga.rating}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export const Home = () => {
  const { auth } = useAuth();
  if (auth === 'loading') {
    return <Loading />;
  } else {
    return <Content />;
  }
};

import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Typography,
  Rating,
  Box,
  CardActionArea,
  IconButton,
  Dialog,
  DialogContent
} from '@mui/material';
import TextButton from '@mui/material/Button';
import { Delete } from 'mdi-material-ui';
import { Button } from 'src/infrastructure/shared/components/Button/Button';
import { addToCarManga } from 'src/domain/shopping.services';

const OperationResponse = ({ open, handlerClouse, msg }) => {
  return (
    <Dialog open={open} onClose={handlerClouse}>
      <DialogContent>
        <Typography variant="h6">{msg}</Typography>
      </DialogContent>
    </Dialog>
  );
};

const formatSinopsis = (sinopsis, short = 40) =>
  sinopsis.length > 40
    ? sinopsis.slice(0, short).toString().replace(/,/g, ' ')
    : sinopsis;

const sinopsisDefault = `Yuuji Itadori es un 
estudiante de instituto con unas habilidades 
físicas excepcionales. Todos los días, como rutina,
va al hospital a visitar a su abuelo enfermo y 
decide apuntarse al club de ocultismo del 
instituto para no dar un palo al agua… Sin
embargo, un buen día el sello del talismán 
que se hallaba escondido en su instituto se 
rompe, y comienzan a aparecer unos monstruos. 
Ante este giro de los acontecimientos, 
Itadori decide adentrarse en el instituto 
para salvar a sus compañeros. 
¿Qué le deparará el destino?`;

const MangaCard = ({
  title,
  img,
  rating,
  votes,
  sinopsis,
  id,
  price,
  handlerAddMangaToBuy
}) => {
  const navigate = useNavigate();
  return (
    <Card elevation={0} sx={{ borderRadius: '10px' }}>
      <CardMedia sx={{ height: '14.5625rem' }} image={img} />
      <CardHeader
        title={title}
        titleTypographyProps={{
          sx: {
            lineHeight: '1rem !important',
            letterSpacing: '0.15px !important',
            fontWeight: 600,
            fontSize: '1.2rem !important',
            color: '#E7E3FC !important'
          }
        }}
      />
      <CardContent>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Rating
            name="read-only"
            sx={{ color: '#F2031D' }}
            precision={0.5}
            color="primary"
            value={rating}
            readOnly
          />
          <Typography variant="body2" color="textSecondary">
            {rating} Stars ({votes})
          </Typography>
        </Box>
        <Box sx={{ margin: '10px 0px' }}>
          <Typography variant="body2" color="textSecondary">
            {formatSinopsis(sinopsis.split(' '))}...
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <TextButton onClick={() => navigate(`/manga/${id}`, { replace: true })}>
            Ver Mas
          </TextButton>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '7px'
            }}
          >
            <Typography variant="body2">Precio</Typography>
            <Typography sx={{ marginLeft: '5px' }} variant="body2" color="primary">
              {price} $
            </Typography>
          </Box>
        </Box>
        <Box sx={{ margin: '10px 0px' }}>
          <Button onClick={() => handlerAddMangaToBuy(id)} width="200px">
            Agregar al carrito
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const MangaPopularCard = ({ title, img, sinopsis, id, price, handlerAddMangaToBuy }) => {
  return (
    <Card
      elevation={0}
      sx={{ display: 'flex', width: '485px', borderRadius: '10px', height: '190px' }}
    >
      <CardMedia component="img" sx={{ width: 180 }} image={img} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Box sx={{ margin: '5px 0px' }}>
            <Typography variant="body2" color="textSecondary">
              {formatSinopsis(sinopsis.split(' '), 14)}...
            </Typography>
          </Box>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography variant="body2">Precio</Typography>
            <Typography sx={{ marginLeft: '5px' }} variant="body2" color="primary">
              {price} $
            </Typography>
          </Box>
          <Box sx={{ margin: '5px 0px' }}>
            <Button onClick={() => handlerAddMangaToBuy(id)} width="200px">
              Agregar al carrito
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

const MangaBuyedCard = ({ title, img, sinopsis, id, price, handlerAddMangaToBuy }) => {
  // const navigate = useNavigate();
  return (
    <CardActionArea sx={{ width: '350px', borderRadius: '10px' }}>
      <Card elevation={0} sx={{ borderRadius: '10px' }}>
        <CardMedia sx={{ height: '14.5625rem' }} image={img} />
        <CardHeader
          title={title}
          titleTypographyProps={{
            sx: {
              lineHeight: '1rem !important',
              letterSpacing: '0.15px !important',
              fontWeight: 600,
              fontSize: '1.2rem !important',
              color: '#E7E3FC !important'
            }
          }}
        />
        <CardContent>
          <Box sx={{ margin: '10px 0px' }}>
            <Typography variant="body2" color="textSecondary">
              {formatSinopsis(sinopsis.split(' '))}...
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

const MangaItem = ({ title, img, id, price, onDelete }) => {
  return (
    <Card
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "10px 0px" }}
      elevation={0}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100px', height: '100px' }}>
          <CardMedia sx={{ height: '100%', borderRadius: '10px' }} image={img} />
        </Box>
        <Box sx={{ marginLeft: '2rem' }}>
          <Typography variant="h6"> {title} </Typography>
          <Typography variant="h6">
            {' '}
            Monto: <span style={{ color: 'red' }}> {price}$ </span>{' '}
          </Typography>
        </Box>
      </Box>
      <Box>
        <IconButton onClick={() => onDelete(id)} color="primary" size="large" variant="contained">
          <Delete />
        </IconButton>
      </Box>
    </Card>
  );
};

export const Manga = ({
  title = 'Jujutsu Kaisen',
  img = 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/5QLNYDEY3JH5HNTTA2WDHQ47EA.png',
  rating = 4,
  votes = '12k',
  sinopsis = sinopsisDefault,
  id = 'zhuwej1234',
  price = '19.98',
  variant = 'default',
  onDelete
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const handlerClouse = () => setOpen(false);

  const handlerAddMangaToBuy = async (id) => {
    const response = await addToCarManga(id);
    if (response) {
      setMsg(response.msg);
      setOpen(true);
      navigate(0)
    }
  };

  const mode = {
    default: (
      <Fragment>
        <MangaCard
          title={title}
          img={img}
          rating={rating}
          votes={votes}
          sinopsis={sinopsis}
          id={id}
          price={price}
          handlerAddMangaToBuy={handlerAddMangaToBuy}
        />
        <OperationResponse open={open} handlerClouse={handlerClouse} msg={msg} />
      </Fragment>
    ),
    popular: (
      <Fragment>
        <MangaPopularCard
          title={title}
          img={img}
          rating={rating}
          votes={votes}
          sinopsis={sinopsis}
          id={id}
          price={price}
          handlerAddMangaToBuy={handlerAddMangaToBuy}
        />
        <OperationResponse open={open} handlerClouse={handlerClouse} msg={msg} />
      </Fragment>
    ),
    buyed: (
      <Fragment>
        <MangaBuyedCard
          title={title}
          img={img}
          rating={rating}
          votes={votes}
          sinopsis={sinopsis}
          id={id}
          price={price}
          handlerAddMangaToBuy={handlerAddMangaToBuy}
        />
      </Fragment>
    ),
    item: (
      <MangaItem
        title={title}
        img={img}
        rating={rating}
        votes={votes}
        sinopsis={sinopsis}
        id={id}
        price={price}
        onDelete={onDelete}
      />
    )
  };
  return mode[variant] || mode.default;
};

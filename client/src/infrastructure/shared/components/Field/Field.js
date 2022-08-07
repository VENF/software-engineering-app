import { Wrapper, Input, Container } from './style';
import { Box } from '@mui/material';

const InputIcon = ({ icon }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        padding: '0px 5px'
      }}
    >
      {icon}
    </Box>
  );
};

export const Field = (props) => {
  return (
    <Wrapper invert={props.invert} width={props.width || '200px'}>
      <Container width={props.width || '200px'} invert={props.invert}>
        {props.iconLeft && props.icon && <InputIcon icon={props.icon} />}
        <Input {...props} />
        {!props.iconLeft && props.icon && <InputIcon icon={props.icon} />}
      </Container>
    </Wrapper>
  );
};

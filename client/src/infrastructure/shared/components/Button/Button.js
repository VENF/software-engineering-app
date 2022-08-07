import { Wrapper, Base, Filter } from './style';

export const Button = ({
  variant = 'contained',
  children,
  width = '120px',
  isLoading = false,
  ...props
}) => {
  return (
    <Wrapper disabled={isLoading} width={width}>
      <Base
        {...props}
        fullWidth
        disableElevation
        variant={isLoading ? 'outlined' : variant}
        loading={isLoading}
        loadingPosition="start"
        disabled={isLoading}
      >
        {children}
      </Base>
      <Filter disabled={isLoading} />
    </Wrapper>
  );
};

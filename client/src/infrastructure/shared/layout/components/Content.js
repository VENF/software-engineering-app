import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { ArrowRightCircle, ArrowLeftCircle } from 'mdi-material-ui';
import { CreditCard } from "../../components/CreditCard/index"
const Main = styled(Box)(({ theme, openPanel, navbaroff }) => ({
  display: 'grid',
  gridTemplateColumns: navbaroff ? '1fr' : openPanel ? '1fr .2fr' : '1fr 0fr'
}));

const CreditContainer = styled(Box)(({ theme }) => ({
  padding: '1rem',
  borderLeft: '1px solid #47495A',
  background: theme.palette.background.paper
}));

const Wrapper = styled(Box)(({ theme, openPanel }) => ({
  display: openPanel ? 'initial' : 'none'
}));

const PageContainer = styled(Box)(({ theme, navbaroff }) => ({
  padding: '2rem',
  overflowY: 'scroll',
  height: navbaroff ? "90vh": "79vh",
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

export const Content = ({ children, navbaroff }) => {
  const [openPanel, setOpenPanel] = useState(false);
  return (
    <Main navbaroff={navbaroff} openPanel={openPanel}>
      <PageContainer navbaroff={navbaroff}>
        {children}
      </PageContainer>
      {!navbaroff && (
        <CreditContainer>
          <Box>
            <IconButton onClick={() => setOpenPanel((pre) => !pre)}>
              {openPanel ? <ArrowRightCircle /> : <ArrowLeftCircle />}
            </IconButton>
          </Box>
          <Wrapper openPanel={openPanel}>
            <CreditCard/>
          </Wrapper>
        </CreditContainer>
      )}
    </Main>
  );
};

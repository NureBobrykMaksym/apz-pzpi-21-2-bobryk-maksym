import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export function RootLayout() {
  return (
    <>
      <Header />
        <Container maxW="1500px" padding={'24px'} marginBlock="auto" flexGrow={1}>
          <Outlet />
        </Container>
        
    </>
  );
}

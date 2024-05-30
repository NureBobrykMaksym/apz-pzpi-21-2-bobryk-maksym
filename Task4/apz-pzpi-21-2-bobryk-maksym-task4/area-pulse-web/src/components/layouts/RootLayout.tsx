import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import withAuth from '../hocs/withAuth';

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

export const RootLayoutWithAuth = withAuth(RootLayout);

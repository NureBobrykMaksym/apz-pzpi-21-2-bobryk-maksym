import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { RootLayout } from './components/layouts/RootLayout';
import { LogInPage } from './routes/LoginPage';
import { MainPageWithAuth } from './routes/MainPage';
import { SignUpPage } from './routes/SignUpPage';
import { LocationPage } from './routes/LocationPage';
import { LocationDetailsPage } from './routes/LocationDetailsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<RootLayout />}
              errorElement={<div>404</div>}
            >
              <Route index element={<MainPageWithAuth />} />
              <Route path="sign-up" element={<SignUpPage />} />
              <Route path="login" element={<LogInPage />} />
              <Route path="locations">
                <Route index element={<LocationPage />} />
                <Route path=":locationId" element={<LocationDetailsPage />} />
              </Route>
              <Route path="*" element={<div>404</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;

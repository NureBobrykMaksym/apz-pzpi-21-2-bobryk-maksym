import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {
  RootLayout,
  RootLayoutWithAuth,
} from './components/layouts/RootLayout';
import { LocationDetailsPage } from './routes/LocationDetailsPage';
import { LocationPage } from './routes/LocationPage';
import { LogInPage } from './routes/LoginPage';
import { MainPage } from './routes/MainPage';
import { SectorDetailsPage } from './routes/SectorDetailsPage';
import { SensorDetailsPage } from './routes/SensorDetailsPage';
import { SignUpPage } from './routes/SignUpPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<RootLayoutWithAuth />}
              errorElement={<div>404</div>}
            >
              <Route index element={<MainPage />} />
              <Route path="locations">
                <Route index element={<LocationPage />} />
                <Route path=":locationId" element={<LocationDetailsPage />} />
              </Route>
              <Route path="sectors">
                <Route path=":sectorId" element={<SectorDetailsPage />} />
              </Route>

              <Route path="sensors">
                <Route path=":sensorId" element={<SensorDetailsPage />} />
              </Route>
              <Route path="*" element={<div>404</div>} />
            </Route>

            <Route path="/auth" element={<RootLayout />}>
              <Route path="sign-up" element={<SignUpPage />} />
              <Route path="login" element={<LogInPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { RootLayout } from './components/layouts/RootLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<RootLayout />}
            errorElement={<div>404</div>}
          >
            <Route index element={<div>homepage</div>} />
            {/* <Route path="sign-up" element={<SignUp />} /> */}
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="*" element={<div>404</div>} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;

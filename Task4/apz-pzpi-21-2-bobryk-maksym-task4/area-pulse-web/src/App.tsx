import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { RootLayout } from './components/layouts/RootLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />} errorElement={<div>404</div>}>
          <Route index element={<div>homepage</div>} />
          {/* <Route path="sign-up" element={<SignUp />} /> */}
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from './ownerProfile/contextAPi/UserContext.jsx'; // Adjust the import path as necessary
import './index.css';
import { ToastContainer } from 'react-toastify'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider> {/* Wrap App with UserProvider */}
      <ToastContainer /> 
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);

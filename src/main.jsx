import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from './ownerProfile/contextAPi/UserContext.jsx'; // Adjust the import path as necessary
import './index.css';
import { ToastContainer } from 'react-toastify'
import { SearchProvider } from './Context/Searchcontext.jsx';
import { PrimeReactProvider } from 'primereact/api';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeflex/primeflex.css";




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider> {/* Wrap App with UserProvider */}
        <SearchProvider>
          <PrimeReactProvider>
            <App />
            <ToastContainer />
          </PrimeReactProvider>
        </SearchProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);

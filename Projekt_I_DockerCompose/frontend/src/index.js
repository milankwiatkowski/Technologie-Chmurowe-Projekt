import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { keycloak, keycloakInitOptions } from './keycloak';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakInitOptions}>
      <App />
    </ReactKeycloakProvider>
  </BrowserRouter>
);

reportWebVitals();

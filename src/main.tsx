import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Inicialização da aplicação React 19 no elemento root
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

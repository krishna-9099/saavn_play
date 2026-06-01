import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { registerSW } from './utils/registerSW';
import './index.css';

registerSW();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename="/saavn_play">
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

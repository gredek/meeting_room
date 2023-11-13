import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Create a root for React to render the application into the 'root' DOM element.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main application component (App) into the root element.
root.render(
  <App />
);
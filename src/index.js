import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './index.scss';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Using separate file to define the routes:
// import { RouterProvider } from 'react-router-dom';
// import AppRouter from './routes/app-router';
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={AppRouter} />
//   </React.StrictMode>
// );

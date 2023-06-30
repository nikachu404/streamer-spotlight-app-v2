import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App.tsx';
import { Home, StreamerDetailsPage } from './pages';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path=":streamerId" element={<StreamerDetailsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

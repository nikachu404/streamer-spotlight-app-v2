import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import './app.scss';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className="app">
        <Outlet />
      </div>
    </>
  );
};

export default App;

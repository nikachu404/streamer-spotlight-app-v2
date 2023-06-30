import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import './app.scss';

export const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
        icon={false}
        progressStyle={{ background: '#6a5acd' }}
      />

      <Header />
      <div className="app">
        <Outlet />
      </div>
    </>
  );
};

export default App;

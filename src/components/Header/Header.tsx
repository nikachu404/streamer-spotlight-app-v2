import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <i className="fa-solid fa-user-astronaut header__icon"></i>
        <h1 className="header__title">Streamer Spotlight App</h1>
      </Link>
    </header>
  );
};

export default Header;

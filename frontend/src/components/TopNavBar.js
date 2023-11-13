import React from 'react';
import { Link } from 'react-router-dom';

const TopNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Meeting Room
        </Link>
      </div>
    </nav>
  );
};

export default TopNavBar;

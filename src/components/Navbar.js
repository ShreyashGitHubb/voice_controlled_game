import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar({ title, darkMode, toggleDarkMode }) {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#f0db4f', width: '100%', height: '60px', position: 'fixed', top: 0 }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {title || "Voice Control Game"}
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/Discription">Description</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/AboutUs">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired
};

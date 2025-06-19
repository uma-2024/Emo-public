import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/images/logo.png'
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar-container">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
        {/* <span>XIK</span> */}
      </div>

      <nav className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/pre-sale">Pre-Sale</Link>
        <Link to="/tokenomics">Tokenomics</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>

      <button className="wallet-btn">Connect Wallet</button>

      <div
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Navbar;

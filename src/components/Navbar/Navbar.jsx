import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="navbar-container">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <NavLink to="/"   className="nav-item" end>Home</NavLink>
        <NavLink to="/pre-sale" className="nav-item">Pre-Sale</NavLink>
        <NavLink to="/tokenomics" className="nav-item">Tokenomics</NavLink>
        <NavLink to="/about" className="nav-item">About Us</NavLink>
        <NavLink to="/contact" className="nav-item">Contact Us</NavLink>
      </nav>

      <div className="bell-button">
        <NavLink to="/announcement" className="nav-item">
          <FaBell color="white" size={20} />
        </NavLink>
        <button className="wallet-btn">Connect Wallet</button>
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

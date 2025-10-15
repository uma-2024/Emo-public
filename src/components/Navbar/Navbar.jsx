// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";
import { FaBell } from "react-icons/fa";
import { WalletContext } from "../WalletConnect/WalletConnect"; // <-- import context
import ConnectButton from "../ConnectButton/ConnectButton";

function shorten(addr) {
  return addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "";
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const { address, connectWallet, disconnectWallet } = useContext(WalletContext);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleWalletClick = async () => {
    if (address) {
      disconnectWallet();
    } else {
      await connectWallet();
    }
  };

  return (
    <header className="navbar-container">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <div className="nav-inner">
        <NavLink to="/" className="nav-item" end>Home</NavLink>
        <NavLink to="/pre-sale" className="nav-item">Pre-Sale</NavLink>
        <NavLink to="/tokenomics" className="nav-item">Tokenomics</NavLink>
        <NavLink to="/referral" className="nav-item">Referral</NavLink>
        <NavLink to="/about" className="nav-item">About Us</NavLink>
        <NavLink to="/contact" className="nav-item">Contact Us</NavLink>
        </div>
      </nav>

      <div className="bell-button">
        <NavLink to="/announcement" className="nav-item" aria-label="Announcements">
          <FaBell color="white" size={20} />
        </NavLink>

        {/* Desktop Wallet Button */}
        <ConnectButton
          className="wallet-btn desktop-wallet-btn"
          labelDisconnected="Connect Wallet"
          labelConnected={(addr) => ` ${addr?.slice(0,6)}…${addr?.slice(-4)}`}
        />

        {/* Mobile Wallet Button */}
        <ConnectButton
          className="wallet-btn mobile-wallet-btn"
          labelDisconnected="Connect"
          labelConnected={(addr) => `${addr?.slice(0,4)}…${addr?.slice(-2)}`}
        />

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          role="button"
          tabIndex={0}
        >
          <span></span><span></span><span></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

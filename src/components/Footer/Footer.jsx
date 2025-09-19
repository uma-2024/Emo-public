import React from "react";
import "./Footer.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-logo">
          <img src={logo} alt="XIK Logo" />
          <p className="footer-tagline">
            Believe In The Power Of{" "}
            <span className="decentralized">Decentralized</span> Collaboration.
            <br />
            We <span className="grow">Grow</span> Together And{" "}
            <span className="beyond">Beyond</span> The Next Level.
          </p>
        </div>
      </div>

      <div className="footer-links">
        <div className="footer-column">
          <h4 className="footer-container-title">COMPANY</h4>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/tokenomics">Tokenomics</Link>
            </li>
            <li>
              <Link to="/pre-sale">Pre-Sale</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-container-title">SUPPORT</h4>
          <ul>
            <li>Getting Started</li>
            <li>Help Center</li>
            <li>Server Status</li>
            <li>Report a Bug</li>
            <li>Chat Support</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-container-title">PRODUCTS</h4>
          <ul>
            <li>Features</li>
            <li>Review</li>
            <li>Update</li>
          </ul>
        </div>
        <div className="footer-column newsletter">
          <h4 className="footer-container-title">
            SUBSCRIBE TO OUR NEWSLETTER
          </h4>
          <p>
            Subscribe today to receive the latest updates, exclusive content,
            and valuable insights delivered right to your inbox.
          </p>
          <div className="subscribe-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2025 XIK | All Rights Reserved</p>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/profile.php?id=61576894374414"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            href="https://x.com/XIKchain"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            href="https://www.instagram.com/xikchain/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

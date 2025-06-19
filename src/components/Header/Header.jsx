import React from "react";
import "./Header.css";
import video from '../../assets/bg.mp4'
const Header = () => {
  return (
    <div className="header">
      <video
        className="header-video"
        autoPlay
        muted
        loop
        playsInline
        src={video}
        type="video/mp4"
      />

      <div className="header-content">
        <h1 className="header-title">
          The First Self-Evolving <br />
          <span>Blockchain - Powered by AI</span>
        </h1>
        <p className="header-subtitle">
          An intelligent, autonomous network that upgrades, scales, and secures
          itself — while providing contributors with access to network
          functionality on every block.
        </p>
        <div className="header-buttons">
          <button className="wallet-btn">Join Pre-Sale Now</button>
          <button className="secondary-btn">Whitepaper</button>
        </div>
       
      </div>
    </div>
  );
};

export default Header;

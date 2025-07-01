import React from "react";
import "./PreSaleConnect.css";
import videoBg from "../../assets/bg.mp4";
import metamaskIcon from "../../assets/images/Frame 27111.svg";
// import walletConnectIcon from "../../assets/images/walletconnect.png";
import { FaRocket, FaWallet, FaDollarSign, FaGlobe } from "react-icons/fa";

export default function PreSaleConnect() {
  return (
    <div className="presale-wrapper">
      <video className="video-bg" autoPlay muted loop playsInline>
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="presale-content">
        <div className="sidebar-menu">
          <FaRocket className="menu-icon active" />
          <FaWallet className="menu-icon" />
          <FaDollarSign className="menu-icon" />
          <FaGlobe className="menu-icon" />
        </div>

        <div className="presale-main">
          <h2 className="heading">How to join the pre-sale</h2>
          <h3 className="subheading">Connect Wallet</h3>
          <p className="info">
            Explore how XIK combines AI, mobile mining, and quantum-resistant security to create the world’s first autonomous blockchain economy.
          </p>
      
          <button className="connect-btn">Connect Now</button>
        </div>

        <div 
        // className="wallet-card"
        >
        <img src={metamaskIcon}/>
        </div>
      </div>
    </div>
  );
}

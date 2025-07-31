

import React, { useState } from "react";
import "./PreSaleConnect.css";
import videoBg from "../../assets/bg.mp4";
import metamaskIcon from "../../assets/images/Frame 27111.svg";
import { FaRocket, FaWallet, FaDollarSign, FaGlobe } from "react-icons/fa";

const icons = [
  { Component: FaRocket,    label: "rocket"    },
  { Component: FaWallet,    label: "wallet"    },
  { Component: FaDollarSign,label: "dollar"    },
  { Component: FaGlobe,     label: "globe"     },
];

export default function PreSaleConnect() {
  // track which icon is active (by index)
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="presale-wrapper">
      <video className="video-bg" autoPlay muted loop playsInline>
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="presale-content">
        <div className="sidebar-menu">
          {icons.map(({ Component, label }, idx) => (
            <Component
              key={label}
              className={`menu-icon${idx === activeIdx ? " active" : ""}`}
              onClick={() => setActiveIdx(idx)}
            />
          ))}
        </div>

        <div className="presale-main">
          <h2 className="heading">How to join the pre-sale</h2>
          <h3 className="subheading">
            {icons[activeIdx].label === "rocket"     && "Connect Wallet"}
            {icons[activeIdx].label === "wallet"     && "Select Plan"}
            {icons[activeIdx].label === "dollar"     && "Make Payment"}
            {icons[activeIdx].label === "globe"      && "Confirmation"}
          </h3>
          <p className="info">
            {icons[activeIdx].label === "rocket" && " Explore how XIK combines AI, mobile mining, and quantum-resistant security to create the world’s first autonomous blockchain economy."}
            {icons[activeIdx].label === "wallet" && "Pick the best tier for you mobile mining, and quantum-resistant security to create the world’s first autonomous blockchain economy."}
            {icons[activeIdx].label === "dollar" && "Enter payment details mobile mining, and quantum-resistant security to create the world’s first autonomous blockchain economy."}
            {icons[activeIdx].label === "globe"  && "You’re all set! View on explorer mobile mining, and quantum-resistant security to create the world’s first autonomous blockchain economy."}
          </p>
          <button className="connect-btn">
            {icons[activeIdx].label === "rocket"  && "Connect Now"}
            {icons[activeIdx].label === "wallet"  && "Choose Plan"}
            {icons[activeIdx].label === "dollar"  && "Pay Now"}
            {icons[activeIdx].label === "globe"   && "View Status"}
          </button>
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

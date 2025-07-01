import React from "react";
import "./WhatIsXIK.css";
import xikLogo from "../../assets/images/logo.png"; 
import icon from "../../assets/images/Group 112.svg";
import video from '../../assets/bg.mp4'

const WhatIsXIK = () => {
  return (
    <div className="xik-container">
      <div className="xik-left">
        <div className="xik-card">

          <video
            className="xik-card-video-bg"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="xik-card-content">
            <img src={icon} alt="AI Icon" className="xik-top-icon" />
            <h2 className="xik-title">What is XIK?</h2>
            <p className="xik-desc">
              XIK is a decentralized blockchain ecosystem run by <strong>AI agents</strong>.
            </p>
            <p className="xik-desc">
              It eliminates centralized control through agent-governed consensus,
              deflationary tokenomics, and fully on-chain automation.
            </p>
            <p className="xik-desc">
              <strong>Burn Mechanism:</strong> Up to 0.05% of each transaction is permanently burned
            </p>

            <div className="xik-subsection">
              <p className="xik-subtitle">🔹 Why it matters:</p>
              <ul className="xik-list">
                <li>No centralized validators or core teams</li>
                <li>Agents propose, validate, optimize, and execute smart contracts</li>
                <li>The entire economy is self-sustaining and community-controlled</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="xik-right">
        <img src={xikLogo} alt="XIK Logo" className="xik-logo" />
      </div>
    </div>
  );
};

export default WhatIsXIK;

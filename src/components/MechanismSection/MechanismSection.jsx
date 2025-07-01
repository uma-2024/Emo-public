import React from "react";
import "./MechanismSection.css";
import illustration from "../../assets/images/blockchain.svg"; 
import video from '../../assets/bg.mp4'

const MechanismSection = () => {
  return (
    <div className="mechanism-section-wrapper">
      <video
        className="mechanism-bg-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="mechanism-section-container">
        <div className="mechanism-left">
          <img
            src={illustration}
            alt="Proof of Stake Illustration"
            className="mechanism-illustration"
          />
        </div>

        <div className="mechanism-right">
          <h2 className="mechanism-title">
            XIK uses an agent-based proof-of-stake consensus mechanism.
          </h2>
          <p className="mechanism-subtext">
            Join the movement and be part of the most advanced Web3 infrastructure ever built.
          </p>
          <div className="mechanism-buttons">
            <button className="mechanism-btn primary">Join Pre-Sale</button>
            <button className="mechanism-btn secondary">Connect Wallet</button>
          </div>
        </div>

        <div className="mechanism-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
};

export default MechanismSection;

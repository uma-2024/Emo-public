import React from "react";
import "./TokenInfoCard.css";
import chartImage from '../../assets/images/Component 7.svg';
import video from '../../assets/bg.mp4' 
import infoImage from '../../assets/images/info.gif'
const TokenInfoCard = () => {
  return (
    <div className="token-info-container">
      
      <div className="token-info-left">
        <video
          className="token-info-video-bg"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="token-info-content-overlay">
          <div className="token-info-icon-wrapper">
           <img src={infoImage} alt="info"/>
          </div>
          <div className="token-info-text">
            <h2 className="token-info-title">Information Of Token</h2>
            <p><strong>Token Name:</strong> XIK</p>
            <p><strong>Standard Max:</strong> </p>
            <p><strong>Burn Mechanism:</strong> </p>
            <p><strong>Supply:</strong> </p>
          </div>
        </div>
      </div>

      <div className="token-info-chart">
        <div className="chart-header">
          <span className="chart-title">Sale</span>
          <span className="chart-year">2025</span>
          <span className="chart-duration">7 days</span>
        </div>
        <div className="chart-body">
          <img src={chartImage} alt="Token Chart" className="chart-image" />
        </div>
      </div>
      
    </div>
  );
};

export default TokenInfoCard;

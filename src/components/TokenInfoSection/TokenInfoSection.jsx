import React from "react";
import "./TokenInfoSection.css";
import infoIcon from "../../assets/info-icon.svg"; 
import chartImage from "../../assets/chart-placeholder.png";

const TokenInfoSection = () => {
  return (
    <div className="token-info-container">
      <div className="token-info-left">
        <img src={infoIcon} alt="info icon" className="info-icon" />
        <h3>Information Of Token</h3>
        <p><strong>Token Name:</strong> XIX</p>
        <p><strong>Standard Max:</strong> —</p>
        <p><strong>Burn Mechanism:</strong> —</p>
        <p><strong>Supply:</strong> —</p>
      </div>

      <div className="token-info-right">
        <img src={chartImage} alt="token chart" className="chart-image" />
      </div>
    </div>
  );
};

export default TokenInfoSection;

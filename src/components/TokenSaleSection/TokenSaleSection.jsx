import React from "react";
import "./TokenSaleSection.css";
import bgVideo from "../../assets/bg.mp4";
import btcImage from "../../assets/images/Chart.svg";

const TokenSaleSection = () => {
  return (
    <div className="token-sale-section">
      <div className="token-sale-content">
        {/* Left card image */}
        <div className="token-card">
          <img src={btcImage} alt="Bitcoin Card" className="btc-card-image" />
        </div>

        {/* Right Token Metrics with internal video */}
        <div className="token-metrics">
          {/* Video only inside metrics */}
          <video autoPlay muted loop className="bg-video-inside">
            <source src={bgVideo} type="video/mp4" />
          </video>

          <h2>Token Sale Metrics</h2>
          <p><strong>Token Name:</strong></p>
          <p><strong>Token Type:</strong></p>
          <p><strong>Chain:</strong></p>
          <p><strong>Pre-Sale Price:</strong></p>
          <p><strong>Public Launch Price:</strong></p>
          <p><strong>Total Supply:</strong></p>
          <p><strong>Tokens Available (Pre):</strong></p>
          <p><strong>Soft Cap:</strong></p>
          <p><strong>Hard Cap:</strong></p>
          <p><strong>Vesting:</strong></p>
        </div>
      </div>
    </div>
  );
};

export default TokenSaleSection;

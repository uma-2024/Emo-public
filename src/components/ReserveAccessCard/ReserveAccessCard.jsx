import React from "react";
import "./ReserveAccessCard.css";
import bgVideo from "../../assets/bg.mp4"; // Adjust path as needed

const ReserveAccessCard = () => {
  return (
    <div className="reserve-card">
      {/* Background Video */}
      <video autoPlay muted loop className="reserve-bg-video">
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Card Content */}
      <div className="reserve-card-content">
        <div className="reserve-card-badge">
          <span className="badge-new">New</span>
          <span className="badge-date">Starting on 12th May 2025 EST</span>
        </div>

        <h2 className="reserve-title">Reserve XIK Access</h2>
        <p className="reserve-desc">
          Join the early access phase and secure your allocation in the XIK
          network. Limited participation window available.
        </p>

        <div className="amount-boxes">
          <div className="amount-box">
            Staked Amount: <strong>$100</strong>
          </div>
          <div className="amount-box">
            Allocated Ammount: <strong>$50</strong>
          </div>
        </div>

        <button className="buy-button">
          <span className="buy-button-text">BUY XIK NOW</span>
        </button>

        <p className="tooltip">
          Tooltip: Get in before the price increases. Limited-time allocation available.
        </p>
      </div>
    </div>
  );
};

export default ReserveAccessCard;

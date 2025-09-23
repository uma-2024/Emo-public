import React, { useState } from "react";
import "./DetailedStatistics.css";
import stateImage from '../../assets/images/Statistic.svg'

const DetailedStatistics = () => {
  const [expanded, setExpanded] = useState(false); // State to control text expansion

  // Toggle the expanded state
  const toggleText = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="statistics-container">
      <div className="statistics-card">
        <img src={stateImage} alt="State Image" />
      </div>

      <div className="statistics-info">
        <h2 className="info-title">Detailed Statistics</h2>
        <p className="info-desc">
          Live pulse of market and network—price/volume chart plus core telemetry (throughput, finality, uptime, fee pressure). Compare pool yield and effective fees, and use the quick calculator for revenue vs. power cost with instant breakeven. Turn on alerts to catch price moves, difficulty shifts, and fee spikes.
        </p>
        {expanded && (
          <p className="expanded-desc">
            Open the full analytics view for deeper context. Explore OHLC candles with hover values, intraday ranges, and moving averages; benchmark network health (throughput, finality, uptime, error rates) across releases; and inspect fee dynamics and pool variance over custom windows. The ROI workspace models staking and validator returns, factors in power price sensitivity, and projects payback under changing difficulty. You’ll also find Proof-of-Usage earnings breakdowns, supply effects from burns/buybacks, a sustainability ledger, alert rules, backtests for strategy changes, and one-click CSV/API export for desks and bots.
          </p>
        )}
        <button className="info-btn" onClick={toggleText}>
          {expanded ? 'Show Less' : 'Know More'}
        </button>
      </div>
    </div>
  );
};

export default DetailedStatistics;

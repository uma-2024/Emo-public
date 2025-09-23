import React, { useState, useEffect, useRef } from "react";
import "./ReserveAccessCard.css";
import bgVideo from "../../assets/bg.mp4";
import xikIcon from "../../assets/images/logo.png"; 
import usdtIcon from "../../assets/images/usdt.svg";
import usdcIcon from "../../assets/images/usdc.svg";

const ReserveAccessCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paySymbol, setPaySymbol] = useState("USDT");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const tokenOptions = [
    { label: "USDT", icon: usdtIcon },
    { label: "USDC", icon: usdcIcon },
    { label: "XIK", icon: xikIcon },
  ];

  const selectedToken = tokenOptions.find((t) => t.label === paySymbol);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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
            Allocated Amount: <strong>$50</strong>
          </div>
        </div>

        <button className="buy-button" onClick={() => setIsModalOpen(true)}>
          <span className="buy-button-text">BUY XIK NOW</span>
        </button>

        <p className="tooltip">
          Tooltip: Get in before the price increases. Limited-time allocation available.
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Buy XIK</h3>

            {/* Buy Form */}
            <form className="buy-panel__form">
              {/* You Pay */}
              <div className="form-row">
                <label className="form-row__label">You Pay</label>
                <div className="form-row__input-group">
                  {/* Improved Dropdown */}
                  <div
                    className={`dropdown ${dropdownOpen ? "open" : ""}`}
                    ref={dropdownRef}
                  >
                    <button
                      type="button"
                      className="dropdown-toggle"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <img
                        src={selectedToken?.icon}
                        alt={selectedToken?.label}
                        className="token-icon"
                      />
                      <span>{selectedToken?.label}</span>
                      <span className="arrow">{dropdownOpen ? "▲" : "▼"}</span>
                    </button>

                    {dropdownOpen && (
                      <ul className="dropdown-menu">
                        {tokenOptions.map((token) => (
                          <li
                            key={token.label}
                            onClick={() => {
                              setPaySymbol(token.label);
                              setDropdownOpen(false);
                            }}
                          >
                            <img
                              src={token.icon}
                              alt={token.label}
                              className="token-icon"
                            />
                            {token.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="form___input">
                    <span className="form-row__receive-amount">0</span>
                    <button type="button" className="form-row__max-button">
                      MAX
                    </button>
                  </div>
                </div>
              </div>

              {/* You Receive */}
              <div className="form-row">
                <label className="form-row__label">You Receive</label>
                <div className="form-row__input-group">
                  <div className="form___input1">
                    <img src={xikIcon} className="form-row__icon" alt="XIK" />
                    <span>XIK</span>
                  </div>
                  <div className="form___input">
                    <span className="form-row__receive-amount">0</span>
                    <button type="button" className="form-row__max-button">
                      MAX
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Modal Actions */}
            <div className="modal-actions">
              <button className="confirm-btn">Confirm</button>
              <button
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReserveAccessCard;

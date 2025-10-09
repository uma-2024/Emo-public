import React, { useState, useEffect, useRef } from "react";
import "./ReserveAccessCard.css";
import bgVideo from "../../assets/bg.mp4";
import xikIcon from "../../assets/images/logo.png"; 
import usdtIcon from "../../assets/images/usdt.svg";
import usdcIcon from "../../assets/images/usdc.svg";
import { usePresale } from "../../contexts/PresaleContext";
import { usePresaleContract } from "../../hooks/usePresaleContract";
import { WalletContext } from "../../components/WalletConnect/WalletConnect";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useContext } from "react";

const ReserveAccessCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paySymbol, setPaySymbol] = useState("USDT");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [calculatedTokens, setCalculatedTokens] = useState("0");
  const { isPrivatePresale, refAddress, presaleType } = usePresale();
  const { provider, address } = useContext(WalletContext);
  const { 
    phaseData, 
    userInfo, 
    fundsRaised, 
    buyWithETH, 
    buyWithUSDT, 
    buyWithUSDC, 
    loading, 
    error 
  } = usePresaleContract(provider, address);

  const dropdownRef = useRef(null);

  const tokenOptions = [
    { label: "USDT", icon: usdtIcon },
    { label: "USDC", icon: usdcIcon },
    { label: "XIK", icon: xikIcon },
  ];

  const selectedToken = tokenOptions.find((t) => t.label === paySymbol);

  // Calculate tokens to receive based on amount and phase data
  const calculateTokensToReceive = (usdAmount) => {
    if (!phaseData || !usdAmount) return "0";
    
    try {
      console.log('Contract price:', phaseData.price.toString());
      console.log('USD amount:', usdAmount);
      
      // Convert USD amount to 6 decimals (USDT/USDC have 6 decimals)
      const usdAmountWei = ethers.parseUnits(usdAmount.toString(), 6);
      console.log('USD amount in wei (6 decimals):', usdAmountWei.toString());
      
      // Calculate tokens: (USD amount * 10^18) / price
      // This gives us the number of XIK tokens (which have 18 decimals)
      const tokensToReceive = (usdAmountWei * BigInt(10**18)) / phaseData.price;
      console.log('Tokens before bonus:', tokensToReceive.toString());
      
      // Apply private presale bonus if applicable
      const bonusMultiplier = isPrivatePresale ? 120 : 100; // 20% bonus for private
      const finalTokens = (tokensToReceive * BigInt(bonusMultiplier)) / BigInt(100);
      console.log('Final tokens with bonus:', finalTokens.toString());
      
      const formattedTokens = ethers.formatEther(finalTokens);
      console.log('Formatted tokens:', formattedTokens);
      
      // Format to 4 decimal places
      const tokensWithDecimals = parseFloat(formattedTokens).toFixed(4);
      return tokensWithDecimals;
    } catch (error) {
      console.error('Error calculating tokens:', error);
      return "0";
    }
  };

  // Handle purchase
  const handlePurchase = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setIsProcessing(true);
      
      let tx;
      switch (paySymbol) {
        case "USDT":
          tx = await buyWithUSDT(amount);
          break;
        case "USDC":
          tx = await buyWithUSDC(amount);
          break;
        case "ETH":
          tx = await buyWithETH(amount);
          break;
        default:
          throw new Error("Unsupported payment method");
      }

      toast.success(`Successfully purchased XIK tokens! Transaction: ${tx.hash}`);
      setAmount("");
      setIsModalOpen(false);
    } catch (error) {
      console.error('Purchase failed:', error);
      
      // Handle specific error types with user-friendly messages
      if (error.message && error.message.includes('bad address checksum')) {
        toast.error("Invalid referral address format. Please check the address and try again.");
      } else if (error.message && error.message.includes('INVALID_ARGUMENT')) {
        toast.error("Invalid address format. Please check the referral address.");
      } else if (error.message && error.message.includes('insufficient funds')) {
        toast.error("Insufficient funds. Please check your wallet balance.");
      } else if (error.message && error.message.includes('user rejected')) {
        toast.error("Transaction was cancelled by user.");
      } else {
        toast.error(error.message || "Purchase failed. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Update calculated tokens when amount or phase data changes
  useEffect(() => {
    if (amount && phaseData) {
      const tokens = calculateTokensToReceive(amount);
      setCalculatedTokens(tokens);
    } else {
      setCalculatedTokens("0");
    }
  }, [amount, phaseData, isPrivatePresale]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setIsModalOpen(false);
      }
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
          <span className="badge-new">{isPrivatePresale ? "Private" : "New"}</span>
          <span className="badge-date">
            {isPrivatePresale ? "Private Presale Active" : "Starting on 12th May 2025 EST"}
          </span>
        </div>

        <h2 className="reserve-title">
          {isPrivatePresale ? "Private XIK Presale" : "Reserve XIK Access"}
        </h2>
        <p className="reserve-desc">
          {isPrivatePresale 
            ? `You've been invited to participate in the private presale. Referred by: ${refAddress?.slice(0, 6)}...${refAddress?.slice(-4)}`
            : "Join the early access phase and secure your allocation in the XIK network. Limited participation window available."
          }
        </p>

        <div className="amount-boxes">
          <div className="amount-box">
            Current Price: <strong>
              {phaseData ? `$${(Number(phaseData.price) / 1e6).toFixed(6)}` : "Loading..."}
            </strong>
          </div>
          <div className="amount-box">
            Funds Raised: <strong>
              {fundsRaised ? `$${(Number(fundsRaised) / 1e6).toFixed(2)}` : "Loading..."}
            </strong>
          </div>
          {/* {isPrivatePresale && (
            <div className="amount-box private-bonus">
              Private Bonus: <strong>+20%</strong>
            </div>
          )} */}
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
            <div className="modal-header">
              <h3>Buy XIK</h3>
              <button 
                className="modal-close-btn" 
                onClick={() => setIsModalOpen(false)}
                disabled={isProcessing}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              {/* Price Display */}
              {phaseData && (
                <div className="price-display">
                  <p>Current Price: <strong>${(Number(phaseData.price) / 1e6).toFixed(6)}</strong></p>
                  {/* {isPrivatePresale && (
                    <p className="bonus-info">Private Presale: <strong>+20% Bonus</strong></p>
                  )} */}
                </div>
              )}

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
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="amount-input"
                      min="0"
                      step="0.01"
                    />
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
                    <span className="form-row__receive-amount">
                      {calculatedTokens}
                    </span>
                    <button type="button" className="form-row__max-button">
                      MAX
                    </button>
                  </div>
                </div>
              </div>

              {/* Referral Address */}
              <div className="form-row">
                <label className="form-row__label">Referral Address</label>
                <div className="form-row__input-group">
                  <div className="form___input">
                    <input
                      type="text"
                      value={refAddress ? `${refAddress.slice(0, 8)}....${refAddress.slice(-8)}` : ""}
                      placeholder="0x..."
                      className="referral-input"
                      disabled
                      title="Referral address is automatically set from URL parameter"
                    />
                  </div>
                </div>
               
              </div>
            </form>

              {/* Modal Actions */}
              <div className="modal-actions">
                <button 
                  className="confirm-btn" 
                  onClick={handlePurchase}
                  disabled={isProcessing || !amount || !address}
                >
                  {isProcessing ? "Processing..." : "Buy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReserveAccessCard;

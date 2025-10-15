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
// Bonus tiers based on purchase amount
const bonusTiers = [
  { minAmount: 0, maxAmount: 99, bonus: 0, name: "No Bonus" },
  { minAmount: 100, maxAmount: 499, bonus: 5, name: "5% Bonus" },
  { minAmount: 500, maxAmount: 999, bonus: 10, name: "10% Bonus" },
  { minAmount: 1000, maxAmount: 4999, bonus: 15, name: "15% Bonus" },
  { minAmount: 5000, maxAmount: 9999, bonus: 20, name: "20% Bonus" },
  { minAmount: 10000, maxAmount: 49999, bonus: 25, name: "25% Bonus" },
  { minAmount: 50000, maxAmount: 99999, bonus: 30, name: "30% Bonus" },
  { minAmount: 100000, maxAmount: Infinity, bonus: 35, name: "35% Bonus" },
];

const ReserveAccessCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paySymbol, setPaySymbol] = useState("USDT");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [calculatedTokens, setCalculatedTokens] = useState("0");
  const { isPrivatePresale, refAddress, presaleType } = usePresale();
  const { provider, address } = useContext(WalletContext);
  const [currentBonusTier, setCurrentBonusTier] = useState(bonusTiers[0]);

  // Referral states
  const [showReferModal, setShowReferModal] = useState(false);
  const [referralAddress, setReferralAddress] = useState('');
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

  // Handle referral parameter from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refAddress = urlParams.get('ref');
    if (refAddress) {
      setReferralAddress(refAddress);
      console.log('🎯 [ReserveAccessCard] Referral address detected:', refAddress);
      console.log('🎯 [ReserveAccessCard] Full URL:', window.location.href);
    } else {
      console.log('🎯 [ReserveAccessCard] No referral parameter found in URL');
    }
  }, []);

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
      // Convert USD amount to 6 decimals (USDT/USDC have 6 decimals)
      const usdAmountWei = ethers.parseUnits(usdAmount.toString(), 6);
  
      // Calculate tokens: (USD amount * 10^18) / price
      const tokensToReceive = (usdAmountWei * BigInt(10 ** 18)) / phaseData.price;
  
      // Determine bonus tier
      const bonusTier = getBonusTier(usdAmount);
  
      // Apply private presale bonus (20%) if applicable
      const privatePresaleBonus = isPrivatePresale ? 20 : 0;
  
      // Combine both bonuses
      const totalBonus = privatePresaleBonus + bonusTier.bonus;
  
      // Apply total bonus to tokens
      const finalTokens = (tokensToReceive * BigInt(100 + totalBonus)) / BigInt(100);
  
      // Convert to readable format
      const formattedTokens = ethers.formatEther(finalTokens);
      return parseFloat(formattedTokens).toFixed(4);
    } catch (error) {
      console.error("Error calculating tokens:", error);
      return "0";
    }
  };
  
// Get bonus tier based on purchase amount
const getBonusTier = (usdAmount) => {
  const amount = parseFloat(usdAmount) || 0;
  return bonusTiers.find(tier => amount >= tier.minAmount && amount <= tier.maxAmount) || bonusTiers[0];
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
      
      // Extract clean error message
      let errorMessage = "Purchase failed. Please try again.";
      
      if (error.message) {
        const message = error.message.toLowerCase();
        
        // Handle specific error types with user-friendly messages
        if (message.includes('bad address checksum') || message.includes('invalid address')) {
          errorMessage = "Invalid address format. Please check the referral address.";
        } else if (message.includes('invalid_argument')) {
          errorMessage = "Invalid address format. Please check the referral address.";
        } else if (message.includes('insufficient funds') || message.includes('insufficient balance')) {
          errorMessage = "Insufficient funds. Please check your wallet balance.";
        } else if (message.includes('user rejected') || message.includes('user denied')) {
          errorMessage = "Transaction was cancelled by user.";
        } else if (message.includes('execution reverted') || message.includes('revert')) {
          errorMessage = "Transaction failed. Please check your inputs and try again.";
        } else if (message.includes('gas') || message.includes('gas limit')) {
          errorMessage = "Transaction failed due to gas issues. Please try again.";
        } else if (message.includes('network') || message.includes('connection')) {
          errorMessage = "Network error. Please check your connection and try again.";
        } else if (message.includes('timeout')) {
          errorMessage = "Transaction timed out. Please try again.";
        } else {
          // Extract just the essential part of the error message
          const cleanMessage = error.message
            .replace(/^Error:\s*/i, '')
            .replace(/\([^)]*\)/g, '') // Remove parentheses content
            .replace(/\[[^\]]*\]/g, '') // Remove square brackets content
            .replace(/See:.*$/i, '') // Remove "See: ..." links
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .trim();
          
          if (cleanMessage && cleanMessage.length > 0 && cleanMessage.length < 100) {
            errorMessage = cleanMessage;
          }
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Referral functions
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Referral link copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success("Referral link copied to clipboard!");
    }
  };

  const shareOnWhatsApp = () => {
    const referralUrl = `${window.location.origin}?ref=${address}`;
    const message = `Join me on XIK Presale! Use my referral link: ${referralUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareOnTelegram = () => {
    const referralUrl = `${window.location.origin}?ref=${address}`;
    const message = `Join me on XIK Presale! Use my referral link: ${referralUrl}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  const shareOnTwitter = () => {
    const referralUrl = `${window.location.origin}?ref=${address}`;
    const message = `Join me on XIK Presale! Use my referral link: ${referralUrl}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleReferClick = () => {
    if (address) {
      setShowReferModal(true);
    } else {
      toast.error("Please connect your wallet first to generate referral link");
    }
  };

  // Update calculated tokens when amount or phase data changes
  useEffect(() => {
    if (amount && phaseData) {
      const tokens = calculateTokensToReceive(amount);
      setCalculatedTokens(tokens);
  
      // Update current bonus tier
      const bonusTier = getBonusTier(amount);
      setCurrentBonusTier(bonusTier);
    } else {
      setCalculatedTokens("0");
      setCurrentBonusTier(bonusTiers[0]);
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
        
        <button className="refer-button" onClick={handleReferClick}>
          <span className="refer-button-text">Refer To Friend</span>
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

            </form>
            {amount && parseFloat(amount) > 0 && (
  <div className="bonus-info">
    <div className="bonus-tier">
      <span className="bonus-tier-name">{currentBonusTier.name}</span>
      {currentBonusTier.bonus > 0 && (
        <span className="bonus-tier-percentage">+{currentBonusTier.bonus}%</span>
      )}
    </div>
    {isPrivatePresale && (
      <div className="private-presale-bonus">
        <span className="private-bonus-text">Private Presale Bonus: +20%</span>
      </div>
    )}
    <div className="total-bonus">
      <span className="total-bonus-text">
        Total Bonus: +{isPrivatePresale ? currentBonusTier.bonus + 20 : currentBonusTier.bonus}%
      </span>
    </div>
  </div>
)}
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


      {/* Referral Modal */}
      {showReferModal && (
        <div className="refer-modal-overlay" onClick={() => setShowReferModal(false)}>
          <div className="refer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="refer-modal-header">
              <h3>Refer to Friend</h3>
              <button 
                className="refer-modal-close"
                onClick={() => setShowReferModal(false)}
              >
                ×
              </button>
            </div>
            <div className="refer-modal-content">
              <p>Share your referral link with friends and earn rewards!</p>
              <div className="refer-address">
                <span className="refer-address-label">Your Referral Link:</span>
                <div className="refer-address-value">
                  <span>{`${window.location.origin}?ref=${address}`}</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(`${window.location.origin}?ref=${address}`)}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="refer-share-buttons">
                <button className="share-btn whatsapp" onClick={shareOnWhatsApp}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  WhatsApp
                </button>
                <button className="share-btn telegram" onClick={shareOnTelegram}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </button>
                <button className="share-btn twitter" onClick={shareOnTwitter}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
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

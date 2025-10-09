import React, { useState, useEffect, useContext } from "react";
import "./Claim.css";
import bgVideo from "../../assets/bg.mp4";
import xikIcon from "../../assets/images/logo.png";
import { WalletContext } from "../WalletConnect/WalletConnect";
import { usePresaleContract } from "../../hooks/usePresaleContract";
import { usePresale } from "../../contexts/PresaleContext";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { FaCoins, FaCheckCircle, FaBullseye, FaWallet, FaExclamationTriangle } from "react-icons/fa";

const Claim = () => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimableAmount, setClaimableAmount] = useState("0");
  const [totalVested, setTotalVested] = useState("0");
  const [releasedAmount, setReleasedAmount] = useState("0");
  const [nextClaimTime, setNextClaimTime] = useState(null);
  
  const { provider, address } = useContext(WalletContext);
  const { 
    userInfo, 
    phaseData, 
    claim, 
    getSelfVestingInfo,
    loading, 
    error,
    refreshData 
  } = usePresaleContract(provider, address);
  
  const { isPrivatePresale, refAddress } = usePresale();

  // Load user's claim data
  useEffect(() => {
    const loadClaimData = async () => {
      if (!address || !userInfo) return;

      try {
        // Get vesting info
        const vestingInfo = await getSelfVestingInfo(address);
        
        // Calculate claimable amount
        const totalVestedWei = userInfo.vested || BigInt(0);
        const releasedWei = userInfo.released || BigInt(0);
        const claimableWei = totalVestedWei - releasedWei;
        
        setTotalVested(ethers.formatEther(totalVestedWei));
        setReleasedAmount(ethers.formatEther(releasedWei));
        setClaimableAmount(ethers.formatEther(claimableWei));
        
        // Calculate next claim time (if vesting is still active)
        if (vestingInfo && vestingInfo.duration > 0) {
          const startTime = Number(vestingInfo.startTime) * 1000;
          const duration = Number(vestingInfo.duration) * 1000;
          const nextClaim = new Date(startTime + duration);
          setNextClaimTime(nextClaim);
        }
      } catch (error) {
        console.error('Error loading claim data:', error);
        toast.error('Failed to load claim data');
      }
    };

    loadClaimData();
  }, [address, userInfo, getSelfVestingInfo]);

  // Handle claim
  const handleClaim = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (parseFloat(claimableAmount) <= 0) {
      toast.error("No tokens available to claim");
      return;
    }

    try {
      setIsClaiming(true);
      
      const tx = await claim();
      await tx.wait();
      
      toast.success(`Successfully claimed ${parseFloat(claimableAmount).toFixed(4)} XIK tokens!`);
      
      // Refresh data
      await refreshData();
      
    } catch (error) {
      console.error('Claim failed:', error);
      toast.error(error.message || "Claim failed");
    } finally {
      setIsClaiming(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="claim-section">
      <div className="claim-container">
        {/* Background Video */}
        <video autoPlay muted loop className="claim-bg-video">
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="claim-header">
          <h2 className="claim-title">
            {isPrivatePresale ? "Private Presale Claim" : "Token Claim"}
          </h2>
          <p className="claim-subtitle">
            Claim your vested XIK tokens. {isPrivatePresale && "Private presale participants get priority access."}
          </p>
        
          {isPrivatePresale && !refAddress && (
            <p className="referral-warning">
              <FaExclamationTriangle className="warning-icon" />
              Private presale requires a valid referrer address in the URL
            </p>
          )}
        </div>

        <div className="claim-content">
          {/* Claim Stats */}
          <div className="claim-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <FaCoins />
              </div>
              <div className="stat-info">
                <h3>Base Tokens</h3>
                <p className="stat-value">{userInfo ? parseFloat(ethers.formatEther(userInfo.base || 0)).toFixed(4) : "0.0000"} XIK</p>
              </div>
            </div>

            {/* <div className="stat-card">
              <div className="stat-icon">
                <FaCoins />
              </div>
              <div className="stat-info">
                <h3>Total Vested</h3>
                <p className="stat-value">{parseFloat(totalVested).toFixed(4)} XIK</p>
              </div>
            </div> */}

            <div className="stat-card">
              <div className="stat-icon">
                <FaCheckCircle />
              </div>
              <div className="stat-info">
                <h3>Already Released</h3>
                <p className="stat-value">{parseFloat(releasedAmount).toFixed(4)} XIK</p>
              </div>
            </div>

            <div className="stat-card claimable">
              <div className="stat-icon">
                <FaBullseye />
              </div>
              <div className="stat-info">
                <h3>Available to Claim</h3>
                <p className="stat-value">{parseFloat(claimableAmount).toFixed(4)} XIK</p>
              </div>
            </div>
          </div>

          {/* Claim Form */}
          <div className="claim-form">
            <div className="claim-amount-display">
              <div className="claim-amount-box">
                <img src={xikIcon} alt="XIK" className="token-icon2" />
                <div className="amount-info">
                  <span className="amount-label">Claimable Amount</span>
                  <span className="amount-value">{parseFloat(claimableAmount).toFixed(4)} XIK</span>
                </div>
              </div>
            </div>

            {nextClaimTime && (
              <div className="next-claim-info">
                <p>Next claim available: <strong>{formatDate(nextClaimTime)}</strong></p>
              </div>
            )}

            <button 
              className="claim-button"
              onClick={handleClaim}
              disabled={isClaiming || parseFloat(claimableAmount) <= 0 || !address}
            >
              {isClaiming ? (
                <>
                  <div className="claim-spinner"></div>
                  Claiming...
                </>
              ) : (
                <>
                  <FaBullseye />
                  Claim Tokens
                </>
              )}
            </button>

            {!address && (
              <p className="connect-warning">
                <FaWallet className="warning-icon" />
                Please connect your wallet to claim tokens
              </p>
            )}

            {parseFloat(claimableAmount) <= 0 && address && (
              <p className="no-tokens-warning">
                <FaExclamationTriangle className="warning-icon" />
                No tokens available to claim at this time
              </p>
            )}
          </div>

          {/* Vesting Info */}
          <div className="vesting-info">
            <h3>Vesting Information</h3>
            <div className="vesting-details">
              {/* <div className="vesting-item">
                <span className="vesting-label">Vesting Type:</span>
                <span className="vesting-value">
                  {isPrivatePresale ? "Private Presale (25% TGE, 75% over 12 months)" : "Public Presale (50% TGE, 50% over 6 months)"}
                </span>
              </div> */}
              <div className="vesting-item">
                <span className="vesting-label">Base Tokens:</span>
                <span className="vesting-value">{userInfo ? parseFloat(ethers.formatEther(userInfo.base || 0)).toFixed(4) : "0.0000"} XIK</span>
              </div>
              <div className="vesting-item">
                <span className="vesting-label">Total Vested:</span>
                <span className="vesting-value">{parseFloat(totalVested).toFixed(4)} XIK</span>
              </div>
              <div className="vesting-item">
                <span className="vesting-label">Released:</span>
                <span className="vesting-value">{parseFloat(releasedAmount).toFixed(4)} XIK</span>
              </div>
              <div className="vesting-item">
                <span className="vesting-label">Remaining:</span>
                <span className="vesting-value">{parseFloat(claimableAmount).toFixed(4)} XIK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Claim;

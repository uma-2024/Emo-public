import React, { useContext, useState } from "react";
import "./TokenSaleSection.css";
import bgVideo from "../../assets/bg.mp4";
import btcImage from "../../assets/images/Group 48095371.svg";
import { usePresale } from "../../contexts/PresaleContext";
import { usePresaleContract } from "../../hooks/usePresaleContract";
import { WalletContext } from "../../components/WalletConnect/WalletConnect";
import { FaCopy, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const TokenSaleSection = () => {
  const { isPrivatePresale } = usePresale();
  const { provider, address } = useContext(WalletContext);
  const { phaseData, fundsRaised, userInfo } = usePresaleContract(provider, address);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (!address) {
      toast.error("No wallet address to copy");
      return;
    }
    
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Wallet address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error("Failed to copy wallet address");
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return "Not Connected";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };
  
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

          <h2>{isPrivatePresale ? "Private Presale Metrics" : "Token Sale Metrics"}</h2>
          <p><strong>Token Name:</strong> XIK</p>
          <p><strong>Token Type:</strong> ERC-20</p>
          <p><strong>Chain:</strong> BSC Testnet</p>
          <p><strong>Current Price:</strong> {phaseData ? `$${(Number(phaseData.price) / 1e6).toFixed(6)}` : "Loading..."}</p>
          <p><strong>Funds Raised:</strong> {fundsRaised ? `$${(Number(fundsRaised) / 1e6).toFixed(2)}` : "Loading..."}</p>
          <p><strong>Your Tokens:</strong> {userInfo ? `${(Number(userInfo.base) / 1e18).toFixed(2)} XIK` : "0 XIK"}</p>
          <p><strong>Phase End Time:</strong> {phaseData ? new Date(Number(phaseData.endTime) * 1000).toLocaleString() : "Loading..."}</p>
          <p><strong>Total Supply:</strong> 1,000,000,000 XIK</p>
          <p><strong>Tokens Available:</strong> {phaseData ? `${(Number(phaseData.tokens) / 1e18).toLocaleString()} XIK` : "Loading..."}</p>
          
          <p><strong>Wallet Address:</strong>{" "} <span className="wallet-address-text">
                {formatAddress(address)}
              </span> {" "} {" "} <button 
                // className="copy-address-btn" 
                onClick={copyToClipboard}
                disabled={!address}
                title={address ? "Copy full address" : "Connect wallet first"}
              >
                {copied ? <FaCheck color="#000"/> : <FaCopy color="#000"/>}
              </button></p>
          {/* {isPrivatePresale && (
            <p><strong>Private Bonus:</strong> +20% extra tokens</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default TokenSaleSection;

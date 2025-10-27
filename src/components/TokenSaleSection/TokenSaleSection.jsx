import React, { useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import "./TokenSaleSection.css";
import bgVideo from "../../assets/bg.mp4";
import btcImage from "../../assets/images/Group 48095371.svg";
import { usePresale } from "../../contexts/PresaleContext";
import { usePresaleContract } from "../../hooks/usePresaleContract";
import { WalletContext } from "../../components/WalletConnect/WalletConnect";
import { FaCopy, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const TokenSaleSection = () => {
  const { t } = useTranslation();
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
    if (!addr) return t('tokenSale.notConnected');
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

          <h2>{isPrivatePresale ? t('tokenSale.privateTitle') : t('tokenSale.title')}</h2>
          <p><strong>{t('tokenSale.tokenName')}</strong> XIK</p>
          <p><strong>{t('tokenSale.tokenType')}</strong> ERC-20</p>
          <p><strong>{t('tokenSale.chain')}</strong> BSC Testnet</p>
          <p><strong>{t('tokenSale.currentPrice')}</strong> {phaseData ? `$${(Number(phaseData.price) / 1e6).toFixed(6)}` : t('tokenSale.loading')}</p>
          <p><strong>{t('tokenSale.fundsRaised')}</strong> {fundsRaised ? `$${(Number(fundsRaised) / 1e6).toFixed(2)}` : t('tokenSale.loading')}</p>
          <p><strong>{t('tokenSale.yourTokens')}</strong> {userInfo ? `${(Number(userInfo.base) / 1e18).toFixed(2)} XIK` : "0 XIK"}</p>
          <p><strong>{t('tokenSale.phaseEndTime')}</strong> {phaseData ? new Date(Number(phaseData.endTime) * 1000).toLocaleString() : t('tokenSale.loading')}</p>
          <p><strong>{t('tokenSale.totalSupply')}</strong> 1,000,000,000 XIK</p>
          <p><strong>{t('tokenSale.tokensAvailable')}</strong> {phaseData ? `${(Number(phaseData.tokens) / 1e18).toLocaleString()} XIK` : t('tokenSale.loading')}</p>
          
          <p><strong>{t('tokenSale.walletAddress')}</strong>{" "} <span className="wallet-address-text">
                {formatAddress(address)}
              </span> {" "} {" "} <button 
                // className="copy-address-btn" 
                onClick={copyToClipboard}
                disabled={!address}
                title={address ? t('common.copy') : t('common.connect')}
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

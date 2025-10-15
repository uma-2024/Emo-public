import React, { useState, useContext } from "react";
import "./ReferralSystem.css";
import { FaTrophy, FaUsers, FaGift, FaCoins, FaArrowRight, FaDollarSign, FaBullseye, FaBolt, FaCrown, FaCopy, FaTimes } from "react-icons/fa";
import bgVideo from "../../assets/bg.mp4";
import { WalletContext } from "../WalletConnect/WalletConnect";
import { toast } from "react-toastify";

const ReferralSystem = () => {
  const { address } = useContext(WalletContext);
  const [showReferralModal, setShowReferralModal] = useState(false);

  const handleGetReferralLink = () => {
    if (!address) {
      toast.error("Please connect your wallet first to get your referral link");
      return;
    }
    setShowReferralModal(true);
  };

  const copyToClipboard = async () => {
    const referralLink = `${window.location.origin}?ref=${address}`;
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error("Failed to copy referral link");
    }
  };

  const shareOnWhatsApp = () => {
    const referralLink = `${window.location.origin}?ref=${address}`;
    const message = `Join the XIK presale and earn rewards! Use my referral link: ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareOnTelegram = () => {
    const referralLink = `${window.location.origin}?ref=${address}`;
    const message = `Join the XIK presale and earn rewards! Use my referral link: ${referralLink}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  const shareOnTwitter = () => {
    const referralLink = `${window.location.origin}?ref=${address}`;
    const message = `Join the XIK presale and earn rewards! Use my referral link: ${referralLink}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(twitterUrl, '_blank');
  };

  const referralTiers = [
    {
      rank: 1,
      title: "Top Referrer",
      reward: "75,000 XIK",
      description: "The highest performing referrer gets the biggest reward",
      icon: <FaTrophy className="trophy-icon" />
    },
    {
      rank: 2,
      title: "Top 10 Referrers",
      reward: "20,000 XIK each",
      description: "Consistent referrers in the top 10 get substantial rewards",
      icon: <FaUsers className="users-icon" />
    }
  ];

  const bonusTiers = [
    {
      name: "Prime",
      minBuy: "50,000 XIK",
      bonus: "+10%",
      finalTokens: "55,000 XIK",
      description: "Perfect for getting started"
    },
    {
      name: "Elite", 
      minBuy: "100,000 XIK",
      bonus: "+30%",
      finalTokens: "130,000 XIK",
      description: "Great value for active traders"
    },
    {
      name: "Titan",
      minBuy: "250,000 XIK", 
      bonus: "+50%",
      finalTokens: "375,000 XIK",
      description: "Base 250K liquid, 125K bonus vested"
    },
    {
      name: "Legend",
      minBuy: "500,000 XIK",
      bonus: "+60%", 
      finalTokens: "800,000 XIK",
      description: "Base 500K liquid, 300K bonus vested"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Get Your Referral Link",
      description: "Connect your wallet and generate your unique referral link",
      icon: <FaCoins className="step-icon" />
    },
    {
      step: 2,
      title: "Share with Friends",
      description: "Share your link via social media, messaging, or direct sharing",
      icon: <FaUsers className="step-icon" />
    },
    {
      step: 3,
      title: "They Buy XIK Tokens",
      description: "Friends use your link to purchase XIK tokens in the presale",
      icon: <FaArrowRight className="step-icon" />
    },
    {
      step: 4,
      title: "Earn Rewards",
      description: "You earn XIK tokens based on their purchases and your ranking",
      icon: <FaGift className="step-icon" />
    }
  ];

  return (
    <div className="referral-system">
      <div className="referral-container">
        {/* Header */}
        {/* <div className="referral-header">
          <h2 className="referral-title">XIK Referral System</h2>
          <p className="referral-subtitle">
            Earn rewards by referring friends to the XIK presale. The more you refer, the more you earn!
          </p>
        </div> */}

        {/* How It Works */}
        <div className="how-it-works">
          {/* <h3 className="section-title">How Referrals Work</h3> */}
          <div className="steps-container">
            {howItWorks.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.step}</div>
                <div className="step-icon-container">
                  {step.icon}
                </div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Rewards */}
        <div className="referral-rewards">
          <h3 className="section-title">Referral Rewards</h3>
          <div className="rewards-grid">
            {referralTiers.map((tier, index) => (
              <div key={index} className="reward-card">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="reward-card-bg-video"
                >
                  <source src={bgVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="reward-card-overlay">
                  <div className="reward-icon">
                    {tier.icon}
                  </div>
                  <div className="reward-content">
                    <h4 className="reward-title">{tier.title}</h4>
                    <div className="reward-amount">{tier.reward}</div>
                    <p className="reward-description">{tier.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus Tiers */}
        <div className="bonus-tiers">
          <h3 className="section-title">Bonus Tiers</h3>
          {/* <p className="bonus-subtitle">
            When your referrals buy XIK tokens, they get bonus rewards based on their purchase amount
          </p> */}
          <div className="tiers-grid">
            {bonusTiers.map((tier, index) => (
              <div key={index} className="tier-card">
                <div className="tier-header">
                  <h4 className="tier-name">{tier.name}</h4>
                  <div className="tier-bonus">{tier.bonus}</div>
                </div>
                <div className="tier-details">
                  <div className="tier-min-buy">
                    <span className="label">Minimum Buy:</span>
                    <span className="value">{tier.minBuy}</span>
                  </div>
                  <div className="tier-final-tokens">
                    <span className="label">Final Tokens:</span>
                    <span className="value">{tier.finalTokens}</span>
                  </div>
                  <p className="tier-description">{tier.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Information */}
        {/* <div className="key-points">
          <h3 className="section-title">How It Works</h3>
          <div className="points-grid">
            <div className="point-item">
              <div className="point-icon">
                <FaDollarSign />
              </div>
              <div className="point-content">
                <h4>Minimum Buy to Qualify</h4>
                <p>Your referrals need to buy at least $100 worth of XIK tokens</p>
              </div>
            </div>
            <div className="point-item">
              <div className="point-icon">
                <FaBullseye />
              </div>
              <div className="point-content">
                <h4>Stacked Bonuses</h4>
                <p>Referral rewards stack with purchase bonuses for maximum value</p>
              </div>
            </div>
            <div className="point-item">
              <div className="point-icon">
                <FaBolt />
              </div>
              <div className="point-content">
                <h4>Instant Rewards</h4>
                <p>Most referral rewards are distributed immediately after purchase</p>
              </div>
            </div>
            <div className="point-item">
              <div className="point-icon">
                <FaCrown />
              </div>
              <div className="point-content">
                <h4>Leaderboard Competition</h4>
                <p>Compete for top referrer status and earn massive rewards</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Call to Action */}
        <div className="referral-cta">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="referral-cta-bg-video"
          >
            <source src={bgVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="referral-cta-overlay">
            <h3 className="cta-title">Ready to Start Earning?</h3>
            <p className="cta-description">
              Connect your wallet and start referring friends to earn XIK tokens today!
            </p>
            <div className="cta-buttons">
              <button className="cta-primary" onClick={handleGetReferralLink}>Get Referral Link</button>
              {/* <button className="cta-secondary">View Leaderboard</button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Referral Link Modal */}
      {showReferralModal && (
        <div className="referral-modal-overlay" onClick={() => setShowReferralModal(false)}>
          <div className="referral-modal" onClick={(e) => e.stopPropagation()}>
            <div className="referral-modal-header">
              <h3>Your Referral Link</h3>
              <button
                className="referral-modal-close"
                onClick={() => setShowReferralModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="referral-modal-content">
              <p>Share your referral link with friends and earn rewards when they participate in the presale!</p>
              <div className="referral-link-container">
                <div className="referral-link-display">
                  <span className="referral-link-text">
                    {address ? `${window.location.origin}?ref=${address}` : 'Please connect your wallet first'}
                  </span>
                  <button
                    className="copy-referral-btn"
                    onClick={copyToClipboard}
                    disabled={!address}
                  >
                    <FaCopy />
                    Copy
                  </button>
                </div>
              </div>
              <div className="referral-share-buttons">
                <button 
                  className="share-referral-btn whatsapp" 
                  onClick={shareOnWhatsApp} 
                  disabled={!address}
                >
                  WhatsApp
                </button>
                <button 
                  className="share-referral-btn telegram" 
                  onClick={shareOnTelegram} 
                  disabled={!address}
                >
                  Telegram
                </button>
                <button 
                  className="share-referral-btn twitter" 
                  onClick={shareOnTwitter} 
                  disabled={!address}
                >
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

export default ReferralSystem;

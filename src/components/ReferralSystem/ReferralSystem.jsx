import React, { useState, useContext } from "react";
import { useTranslation } from 'react-i18next';
import "./ReferralSystem.css";
import { FaTrophy, FaUsers, FaGift, FaCoins, FaArrowRight, FaDollarSign, FaBullseye, FaBolt, FaCrown, FaCopy, FaTimes } from "react-icons/fa";
import bgVideo from "../../assets/bg.mp4";
import { WalletContext } from "../WalletConnect/WalletConnect";
import { toast } from "react-toastify";

const ReferralSystem = () => {
  const { t } = useTranslation();
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
      title: t('referral.topReferrer'),
      reward: t('referral.topReferrerReward'),
      description: t('referral.topReferrerDesc'),
      icon: <FaTrophy className="trophy-icon" />
    },
    {
      rank: 2,
      title: t('referral.top10Referrers'),
      reward: t('referral.top10ReferrersReward'),
      description: t('referral.top10ReferrersDesc'),
      icon: <FaUsers className="users-icon" />
    }
  ];

  const bonusTiers = [
    {
      name: t('referral.tierPrime'),
      minBuy: "50,000 XIK",
      bonus: "+10%",
      finalTokens: "55,000 XIK",
      description: t('referral.tierPrimeDesc')
    },
    {
      name: t('referral.tierElite'), 
      minBuy: "100,000 XIK",
      bonus: "+30%",
      finalTokens: "130,000 XIK",
      description: t('referral.tierEliteDesc')
    },
    {
      name: t('referral.tierTitan'),
      minBuy: "250,000 XIK", 
      bonus: "+50%",
      finalTokens: "375,000 XIK",
      description: t('referral.tierTitanDesc')
    },
    {
      name: t('referral.tierLegend'),
      minBuy: "500,000 XIK",
      bonus: "+60%", 
      finalTokens: "800,000 XIK",
      description: t('referral.tierLegendDesc')
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: t('referral.getReferralLink'),
      description: t('referral.getReferralLinkDesc'),
      icon: <FaCoins className="step-icon" />
    },
    {
      step: 2,
      title: t('referral.shareWithFriends'),
      description: t('referral.shareWithFriendsDesc'),
      icon: <FaUsers className="step-icon" />
    },
    {
      step: 3,
      title: t('referral.theyBuyTokens'),
      description: t('referral.theyBuyTokensDesc'),
      icon: <FaArrowRight className="step-icon" />
    },
    {
      step: 4,
      title: t('referral.earnRewards'),
      description: t('referral.earnRewardsDesc'),
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
          <h3 className="section-title">{t('referral.referralRewards')}</h3>
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
          <h3 className="section-title">{t('referral.bonusTiers')}</h3>
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
                    <span className="label">{t('referral.minimumBuy')}</span>
                    <span className="value">{tier.minBuy}</span>
                  </div>
                  <div className="tier-final-tokens">
                    <span className="label">{t('referral.finalTokens')}</span>
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
            <h3 className="cta-title">{t('referral.readyToStartEarning')}</h3>
            <p className="cta-description">
              {t('referral.readyToStartEarningDesc')}
            </p>
            <div className="cta-buttons">
              <button className="cta-primary" onClick={handleGetReferralLink}>{t('referral.getReferralLinkButton')}</button>
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
              <h3>{t('referral.yourReferralLink')}</h3>
              <button
                className="referral-modal-close"
                onClick={() => setShowReferralModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="referral-modal-content">
              <p>{t('referral.shareReferralText')}</p>
              <div className="referral-link-container">
                <div className="referral-link-display">
                  <span className="referral-link-text">
                    {address ? `${window.location.origin}?ref=${address}` : t('referral.pleaseConnectWallet')}
                  </span>
                  <button
                    className="copy-referral-btn"
                    onClick={copyToClipboard}
                    disabled={!address}
                  >
                    <FaCopy />
                    {t('referral.copy')}
                  </button>
                </div>
              </div>
              <div className="referral-share-buttons">
                <button 
                  className="share-referral-btn whatsapp" 
                  onClick={shareOnWhatsApp} 
                  disabled={!address}
                >
                  {t('referral.whatsapp')}
                </button>
                <button 
                  className="share-referral-btn telegram" 
                  onClick={shareOnTelegram} 
                  disabled={!address}
                >
                  {t('referral.telegram')}
                </button>
                <button 
                  className="share-referral-btn twitter" 
                  onClick={shareOnTwitter} 
                  disabled={!address}
                >
                  {t('referral.twitter')}
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

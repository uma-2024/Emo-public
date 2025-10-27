import React, { useEffect, useMemo, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./Header.css";
import video from "../../assets/bg.mp4";
import ConnectButton from "../ConnectButton/ConnectButton";
import { WalletContext } from "../WalletConnect/WalletConnect";
import { usePresaleContract } from "../../hooks/usePresaleContract";


// Configure real links (or use .env)
const EMAIL_TO = import.meta.env.VITE_CONTACT_EMAIL || "support@example.com";
const TELEGRAM_URL =
  import.meta.env.VITE_TELEGRAM_URL || "https://t.me/your_channel";

const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { provider, address } = useContext(WalletContext);
  const { phaseData, loading, error } = usePresaleContract(provider, address);

  const getRouteContent = (path) => {
    switch(path) {
      case "/":
        return {
          title: (
            <>
              {t('header.homeTitle1')} <br />
              <span>{t('header.homeTitle2')}</span>
            </>
          ),
          subtitle: t('header.homeSubtitle'),
          buttons: [t('header.joinPreSaleNow'), t('header.whitepaper')],
        };
      case "/tokenomics":
        return {
          title: (
            <>
              {t('header.tokenomicsTitle1')} <br />
              <span>{t('header.tokenomicsTitle2')}</span>
            </>
          ),
          subtitle: t('header.tokenomicsSubtitle'),
          buttons: [t('header.joinPreSale'), t('header.whitepaper')],
        };
      case "/about":
        return {
          title: (
            <>
              {t('header.aboutTitle1')} <br />
              <span>{t('header.aboutTitle2')}</span>
            </>
          ),
          subtitle: t('header.aboutSubtitle'),
          buttons: [t('header.joinPreSale'), t('header.contactUs')],
        };
      case "/contact":
        return {
          title: t('header.contactTitle'),
          subtitle: t('header.contactSubtitle'),
          buttons: [t('header.joinPreSale'), t('header.contactUs')],
        };
      case "/features":
        return {
          title: t('header.featuresTitle'),
          subtitle: t('header.featuresSubtitle'),
          buttons: [t('header.exploreFeatures'), t('header.useCases')],
        };
      case "/pre-sale":
        return {
          title: (
            <>
              {t('header.presaleTitle1')} <br />
              <span>{t('header.presaleTitle2')}</span>
            </>
          ),
          subtitle: t('header.presaleSubtitle'),
          buttons: [t('header.joinNow'), t('header.claimNow')],
          showCountdown: true,
        };
      case "/referral":
        return {
          title: (
            <>
              {t('header.referralTitle1')} <br />
              <span>{t('header.referralTitle2')}</span>
            </>
          ),
          subtitle: t('header.referralSubtitle'),
          buttons: [t('header.getReferralLink'), t('header.joinPreSale')],
          showCountdown: false,
        };
      case "/announcement":
        return {
          title: t('header.announcementTitle'),
          subtitle: t('header.announcementSubtitle'),
          buttons: [t('header.joinPreSale'), t('header.contactUs')],
        };
      default:
        return {
          title: (
            <>
              {t('header.homeTitle1')} <br />
              <span>{t('header.homeTitle2')}</span>
            </>
          ),
          subtitle: t('header.homeSubtitle'),
          buttons: [t('header.joinPreSaleNow'), t('header.whitepaper')],
        };
    }
  };

  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const content = getRouteContent(normalizedPath);

  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    isLoading: true,
  });

  // Get target timestamp from contract phase data
  const targetTs = useMemo(() => {
    if (!phaseData || !phaseData.endTime) {
      return null;
    }
    // Convert from seconds to milliseconds
    return Number(phaseData.endTime) * 1000;
  }, [phaseData]);

  // Determine if we should show loading state
  const shouldShowLoading = useMemo(() => {
    // Show loading if:
    // 1. We're on the pre-sale page
    // 2. AND (contract is loading OR no wallet connected OR contract has error)
    if (!content?.showCountdown) return false;
    
    return loading || !address || error || !phaseData;
  }, [content?.showCountdown, loading, address, error, phaseData]);

  useEffect(() => {
    if (!content?.showCountdown) return;
    
    // If we should show loading state, show "00" with loading spinner
    if (shouldShowLoading) {
      setCountdown({ 
        days: "00", 
        hours: "00", 
        minutes: "00", 
        seconds: "00",
        isLoading: true 
      });
      return;
    }

    // If no contract data yet, show "00" without loading
    if (!targetTs) {
      setCountdown({ 
        days: "00", 
        hours: "00", 
        minutes: "00", 
        seconds: "00",
        isLoading: false 
      });
      return;
    }

    let intervalId;

    const tick = () => {
      const now = Date.now();
      const distance = targetTs - now;

      if (distance <= 0) {
        setCountdown({ 
          days: "00", 
          hours: "00", 
          minutes: "00", 
          seconds: "00",
          isLoading: false 
        });
        if (intervalId) clearInterval(intervalId);
        return;
      }

      const d = Math.floor(distance / 86400000);
      const h = Math.floor((distance % 86400000) / 3600000);
      const m = Math.floor((distance % 3600000) / 60000);
      const s = Math.floor((distance % 60000) / 1000);

      setCountdown({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
        isLoading: false,
      });
    };

    tick();
    intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [content?.showCountdown, targetTs, shouldShowLoading]);

  const handleHeaderButtonClick = (label) => {
    if (/join pre-sale/i.test(label)) {
      navigate("/pre-sale");
      return;
    }
    if (/join now/i.test(label)) {
      // Scroll to the presale section (ReserveAccessCard)
      const presaleSection = document.querySelector('.reserve-card');
      if (presaleSection) {
        presaleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    if (/claim now/i.test(label)) {
      // Scroll to the claim section
      const claimSection = document.querySelector('.claim-container');
      if (claimSection) {
        claimSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    if (/get referral link/i.test(label)) {
      // Scroll to bottom 20% of the page
      const doc = document.documentElement;
      const body = document.body;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        doc.clientHeight,
        doc.scrollHeight,
        doc.offsetHeight
      );
      const maxScrollTop = docHeight - window.innerHeight;
      const targetTop = Math.max(0, maxScrollTop * 0.8); // 80% down = bottom 20%
      window.scrollTo({ top: targetTop, behavior: "smooth" });
      return;
    }
    if (/view leaderboard/i.test(label)) {
      // Scroll to the referral system section
      const referralSection = document.querySelector('.referral-system');
      if (referralSection) {
        referralSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    if (/contact/i.test(label)) {
      navigate("/contact");
      return;
    }
    if (/our vision/i.test(label)) {
      const doc = document.documentElement;
      const body = document.body;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        doc.clientHeight,
        doc.scrollHeight,
        doc.offsetHeight
      );
      const maxScrollTop = docHeight - window.innerHeight;
      const targetTop = Math.max(0, maxScrollTop - 2200);
      window.scrollTo({ top: targetTop, behavior: "smooth" });
      return;
    }
    if (/buy now/i.test(label)) {
      window.scrollTo({ top: 700, behavior: "smooth" });
      return;
    }
    if (/whitepaper/i.test(label)) {
      window.open(
        "/XIKS Chain - Whitepaper.pdf",
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }
    if (/email/i.test(label)) {
      window.location.href = `mailto:${EMAIL_TO}`;
      return;
    }
    if (/telegram/i.test(label)) {
      window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer");
      return;
    }
  };

  if (!content) return null;

  return (
    <div className="header">
      <video
        className="header-video"
        autoPlay
        muted
        loop
        playsInline
        src={video}
      />
  
      <div className="header-content">
        {content.showCountdown && (
          <div className="countdown-timer">
            <div className="countdown-box">
              <div className={countdown.isLoading ? "loading-spinner" : ""}>
                {countdown.isLoading ? "" : countdown.days}
              </div>
              <span>DAYS</span>
            </div>
            <div className="countdown-box">
              <div className={countdown.isLoading ? "loading-spinner" : ""}>
                {countdown.isLoading ? "" : countdown.hours}
              </div>
              <span>HOURS</span>
            </div>
            <div className="countdown-box">
              <div className={countdown.isLoading ? "loading-spinner" : ""}>
                {countdown.isLoading ? "" : countdown.minutes}
              </div>
              <span>MINUTES</span>
            </div>
            <div className="countdown-box">
              <div className={countdown.isLoading ? "loading-spinner" : ""}>
                {countdown.isLoading ? "" : countdown.seconds}
              </div>
              <span>SECONDS</span>
            </div>
          </div>
        )}


        <h1 className="header-title">{content.title}</h1>
        <p className="header-subtitle">{content.subtitle}</p>

        <div className="header-buttons">
          {content.buttons.map((label, idx) =>
            /connect wallet/i.test(label) ? (
              <ConnectButton key={idx} className="secondary-btn" />
            ) : (
              <button
                key={idx}
                className={idx === 0 ? "wallet-btn2" : "secondary-btn"}
                onClick={() => handleHeaderButtonClick(label)}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;


import React, { useEffect, useMemo, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import video from "../../assets/bg.mp4";
import ConnectButton from "../ConnectButton/ConnectButton";
import { WalletContext } from "../WalletConnect/WalletConnect";
import { usePresaleContract } from "../../hooks/usePresaleContract";


// Configure real links (or use .env)
const EMAIL_TO = import.meta.env.VITE_CONTACT_EMAIL || "support@example.com";
const TELEGRAM_URL =
  import.meta.env.VITE_TELEGRAM_URL || "https://t.me/your_channel";

const routeContent = {
  "/": {
    title: (
      <>
        The First Self-Evolving <br />
        <span>Blockchain - Powered by AI </span>
      </>
    ),
    subtitle:
      "An intelligent, autonomous network that upgrades, scales, and secures itself — while providing contributors with access to network functionality on every block.",
    buttons: ["Join Pre-Sale Now", "Whitepaper"],
  },
  "/tokenomics": {
    title: (
      <>
        Transparent. Sustainable. <br />
        <span> Decentralized. </span>
      </>
    ),
    subtitle:
      "XIK Tokenomics are designed to support ecosystem growth, encourage early participation, and enable a truly decentralized, AI-governed blockchain economy.",
    buttons: ["Join Pre-Sale", "Whitepaper"],
  },
  "/about": {
    title: (
      <>
        The AI-Driven Blockchain of <br />
        <span> Tomorrow </span>
      </>
    ),
    subtitle:
      "XIK is an autonomous Layer 1 blockchain governed by intelligent agents. Built for scalability, security, and decentralized intelligence — this is where AI meets the core of Web3.",
    buttons: ["Join Pre-Sale", "Contact Us"],
  },
  "/contact": {
    title: "Get in touch",
    subtitle:
      "We offering you insights into the token’s supply, available chains, and rich DeFi features. The new and improved tokenomics is transforming the GoC token into a true utility gem.",
    buttons: ["Join Pre-Sale", "Contact Us"],
  },
  "/features": {
    title: "Powerful Features",
    subtitle: "AI-backed upgrades, smart governance, seamless scalability.",
    buttons: ["Explore Features", "Use Cases"],
  },
  "/pre-sale": {
    title: (
      <>
        Join the Future of <br />
        <span> Autonomous Blockchain </span>
      </>
    ),
    subtitle:
      "XIKS is the first AI-governed, mobile-first, quantum-secure blockchain ecosystem. By joining the pre-sale, you're getting in early on a next-gen financial network powered by 80+ autonomous agents. Limited supply. No VC control. 100% community-led.",
    buttons: ["Join Now", "Claim Now"],
    showCountdown: true,
  },
  "/referral": {
    title: (
      <>
        Earn XIK Tokens by <br />
        <span> Referring Friends </span>
      </>
    ),
    subtitle:
      "Join our referral program and earn up to 75,000 XIK tokens! Share your unique referral link with friends and earn rewards when they participate in the presale. The more you refer, the more you earn!",
    buttons: ["Get Referral Link", "Join Pre-Sale"],
    showCountdown: false,
  },
  "/announcement": {
    title: "Announcement",
    subtitle:
      "We offering you insights into the token’s supply, available chains, and rich DeFi features. The new and improved tokenomics is transforming the GoC token into a true utility gem.",
    buttons: ["Join Pre-Sale", "Contact Us"],
  },
};

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { provider, address } = useContext(WalletContext);
  const { phaseData, loading, error } = usePresaleContract(provider, address);

  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const content = routeContent[normalizedPath] ?? routeContent["/"];

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


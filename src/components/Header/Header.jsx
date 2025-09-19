import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import video from "../../assets/bg.mp4";

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
        <span>  Decentralized. </span>
      </>
    ), 
    subtitle: "XIK Tokenomics are designed to support ecosystem growth, encourage early participation, and enable a truly decentralized, AI-governed blockchain economy.",
    buttons: ["Join Pre-Sale", "Connect Wallet"],
  },
  "/about": {
    title: (
      <>
       The AI-Driven Blockchain of <br />
        <span>  Tomorrow </span>
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
    subtitle: "XIKS is the first AI-governed, mobile-first, quantum-secure blockchain ecosystem.By joining the pre-sale, you’re getting in early on a next-gen financial network powered by 80+ autonomous agents. Limited supply. No VC control. 100% community-led.",
    buttons: ["IDO price $1", "Listing price $2"],
    showCountdown: true,
  },
  "/announcement": {
    title: "Announcement",
    subtitle:
      "We offering you insights into the token’s supply, available chains, and rich DeFi features. The new and improved tokenomics is transforming the GoC token into a true utility gem.  ",
    buttons: ["Join Pre-Sale", "Contact Us"],
  },
};

const Header = () => {
  const { pathname } = useLocation();

  // Normalize pathname (remove trailing slashes). Fall back to "/"
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const content = routeContent[normalizedPath] ?? routeContent["/"];

  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Keep target timestamp stable (IST: UTC+05:30)
  const targetTs = useMemo(
    () => new Date("2025-12-01T00:00:00+05:30").getTime(),
    []
  );

  useEffect(() => {
    if (!content?.showCountdown) return;

    let intervalId;

    const tick = () => {
      const now = Date.now();
      const distance = targetTs - now;

      if (distance <= 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        if (intervalId) clearInterval(intervalId);
        return;
      }

      const d = Math.floor(distance / 86400000); // 24*60*60*1000
      const h = Math.floor((distance % 86400000) / 3600000); // 60*60*1000
      const m = Math.floor((distance % 3600000) / 60000); // 60*1000
      const s = Math.floor((distance % 60000) / 1000); // 1000

      setCountdown({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    };

    // Initial paint + start interval
    tick();
    intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [content?.showCountdown, targetTs]);

  // Handle header button actions
  const handleHeaderButtonClick = (label) => {
    // Our Vision → smooth scroll to ~2200px above the bottom
    if (label === "Our Vision") {
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
      window.open("/XIKS Chain - Whitepaper.pdf", "_blank", "noopener,noreferrer");
      return;
    }
    // Email Us / Contact Us → open mail client
    if (/email/i.test(label) || /contact/i.test(label)) {
      window.location.href = `mailto:${EMAIL_TO}`;
      return;
    }

    // Join Telegram → open Telegram in new tab
    if (/telegram/i.test(label)) {
      window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer");
      return;
    }

    // Other labels: keep as no-op for now
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
              <div>{countdown.days}</div>
              <span>DAYS</span>
            </div>
            <div className="countdown-box">
              <div>{countdown.hours}</div>
              <span>HOURS</span>
            </div>
            <div className="countdown-box">
              <div>{countdown.minutes}</div>
              <span>MINUTES</span>
            </div>
            <div className="countdown-box">
              <div>{countdown.seconds}</div>
              <span>SECONDS</span>
            </div>
          </div>
        )}

        <h1 className="header-title">{content.title}</h1>
        <p className="header-subtitle">{content.subtitle}</p>

        <div className="header-buttons">
          {content.buttons.map((label, idx) => (
            <button
              key={idx}
              className={idx === 0 ? "wallet-btn" : "secondary-btn"}
              onClick={() => handleHeaderButtonClick(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;

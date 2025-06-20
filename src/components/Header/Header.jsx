import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import video from "../../assets/bg.mp4";

const routeContent = {
  "/": {
    title: (
      <>
        Join the Future of <br />
        <span>Autonomous Blockchain</span>
      </>
    ),
    subtitle:
      "Unlock the next evolution of decentralized infrastructure with self-upgrading, AI-powered smart chains.",
    buttons: ["Join Pre-Sale Now", "Whitepaper"],
  
  },
  "/tokenomics": {
    title: "Tokenomics Breakdown",
    subtitle: "Understand how tokens are distributed, burned, and earned.",
    buttons: ["Explore Tokenomics", "Download Report"],
  },
  "/about-us": {
    title: "Who We Are",
    subtitle: "Meet the team behind XIK and our mission to decentralize innovation.",
    buttons: ["Our Vision", "Team"],
  },
  "/contact-us": {
    title: "Let’s Get in Touch",
    subtitle: "We’re here to answer questions, support you, and build together.",
    buttons: ["Email Us", "Join Telegram"],
  },
  "/features": {
    title: "Powerful Features",
    subtitle: "AI-backed upgrades, smart governance, seamless scalability.",
    buttons: ["Explore Features", "Use Cases"],
  },
  "/pre-sale": {
    title: "Secure Your Allocation",
    subtitle: "Join the limited-time pre-sale and reserve your spot in the XIK ecosystem.",
    buttons: ["Buy Now", "Know More"],
    showCountdown: true,
  },
};

const Header = () => {
  const { pathname } = useLocation();
  const content = routeContent[pathname];
  const [countdown, setCountdown] = useState({
    days: "30",
    hours: "30",
    minutes: "60",
    seconds: "50",
  });

  // Set your target date here
  const targetDate = new Date("2025-05-12T00:00:00Z").getTime();

  useEffect(() => {
    if (!content?.showCountdown) {
        // alert("content?.showCountdown not found")
        return;
        
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

    //   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //   const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    //   const minutes = Math.floor((distance / 1000 / 60) % 60);
    //   const seconds = Math.floor((distance / 1000) % 60);

      setCountdown({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });

      if (distance < 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [content]);

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
        type="video/mp4"
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

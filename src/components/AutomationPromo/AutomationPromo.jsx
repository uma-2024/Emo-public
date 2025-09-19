import React from "react";
import "./AutomationPromo.css";
import video from '../../assets/bg.mp4'

const AutomationPromo = () => {
  return (
    <div className="automation-promo-wrapper">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="automation-bg-video"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="automation-promo-overlay">
        <h2 className="automation-heading">
          Unlock The Future of Intelligent Automation
        </h2>
        <p className="automation-subtext">
          Discover the innovative Tokenomics ics driving the next generation of
          automation and join our exclusive Pre-Sale event. Be among the first
          to own the currency powering the intelligent automation revolution.
        </p>
        <div className="automation-buttons">
          <button className="automation-btn primary" >Join Pre-Sale Now</button>
          <button className="automation-btn secondary" onClick={() => {
    const link = document.createElement("a");
    link.href = "/XIKS Chain - Whitepaper.pdf"; // file in public folder
    link.download = "whitepaper.pdf"; // force download with filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }}>Whitepaper</button>
        </div>
      </div>
    </div>
  );
};

export default AutomationPromo;

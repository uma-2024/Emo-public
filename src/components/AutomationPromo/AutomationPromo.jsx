import React from "react";
import { useTranslation } from 'react-i18next';
import "./AutomationPromo.css";
import video from '../../assets/bg.mp4'
import { useNavigate } from "react-router-dom";

const AutomationPromo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
          {t('automation.heading')}
        </h2>
        <p className="automation-subtext">
          {t('automation.subtext')}
        </p>
        <div className="automation-buttons">
        <button
      className="automation-btn primary"
      onClick={() => navigate("/pre-sale")}
    >
      {t('automation.joinPresale')}
    </button>
          <button className="automation-btn secondary" onClick={() => {
    const link = document.createElement("a");
    link.href = "/XIKS Chain - Whitepaper.pdf"; // file in public folder
    link.download = "whitepaper.pdf"; // force download with filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }}>{t('automation.whitepaper')}</button>
        </div>
      </div>
    </div>
  );
};

export default AutomationPromo;

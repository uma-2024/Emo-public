import React from "react";
import { useTranslation } from 'react-i18next';
import "./WhatIsXIK.css";
import xikLogo from "../../assets/images/logo.png"; 
import icon from "../../assets/images/Group 112.svg";
import video from '../../assets/bg.mp4'

const WhatIsXIK = () => {
  const { t } = useTranslation();
  return (
    <div className="xik-container">
      <div className="xik-left">
        <div className="xik-card">

          <video
            className="xik-card-video-bg"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="xik-card-content">
            <img src={icon} alt="AI Icon" className="xik-top-icon" />
            <h2 className="xik-title">{t('whatIsXik.title')}</h2>
            <p className="xik-desc">
              {t('whatIsXik.description1')} <strong>{t('whatIsXik.description3')}</strong>
            </p>
            <p className="xik-desc">
              {t('whatIsXik.description2')}
            </p>
            <p className="xik-desc">
              <strong>{t('whatIsXik.burnMechanism')}</strong> {t('whatIsXik.burnDescription')}
            </p>

            <div className="xik-subsection">
              <p className="xik-subtitle">{t('whatIsXik.whyItMatters')}</p>
              <ul className="xik-list">
                <li>{t('whatIsXik.point1')}</li>
                <li>{t('whatIsXik.point2')}</li>
                <li>{t('whatIsXik.point3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="xik-right">
        <img src={xikLogo} alt="XIK Logo" className="xik-logo" />
      </div>
    </div>
  );
};

export default WhatIsXIK;

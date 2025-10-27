import React from "react";
import { useTranslation } from 'react-i18next';
import "./TokenInfoCard.css";
import chartImage from '../../assets/images/logo.png';
import video from '../../assets/bg.mp4' 
import infoImage from '../../assets/images/info.gif'
const TokenInfoCard = () => {
  const { t } = useTranslation();
  return (
    <div className="token-info-container">
      
      <div className="token-info-left">
        <video
          className="token-info-video-bg"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="token-info-content-overlay">
          <div className="token-info-icon-wrapper">
           <img src={infoImage} alt="info"/>
          </div>
          <div className="token-info-text">
            <h2 className="token-info-title">{t('tokenInfo.title')}</h2>
            <p><strong>{t('tokenInfo.tokenNameLabel')}</strong> {t('tokenInfo.tokenNameValue')}</p>
            <p><strong>{t('tokenInfo.networkLabel')}</strong> {t('tokenInfo.networkValue')}</p>
            <p><strong>{t('tokenInfo.standardLabel')}</strong> {t('tokenInfo.standardValue')}</p>
          </div>
        </div>
      </div>

      <div className="token-info-chart">
        <div className="chart-header">
          <span className="chart-title">{t('tokenInfo.sale')}</span>
          <span className="chart-year">2025</span>
          <span className="chart-duration">7 {t('tokenInfo.days')}</span>
        </div>
        <div className="chart-body">
          <img src={chartImage} alt="Token Chart" className="chart-image" />
        </div>
      </div>
      
    </div>
  );
};

export default TokenInfoCard;

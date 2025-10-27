import React from "react";
import { useTranslation } from 'react-i18next';
import "./TokenInfoSection.css";
import infoIcon from "../../assets/info-icon.svg"; 
import chartImage from "../../assets/chart-placeholder.png";

const TokenInfoSection = () => {
  const { t } = useTranslation();
  return (
    <div className="token-info-container">
      <div className="token-info-left">
        <img src={infoIcon} alt="info icon" className="info-icon" />
        <h3>{t('tokenInfo.title')}</h3>
        <p><strong>{t('tokenInfo.tokenNameLabel')}</strong> {t('tokenInfo.tokenNameValue')}</p>
        <p><strong>{t('tokenInfo.networkLabel')}</strong> {t('tokenInfo.networkValue')}</p>
        <p><strong>{t('tokenInfo.standardLabel')}</strong> {t('tokenInfo.standardValue')}</p>
      </div>

      <div className="token-info-right">
        <img src={chartImage} alt="token chart" className="chart-image" />
      </div>
    </div>
  );
};

export default TokenInfoSection;

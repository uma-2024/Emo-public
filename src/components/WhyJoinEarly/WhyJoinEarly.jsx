import React from "react";
import { useTranslation } from 'react-i18next';
import "./WhyJoinEarly.css";
import illustration from "../../assets/images/nft-holder.svg"; 
import video from '../../assets/bg.mp4'
const WhyJoinEarly = () => {
  const { t } = useTranslation();
  return (
    <div className="why-join-wrapper">
      <video
        className="why-bg-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="why-join-overlay">
        <div className="why-left">
          <h2 className="why-title">{t('whyJoin.title')}</h2>
          <ul className="why-points">
            <li><span className="check">✔</span> {t('whyJoin.point1')}</li>
            <li><span className="check">✔</span> {t('whyJoin.point2')} <span className="highlight">{t('whyJoin.point2Highlight')}</span></li>
            <li><span className="check">✔</span> {t('whyJoin.point3')}</li>
            <li><span className="check">✔</span> {t('whyJoin.point4')}</li>
            <li><span className="check">✔</span> {t('whyJoin.point5')}</li>
            <li><span className="check">✔</span> {t('whyJoin.point6')}</li>
          </ul>
        </div>
        <div className="why-right">
          <img src={illustration} alt="Join Early Illustration" />
        </div>
      </div>
    </div>
  );
};

export default WhyJoinEarly;

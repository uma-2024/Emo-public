import React from "react";
import { useTranslation } from 'react-i18next';
import "./VisionMission.css";
import visionIcon from "../../assets/images/vision.gif"; 
import missionIcon from "../../assets/images/mission.gif"; 

const VisionMission = () => {
  const { t } = useTranslation();
  return (
    <div className="vision-mission-container">
      <div className="card">
        <img src={visionIcon} alt="Vision Icon" className="card-icon" />
        <h3 className="card-title">{t('vision.title')}</h3>
        <p className="card-text">
          {t('vision.description')}
        </p>
      </div>
      <div className="card">
        <img src={missionIcon} alt="Mission Icon" className="card-icon" />
        <h3 className="card-title">{t('mission.title')}</h3>
        <p className="card-text">
          {t('mission.description')}
        </p>
      </div>
    </div>
  );
};

export default VisionMission;

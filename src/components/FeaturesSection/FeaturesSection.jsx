import React from "react";
import { useTranslation } from 'react-i18next';
import "./FeaturesSection.css";
import autoImage from '../../assets/images/autonomous 2.svg'
import ecoImage from '../../assets/images/economy-growth 1.svg'
import humanImage from '../../assets/images/Vector.svg'

const FeaturesSection = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: autoImage,
      title: t('features.circularValue.title'),
      description: t('features.circularValue.description'),
    },
    {
      icon: ecoImage,
      title: t('features.autonomousGov.title'),
      description: t('features.autonomousGov.description'),
    },
    {
      icon: humanImage,
      title: t('features.humanGuided.title'),
      description: t('features.humanGuided.description'),
    },
  ];

  return (
    <div className="features-container">
      {/* Title and Description Section */}
      <div className="features-header">
        <h2 className="features-title">{t('features.title')}</h2>
        <p className="features-description">
          {t('features.description')}
        </p>
      </div>

      {/* Features Grid */}
      <div className="features-section">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <img src={feature.icon} alt={feature.title} className="feature-icon" />
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;

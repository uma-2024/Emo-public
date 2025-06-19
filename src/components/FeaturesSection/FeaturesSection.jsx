import React from "react";
import "./FeaturesSection.css";
import autoImage from '../../assets/images/autonomous 2.svg'
import ecoImage from '../../assets/images/economy-growth 1.svg'
import humanImage from '../../assets/images/Vector.svg'

const features = [
  {
    icon: autoImage , 
    title: "Circular Value Economy",
    description:
      "All transaction fees, agent activity, and protocol incentives are designed to support active participants and contributors within the ecosystem.",
  },
  {
    icon: ecoImage,
    title: "Autonomous AI Governance",
    description:
      "80+ AI agents autonomously manage operations — from security and scaling to economic calibration.",
  },
  {
    icon: humanImage,
    title: "Human-Guided Decisions",
    description:
      "Token holders steer the long-term vision through biometric-secured voting, while AI handles execution.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="features-section">
      {features.map((feature, index) => (
        <div className="feature-card" key={index}>
          <img src={feature.icon} alt={feature.title} className="feature-icon" />
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-description">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesSection;

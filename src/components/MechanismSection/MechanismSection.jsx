import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import "./MechanismSection.css";
import video from "../../assets/bg.mp4";
import illustration1 from "../../assets/images/blockchain.svg";
import illustration2 from "../../assets/images/image1.svg";
import illustration3 from "../../assets/images/image3.svg";
import illustration4 from "../../assets/images/image2.svg";
import ConnectButton from "../ConnectButton/ConnectButton";
import { useNavigate } from "react-router-dom";

const MechanismSection = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  
  const slides = [
    {
      illustration: illustration1,
      title: t('mechanism.slide1Title'),
      subtext: t('mechanism.slide1Subtext'),
      primary: {
        label: t('mechanism.slide1Button'),
        onClick: () => {
         navigate("/pre-sale")
        },
      },
      secondary: { component: <ConnectButton  className="mechanism-btn secondary"/> }, 
    },
    {
      illustration: illustration2,
      title: t('mechanism.slide2Title'),
      subtext: t('mechanism.slide2Subtext'),
      primary: {
        label: t('mechanism.slide2Button'),
        onClick: () => {
          /*…*/
        },
      },
      secondary: {
        label: t('mechanism.slide2Button2'),
        onClick: () => {
          /*…*/
        },
      },
    },
    {
      illustration: illustration3,
      title: t('mechanism.slide3Title'),
      subtext: t('mechanism.slide3Subtext'),
      primary: {
        label: t('mechanism.slide3Button'),
        onClick: () => {
          /*…*/
        },
      },
      secondary: {
        label: t('mechanism.slide3Button2'),
        onClick: () => {
          /*…*/
        },
      },
    },
    {
      illustration: illustration4,
      title: t('mechanism.slide4Title'),
      subtext: t('mechanism.slide4Subtext'),
      primary: {
        label: t('mechanism.slide4Button'),
        onClick: () => {
          /*…*/
        },
      },
      secondary: {
        label: t('mechanism.slide4Button2'),
        onClick: () => {
          /*…*/
        },
      },
    },
  ];
  
  const { illustration, title, subtext, primary, secondary } =
    slides[activeIndex];


  return (
    <div className="mechanism-section-wrapper">
      <video className="mechanism-bg-video" autoPlay loop muted playsInline>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="mechanism-section-container">
        <div className="mechanism-left">
          <img
            src={illustration}
            alt={title}
            className="mechanism-illustration"
          />
        </div>

        <div className="mechanism-right">
          <h2 className="mechanism-title">{title}</h2>
          <p className="mechanism-subtext">{subtext}</p>
          <div className="mechanism-buttons">
            <button className="mechanism-btn primary" onClick={primary.onClick}>
              {primary.label}
            </button>

            {secondary.component ? (
              secondary.component
            ) : (
              <button
                className="mechanism-btn secondary"
                onClick={secondary.onClick}
              >
                {secondary.label}
              
              </button>
            )}
          </div>
        </div>

        <div className="mechanism-dots">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
      
        </div>
      </div>
    </div>
  );
};

export default MechanismSection;

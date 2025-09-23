import React, { useState } from "react";
import "./MechanismSection.css";
import video from "../../assets/bg.mp4";
import illustration1 from "../../assets/images/blockchain.svg";
import illustration2 from "../../assets/images/image1.svg";
import illustration3 from "../../assets/images/image3.svg";
import illustration4 from "../../assets/images/image2.svg";
import ConnectButton from "../ConnectButton/ConnectButton";
import { useNavigate } from "react-router-dom";

const MechanismSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const slides = [
    {
      illustration: illustration1,
      title: "XIK uses an agent-based proof-of-stake consensus mechanism.",
      subtext:
        "Join the movement and be part of the most advanced Web3 infrastructure ever built.",
      primary: {
        label: "Join Pre-Sale",
        onClick: () => {
         navigate("/pre-sale")
        },
      },
      secondary: { component: <ConnectButton  className="mechanism-btn secondary"/> }, 
    },
    {
      illustration: illustration2,
      title: "Unmatched Security Powered by Intelligent Agents",
      subtext:
        "XIK leverages autonomous agents to continuously monitor, detect, and prevent malicious behavior creating a self-healing, attack-resilient blockchain environment.",
      primary: {
        label: "Learn More",
        onClick: () => {
          /*…*/
        },
      },
      secondary: {
        label: "Get Started",
        onClick: () => {
          /*…*/
        },
      },
    },
    {
      illustration: illustration3,
      title: "Cross-Chain Ready with Zero Friction",
      subtext:
        "Bridge assets and data across ecosystems with XIK’s native cross-chain capabilities—no need for complex wrappers or third-party tools.",
      primary: {
        label: "Discover",
        onClick: () => {
          /*…*/
        },
      },
      secondary: {
        label: "Sign Up",
        onClick: () => {
          /*…*/
        },
      },
    },
    {
      illustration: illustration4,
      title: "Cross-Chain Ready with Zero Friction",
      subtext:
        "Bridge assets and data across ecosystems with XIK’s native cross-chain capabilities—no need for complex wrappers or third-party tools.",
      primary: {
        label: "Explore",
        onClick: () => {
          /*…*/
        },
      },
      secondary: {
        label: "Join Now",
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

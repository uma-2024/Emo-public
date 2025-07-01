import React from "react";
import "./VisionMission.css";
import visionIcon from "../../assets/images/vision.gif"; 
import missionIcon from "../../assets/images/mission.gif"; 

const VisionMission = () => {
  return (
    <div className="vision-mission-container">
      <div className="card">
        <img src={visionIcon} alt="Vision Icon" className="card-icon" />
        <h3 className="card-title">Our Vision</h3>
        <p className="card-text">
          To build the first truly intelligent blockchain that runs itself — maintained, governed,
          and improved by its own AI-powered agents.
        </p>
      </div>
      <div className="card">
        <img src={missionIcon} alt="Mission Icon" className="card-icon" />
        <h3 className="card-title">Our Mission</h3>
        <p className="card-text">
          To empower users, developers, and machines through a decentralized and transparent
          infrastructure where automation equals freedom, not control.
        </p>
      </div>
    </div>
  );
};

export default VisionMission;

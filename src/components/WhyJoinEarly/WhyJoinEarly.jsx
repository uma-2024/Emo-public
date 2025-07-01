import React from "react";
import "./WhyJoinEarly.css";
import illustration from "../../assets/images/nft-holder.svg"; 
import video from '../../assets/bg.mp4'
const WhyJoinEarly = () => {
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
          <h2 className="why-title">Why Join Early?</h2>
          <ul className="why-points">
            <li><span className="check">✔</span> AI-powered blockchain that upgrades itself</li>
            <li><span className="check">✔</span> No VCs or insiders — <span className="highlight">Early users become governance</span></li>
            <li><span className="check">✔</span> Mobile mining: Earn XIK passively</li>
            <li><span className="check">✔</span> Quantum-Secure and future-proof</li>
            <li><span className="check">✔</span> Strong utility: Gas, staking, voting, AI agent deployment</li>
            <li><span className="check">✔</span> Eco-positive: 2% profits go to carbon removal</li>
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

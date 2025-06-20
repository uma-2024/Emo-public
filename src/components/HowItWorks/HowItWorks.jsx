import React from "react";
import "./HowItWorks.css";
import docImage from "../../assets/images/doc.svg"; 
import videoBg from "../../assets/bg.mp4";
import { FaFileDownload } from "react-icons/fa";

export default function HowItWorks() {
  return (
    <div className="how-it-works-section">
      <div className="how-left">
        <img src={docImage} alt="Documents Illustration" />
      </div>

      <div className="how-right">
       
        <video className="bg-video" autoPlay muted loop playsInline>
          <source src={videoBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

   
        <div className="how-content">
          <h2 className="headline">
            Want the picture<br />
            of how it works?
          </h2>
          <p className="description">
            Discover how XIK combines A.I., mobile mining, and quantum-resistant
            security to power the world’s first autonomous blockchain economy.
          </p>
          <button className="whitepaper-btn">
            <FaFileDownload style={{ marginRight: "8px" }} />
            Whitepaper
          </button>
        </div>
      </div>
    </div>
  );
}

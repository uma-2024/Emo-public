import React from "react";
import { useTranslation } from 'react-i18next';
import "./HowItWorks.css";
import docImage from "../../assets/images/doc.svg";
import videoBg from "../../assets/bg.mp4";
import { FaFileDownload } from "react-icons/fa";

export default function HowItWorks() {
  const { t } = useTranslation();
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
            {t('howItWorks.title')}
            <br />
            {t('howItWorks.titleLine2')}
          </h2>
          <p className="description">
            {t('howItWorks.description')}
          </p>
          <button
            className="whitepaper-btn"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/XIKS Chain - Whitepaper.pdf";
              link.download = "whitepaper.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <FaFileDownload style={{ marginRight: "8px" }} />
            {t('howItWorks.whitepaper')}
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useTranslation } from 'react-i18next';
import "./Footer.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-logo">
          <img src={logo} alt="XIK Logo" />
          <p className="footer-tagline">
            {t('footer.tagline')}{" "}
            <span className="decentralized">{t('footer.decentralized')}</span> {t('footer.collaboration')}
            <br />
            {t('footer.weGrow')} <span className="grow">{t('footer.grow')}</span> {t('footer.together')}{" "}
            <span className="beyond">{t('footer.beyond')}</span> {t('footer.nextLevel')}
          </p>
        </div>
      </div>

      <div className="footer-links">
        <div className="footer-column">
          <h4 className="footer-container-title">{t('footer.company')}</h4>
          <ul>
            <li>
              <Link to="/about">{t('footer.aboutUs')}</Link>
            </li>
            <li>
              <Link to="/tokenomics">{t('footer.tokenomics')}</Link>
            </li>
            <li>
              <Link to="/pre-sale">{t('footer.preSale')}</Link>
            </li>
            <li>
              <Link to="/contact">{t('footer.contactUs')}</Link>
            </li>
          </ul>
        </div>
        {/* <div className="footer-column">
          <h4 className="footer-container-title">SUPPORT</h4>
          <ul>
            <li>Getting Started</li>
            <li>Help Center</li>
            <li>Server Status</li>
            <li>Report a Bug</li>
            <li>Chat Support</li>
          </ul>
        </div> */}
        <div className="footer-column">
          <h4 className="footer-container-title">{t('footer.resources')}</h4>
          <ul>
            <li>
              <a 
                href="/XIKS Chain - Whitepaper.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
               
              >
                {t('howItWorks.whitepaper')}
              </a>
            </li>
            <li>
              <Link to="/pre-sale" >
                {t('footer.joinPresale')}
              </Link>
            </li>
            <li>
              <Link to="/tokenomics">
                {t('footer.viewTokenomics')}
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-column newsletter">
          <h4 className="footer-container-title">
            {t('footer.subscribe')}
          </h4>
          <p>
            {t('footer.subscribeText')}
          </p>
          <div className="subscribe-form">
            <input type="email" placeholder={t('footer.emailPlaceholder')} />
            <button>{t('footer.subscribeButton')}</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t('footer.copyright')}</p>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/profile.php?id=61576894374414"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            href="https://x.com/XIKchain"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            href="https://www.instagram.com/xikchain/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

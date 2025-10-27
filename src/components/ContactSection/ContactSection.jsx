import React from "react";
import { useTranslation } from 'react-i18next';
import "./ContactSection.css";
import earthImage from '../../assets/images/earthImage.svg'
const ContactSection = () => {
  const { t } = useTranslation();
  return (
    <div className="contact-section">
      <div className="contact-form-wrapper">
        <h2 className="contact-title">{t('contact.title')}</h2>
        <form className="contact-form">
          <input type="text" placeholder={t('contact.namePlaceholder')} required />
          <input type="email" placeholder={t('contact.emailPlaceholder')} required />
          <textarea rows="5" placeholder={t('contact.messagePlaceholder')} required></textarea>
          <button type="submit">{t('contact.submitButton')}</button>
        </form>
      </div>

      <div className="contact-visual">
      
        <img
          src={earthImage}
          alt="Earth visual"
          className="contact-globe"
        />
      </div>
    </div>
  );
};

export default ContactSection;

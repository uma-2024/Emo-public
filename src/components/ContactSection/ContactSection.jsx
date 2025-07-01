import React from "react";
import "./ContactSection.css";
import earthImage from '../../assets/images/earthImage.svg'
const ContactSection = () => {
  return (
    <div className="contact-section">
      <div className="contact-form-wrapper">
        <h2 className="contact-title">Get In Touch</h2>
        <form className="contact-form">
          <input type="text" placeholder="Enter Name" required />
          <input type="email" placeholder="Email" required />
          <textarea rows="5" placeholder="Message" required></textarea>
          <button type="submit">Contact Us</button>
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

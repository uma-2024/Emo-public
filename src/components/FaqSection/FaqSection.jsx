import React, { useState } from "react";
import "./FaqSection.css";
import video from '../../assets/bg.mp4'
const faqs = [
  "What is XIK, and how does it work?",
  "How is blockchain related to cryptocurrency?",
  "Is Blockchain technology secure?",
  "How does blockchain enhance security?",
  "Can blockchain be hacked?",
  "How can I implement blockchain in my industry?"
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-wrapper">
      <video className="faq-bg-video" autoPlay muted loop playsInline>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="faq-container">
        <h4 className="faq-subheading">FAQ</h4>
        <h2 className="faq-heading">Get Answers To Common Questions</h2>
        <p className="faq-description">
          From basics to advanced topics, find everything you need to know right here.
          Let us help you simplify the process and find the clarity you're looking for.
        </p>

        <div className="faq-list">
          {faqs.map((question, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                {question}
                <span className="faq-toggle">{openIndex === index ? "−" : "+"}</span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>This is a sample answer for: {question}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;

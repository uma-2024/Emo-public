import React, { useState } from "react";
import "./FaqSection.css";
import video from '../../assets/bg.mp4'
const faqs = [
  {
    question: "What is XIK, and how does it work?",
    answer:
      "XIK is a decentralized blockchain ecosystem run by AI agents.",
  },
  {
    question: "How is blockchain related to cryptocurrency?",
    answer:
      "Blockchain is the underlying technology that powers cryptocurrencies. It acts as a distributed ledger where transactions are securely recorded and verified, making decentralized currencies like Bitcoin and XIK possible.",
  },
  {
    question: "Is Blockchain technology secure?",
    answer:
      "Yes. Blockchain uses advanced cryptography, distributed consensus, and immutability of records to ensure security. Transactions are verified by multiple participants, making data tampering extremely difficult.",
  },
  {
    question: "How does blockchain enhance security?",
    answer:
      "Blockchain enhances security by storing data across a decentralized network, using encryption to protect transactions, and applying consensus mechanisms that prevent unauthorized changes. This eliminates single points of failure.",
  },
  {
    question: "Can blockchain be hacked?",
    answer:
      "While no system is 100% immune, hacking a blockchain is highly impractical. An attacker would need to control over 51% of the network’s computing power simultaneously, which is extremely costly and nearly impossible for large networks.",
  },
  {
    question: "How can I implement blockchain in my industry?",
    answer:
      "You can implement blockchain by identifying processes that need transparency, trust, and security—such as payments, supply chain management, healthcare records, or identity verification—and integrating blockchain platforms or solutions into them.",
  },
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
        {faqs.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                {item.question}
                <span className="faq-toggle">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
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

import React from "react";
import "./AnnouncementSection.css";

const announcements = [
  {
    title: "Announcement 1",
    message:
      "XIK is the first AI-governed, mobile-first, quantum-secure blockchain ecosystem. By joining the pre-sale, you're getting in early on a next-gen financial network powered by 80+ autonomous agents. Limited supply. No VC control. 100% community-led.",
  },
  {
    title: "Announcement 2",
    message:
      "XIK is the first AI-governed, mobile-first, quantum-secure blockchain ecosystem. By joining the pre-sale, you're getting in early on a next-gen financial network powered by 80+ autonomous agents. Limited supply. No VC control. 100% community-led.",
  },
  {
    title: "Announcement 3",
    message:
      "XIK is the first AI-governed, mobile-first, quantum-secure blockchain ecosystem. By joining the pre-sale, you're getting in early on a next-gen financial network powered by 80+ autonomous agents. Limited supply. No VC control. 100% community-led.",
  },
  {
    title: "Announcement 4",
    message:
      "XIK is the first AI-governed, mobile-first, quantum-secure blockchain ecosystem. By joining the pre-sale, you're getting in early on a next-gen financial network powered by 80+ autonomous agents. Limited supply. No VC control. 100% community-led.",
  },
];

const AnnouncementSection = () => {
  return (
    <div className="announcement-wrapper">
      <div className="announcement-container">
        <h2 className="announcement-title">Announcement</h2>
        <div className="announcement-list">
          {announcements.map((item, index) => (
            <div key={index} className="announcement-item">
              <h4>{item.title}</h4>
              <p>{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementSection;

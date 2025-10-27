import React from "react";
import { useTranslation } from 'react-i18next';
import "./AnnouncementSection.css";

const AnnouncementSection = () => {
  const { t } = useTranslation();
  
  const announcements = [
    {
      title: t('announcementSection.announcement1'),
      message: t('announcementSection.message1'),
    },
    {
      title: t('announcementSection.announcement2'),
      message: t('announcementSection.message2'),
    },
    {
      title: t('announcementSection.announcement3'),
      message: t('announcementSection.message3'),
    },
    {
      title: t('announcementSection.announcement4'),
      message: t('announcementSection.message4'),
    },
  ];

  return (
    <div className="announcement-wrapper">
      <div className="announcement-container">
        <h2 className="announcement-title">{t('announcementSection.title')}</h2>
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

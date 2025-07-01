import React from "react";
import "./DetailedStatistics.css";
import stateImage from '../../assets/images/Statistic.svg'
const DetailedStatistics = () => {
  return (
    <div className="statistics-container">
      <div className="statistics-card">
     
        <img src={stateImage}/>
      </div>

      <div className="statistics-info">
        <h2 className="info-title">Detailed Statistics</h2>
        <p className="info-desc">
          View all mining related information in realtime, at any point at any location and decide which pools you want to mine in.
        </p>
        <button className="info-btn">Know More</button>
      </div>
    </div>
  );
};

export default DetailedStatistics;

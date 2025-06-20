import React from "react";
import FeaturesSection from "../FeaturesSection/FeaturesSection";
import TokenomicsComponent from "../TokenomicsComponent/TokenomicsComponent";
import HowItWorks from "../HowItWorks/HowItWorks";
import PreSaleConnect from "../PreSaleConnect/PreSaleConnect";
import TimelineComponent from "../TimelineComponent/TimelineComponent";

const Home = () => {
  return (
    <div>
      <FeaturesSection />
      <TokenomicsComponent />
      <HowItWorks />
      <PreSaleConnect />
      <TimelineComponent />
    </div>
  );
};

export default Home;

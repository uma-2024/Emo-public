import React from "react";
import WhyJoinEarly from "../WhyJoinEarly/WhyJoinEarly";
import WhatIsXIK from "../WhatIsXIK/WhatIsXIK";
import VisionMission from "../VisionMission/VisionMission";
import MechanismSection from "../MechanismSection/MechanismSection";
import HowItWorks from "../HowItWorks/HowItWorks";

const About = () => {
  return (
    <div>
      <WhatIsXIK />
      <VisionMission />
      <WhyJoinEarly />
      <MechanismSection />
      <HowItWorks />
    </div>
  );
};

export default About;

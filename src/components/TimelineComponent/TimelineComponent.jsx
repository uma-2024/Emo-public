import React, {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import ResizeObserver from "resize-observer-polyfill";
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import "./TimelineComponent.css";
import { useInView } from "framer-motion";
import imgQ1 from "../../assets/images/Group 48095360.svg";
import imgQ2 from "../../assets/images/Group 48095362.svg";
import imgQ3 from "../../assets/images/Group 48095363.svg";
import imgQ4 from "../../assets/images/Group 48095354.svg";
import imgQ5 from "../../assets/images/Group 48095365.svg";
import imgQ6 from "../../assets/images/Group 48095366.svg";
import video from "../../assets/bg.mp4";
const roadmap = [
  {
    quarter: "Q1",
    title1: "10% Sold",
    title2: "Early Community Rewards",
    description:
      "At 10%, 5 NFT holders will receive 200 USDC. Early ecosystem development begins.",
    image: imgQ1,
  },
  {
    quarter: "Q2",
    title1: "19% Sold",
    title2: "Engagement and DApp Development",
    description:
      "At 19%, 10 NFT holders will receive 500 USDC. DApp development kicks off.",
    image: imgQ2,
  },
  {
    quarter: "Q3",
    title1: "35% Sold",
    title2: "Expanded Utility",
    description:
      "At 35%, 5 NFT holders will receive 1,000 USDC and an additional NFT. New utilities and features are integrated.",
    image: imgQ3,
  },
  {
    quarter: "Q4",
    title1: "50% Sold",
    title2: "Major Utility Unlock",
    description:
      "At 50%, one holder wins 5,000 USDC. Enhanced utilities and DApps are activated.",
    image: imgQ4,
  },
  {
    quarter: "Q5",
    title1: "75% Sold",
    title2: "DAO Governance Integration",
    description:
      "At 75%, DAO governance is activated, allowing NFT holders to influence key protocol decisions.",
    image: imgQ5,
  },
  {
    quarter: "Q6",
    title1: "100% Sold",
    title2: "Full Ecosystem Launch",
    description:
      "At 100%, full DAO governance and all ecosystem utilities, including staking and rewards, go live.",
    image: imgQ6,
  },
];



const TimelineComponent = () => {
  const scrollRef = useRef(null);
  const wrapperRef = useRef(null);
  const ghostRef = useRef(null);

  const isInView = useInView(wrapperRef, {
    margin: "-100px 0px -50px 0px",
    once: false,
  });

  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(window.innerWidth);

  const updateScrollRange = () => {
    if (scrollRef.current) {
      const totalScrollWidth = scrollRef.current.scrollWidth;
      const visibleWidth = scrollRef.current.clientWidth;
      setScrollRange(totalScrollWidth - visibleWidth);
    }
  };

  useLayoutEffect(() => {
    updateScrollRange();
    window.addEventListener("resize", updateScrollRange);
    return () => window.removeEventListener("resize", updateScrollRange);
  }, []);

  const onResize = useCallback((entries) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width);
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => onResize(entries));
    if (ghostRef.current) resizeObserver.observe(ghostRef.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  const { scrollYProgress } = useViewportScroll();
  const transform = useTransform(scrollYProgress, [0.5, 1], [0, -scrollRange]);

  const lineProgress = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const spring = useSpring(transform, {
    damping: 20,
    mass: 0.5,
    stiffness: 100,
  });

  const svgTotalW = 4533;
  const circles = [
    { cx: 9, cy: 9 },
    { cx: 900, cy: 9 },
    { cx: 1800, cy: 9 },
    { cx: 2684, cy: 10 },
    { cx: 3575, cy: 11 },
    { cx: 4525, cy: 9 },
  ];

  const WINDOW = 2;
  const circleOpacities = circles.map(({ cx }) => {
    const t = cx / svgTotalW;
    return useTransform(lineProgress, [Math.max(0, t - WINDOW), t], [0, 1]);
  });
  const circleScales = circles.map(({ cx }) => {
    const t = cx / svgTotalW;
    return useTransform(lineProgress, [Math.max(0, t - WINDOW), t], [0.85, 1]);
  });

  useEffect(() => {
    console.log("scrollWidth:", scrollRef.current?.scrollWidth);
    console.log("clientWidth:", scrollRef.current?.clientWidth);
    console.log("scrollRange:", scrollRange);
  }, [scrollRange]);
  return (
    <>
      <div ref={wrapperRef} className="timeline-scroll-wrapper">
        <video autoPlay loop muted className="background-video">
          <source src={video} type="video/mp4" />
        </video>

        <motion.section
          ref={scrollRef}
          className="thumbnails-track"
          style={{ x: isInView ? spring : 0 }}
        >
          {/* <svg
            className="timeline-svg"
            viewBox="0 0 1600 100"
            preserveAspectRatio="none"
          >
          
            <line x1="8" y1="9.5" x2="4533" y2="9.5" stroke="white" stroke-width="3"/>
           

            <motion.path
              d="M0.746094 36.2773L106.778 68.9758L695.984 36.2773"
              fill="transparent"
              stroke="#39FF88"
              strokeWidth="3.1746"
              strokeDasharray={dashArray}
              strokeDashoffset={strokeDashoffset1}
              style={{ opacity: strokeOpacity1 }}
            />

          </svg> */}
          {/* <svg
            className="timeline-svg"
            viewBox="0 0 1600 100"
            preserveAspectRatio="none"
          >
            <line
              x1="8"
              y1="9.5"
              x2="4533"
              y2="9.5"
              stroke="white"
              strokeWidth="3"
              opacity="0.2"
              vectorEffect="non-scaling-stroke"
            />

            <motion.line
              x1="8"
              y1="9.5"
              x2="4533"
              y2="9.5"
              stroke="#39FF88"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              style={{ pathLength: lineProgress }}
            />
          </svg> */}
          <svg
            className="timeline-svg"
            viewBox="0 0 4533 20" // match the coordinates you pasted
            preserveAspectRatio="none"
          >
            {/* Base (dim) line */}
            <line
              x1="8"
              y1="9.5"
              x2="4533"
              y2="9.5"
              stroke="white"
              strokeWidth="3"
              opacity="0.2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Animated green line */}
            <motion.line
              x1="8"
              y1="9.5"
              x2="4533"
              y2="9.5"
              stroke="#39FF88"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              style={{ pathLength: lineProgress }}
            />

            <g>
              {circles.map(({ cx, cy }, i) => (
                <g key={i}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r="9"
                    fill="#6A6E6C"
                    fillOpacity="0.78"
                  />
                  <circle cx={cx} cy={cy} r="9" fill="#6A6E6C" />

                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r="9"
                    fill="#5CFFB1"
                    fillOpacity="0.72"
                    style={{
                      opacity: circleOpacities[i],
                      scale: circleScales[i],
                    }}
                    transformOrigin={`${cx}px ${cy}px`}
                  />
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r="9"
                    fill="#5CFFB1"
                    style={{ opacity: circleOpacities[i] }}
                    transformOrigin={`${cx}px ${cy}px`}
                  />
                </g>
              ))}
            </g>
          </svg>

          <div className="thumbnails">
            {roadmap.map((item, index) => {
              const badge = String(index + 1).padStart(2, "0");
              return (
                <div className="stage" key={index}>
                  <div className="vector-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`vector-image vector-image${index + 1}`}
                    />
                    <div className={`timeline-card timeline-card${index + 1}`}>
                      <h3 className="title">{item.title1}</h3>
                      {/* <h4 className="subtitle">{item.title2}</h4> */}
                      <p className="desc">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      </div>

      <div
        ref={ghostRef}
        className="ghost-scroll"
        style={{ height: `${scrollRange + viewportW}px` }}
      />
    </>
  );
};

export default TimelineComponent;

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
    title: "19% Sold",
    description:
      "10 NFT Owners will be randomly selected and gifted 500 USDC each.",
    image: imgQ1,
  },
  {
    quarter: "Q2",
    title: "35% Sold",
    description:
      "5 NFT owners will be randomly selected and gifted 1,000 USDC + 1 NFT. The Utility integration begins with multiple Dapps being developed around the NFTs.",
    image: imgQ2,
  },
  {
    quarter: "Q3",
    title: "50% Sold",
    description: "1 NFT owner will be gifted 5,000 USDC (Mega).",
    image: imgQ3,
  },
  {
    quarter: "Q4",
    title: "100% Sold",
    description:
      "Final utility unlock and DAO formation for roadmap governance begins.",
    image: imgQ4,
  },
  {
    quarter: "Q5",
    title: "100% Sold",
    description:
      "Final utility unlock and DAO formation for roadmap governance begins.",
    image: imgQ5,
  },
  {
    quarter: "Q6",
    title: "100% Sold",
    description:
      "Final utility unlock and DAO formation for roadmap governance begins.",
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
    { cx: 9,    cy: 9 },
    { cx: 900,  cy: 9 },
    { cx: 1800,  cy: 9 },
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
  viewBox="0 0 4533 20"         // match the coordinates you pasted
  preserveAspectRatio="none"
>
  {/* Base (dim) line */}
  <line
    x1="8" y1="9.5" x2="4533" y2="9.5"
    stroke="white" strokeWidth="3" opacity="0.2"
    vectorEffect="non-scaling-stroke"
  />

  {/* Animated green line */}
  <motion.line
    x1="8" y1="9.5" x2="4533" y2="9.5"
    stroke="#39FF88" strokeWidth="3"
    vectorEffect="non-scaling-stroke"
    pathLength={1}
    style={{ pathLength: lineProgress }}
  />

  <g>
    {circles.map(({ cx, cy }, i) => (
      <g key={i}>
       
        <circle cx={cx} cy={cy} r="9" fill="#6A6E6C" fillOpacity="0.78" />
        <circle cx={cx} cy={cy} r="9" fill="#6A6E6C" />

    
        <motion.circle
          cx={cx} cy={cy} r="9" fill="#5CFFB1" fillOpacity="0.72"
          style={{ opacity: circleOpacities[i], scale: circleScales[i] }}
          transformOrigin={`${cx}px ${cy}px`}
        />
        <motion.circle
          cx={cx} cy={cy} r="9" fill="#5CFFB1"
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
                      <h3 className="title">{item.title}</h3>
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

// TimelineComponent.jsx
import React, { useRef, useState, useLayoutEffect, useCallback, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import "./TimelineComponent.css";
import { useInView } from "framer-motion";
import video from '../../assets/bg.mp4'
const roadmap = [
  {
    quarter: "Q1",
    title: "19% Sold",
    description: "10 NFT Owners will be randomly selected and gifted 500 USDC each.",
  },
  {
    quarter: "Q2",
    title: "35% Sold",
    description: "5 NFT owners will be randomly selected and gifted 1,000 USDC + 1 NFT. The Utility integration begins with multiple Dapps being developed around the NFTs.",
  },
  {
    quarter: "Q3",
    title: "50% Sold",
    description: "1 NFT owner will be gifted 5,000 USDC (Mega).",
  },
  {
    quarter: "Q4",
    title: "100% Sold",
    description: "Final utility unlock and DAO formation for roadmap governance begins.",
  },
  {
    quarter: "Q5",
    title: "100% Sold",
    description: "Final utility unlock and DAO formation for roadmap governance begins.",
  },
  {
    quarter: "Q6",
    title: "100% Sold",
    description: "Final utility unlock and DAO formation for roadmap governance begins.",
  },
];

const TimelineComponent = () => {
    const scrollRef = useRef(null);
    const wrapperRef = useRef(null);
    const ghostRef = useRef(null);
  
    const isInView = useInView(wrapperRef, { margin: "-100px 0px -50px 0px", once: false });
  
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


  
    const spring = useSpring(transform, {
      damping: 20,
      mass: 0.5,
      stiffness: 100,
    });
  
    const dashArray = 1000;


    const strokeDashoffset1 = useTransform(scrollYProgress, [0.4, 0.7], [dashArray, 0]);
    const strokeOpacity1 = useTransform(scrollYProgress, [1, 1], [0, 1]);
    
    const strokeDashoffset2 = useTransform(scrollYProgress, [0.6, 0.9], [dashArray, 0]);
    const strokeOpacity2 = useTransform(scrollYProgress, [1, 1], [0, 1]);
    
  
    const strokeDashoffset3 = useTransform(scrollYProgress, [0.6, 0.9], [dashArray, 0]);
    const strokeOpacity3 = useTransform(scrollYProgress, [1, 1], [0, 1]);
      
    const strokeDashoffset4 = useTransform(scrollYProgress, [0.6, 0.9], [dashArray, 0]);
    const strokeOpacity4 = useTransform(scrollYProgress, [1, 1], [0, 1]);

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
<svg className="timeline-svg" viewBox="0 0 1600 100" preserveAspectRatio="none">

  <path
    d="M0.746094 36.2773L106.778 68.9758L695.984 36.2773"
    fill="transparent"
    stroke="#fff"
    strokeOpacity={0.2}
    strokeWidth="3.1746"
  />
  <path
    d="M730.27 35.0078L926.778 61.6745L1480.11 44.5316"
    fill="transparent"
    stroke="#fff"
    strokeOpacity={0.2}
    strokeWidth="3.1746"
  />

<path
    d="M0.746094 36.2773L106.778 68.9758L695.984 36.2773"
    fill="transparent"
    stroke="#fff"
    strokeOpacity={0.2}
    strokeWidth="3.1746"
  />
  <path
    d="M730.27 35.0078L926.778 61.6745L1480.11 44.5316"
    fill="transparent"
    stroke="#fff"
    strokeOpacity={0.2}
    strokeWidth="3.1746"
  />
  {/* Green stroke that fills on scroll — combined like a progress bar */}
  <motion.path
    d="M0.746094 36.2773L106.778 68.9758L695.984 36.2773"
    fill="transparent"
    stroke="#39FF88"
    strokeWidth="3.1746"
    strokeDasharray={dashArray}
    strokeDashoffset={strokeDashoffset1}
    style={{ opacity: strokeOpacity1 }}
  />
  <motion.path
    d="M730.27 35.0078L926.778 61.6745L1480.11 44.5316"
    fill="transparent"
    stroke="#39FF88"
    strokeWidth="3.1746"
    strokeDasharray={dashArray}
    strokeDashoffset={strokeDashoffset2}
    style={{ opacity: strokeOpacity2 }}
  />
    <motion.path
    d="M0.746094 36.2773L106.778 68.9758L695.984 36.2773"
    fill="transparent"
    stroke="#39FF88"
    strokeWidth="3.1746"
    strokeDasharray={dashArray}
    strokeDashoffset={strokeDashoffset3}
    style={{ opacity: strokeOpacity3 }}
  />
  <motion.path
    d="M730.27 35.0078L926.778 61.6745L1480.11 44.5316"
    fill="transparent"
    stroke="#39FF88"
    strokeWidth="3.1746"
    strokeDasharray={dashArray}
    strokeDashoffset={strokeDashoffset4}
    style={{ opacity: strokeOpacity4 }}
  />
</svg>







  
            <div className="thumbnails">
              {roadmap.map((item, index) => (<>
                 <h2 className="quarter">{item.quarter}</h2>
                <div className="timeline-card" key={index}>
                 
                  <h3 className="title">{item.title}</h3>
                  <p className="desc">{item.description}</p>
                </div>
                </>
              ))}
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
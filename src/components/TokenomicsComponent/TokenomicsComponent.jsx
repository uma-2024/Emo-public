import React, { useState, useRef } from "react";
import "./TokenomicsComponent.css";
import image from "../../assets/images/Group 112.svg";
import video from "../../assets/bg.mp4";
const tokenomicsData = [
  {
    label: "Sales",
    color: "#E85243",
    value: "2.1m",
    flagX: 530,
    flagY: 80,
    description: `Tokenomics Name: XIK
  
  Total Supply: 28,000,000,000
  
  Stablecoin: XIKS (USD-pegged, backed by 150% asset reserves)
  
  Burn Mechanism: Up to 0.05% of each transaction is permanently burned`,
  },

  {
    label: "Staking",
    color: "#EFB00D",
    value: "2.1m",
    flagX: 530,
    flagY: 80,
    description: `Rewards:
  • Stakers: Earn 8–15% APY
  • Mobile Miners: Earn 5–10 XIK/hour`,
  },
  {
    label: "Liquidity",
    color: "#3D8ADA",
    value: "2.1m",
    flagX: 530,
    flagY: 80,
    description: `Dual Token Model:
  Volatile XIK for governance and rewards.
  Stable XIKS for payments and savings.`,
  },
  {
    label: "Governance",
    color: "#33AF71",
    value: "2.1m",
    flagX: 530,
    flagY: 80,
    description: `Tooltip suggestion:
  XIK fuels AI governance and user rewards.
  XIKS offers price stability, backed by reserves and yield-generating assets.`,
  },
];

export default function TokenomicsComponent() {
  const [activeIndex, setActiveIndex] = useState(null);
  const active = tokenomicsData[activeIndex ?? 0];
  const pathRefs = useRef([]);
  const [flagPosition, setFlagPosition] = useState({ x: 0, y: 0 });

  const [hoveringRed, setHoveringRed] = useState(false);
  const [hoveringYellow, setHoveringYellow] = useState(false);
  const [hoveringBlue, setHoveringBlue] = useState(false);
  const [hoveringGreen, setHoveringGreen] = useState(false);

  return (
    <div className="tokenomics-wrapper">
      <div className="tokenomics-card">
        <video className="bg-video" autoPlay muted loop playsInline>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="card-header">
          <img src={image} className="pulse-icon" />
          <h2>{active.label}</h2>
        </div>
        <p className="card-description">
          {active.description || "Hover over a segment to see more details."}
        </p>
      </div>

      <div className="tokenomics-chart">
        <svg
          className="svg-circle"
          viewBox="0 0 849 490"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.4" filter="url(#filter0_f_27_122)" onMouseEnter={() => { setActiveIndex(0); setHoveringRed(true); }}
  onMouseLeave={() => { setActiveIndex(null); setHoveringRed(false); }}>
            <path
              className={`hover-fill ${hoveringRed ? "hover-active" : ""}`}
              data-index="0"
              d="M405.208 107.64C404.933 105.694 407.443 103.983 410.82 103.873C448.518 102.644 486.229 106.463 520.994 115.051C557.637 124.103 589.901 138.18 614.986 156.061C640.07 173.942 657.218 195.087 664.94 217.66C672.663 240.234 670.728 263.554 659.302 285.598C647.877 307.642 627.306 327.743 599.376 344.158C571.445 360.573 536.998 372.805 499.023 379.793C461.049 386.781 420.694 388.314 381.461 384.26C344.239 380.413 309.093 371.646 278.759 358.665C276.042 357.502 275.572 355.277 277.653 353.738C279.735 352.199 283.579 351.929 286.298 353.09C315.059 365.364 348.359 373.655 383.619 377.3C420.891 381.152 459.228 379.695 495.304 373.056C531.379 366.418 564.104 354.797 590.638 339.203C617.172 323.609 636.714 304.513 647.569 283.571C658.423 262.63 660.261 240.475 652.925 219.03C645.588 197.586 629.298 177.498 605.468 160.511C581.637 143.524 550.987 130.151 516.176 121.552C483.243 113.416 447.528 109.786 411.816 110.923C408.439 111.03 405.483 109.586 405.208 107.64Z"
              fill="#808080"
            />
          </g>
          <g opacity="0.4" filter="url(#filter1_f_27_122)">
            <path
              className={`hover-fill ${hoveringYellow ? "hover-active" : ""}`}
              data-index="1"
              d="M214.791 179.217C211.819 178.284 210.713 176.135 212.402 174.444C230.66 156.157 255.792 140.447 285.975 128.483C316.159 116.519 350.582 108.622 386.703 105.354C390.044 105.051 393.121 106.419 393.561 108.355C394.001 110.291 391.637 112.062 388.297 112.366C354.092 115.488 321.498 122.979 292.908 134.312C264.318 145.645 240.499 160.514 223.166 177.822C221.474 179.512 217.763 180.149 214.791 179.217Z"
              fill="#808080"
            />
          </g>
          <g opacity="0.4" filter="url(#filter2_f_27_122)">
            <path
              className={`hover-fill ${hoveringBlue ? "hover-active" : ""}`}
              data-index="2"
              d="M214.299 310.379C211.321 311.304 207.6 310.662 206.073 308.92C189.562 290.087 180.551 269.346 179.735 248.214C178.918 227.082 186.318 206.129 201.358 186.89C202.749 185.111 206.417 184.373 209.464 185.221C212.511 186.068 213.783 188.179 212.396 189.96C198.192 208.193 191.206 228.04 191.979 248.056C192.753 268.072 201.265 287.72 216.862 305.569C218.386 307.312 217.278 309.454 214.299 310.379Z"
              fill="#808080"
            />
          </g>
          <g opacity="0.4" filter="url(#filter3_f_27_122)">
            <path
              className={`hover-fill ${hoveringGreen ? "hover-active" : ""}`}
              data-index="3"
              d="M266.961 348.623C264.728 350.09 260.853 350.237 258.369 348.912C242.506 340.448 228.652 330.81 217.167 320.249C215.369 318.595 216.334 316.424 219.243 315.427C222.151 314.431 225.901 314.987 227.703 316.639C238.527 326.564 251.556 335.627 266.457 343.599C268.938 344.926 269.194 347.156 266.961 348.623Z"
              fill="#808080"
            />
          </g>
          <path
            className={`hover-fill ${hoveringRed ? "hover-active" : ""}`}
            data-index="0"
            // onMouseEnter={() => {
            //     setHoveringRed(true);
            //     setActiveIndex(0);
            //   }}
            //   onMouseLeave={() => {
            //     setHoveringRed(false);
            //     setActiveIndex(null);
            //   }}
            ref={(el) => (pathRefs.current[0] = el)}
            onMouseEnter={(e) => {
              const rect = pathRefs.current[0].getBoundingClientRect();
              const container = document
                .querySelector(".tokenomics-chart")
                .getBoundingClientRect();
              setFlagPosition({
                x: rect.left + rect.width / 2 - container.left,
                y: rect.top - container.top - 10,
              });
              setActiveIndex(0);
              setHoveringRed(true);
            }}
            onMouseLeave={() => {
              setActiveIndex(null);
              setHoveringRed(false);
            }}
            d="M405.706 91.1638C405.156 87.2718 410.176 83.8407 416.937 83.718C452.59 83.0714 488.11 86.9275 520.994 95.051C557.637 104.103 589.901 118.18 614.985 136.061C640.07 153.942 657.218 175.087 664.94 197.66C672.663 220.234 670.728 243.554 659.302 265.598C647.877 287.642 627.306 307.743 599.375 324.158C571.445 340.572 536.998 352.805 499.023 359.793C461.049 366.781 420.694 368.314 381.461 364.259C346.252 360.621 312.901 352.58 283.723 340.735C278.19 338.488 277.259 334.029 281.422 330.951C285.585 327.873 293.263 327.344 298.818 329.572C324.838 340.011 354.493 347.106 385.778 350.34C421.088 353.989 457.407 352.609 491.584 346.32C525.761 340.03 556.763 329.021 581.901 314.248C607.038 299.475 625.552 281.384 635.835 261.544C646.118 241.705 647.86 220.716 640.909 200.4C633.959 180.084 618.526 161.054 595.95 144.961C573.374 128.868 544.336 116.199 511.358 108.052C482.138 100.834 450.606 97.3592 418.931 97.8321C412.169 97.933 406.256 95.0559 405.706 91.1638Z"
            fill="#464646"
          />
          <path
            className={`hover-fill ${hoveringYellow ? "hover-active" : ""}`}
            data-index="1"
            ref={(el) => (pathRefs.current[1] = el)}
            onMouseEnter={() => {
              const rect = pathRefs.current[1].getBoundingClientRect();
              const container = document
                .querySelector(".tokenomics-chart")
                .getBoundingClientRect();
              setFlagPosition({
                x: rect.left + rect.width / 2 - container.left,
                y: rect.top - container.top - 10,
              });
              setActiveIndex(1);
              setHoveringYellow(true);
            }}
            onMouseLeave={() => {
              setHoveringYellow(false);
              setActiveIndex(null);
            }}
            d="M220.172 160.905C214.229 159.04 212.003 154.737 215.527 151.403C233.484 134.413 257.478 119.779 285.976 108.483C314.473 97.1872 346.749 89.5166 380.666 85.9446C387.32 85.2437 393.478 87.9887 394.358 91.8605C395.238 95.7323 390.505 99.2628 383.858 99.985C353.773 103.253 325.151 110.108 299.841 120.141C274.531 130.173 253.168 143.132 237.078 158.166C233.522 161.488 226.115 162.77 220.172 160.905Z"
            fill="#464646"
          />
          <path
            className={`hover-fill ${hoveringBlue ? "hover-active" : ""}`}
            ref={(el) => (pathRefs.current[2] = el)}
            onMouseEnter={() => {
              const rect = pathRefs.current[2].getBoundingClientRect();
              const container = document
                .querySelector(".tokenomics-chart")
                .getBoundingClientRect();
              setFlagPosition({
                x: rect.left + rect.width / 2 - container.left,
                y: rect.top - container.top - 10,
              });
              setActiveIndex(2);
              setHoveringBlue(true);
            }}
            onMouseLeave={() => {
              setHoveringBlue(false);
              setActiveIndex(null);
            }}
            data-index="2"
            d="M219.692 288.704C213.735 290.554 206.279 289.273 203.376 285.746C188.581 267.769 180.506 248.165 179.735 228.214C178.964 208.263 185.517 188.471 198.909 170.131C201.537 166.532 208.887 165.06 214.981 166.755C221.075 168.45 223.601 172.669 221.008 176.276C209.274 192.598 203.539 210.179 204.224 227.898C204.909 245.618 211.995 263.033 224.978 279.038C227.847 282.574 225.649 286.854 219.692 288.704Z"
            fill="#464646"
          />
          <path
            className={`hover-fill ${hoveringGreen ? "hover-active" : ""}`}
            ref={(el) => (pathRefs.current[3] = el)}
            onMouseEnter={() => {
              const rect = pathRefs.current[3].getBoundingClientRect();
              const container = document
                .querySelector(".tokenomics-chart")
                .getBoundingClientRect();
              setFlagPosition({
                x: rect.left + rect.width / 2 - container.left,
                y: rect.top - container.top - 10,
              });
              setActiveIndex(3);
              setHoveringGreen(true);
            }}
            onMouseLeave={() => {
              setHoveringGreen(false);
              setActiveIndex(null);
            }}
            data-index="3"
            d="M271.004 325.967C266.539 328.901 258.776 329.201 253.925 326.48C241.372 319.438 230.162 311.64 220.488 303.219C216.75 299.965 218.693 295.616 224.51 293.623C230.327 291.63 237.812 292.749 241.582 295.992C249.905 303.15 259.467 309.801 270.119 315.844C274.944 318.581 275.47 323.034 271.004 325.967Z"
            fill="#464646"
          />
          <defs>
            <filter
              id="filter0_f_27_122"
              x="260.358"
              y="87.6484"
              width="425.224"
              height="314.824"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="8"
                result="effect1_foregroundBlur_27_122"
              />
            </filter>
            <filter
              id="filter1_f_27_122"
              x="195.609"
              y="89.3118"
              width="214.005"
              height="106.335"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="8"
                result="effect1_foregroundBlur_27_122"
              />
            </filter>
            <filter
              id="filter2_f_27_122"
              x="163.674"
              y="168.87"
              width="69.8696"
              height="157.932"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="8"
                result="effect1_foregroundBlur_27_122"
              />
            </filter>
            <filter
              id="filter3_f_27_122"
              x="200.259"
              y="298.931"
              width="84.229"
              height="66.8893"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="8"
                result="effect1_foregroundBlur_27_122"
              />
            </filter>
          </defs>
        </svg>
        {activeIndex !== null && (
          <div
            className="hover-flag"
            style={{
              left: `${flagPosition.x}px`,
              top: `${flagPosition.y}px`,
              color: tokenomicsData[activeIndex].color,
            }}
          >
            <div className="flag-label">
              <img src={image} className="pulse-icon2" />
              <strong>{tokenomicsData[activeIndex].label}</strong>{" "}
              <span>{tokenomicsData[activeIndex].value}</span>
            </div>
            <div
              className="flag-line"
              style={{ backgroundColor: tokenomicsData[activeIndex].color }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import "./PreSaleConnect.css";
// import videoBg from "../../assets/bg.mp4";
// import metamaskIcon from "../../assets/images/Frame 27111.svg";
// import { FaRocket, FaWallet, FaDollarSign, FaGlobe } from "react-icons/fa";

// // NEW: step images (replace with your own files/paths)
// import connectImg from "../../assets/images/Frame 27111.svg";
// import planImg from "../../assets/images/image01.svg";
// import payImg from "../../assets/images/image02.svg";
// import confirmImg from "../../assets/images/image03.svg";

// const icons = [
//   { Component: FaRocket,    label: "rocket" },
//   { Component: FaWallet,    label: "wallet" },
//   { Component: FaDollarSign,label: "dollar" },
//   { Component: FaGlobe,     label: "globe"  },
// ];

// // NEW: image to show for each step (index matches icons)
// const stepImages = [connectImg, planImg, payImg, confirmImg];

// export default function PreSaleConnect() {
//   const [activeIdx, setActiveIdx] = useState(0);

//   return (
//     <div className="presale-wrapper">
//       <video className="video-bg" autoPlay muted loop playsInline>
//         <source src={videoBg} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       <div className="presale-content">
//         <div className="sidebar-menu">
//           {icons.map(({ Component, label }, idx) => (
//             <Component
//               key={label}
//               className={`menu-icon${idx === activeIdx ? " active" : ""}`}
//               onClick={() => setActiveIdx(idx)}
//             />
//           ))}
//         </div>

//         <div className="presale-main">
//           <h2 className="heading">How to join the pre-sale</h2>
//           <h3 className="subheading">
//             {icons[activeIdx].label === "rocket" && "Connect Wallet"}
//             {icons[activeIdx].label === "wallet" && "Select Plan"}
//             {icons[activeIdx].label === "dollar" && "Make Payment"}
//             {icons[activeIdx].label === "globe"  && "Confirmation"}
//           </h3>
//           <p className="info">
//             {icons[activeIdx].label === "rocket" && "Explore how XIK combines AI, mobile mining, and quantum-resistant security to create the world’s first autonomous blockchain economy."}
//             {icons[activeIdx].label === "wallet" && "Pick the best tier for you mobile mining, and quantum-resistant security to create the world’s first autonomous blockchain economy."}
//             {icons[activeIdx].label === "dollar" && "Enter payment details mobile mining, and quantum-resistant security to create the world’s first autonomous blockchain economy."}
//             {icons[activeIdx].label === "globe"  && "You’re all set! View on explorer mobile mining, and quantum-resistant security to create the world’s first autonomous blockchain economy."}
//           </p>
//           <button className="connect-btn">
//             {icons[activeIdx].label === "rocket" && "Connect Now"}
//             {icons[activeIdx].label === "wallet" && "Choose Plan"}
//             {icons[activeIdx].label === "dollar" && "Pay Now"}
//             {icons[activeIdx].label === "globe"  && "View Status"}
//           </button>
//         </div>

//         {/* RIGHT IMAGE: changes per step */}
//         <div >
//           <img
//             src={stepImages[activeIdx] || metamaskIcon}
//             alt={icons[activeIdx].label}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


// src/components/PreSaleConnect/PreSaleConnect.jsx
import React, { useState } from "react";
import "./PreSaleConnect.css";
import videoBg from "../../assets/bg.mp4";
import metamaskIcon from "../../assets/images/Frame 27111.svg";
import { FaRocket, FaWallet, FaDollarSign, FaGlobe } from "react-icons/fa";
import connectImg from "../../assets/images/Frame 27111.svg";
import planImg from "../../assets/images/image01.svg";
import payImg from "../../assets/images/image02.svg";
import confirmImg from "../../assets/images/image03.svg";
import ConnectButton from "../ConnectButton/ConnectButton";

const icons = [
  { Component: FaRocket, label: "rocket" },
  { Component: FaWallet, label: "wallet" },
  { Component: FaDollarSign, label: "dollar" },
  { Component: FaGlobe,  label: "globe"  },
];
const stepImages = [connectImg, planImg, payImg, confirmImg];

export default function PreSaleConnect() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = icons[activeIdx].label;

  return (
    <div className="presale-wrapper">
      <video className="video-bg" autoPlay muted loop playsInline>
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="presale-content">
        <div className="sidebar-menu">
          {icons.map(({ Component, label }, idx) => (
            <Component
              key={label}
              className={`menu-icon${idx === activeIdx ? " active" : ""}`}
              onClick={() => setActiveIdx(idx)}
            />
          ))}
        </div>

        <div className="presale-main">
          <h2 className="heading">How to join the pre-sale</h2>
          <h3 className="subheading">
            {active === "rocket" && "Connect Wallet"}
            {active === "wallet" && "Select Plan"}
            {active === "dollar" && "Make Payment"}
            {active === "globe"  && "Confirmation"}
          </h3>

          <p className="info">
            {icons[activeIdx].label === "rocket" && "Explore how XIK combines AI, mobile mining, and quantum-resistant security to create the world’s first autonomous blockchain economy."}
             {icons[activeIdx].label === "wallet" && "Pick the best tier for you mobile mining, and quantum-resistant security to create the world’s first autonomous blockchain economy."}
            {icons[activeIdx].label === "dollar" && "Enter payment details mobile mining, and quantum-resistant security to create the world’s first autonomous blockchain economy."}
            {icons[activeIdx].label === "globe"  && "You’re all set! View on explorer mobile mining, and quantum-resistant security to create the world’s first autonomous blockchain economy."}
          </p>

          {active === "rocket" ? (
            <ConnectButton
              className="connect-btn"
              labelDisconnected="Connect Now"
              labelConnected={(addr) => `${addr?.slice(0,6)}…${addr?.slice(-4)}`}
            />
          ) : active === "wallet" ? (
            <button className="connect-btn">Choose Plan</button>
          ) : active === "dollar" ? (
            <button className="connect-btn">Pay Now</button>
          ) : (
            <button className="connect-btn">View Status</button>
          )}
        </div>

        <div className="presale-image">
          <img
            src={stepImages[activeIdx] || metamaskIcon}
            alt={icons[activeIdx].label}
          />
        </div>
      </div>
    </div>
  );
}

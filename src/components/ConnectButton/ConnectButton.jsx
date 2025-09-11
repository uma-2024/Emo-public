// src/components/WalletConnect/ConnectButton.jsx
import React, { useContext } from "react";
import { WalletContext } from "../WalletConnect/WalletConnect";


function shorten(addr = "") {
  return addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "";
}

/**
 * Props:
 * - className: CSS classes to apply
 * - labelDisconnected: string (default "Connect Wallet")
 * - labelConnected: string | ((address) => string)
 * - showAddress: boolean (default true) — include short address in connected label if labelConnected is a string
 */
export default function ConnectButton({
  className = "",
  labelDisconnected = "Connect Wallet",
  labelConnected = "Disconnect",
  showAddress = true,
  ...rest
}) {
  const { address, connectWallet, disconnectWallet } = useContext(WalletContext);

  const handleClick = async () => {
    if (address) {
      disconnectWallet();
    } else {
      await connectWallet();
    }
  };

  const connectedLabel =
    typeof labelConnected === "function"
      ? labelConnected(address)
      : showAddress && address
      ? `${labelConnected} ${shorten(address)}`
      : labelConnected;

  return (
    <button
      className={`${className} ${address ? "connected" : ""}`}
      onClick={handleClick}
      {...rest}
    >
      {address ? connectedLabel : labelDisconnected}
    </button>
  );
}

// src/components/WalletConnect/WalletConnect.jsx
import React, { createContext, useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { createWeb3Modal, defaultWagmiConfig, useWeb3Modal } from "@web3modal/wagmi/react";
import { bscTestnet } from "wagmi/chains";
import { ethers } from "ethers";
import { toast } from "react-toastify";

// ---- Web3Modal + wagmi config (exported) ----
const PROJECT_ID = "9aced30cb7c70da7e0a7b4129fbd0a8f";

// Use the real origin in dev to avoid the metadata URL warning
const appUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:5173";

export const wagmiConfig = defaultWagmiConfig({
  chains: [bscTestnet],
  projectId: PROJECT_ID,
  metadata: {
    name: "YSN",
    description: "YSN broker dealer",
    url: appUrl,
    icons: [`${appUrl}/icon.png`], // change path if needed
  },
});

// Initialize Web3Modal once at module load
createWeb3Modal({
  wagmiConfig,
  projectId: PROJECT_ID,
  themeMode: "light",
  enableAnalytics: true,
});

// ---- Wallet context ----
export const WalletContext = createContext({
  address: "",
  provider: null,
  signer: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

export function WalletProvider({ children }) {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const { address: wagmiAddress } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  const connectWallet = async () => {
    try {
      await open();

      const { ethereum } = window;
      if (!ethereum) throw new Error("No Ethereum provider found");
      await ethereum.request({ method: "eth_requestAccounts" });

      // ethers v5 (fallback to v6 if installed)
      const web3Provider =
        ethers.providers?.Web3Provider
          ? new ethers.providers.Web3Provider(ethereum, "any")
          : new ethers.BrowserProvider(ethereum);

      const web3Signer = web3Provider.getSigner
        ? web3Provider.getSigner()
        : await web3Provider.getSigner(); // v6

      const userAddress =
        typeof web3Signer.getAddress === "function"
          ? await web3Signer.getAddress()
          : (await web3Signer).address; // v6

      setProvider(web3Provider);
      setSigner(web3Signer);
      setAddress(userAddress);
      toast.success("Wallet connected");
    } catch (err) {
      console.error("connectWallet error:", err);
      toast.error("Connection failed");
    }
  };

  const disconnectWallet = () => {
    disconnect();
    setAddress("");
    setProvider(null);
    setSigner(null);
    toast.info("Wallet disconnected");
  };

  useEffect(() => {
    if (wagmiAddress) setAddress(wagmiAddress);
  }, [wagmiAddress]);

  return (
    <WalletContext.Provider
      value={{ address, provider, signer, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
}

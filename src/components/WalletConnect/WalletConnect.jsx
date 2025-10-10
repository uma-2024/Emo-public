import React, { createContext, useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { createWeb3Modal, defaultWagmiConfig, useWeb3Modal } from "@web3modal/wagmi/react";
import { bscTestnet } from "wagmi/chains";
import { ethers, BrowserProvider } from "ethers";
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
      // The provider will be set automatically when wagmi detects the connection
      // Toast will be shown in useEffect when address is actually set
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
    console.log('🔄 [WalletContext] wagmiAddress changed:', wagmiAddress);
    if (wagmiAddress) {
      setAddress(wagmiAddress);
      
      // Show success toast when wallet is connected and address is obtained
      toast.success("Wallet connected successfully!");
      
      // Create provider from window.ethereum when wallet is connected
      if (window.ethereum) {
        console.log('🔌 [WalletContext] Creating provider from window.ethereum');
        const web3Provider = new BrowserProvider(window.ethereum);
        setProvider(web3Provider);
        console.log('✅ [WalletContext] Provider set:', web3Provider);
        
        // Get signer (async in ethers v6)
        web3Provider.getSigner().then(signer => {
          setSigner(signer);
          console.log('✅ [WalletContext] Signer set:', signer);
        });
      } else {
        console.log('❌ [WalletContext] window.ethereum not available');
      }
    } else {
      console.log('🔌 [WalletContext] No wallet connected, clearing state');
      setAddress("");
      setProvider(null);
      setSigner(null);
    }
  }, [wagmiAddress]);

  return (
    <WalletContext.Provider
      value={{ address, provider, signer, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
}
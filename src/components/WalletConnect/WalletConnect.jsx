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

  // Restore wallet connection on page load
  useEffect(() => {
    const restoreConnection = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.log('❌ [Wallet] No ethereum provider found');
          return;
        }

        console.log('🔄 [Wallet] Checking for existing connection...');
        
        // Check if wallet is already connected
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log('🔍 [Wallet] Found accounts:', accounts);
        
        if (accounts.length > 0) {
          console.log('🔄 [Wallet] Restoring connection for:', accounts[0]);
          
          // Create provider and signer
          const web3Provider = ethers.providers?.Web3Provider
            ? new ethers.providers.Web3Provider(ethereum, "any")
            : new ethers.BrowserProvider(ethereum);

          const web3Signer = web3Provider.getSigner
            ? web3Provider.getSigner()
            : await web3Provider.getSigner();

          const userAddress = typeof web3Signer.getAddress === "function"
            ? await web3Signer.getAddress()
            : (await web3Signer).address;

          console.log('🔄 [Wallet] Setting provider and signer...');
          setProvider(web3Provider);
          setSigner(web3Signer);
          setAddress(userAddress);
          console.log('✅ [Wallet] Connection restored for:', userAddress);
        } else {
          console.log('ℹ️ [Wallet] No existing connection found');
        }
      } catch (error) {
        console.error('❌ [Wallet] Error restoring connection:', error);
      }
    };

    // Add a small delay to ensure window.ethereum is available
    const timer = setTimeout(restoreConnection, 100);
    return () => clearTimeout(timer);
  }, []);

  // Also try to restore from wagmi
  useEffect(() => {
    if (wagmiAddress && !address) {
      console.log('🔄 [Wallet] Wagmi address found, restoring connection:', wagmiAddress);
      const restoreFromWagmi = async () => {
        try {
          const { ethereum } = window;
          if (ethereum) {
            const web3Provider = ethers.providers?.Web3Provider
              ? new ethers.providers.Web3Provider(ethereum, "any")
              : new ethers.BrowserProvider(ethereum);

            const web3Signer = web3Provider.getSigner
              ? web3Provider.getSigner()
              : await web3Provider.getSigner();

            setProvider(web3Provider);
            setSigner(web3Signer);
            setAddress(wagmiAddress);
            console.log('✅ [Wallet] Connection restored from wagmi for:', wagmiAddress);
          }
        } catch (error) {
          console.error('❌ [Wallet] Error restoring from wagmi:', error);
        }
      };
      restoreFromWagmi();
    }
  }, [wagmiAddress, address]);

  useEffect(() => {
    if (wagmiAddress) setAddress(wagmiAddress);
  }, [wagmiAddress]);

  // Listen for account changes
  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        // User disconnected
        setAddress("");
        setProvider(null);
        setSigner(null);
        console.log('🔌 [Wallet] User disconnected');
      } else {
        // User switched accounts or reconnected
        console.log('🔄 [Wallet] Account changed to:', accounts[0]);
        setAddress(accounts[0]);
      }
    };

    const handleChainChanged = (chainId) => {
      console.log('🔗 [Wallet] Chain changed to:', chainId);
      // Optionally reload the page to ensure proper network handling
      window.location.reload();
    };

    // Add event listeners
    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);

    // Cleanup
    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
      ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{ address, provider, signer, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
}

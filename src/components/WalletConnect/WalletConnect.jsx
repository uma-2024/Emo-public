import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers, BrowserProvider } from "ethers";
import { WagmiConfig, useAccount, useDisconnect } from "wagmi";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { createWeb3Modal, useWeb3Modal } from "@web3modal/wagmi/react";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { bsc } from "wagmi/chains";

const PROJECT_ID = "9aced30cb7c70da7e0a7b4129fbd0a8f";

const metadata = {
  name: "defipredictor",
  description: "A MMIT token game",
  url: "https://defipredictor.com/",
  icons: ["https://defipredictor.com/icon.png"],
};

const WalletContext = createContext();

const chains = [bsc];

export const config = defaultWagmiConfig({
  chains,
  projectId: PROJECT_ID,
  metadata,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId: PROJECT_ID,
  metadata,
  enableAnalytics: true,
  themeMode: "light",
});

const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { address: wagmiAddress } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  // Utility: detect if it's a mobile device
  const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  // Alternative mobile connection using Web3Modal
  const connectMobileWithWeb3Modal = async () => {
    try {
      console.log("Using Web3Modal for mobile connection");
      await open({ view: "Connect" });
      
      // Wait a bit for the connection to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (window.ethereum) {
        const browserProvider = new BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        const userAddress = await signer.getAddress();

        setProvider(browserProvider);
        setSigner(signer);
        setAddress(userAddress);

        toast.success("Wallet connected (Mobile Web3Modal)");
        return browserProvider;
      } else {
        throw new Error("No provider available after Web3Modal connection");
      }
    } catch (error) {
      console.error("Web3Modal mobile connection error:", error);
      throw error;
    }
  };

  // Initialize WalletConnect provider
  const initWalletConnectProvider = async () => {
    try {
      console.log("Initializing WalletConnect provider...");
      
      const wcProvider = await EthereumProvider.init({
        projectId: PROJECT_ID,
        metadata,
        showQrModal: true,
        chains: [56], // BNB Mainnet
        rpcMap: {
          56: "https://bsc-dataseed.binance.org/",
        },
        methods: [
          "eth_sendTransaction",
          "eth_signTransaction",
          "eth_sign",
          "personal_sign",
          "eth_signTypedData",
        ],
        events: ["chainChanged", "accountsChanged"],
        qrModalOptions: {
          themeMode: "light",
        },
        relayUrl: "wss://relay.walletconnect.com",
      });

      console.log("WalletConnect provider initialized");

      // Set up event listeners
      wcProvider.on("accountsChanged", (accounts) => {
        console.log("Accounts changed:", accounts);
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress("");
          setProvider(null);
          setSigner(null);
        }
      });

      wcProvider.on("chainChanged", (chainId) => {
        console.log("Chain changed:", chainId);
      });

      wcProvider.on("disconnect", (error) => {
        console.log("WalletConnect disconnected:", error);
        setAddress("");
        setProvider(null);
        setSigner(null);
      });

      wcProvider.on("session_delete", () => {
        console.log("WalletConnect session deleted");
        setAddress("");
        setProvider(null);
        setSigner(null);
      });

      console.log("Attempting to connect WalletConnect...");
      
      // Add timeout to prevent hanging
      const connectPromise = wcProvider.connect();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("WalletConnect connection timeout")), 30000)
      );
      
      await Promise.race([connectPromise, timeoutPromise]);
      console.log("WalletConnect connected successfully");

      const browserProvider = new BrowserProvider(wcProvider);
      console.log("BrowserProvider created");
      
      const signer = await browserProvider.getSigner();
      console.log("Signer created");
      
      const userAddress = await signer.getAddress();
      console.log("User address:", userAddress);

      setProvider(browserProvider);
      setSigner(signer);
      setAddress(userAddress);

      toast.success("Wallet connected (WalletConnect)");
      return browserProvider;
    } catch (error) {
      console.error("WalletConnect error details:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);
      console.error("Error stack:", error.stack);
      
      let errorMessage = "Failed to connect via WalletConnect";
      if (error.message) {
        errorMessage += `: ${error.message}`;
      }
      
      toast.error(errorMessage);
      throw error; // Re-throw to be caught by calling function
    }
  };

  // Main connect logic for both mobile + desktop
  const connectWallet = async () => {
    if (isConnecting) return;
    setIsConnecting(true);

    try {
      if (isMobile()) {
        console.log("Mobile device detected → Trying WalletConnect first");
        try {
          await initWalletConnectProvider();
        } catch (wcError) {
          console.error("WalletConnect failed, trying Web3Modal fallback:", wcError);
          try {
            await connectMobileWithWeb3Modal();
          } catch (web3ModalError) {
            console.error("Web3Modal mobile connection also failed:", web3ModalError);
            toast.error("Mobile connection failed. Please try again or use a different wallet.");
            throw web3ModalError;
          }
        }
      } else if (window.ethereum) {
        console.log("Desktop detected → Using MetaMask or web3 provider");
        await open({ view: "Connect" });

        const browserProvider = new BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        const userAddress = await signer.getAddress();

        setProvider(browserProvider);
        setSigner(signer);
        setAddress(userAddress);

        toast.success("Wallet connected (MetaMask)");
      } else {
        toast.error("No wallet detected. Please install MetaMask.");
      }
    } catch (error) {
      console.error("Connect wallet error:", error);
      // Only show error toast if it's not a WalletConnect error (to avoid duplicates)
      if (!isMobile()) {
        toast.error("Connection failed: " + (error.message || "Unknown error"));
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet cleanly
  const disconnectWallet = async () => {
    try {
      if (provider?.provider?.disconnect) {
        await provider.provider.disconnect();
      }
      disconnect();
      setAddress("");
      setProvider(null);
      setSigner(null);
      toast.info("Wallet disconnected");
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  // Update address when wagmi updates
  useEffect(() => {
    if (wagmiAddress) setAddress(wagmiAddress);
  }, [wagmiAddress]);

  // Cleanup WalletConnect provider on unmount
  useEffect(() => {
    return () => {
      if (provider?.provider?.disconnect) {
        provider.provider.disconnect().catch(console.error);
      }
    };
  }, [provider]);

  return (
    <WagmiConfig config={config}>
      <WalletContext.Provider
        value={{
          address,
          connectWallet,
          disconnectWallet,
          signer,
          provider,
          isConnecting,
        }}
      >
        {children}
      </WalletContext.Provider>
    </WagmiConfig>
  );
};

export { WalletContext, WalletProvider };

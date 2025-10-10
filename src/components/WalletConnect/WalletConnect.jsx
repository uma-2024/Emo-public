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

  // Initialize WalletConnect provider
  const initWalletConnectProvider = async () => {
    try {
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
      });

      wcProvider.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress("");
        }
      });

      wcProvider.on("disconnect", () => {
        setAddress("");
        setProvider(null);
        setSigner(null);
      });

      await wcProvider.connect();
      const browserProvider = new BrowserProvider(wcProvider);
      const signer = await browserProvider.getSigner();
      const userAddress = await signer.getAddress();

      setProvider(browserProvider);
      setSigner(signer);
      setAddress(userAddress);

      toast.success("Wallet connected (WalletConnect)");
      return browserProvider;
    } catch (error) {
      console.error("WalletConnect error:", error);
      toast.error("Failed to connect via WalletConnect");
    }
  };

  // Main connect logic for both mobile + desktop
  const connectWallet = async () => {
    if (isConnecting) return;
    setIsConnecting(true);

    try {
      if (isMobile()) {
        console.log("Mobile device detected → Using WalletConnect");
        await initWalletConnectProvider();
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
      toast.error("Connection failed: " + error.message);
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

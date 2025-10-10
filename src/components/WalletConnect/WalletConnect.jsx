import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { createWeb3Modal, useWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiConfig, useAccount, useDisconnect } from 'wagmi';
import { mainnet } from 'wagmi/chains'; // Import Ethereum Mainnet
import Provider from "@walletconnect/universal-provider";
import { EthereumProvider } from '@walletconnect/ethereum-provider';

// Hardcoded WalletConnect Project ID and Metadata
const PROJECT_ID = "9aced30cb7c70da7e0a7b4129fbd0a8f";

// Use the real origin in dev to avoid the metadata URL warning
const appUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:5173";

const metadata = {
  name: "XIK Presale",
  description: "XIK Token Presale Platform",
  url: appUrl,
  icons: [`${appUrl}/icon.png`],
};

// Create the context
export const WalletContext = createContext();

// WAGMI configuration
const chains = [mainnet]; // Using Ethereum Mainnet
export const config = defaultWagmiConfig({
  chains,
  projectId: PROJECT_ID,
  metadata,
});

// Initialize Web3Modal
createWeb3Modal({
  wagmiConfig: config,
  projectId: PROJECT_ID,
  metadata,
  enableAnalytics: true,
  themeMode: 'light',
});

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const { address: wagmiAddress } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  // WalletConnect fallback if window.ethereum is not available
  const initWalletConnectProvider = async () => {
    try {
      const wcProvider = await EthereumProvider.init({
        projectId: PROJECT_ID,
        metadata: {
          name: "XIK Presale",
          description: "XIK Token Presale Platform",
          url: appUrl,
          icons: [`${appUrl}/icon.png`],
        },
        showQrModal: true,
        optionalChains: [1], // Ethereum Mainnet chain ID
        rpcMap: {
          1: 'https://eth-mainnet.g.alchemy.com/v2/demo', // Ethereum Mainnet RPC URL
        },
      });

      await wcProvider.connect();
      const provider = new ethers.providers.Web3Provider(wcProvider);
      setProvider(provider);
      const signer = provider.getSigner();
      setSigner(signer);
      const userAddress = await signer.getAddress();
      setAddress(userAddress);
      toast.success("Wallet connected using WalletConnect");
    } catch (error) {
      console.error("Error initializing WalletConnect:", error);
      toast.error("Failed to connect via WalletConnect");
    }
  };

  const switchNetwork = async (provider) => {
    const ethereumMainnetChainId = "0x1"; // Hexadecimal chain ID for Ethereum Mainnet
    const currentNetwork = await provider.getNetwork();
    if (currentNetwork.chainId !== parseInt(ethereumMainnetChainId, 16)) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: ethereumMainnetChainId }],
        });
        toast.success("Switched to Ethereum Mainnet");
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: ethereumMainnetChainId,
                chainName: "Ethereum Mainnet",
                rpcUrls: ["https://eth-mainnet.g.alchemy.com/v2/demo"],
                nativeCurrency: {
                  name: "Ether",
                  symbol: "ETH",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://etherscan.io"],
              }],
            });
            toast.success("Ethereum Mainnet added and switched");
          } catch (addError) {
            console.error(addError);
            toast.error("Failed to add Ethereum Mainnet");
          }
        } else {
          console.error(switchError);
          toast.error("Failed to switch to Ethereum Mainnet");
        }
      }
    }
  };

  const connectWallet = async () => {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (!isMobile) {
        // Use MetaMask or any web3 browser extension on desktop
        console.log("Web provider available, using MetaMask or web extension");
        await open({ view: 'Connect' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await switchNetwork(provider);
        toast.success("Wallet connected using MetaMask or another desktop wallet");
      } else if (isMobile) {
        // On mobile, use WalletConnect
        await initWalletConnectProvider();
      } else {
        // If no extension is available and on desktop, show error
        console.error("No wallet extension detected on desktop");
        toast.error("Please install a wallet extension like MetaMask.");
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
      toast.error("Failed to connect wallet");
    }
  };

  const disconnectWallet = () => {
    disconnect();
    setAddress("");
    setProvider(null);
    setSigner(null);
    toast.success("Wallet disconnected");
  };

  useEffect(() => {
    if (wagmiAddress) {
      setAddress(wagmiAddress);
    }
  }, [wagmiAddress]);

  console.log('🔍 [Wallet] Current address:', address);

  return (
    <WagmiConfig config={config}>
      <WalletContext.Provider value={{ address, connectWallet, disconnectWallet, signer, provider }}>
        {children}
      </WalletContext.Provider>
    </WagmiConfig>
  );
};
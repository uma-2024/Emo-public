import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { createWeb3Modal, useWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiConfig, useAccount, useDisconnect } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains'; // Import BNB Mainnet chain
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
const chains = [bscTestnet]; // Using BSC Testnet for development
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
      console.log('🔄 [Wallet] Initializing WalletConnect for mobile...');
      console.log('🔍 [Wallet] Project ID:', PROJECT_ID);
      console.log('🔍 [Wallet] App URL:', appUrl);
      
      // Use a simpler configuration to avoid compatibility issues
      const wcProvider = await EthereumProvider.init({
        projectId: PROJECT_ID,
        metadata: {
          name: "XIK Presale",
          description: "XIK Token Presale Platform",
          url: appUrl,
          icons: [`${appUrl}/icon.png`],
        },
        showQrModal: true,
      });

      console.log('🔄 [Wallet] WalletConnect provider initialized, connecting...');
      await wcProvider.connect();
      
      console.log('🔄 [Wallet] Creating ethers provider...');
      const provider = new ethers.BrowserProvider(wcProvider);
      
      console.log('✅ [Wallet] WalletConnect provider created');
      setProvider(provider);
      
      const signer = await provider.getSigner();
      setSigner(signer);
      
      const userAddress = await signer.getAddress();
      setAddress(userAddress);
      
      console.log('✅ [Wallet] WalletConnect connected:', userAddress);
      toast.success("Wallet connected using WalletConnect");
    } catch (error) {
      console.error("❌ [Wallet] Error initializing WalletConnect:", error);
      console.error("❌ [Wallet] Error details:", error.message);
      console.error("❌ [Wallet] Error stack:", error.stack);
      toast.error("Failed to connect via WalletConnect: " + error.message);
    }
  };

  const switchNetwork = async (provider) => {
    const bscTestnetChainId = "0x61"; // Hexadecimal chain ID for BSC Testnet
    const currentNetwork = await provider.getNetwork();
    
    if (currentNetwork.chainId !== parseInt(bscTestnetChainId, 16)) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: bscTestnetChainId }],
        });
        toast.success("Switched to BSC Testnet");
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: bscTestnetChainId,
                chainName: "Binance Smart Chain Testnet",
                rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545/"],
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://testnet.bscscan.com"],
              }],
            });
            toast.success("BSC Testnet added and switched");
          } catch (addError) {
            console.error(addError);
            toast.error("Failed to add BSC Testnet");
          }
        } else {
          console.error(switchError);
          toast.error("Failed to switch to BSC Testnet");
        }
      }
    }
  };

  const connectWallet = async () => {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (!isMobile) {
        // Use MetaMask or any web3 browser extension on desktop
        console.log("🔄 [Wallet] Desktop detected, using MetaMask or web extension");
        await open({ view: 'Connect' });
        
        // Wait for connection to be established
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { ethereum } = window;
        if (!ethereum) {
          throw new Error("No Ethereum provider found");
        }
        
        const provider = new ethers.BrowserProvider(ethereum);
        setProvider(provider);
        await switchNetwork(provider);
        
        const signer = await provider.getSigner();
        setSigner(signer);
        
        const userAddress = await signer.getAddress();
        setAddress(userAddress);
        
        console.log('✅ [Wallet] Desktop wallet connected:', userAddress);
        toast.success("Wallet connected using MetaMask or another desktop wallet");
      } else if (isMobile) {
        // On mobile, use Web3Modal (which includes WalletConnect support)
        console.log("🔄 [Wallet] Mobile detected, using Web3Modal");
        await open({ view: 'Connect' });
        
        // Wait for connection to be established
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { ethereum } = window;
        if (!ethereum) {
          throw new Error("No Ethereum provider found");
        }
        
        const provider = new ethers.BrowserProvider(ethereum);
        setProvider(provider);
        
        const signer = await provider.getSigner();
        setSigner(signer);
        
        const userAddress = await signer.getAddress();
        setAddress(userAddress);
        
        console.log('✅ [Wallet] Mobile Web3Modal connected:', userAddress);
        toast.success("Wallet connected using Web3Modal");
      } else {
        // If no extension is available and on desktop, show error
        console.error("No wallet extension detected on desktop");
        toast.error("Please install a wallet extension like MetaMask.");
      }
    } catch (err) {
      console.error("❌ [Wallet] Error connecting wallet:", err);
      toast.error("Failed to connect wallet: " + err.message);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    setAddress("");
    setProvider(null);
    setSigner(null);
    toast.success("Wallet disconnected");
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
          
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const userAddress = await signer.getAddress();

          setProvider(provider);
          setSigner(signer);
          setAddress(userAddress);
          console.log('✅ [Wallet] Connection restored for:', userAddress);
        } else {
          console.log('ℹ️ [Wallet] No existing connection found');
        }
      } catch (error) {
        console.error('❌ [Wallet] Error restoring connection:', error);
      }
    };

    // Add a delay for mobile devices
    const timer = setTimeout(restoreConnection, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (wagmiAddress) {
      setAddress(wagmiAddress);
    }
  }, [wagmiAddress]);

  console.log('🔍 [Wallet] Current address:', address);

  return (
    <WalletContext.Provider value={{ address, connectWallet, disconnectWallet, signer, provider }}>
      {children}
    </WalletContext.Provider>
  );
};

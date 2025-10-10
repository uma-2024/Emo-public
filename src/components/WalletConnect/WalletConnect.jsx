import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as ethers from "ethers";
import { createWeb3Modal, useWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiConfig, useAccount, useDisconnect } from 'wagmi';
import { bsc,bscTestnet } from 'wagmi/chains'; // Import BNB Mainnet chain
import Provider from "@walletconnect/universal-provider";
import { EthereumProvider } from '@walletconnect/ethereum-provider';
// Hardcoded WalletConnect Project ID and Metadata
const PROJECT_ID = "9aced30cb7c70da7e0a7b4129fbd0a8f";
const metadata = {
  name: "defipredictor",
  description: "A MMIT token game",
  url: "https://defipredictor.com/",
  icons: ["https://defipredictor.com/icon.png"],
};
// Create the context
const WalletContext = createContext();
// WAGMI configuration
const chains = [bsc];
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
const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const { address: wagmiAddress } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  // WalletConnect for mobile MetaMask connection
  const initWalletConnectProvider = async () => {
    try {
      console.log("Initializing WalletConnect provider...");
      toast.info("🔄 Initializing WalletConnect...");
      
      const wcProvider = await EthereumProvider.init({
        projectId: PROJECT_ID,
        metadata: {
          name: "defipredictor",
          description: "A mmit token game",
          url: "https://defipredictor.com/",
          icons: ["https://defipredictor.com/icon.png"],
        },
        showQrModal: true,
        chains: [56], // BNB Mainnet chain ID
        rpcMap: {
          56: 'https://bsc-dataseed.binance.org/', // BNB Mainnet RPC URL
        },
        methods: [
          'eth_sendTransaction',
          'eth_signTransaction', 
          'eth_sign',
          'personal_sign',
          'eth_signTypedData',
        ],
        events: ['chainChanged', 'accountsChanged'],
        qrModalOptions: {
          themeMode: 'light',
        },
      });

      console.log("WalletConnect provider initialized, setting up event listeners...");
      toast.info("✅ WalletConnect ready! Setting up listeners...");

      // Set up event listeners
      wcProvider.on('accountsChanged', (accounts) => {
        console.log('Accounts changed:', accounts);
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          toast.info("🔄 Account changed: " + accounts[0].substring(0, 6) + "...");
        } else {
          setAddress("");
          setProvider(null);
          setSigner(null);
          toast.warning("⚠️ Account disconnected");
        }
      });

      wcProvider.on('chainChanged', (chainId) => {
        console.log('Chain changed:', chainId);
        toast.info("🔄 Network changed: " + chainId);
      });

      wcProvider.on('disconnect', () => {
        console.log('WalletConnect disconnected');
        setAddress("");
        setProvider(null);
        setSigner(null);
        toast.warning("⚠️ Wallet disconnected");
      });

      console.log("Attempting to connect to WalletConnect...");
      toast.info("🔗 Connecting to WalletConnect...");
      await wcProvider.connect();
      console.log("WalletConnect connected successfully!");
      toast.success("✅ WalletConnect connected!");
      
      const provider = new ethers.providers.Web3Provider(wcProvider);
      console.log("Ethers provider created:", provider);
      toast.info("🔧 Setting up provider...");
      setProvider(provider);
      
      const signer = provider.getSigner();
      console.log("Signer created:", signer);
      toast.info("🔐 Creating signer...");
      setSigner(signer);
      
      const userAddress = await signer.getAddress();
      console.log("User address:", userAddress);
      setAddress(userAddress);
      
      toast.success("🎉 MetaMask connected via WalletConnect! Address: " + userAddress.substring(0, 6) + "...");
      
      return provider;
    } catch (error) {
      console.error("Detailed WalletConnect error:", error);
      console.error("Error stack:", error.stack);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);
      
      let errorMessage = "❌ Failed to connect via WalletConnect";
      let toastMessage = "❌ Connection failed";
      
      if (error.message) {
        errorMessage += ": " + error.message;
        toastMessage += ": " + error.message;
      } else if (error.code) {
        errorMessage += " (Code: " + error.code + ")";
        toastMessage += " (Code: " + error.code + ")";
      }
      
      // Show detailed error in toast for mobile debugging
      toast.error(toastMessage);
      
      // Also show specific error types
      if (error.message && error.message.includes("User rejected")) {
        toast.error("❌ User cancelled the connection");
      } else if (error.message && error.message.includes("No wallet")) {
        toast.error("❌ No wallet detected. Please install MetaMask.");
      } else if (error.message && error.message.includes("network")) {
        toast.error("❌ Network error. Check your internet connection.");
      } else if (error.code === 4001) {
        toast.error("❌ Connection rejected by user");
      } else if (error.code === 4902) {
        toast.error("❌ Network not found. Please add BSC network to MetaMask.");
      }
      
      throw error;
    }
  };
  const switchNetwork = async (provider) => {
    const bnbMainnetChainId = "0x38"; // Hexadecimal chain ID for BNB Mainnet
    const currentNetwork = await provider.getNetwork();
    if (currentNetwork.chainId !== parseInt(bnbMainnetChainId, 16)) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: bnbMainnetChainId }],
        });
        toast.success("Switched to BNB Mainnet");
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: bnbMainnetChainId,
                chainName: "Binance Smart Chain Mainnet",
                rpcUrls: ["https://rpc.ankr.com/bsc"],
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://bscscan.com"],
              }],
            });
            toast.success("BNB Mainnet added and switched");
          } catch (addError) {
            console.error(addError);
            toast.error("Failed to add BNB Mainnet");
          }
        } else {
          console.error(switchError);
          toast.error("Failed to switch to BNB Mainnet");
        }
      }
    }
  };
  // const switchNetwork = async (provider) => {
  //   const bscTestnetChainId = "0x61"; // Hexadecimal chain ID for BSC Testnet
  //   const currentNetwork = await provider.getNetwork();
  //   if (currentNetwork.chainId !== parseInt(bscTestnetChainId, 16)) {
  //     try {
  //       await window.ethereum.request({
  //         method: 'wallet_switchEthereumChain',
  //         params: [{ chainId: bscTestnetChainId }],
  //       });
  //       toast.success("Switched to BSC Testnet");
  //     } catch (switchError) {
  //       if (switchError.code === 4902) {
  //         try {
  //           await window.ethereum.request({
  //             method: 'wallet_addEthereumChain',
  //             params: [{
  //               chainId: bscTestnetChainId,
  //               chainName: "Binance Smart Chain Testnet",
  //               rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545/"],
  //               nativeCurrency: {
  //                 name: "BNB",
  //                 symbol: "BNB",
  //                 decimals: 18,
  //               },
  //               blockExplorerUrls: ["https://testnet.bscscan.com"],
  //             }],
  //           });
  //           toast.success("BSC Testnet added and switched");
  //         } catch (addError) {
  //           console.error(addError);
  //           toast.error("Failed to add BSC Testnet");
  //         }
  //       } else {
  //         console.error(switchError);
  //         toast.error("Failed to switch to BSC Testnet");
  //       }
  //     }
  //   }
  // };
  const connectWallet = async () => {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      console.log("Device type:", isMobile ? "Mobile" : "Desktop");
      toast.info("🔍 Detected device: " + (isMobile ? "Mobile" : "Desktop"));
      
      if (isMobile) {
        // On mobile, try WalletConnect first, fallback to Web3Modal
        console.log("Mobile detected, trying WalletConnect first...");
        toast.info("📱 Mobile detected! Trying WalletConnect...");
        try {
          await initWalletConnectProvider();
        } catch (wcError) {
          console.log("WalletConnect failed, trying Web3Modal as fallback...", wcError);
          toast.warning("⚠️ WalletConnect failed, trying alternative method...");
          await open({ view: 'Connect' });
          toast.info("🔗 Please complete the connection in your wallet");
        }
      } else {
        // Use MetaMask or any web3 browser extension on desktop
        console.log("Desktop detected, using MetaMask or web extension");
        toast.info("💻 Desktop detected! Opening wallet connection...");
        await open({ view: 'Connect' });
        
        // Don't try to get signer immediately - let wagmi handle the connection
        // The useEffect will update the address when wagmiAddress changes
        toast.info("🔗 Please complete the connection in your wallet");
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
      console.error("Error details:", {
        message: err.message,
        code: err.code,
        stack: err.stack
      });
      
      // Show detailed error in toast for mobile debugging
      if (err.message === "User rejected the request." || err.code === 4001) {
        toast.error("❌ Connection cancelled by user");
      } else if (err.message && err.message.includes("No wallet")) {
        toast.error("❌ No wallet detected. Please install MetaMask.");
      } else if (err.message && err.message.includes("network")) {
        toast.error("❌ Network error. Check your internet connection.");
      } else if (err.code === 4902) {
        toast.error("❌ Network not found. Please add BSC network to MetaMask.");
      } else {
        const errorMsg = err.message || "Unknown error occurred";
        toast.error("❌ Failed to connect wallet: " + errorMsg);
      }
    }
  };
  const disconnectWallet = async () => {
    try {
      // Disconnect from WalletConnect if it's the current provider
      if (provider && provider.provider && provider.provider.disconnect) {
        await provider.provider.disconnect();
      }
      
      // Disconnect from wagmi
      disconnect();
      
      // Reset state
      setAddress("");
      setProvider(null);
      setSigner(null);
      
      toast.success("Wallet disconnected");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      // Still reset state even if disconnect fails
      setAddress("");
      setProvider(null);
      setSigner(null);
      toast.success("Wallet disconnected");
    }
  };
  useEffect(() => {
    if (wagmiAddress) {
      setAddress(wagmiAddress);
      
      // Set up provider and signer for desktop wallets
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (window.ethereum && !isMobileDevice) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);
          const signer = provider.getSigner();
          setSigner(signer);
          toast.success("Wallet connected successfully");
        } catch (error) {
          console.error("Error setting up provider:", error);
        }
      }
    }
  }, [wagmiAddress]);
  console.log(address);
  return (
    <WagmiConfig config={config}>
      <WalletContext.Provider value={{ address, connectWallet, disconnectWallet, signer, provider }}>
        {children}
      </WalletContext.Provider>
    </WagmiConfig>
  );
};
export { WalletContext, WalletProvider };
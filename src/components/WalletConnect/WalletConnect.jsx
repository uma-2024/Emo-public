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

      // Set up event listeners
      wcProvider.on('accountsChanged', (accounts) => {
        console.log('Accounts changed:', accounts);
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress("");
          setProvider(null);
          setSigner(null);
        }
      });

      wcProvider.on('chainChanged', (chainId) => {
        console.log('Chain changed:', chainId);
      });

      wcProvider.on('disconnect', () => {
        console.log('WalletConnect disconnected');
        setAddress("");
        setProvider(null);
        setSigner(null);
      });

      await wcProvider.connect();
      
      const provider = new ethers.providers.Web3Provider(wcProvider);
      setProvider(provider);
      
      const signer = provider.getSigner();
      setSigner(signer);
      
      const userAddress = await signer.getAddress();
      setAddress(userAddress);
      
      toast.success("MetaMask connected via WalletConnect");
      
      return provider;
    } catch (error) {
      console.error("Error initializing WalletConnect:", error);
      toast.error("Failed to connect via WalletConnect: " + error.message);
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
      
      if (isMobile) {
        // On mobile, always use WalletConnect to connect with MetaMask mobile app
        console.log("Mobile detected, connecting with MetaMask via WalletConnect");
        await initWalletConnectProvider();
      } else {
        // Use MetaMask or any web3 browser extension on desktop
        console.log("Desktop detected, using MetaMask or web extension");
        await open({ view: 'Connect' });
        
        // Don't try to get signer immediately - let wagmi handle the connection
        // The useEffect will update the address when wagmiAddress changes
        toast.info("Please complete the connection in your wallet");
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
      if (err.message === "User rejected the request.") {
        toast.error("Connection cancelled by user");
      } else {
        toast.error("Failed to connect wallet: " + err.message);
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
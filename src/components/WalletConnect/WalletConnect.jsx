import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { createWeb3Modal, useWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiConfig, useAccount, useDisconnect, useConnect, useWalletClient } from 'wagmi';
import { mainnet } from 'wagmi/chains'; // Import Ethereum Mainnet
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
  const { connectors } = useConnect();
  const { data: walletClient } = useWalletClient();

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
      
      // Add event listeners for WalletConnect
      wcProvider.on("accountsChanged", (accounts) => {
        console.log("🔄 [Wallet] Accounts changed:", accounts);
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }
      });

      wcProvider.on("chainChanged", (chainId) => {
        console.log("🔄 [Wallet] Chain changed:", chainId);
      });

      wcProvider.on("disconnect", () => {
        console.log("🔄 [Wallet] WalletConnect disconnected");
        setAddress("");
        setProvider(null);
        setSigner(null);
        toast.success("Wallet disconnected");
      });

        // Wait for connection to be established
        if (wcProvider.connected) {
          console.log('🔄 [Wallet] Creating ethers provider...');
          
          try {
            // Use Web3Provider (ethers v5)
            const provider = new ethers.providers.Web3Provider(wcProvider);
            console.log('✅ [Wallet] Web3Provider created successfully');
            
            setProvider(provider);
            const signer = provider.getSigner();
            setSigner(signer);
            
            const userAddress = await signer.getAddress();
            setAddress(userAddress);
            
            console.log('✅ [Wallet] WalletConnect connected:', userAddress);
            toast.success("Wallet connected using WalletConnect");
          } catch (web3ProviderError) {
            console.log('⚠️ [Wallet] Web3Provider failed, trying fallback approach:', web3ProviderError);
            
            // Fallback: Use JsonRpcProvider with a public RPC
            try {
              const fallbackProvider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/demo");
              console.log('✅ [Wallet] Fallback JsonRpcProvider created');
              
              setProvider(fallbackProvider);
              
              // For fallback, we can't get a signer, so we'll rely on wagmi for signing
              console.log('⚠️ [Wallet] Using fallback provider - signing will be handled by wagmi');
              toast.success("Wallet connected using WalletConnect (fallback mode)");
            } catch (fallbackError) {
              console.error('❌ [Wallet] Both Web3Provider and fallback failed:', fallbackError);
              throw new Error("Failed to create provider for WalletConnect");
            }
          }
        } else {
          throw new Error("WalletConnect connection not established");
        }
    } catch (error) {
      console.error("❌ [Wallet] Error initializing WalletConnect:", error);
      console.error("❌ [Wallet] Error details:", error.message);
      console.error("❌ [Wallet] Error stack:", error.stack);
      toast.error("Failed to connect via WalletConnect: " + error.message);
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
      console.log('🔍 [Wallet] Connect wallet called');
      console.log('🔍 [Wallet] Is mobile:', isMobile);
      console.log('🔍 [Wallet] Current wagmi address:', wagmiAddress);
      
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
        
        const provider = new ethers.providers.Web3Provider(ethereum);
        setProvider(provider);
        await switchNetwork(provider);
        
        const signer = provider.getSigner();
        setSigner(signer);
        
        const userAddress = await signer.getAddress();
        setAddress(userAddress);
        
        console.log('✅ [Wallet] Desktop wallet connected:', userAddress);
        toast.success("Wallet connected using MetaMask or another desktop wallet");
      } else if (isMobile) {
        // On mobile, use Web3Modal directly
        console.log("🔄 [Wallet] Mobile detected, using Web3Modal");
        
        try {
          // Open Web3Modal
          console.log("🔄 [Wallet] Opening Web3Modal...");
          await open({ view: 'Connect' });
          
          // Give Web3Modal time to establish connection
          console.log("🔄 [Wallet] Waiting for Web3Modal to establish connection...");
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          // Check if we have a connection now
          if (wagmiAddress) {
            console.log("✅ [Wallet] Wagmi connection detected:", wagmiAddress);
            setAddress(wagmiAddress);
            
            // For mobile, we don't need to create a separate provider
            // Wagmi handles the provider internally
            console.log('✅ [Wallet] Mobile connection established via Web3Modal');
            toast.success("Wallet connected via Web3Modal");
            return;
          }
          
          // If no wagmi connection, try EthereumProvider fallback
          console.log("⚠️ [Wallet] No wagmi connection, trying EthereumProvider fallback...");
          await initWalletConnectProvider();
          
        } catch (error) {
          console.error("❌ [Wallet] Mobile connection error:", error);
          toast.error("Failed to connect wallet on mobile: " + error.message);
          throw error;
        }
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

  // Mobile detection and initialization
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    console.log('🔍 [Wallet] User Agent:', navigator.userAgent);
    console.log('🔍 [Wallet] Mobile detected:', isMobile);
    if (isMobile) {
      console.log('📱 [Wallet] Mobile device detected');
    }
  }, []);

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
          
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
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
    console.log('🔄 [Wallet] useEffect triggered - wagmiAddress:', wagmiAddress, 'provider:', !!provider, 'walletClient:', !!walletClient);
    
    if (wagmiAddress) {
      setAddress(wagmiAddress);
      
      // If we have a wagmi address but no provider, try to create one
      if (wagmiAddress && !provider) {
        console.log('🔄 [Wallet] Need to create provider for wagmi address:', wagmiAddress);
        
        const createProviderFromWagmi = async () => {
          try {
            console.log('🔄 [Wallet] Starting provider creation...');
            console.log('🔄 [Wallet] walletClient available:', !!walletClient);
            console.log('🔄 [Wallet] window.ethereum available:', !!window.ethereum);
            
            // For mobile, try to get provider from walletClient first
            if (walletClient) {
              console.log('🔄 [Wallet] Creating provider from walletClient for mobile');
              console.log('🔄 [Wallet] walletClient type:', typeof walletClient);
              console.log('🔄 [Wallet] walletClient constructor:', walletClient.constructor.name);
              
              try {
                // Try Web3Provider first (ethers v5)
                console.log('🔄 [Wallet] Attempting Web3Provider with walletClient...');
                const ethersProvider = new ethers.providers.Web3Provider(walletClient);
                console.log('🔄 [Wallet] Web3Provider created, getting signer...');
                const ethersSigner = ethersProvider.getSigner();
                setProvider(ethersProvider);
                setSigner(ethersSigner);
                console.log('✅ [Wallet] Provider created from walletClient');
                return;
              } catch (web3ProviderError) {
                console.log('⚠️ [Wallet] Web3Provider failed for walletClient:', web3ProviderError);
                console.log('⚠️ [Wallet] Error details:', web3ProviderError.message);
                
                // Fallback: Use JsonRpcProvider
                console.log('🔄 [Wallet] Creating fallback JsonRpcProvider...');
                const fallbackProvider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/demo");
                setProvider(fallbackProvider);
                console.log('✅ [Wallet] Fallback provider created from walletClient');
                return;
              }
            }
            
            // Fallback: try window.ethereum (for desktop)
            const { ethereum } = window;
            if (ethereum) {
              console.log('🔄 [Wallet] Creating provider from window.ethereum');
              try {
                const web3Provider = new ethers.providers.Web3Provider(ethereum);
                const web3Signer = web3Provider.getSigner();
                setProvider(web3Provider);
                setSigner(web3Signer);
                console.log('✅ [Wallet] Provider created from window.ethereum');
              } catch (ethereumError) {
                console.log('⚠️ [Wallet] window.ethereum provider creation failed:', ethereumError);
                // Create a fallback provider
                const fallbackProvider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/demo");
                setProvider(fallbackProvider);
                console.log('✅ [Wallet] Fallback provider created from window.ethereum error');
              }
            } else {
              console.log('⚠️ [Wallet] No provider source available, creating fallback');
              // Create a fallback provider when no other option is available
              const fallbackProvider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/demo");
              setProvider(fallbackProvider);
              console.log('✅ [Wallet] Fallback provider created as last resort');
            }
          } catch (error) {
            console.error('❌ [Wallet] Could not create provider from wagmi:', error);
            console.error('❌ [Wallet] Error details:', error.message);
            console.error('❌ [Wallet] Error stack:', error.stack);
            
            // Even if everything fails, create a fallback provider
            try {
              const fallbackProvider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/demo");
              setProvider(fallbackProvider);
              console.log('✅ [Wallet] Emergency fallback provider created');
            } catch (fallbackError) {
              console.error('❌ [Wallet] Even fallback provider failed:', fallbackError);
            }
          }
        };
        createProviderFromWagmi();
      }
    } else {
      // If wagmi address is cleared, clear our local state too
      if (address && !wagmiAddress) {
        console.log('🔄 [Wallet] Wagmi disconnected, clearing local state');
        setAddress("");
        setProvider(null);
        setSigner(null);
      }
    }
  }, [wagmiAddress, provider, address, walletClient]);

  console.log('🔍 [Wallet] Current address:', address);

  return (
    <WalletContext.Provider value={{ address, connectWallet, disconnectWallet, signer, provider }}>
      {children}
    </WalletContext.Provider>
  );
};

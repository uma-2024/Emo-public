import { useState, useEffect, useCallback, useContext } from 'react';
import { ethers } from 'ethers';
import { PresaleContract } from '../services/PresaleContract';
import { usePresale } from '../contexts/PresaleContext';
import { WalletContext } from '../components/WalletConnect/WalletConnect';

export const usePresaleContract = (provider, address) => {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [phaseData, setPhaseData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [fundsRaised, setFundsRaised] = useState(null);
  const { refAddress } = usePresale();

  // Initialize contract
  useEffect(() => {
    if (provider && address) {
      const initContract = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const presaleContract = new PresaleContract(provider);
          await presaleContract.init();
          setContract(presaleContract);
          
          // Load initial data
          await loadContractData(presaleContract);
        } catch (err) {
          console.error('Failed to initialize contract:', err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      initContract();
    }
  }, [provider, address]);

  // Load contract data
  const loadContractData = useCallback(async (contractInstance) => {
    if (!contractInstance) return;

    try {
      const [phase, user, funds] = await Promise.all([
        contractInstance.getCurrentPhase(),
        contractInstance.getUserInfo(address),
        contractInstance.getFundsRaised()
      ]);

      setPhaseData(phase);
      setUserInfo(user);
      setFundsRaised(funds);
    } catch (err) {
      console.error('Failed to load contract data:', err);
      setError(err.message);
    }
  }, [address]);

  // Refresh data
  const refreshData = useCallback(async () => {
    if (contract) {
      await loadContractData(contract);
    }
  }, [contract, loadContractData]);

  // Buy with ETH
  const buyWithETH = useCallback(async (ethAmount) => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      setLoading(true);
      setError(null);
      
      const weiAmount = ethers.parseEther(ethAmount.toString());
      const referrer = refAddress || ethers.ZeroAddress;
      
      const tx = await contract.buyWithETH(weiAmount, referrer);
      await tx.wait();
      
      // Refresh data after successful purchase
      await refreshData();
      
      return tx;
    } catch (err) {
      console.error('Failed to buy with ETH:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [contract, refAddress, refreshData]);

  // Buy with USDT
  const buyWithUSDT = useCallback(async (usdtAmount) => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      setLoading(true);
      setError(null);
      
      // Convert to 6 decimals (USDT has 6 decimals)
      const amount = ethers.parseUnits(usdtAmount.toString(), 6);
      const referrer = refAddress || ethers.ZeroAddress;
      
      const tx = await contract.buyWithUSDT(amount, referrer);
      await tx.wait();
      
      // Refresh data after successful purchase
      await refreshData();
      
      return tx;
    } catch (err) {
      console.error('Failed to buy with USDT:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [contract, refAddress, refreshData]);

  // Buy with USDC
  const buyWithUSDC = useCallback(async (usdcAmount) => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      setLoading(true);
      setError(null);
      
      // Convert to 6 decimals (USDC has 6 decimals)
      const amount = ethers.parseUnits(usdcAmount.toString(), 6);
      const referrer = refAddress || ethers.ZeroAddress;
      
      const tx = await contract.buyWithUSDC(amount, referrer);
      await tx.wait();
      
      // Refresh data after successful purchase
      await refreshData();
      
      return tx;
    } catch (err) {
      console.error('Failed to buy with USDC:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [contract, refAddress, refreshData]);

  // Get token balance
  const getTokenBalance = useCallback(async (userAddress) => {
    if (!contract) return null;
    
    try {
      return await contract.getTokenBalance(userAddress);
    } catch (err) {
      console.error('Failed to get token balance:', err);
      return null;
    }
  }, [contract]);

  // Get BNB to USD conversion
  const getBNBToUSD = useCallback(async (ethAmount) => {
    if (!contract) return null;
    
    try {
      const weiAmount = ethers.parseEther(ethAmount.toString());
      return await contract.getBNBToUSD(weiAmount);
    } catch (err) {
      console.error('Failed to get BNB to USD conversion:', err);
      return null;
    }
  }, [contract]);

  // Claim tokens
  const claim = useCallback(async () => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      setLoading(true);
      setError(null);
      
      const tx = await contract.claim();
      await tx.wait();
      
      // Refresh data after successful claim
      await refreshData();
      
      return tx;
    } catch (err) {
      console.error('Failed to claim tokens:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [contract, refreshData]);

  // Get self vesting info
  const getSelfVestingInfo = useCallback(async (userAddress) => {
    if (!contract) return null;
    
    try {
      return await contract.getSelfVestingInfo(userAddress);
    } catch (err) {
      console.error('Failed to get vesting info:', err);
      return null;
    }
  }, [contract]);

  return {
    contract,
    loading,
    error,
    phaseData,
    userInfo,
    fundsRaised,
    buyWithETH,
    buyWithUSDT,
    buyWithUSDC,
    getTokenBalance,
    getBNBToUSD,
    claim,
    getSelfVestingInfo,
    refreshData
  };
};

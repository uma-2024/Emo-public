import { ethers } from 'ethers';

const PRESALE_ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_usdt","type":"address"},{"internalType":"address","name":"_usdc","type":"address"},{"internalType":"address","name":"_ethUsdOracle","type":"address"},{"internalType":"uint256[]","name":"_phaseEndTimes","type":"uint256[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AirdropDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FundsWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phaseIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newEndTime","type":"uint256"}],"name":"PhaseEndExtended","type":"event"},{"anonymous":false,"inputs":[],"name":"PresaleEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ReferralRewardAssigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RemainingTokensWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tgeTime","type":"uint256"}],"name":"TgeTimeSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"baseTokensWei","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdAmount6","type":"uint256"},{"indexed":true,"internalType":"address","name":"referrer","type":"address"}],"name":"TokensBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"UserVestingReleased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"UserVestingStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"VestedReleased","type":"event"},{"inputs":[],"name":"AIRDROP_POOL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REFERRAL_POOL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TOTAL_PRESALE_TOKENS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ethAmount","type":"uint256"}],"name":"_getEthUsdValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"referrers","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"assignReferralRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"baseTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referrer","type":"address"}],"name":"buyWithETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"}],"name":"buyWithUSDC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"}],"name":"buyWithUSDT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentPhase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"distributeAirdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endPresale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ethUsdOracle","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"time_","type":"uint256"}],"name":"extendPhaseEndDate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fundsRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getSelfVestingInfo","outputs":[{"internalType":"uint256","name":"userVested","type":"uint256"},{"internalType":"uint256","name":"userVestingReleased","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"vested","type":"uint256"},{"internalType":"uint256","name":"released","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"phases","outputs":[{"internalType":"uint256","name":"tokens","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleEnded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referralPurchases","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"referrals","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"releaseUserVested","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"releaseVested","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tgeTime","type":"uint256"}],"name":"setTgeTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tgeTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAirdropped","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBaseSold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalReferralRewardsAssigned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUserVested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdc","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdt","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userVestings","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"released","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"startingAt","type":"uint256"}],"name":"vestTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"vestedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"vestedReleased","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vestingDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawRemainingTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawUSDC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawUSDT","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Contract addresses
// const PRESALE_CONTRACT_ADDRESS = "0xA298a0C1871A435f929CF57EA5ebDF7fc69caFdF";
export const PRESALE_CONTRACT_ADDRESS = "0x8E358370772DcbEC4518216AFEE45E486d5361A5";

// Token addresses for both BSC Mainnet and Testnet
const getTokenAddresses = (chainId) => {
  if (chainId === 56n) {
    // BSC Mainnet
    return {
      USDT: "0x55d398326f99059fF775485246999027B3197955",
      USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
    };
  } else if (chainId === 97n) {
    // BSC Testnet
    return {
      USDT: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
      USDC: "0x64544969ed7EBf5f083679233325356EbE738930"
    };
  } else {
    // Fallback to mainnet addresses
    return {
      USDT: "0x55d398326f99059fF775485246999027B3197955",
      USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
    };
  }
};

// Token ABI for USDT/USDC
const TOKEN_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)"
];

export class PresaleContract {
  constructor(provider) {
    if (!provider) {
      throw new Error('Provider is required');
    }
    this.provider = provider;
  }

  async init() {
    try {
      console.log('🔄 [Contract] Getting signer...');
      this.signer = await this.provider.getSigner();
      const signerAddress = await this.signer.getAddress();
      console.log('✅ [Contract] Got signer:', signerAddress);

      // Check network
      console.log('🔄 [Contract] Checking network...');
      const network = await this.provider.getNetwork();
      console.log('🌐 [Contract] Current network:', network);
      
      console.log('🌐 [Contract] Current network details:', {
        chainId: network.chainId.toString(),
        name: network.name,
        expectedTestnet: '97 (BSC Testnet)',
        expectedMainnet: '56 (BSC Mainnet)'
      });
      
      if (network.chainId !== 97n && network.chainId !== 56n) {
        console.warn('⚠️ [Contract] Unexpected network. Expected BSC Testnet (97) or BSC Mainnet (56), got:', network.chainId);
        console.warn('⚠️ [Contract] Contract may not be deployed on this network');
      }

      console.log('🔄 [Contract] Creating contract instance...');
      this.contract = new ethers.Contract(PRESALE_CONTRACT_ADDRESS, PRESALE_ABI, this.signer);
      console.log('✅ [Contract] Contract instance created');
      
      // Check if contract is deployed at this address
      console.log('🔄 [Contract] Checking if contract is deployed...');
      const code = await this.provider.getCode(PRESALE_CONTRACT_ADDRESS);
      if (code === '0x') {
        throw new Error(`No contract deployed at address ${PRESALE_CONTRACT_ADDRESS} on network ${network.name} (chainId: ${network.chainId})`);
      }
      console.log('✅ [Contract] Contract is deployed');
      
      // Get USDT and USDC addresses from the contract
      console.log('🔄 [Contract] Getting token addresses...');
      try {
        const [usdtAddress, usdcAddress] = await Promise.all([
          this.contract.usdt(),
          this.contract.usdc()
        ]);
        console.log('✅ [Contract] Got token addresses:', { usdt: usdtAddress, usdc: usdcAddress });
        
        // Initialize token contracts
        console.log('🔄 [Contract] Creating token contracts...');
        this.usdt = new ethers.Contract(usdtAddress, TOKEN_ABI, this.signer);
        this.usdc = new ethers.Contract(usdcAddress, TOKEN_ABI, this.signer);
        console.log('✅ [Contract] Token contracts created');
      } catch (tokenError) {
        console.error('❌ [Contract] Error getting token addresses:', tokenError);
        // Use fallback addresses based on current network
        console.log('🔄 [Contract] Using fallback token addresses for network:', network.chainId.toString());
        const tokenAddresses = getTokenAddresses(network.chainId);
        this.usdt = new ethers.Contract(tokenAddresses.USDT, TOKEN_ABI, this.signer);
        this.usdc = new ethers.Contract(tokenAddresses.USDC, TOKEN_ABI, this.signer);
        console.log('⚠️ [Contract] Using fallback token contracts:', tokenAddresses);
      }
    } catch (error) {
      console.error('❌ [Contract] Error initializing:', error);
      throw error;
    }
  }

  // Read functions
  async getCurrentPhase() {
    try {
      const currentPhase = await this.contract.currentPhase();
      const currentPhaseNum = Number(currentPhase);
      
      console.log('🔍 [Contract] Current phase number:', currentPhaseNum);
      
      // Check if phase number is valid (0-5)
      if (currentPhaseNum < 0 || currentPhaseNum > 5) {
        console.warn('⚠️ [Contract] Invalid phase number:', currentPhaseNum, 'using phase 5 (last phase) as fallback');
        // Use the last phase (phase 5) instead of phase 0 when phase number is invalid
        const phase = await this.contract.phases(5);
        return {
          tokens: phase.tokens,
          price: phase.price,
          endTime: phase.endTime
        };
      }
      
      const phase = await this.contract.phases(currentPhaseNum);
      console.log('✅ [Contract] Phase data loaded:', {
        phaseNumber: currentPhaseNum,
        tokens: phase.tokens.toString(),
        price: phase.price.toString(),
        endTime: phase.endTime.toString()
      });
      
      return {
        tokens: phase.tokens,
        price: phase.price,
        endTime: phase.endTime
      };
    } catch (error) {
      console.error('❌ [Contract] Error getting current phase:', error);
      
      // Fallback to phase 0 if current phase fails
      try {
        console.log('🔄 [Contract] Attempting fallback to phase 0...');
        const phase = await this.contract.phases(0);
        return {
          tokens: phase.tokens,
          price: phase.price,
          endTime: phase.endTime
        };
      } catch (fallbackError) {
        console.error('❌ [Contract] Fallback also failed:', fallbackError);
        throw new Error('Unable to load phase data from contract');
      }
    }
  }

  async getNextPhase() {
    try {
      const currentPhase = await this.contract.currentPhase();
      console.log('[Contract] Current phase:', currentPhase);
      const currentPhaseNum = Number(currentPhase);
      
      console.log('🔍 [Contract] Getting next phase, current:', currentPhaseNum);
      
      if (currentPhaseNum >= 5) {
        console.log('ℹ️ [Contract] No next phase available (current phase is 5 or higher)');
        return null; // No next phase
      }
      
      const phase = await this.contract.phases(currentPhaseNum + 1);
      console.log('✅ [Contract] Next phase data loaded:', {
        phaseNumber: currentPhaseNum + 1,
        tokens: phase.tokens.toString(),
        price: phase.price.toString(),
        endTime: phase.endTime.toString()
      });
      
      return {
        tokens: phase.tokens,
        price: phase.price,
        endTime: phase.endTime
      };
    } catch (error) {
      console.error('❌ [Contract] Error getting next phase:', error);
      return null; // Return null if next phase can't be loaded
    }
  }

  async getFundsRaised() {
    return await this.contract.fundsRaised();
  }

  async getUserInfo(address) {
    return await this.contract.getUserInfo(address);
  }

  // Buy functions
  async buyWithETH(amount, referrer = ethers.ZeroAddress) {
    return await this.contract.buyWithETH(referrer, { value: amount });
  }

  async buyWithUSDT(amount, referrer = ethers.ZeroAddress) {
    // First approve USDT spending
    await this.usdt.approve(PRESALE_CONTRACT_ADDRESS, amount);
    return await this.contract.buyWithUSDT(amount, referrer);
  }

  async buyWithUSDC(amount, referrer = ethers.ZeroAddress) {
    // First approve USDC spending
    await this.usdc.approve(PRESALE_CONTRACT_ADDRESS, amount);
    return await this.contract.buyWithUSDC(amount, referrer);
  }

  // Helper functions
  async getTokenBalance(address) {
    return await this.contract.baseTokens(address);
  }

  async getBNBToUSD(amount) {
    return await this.contract._getEthUsdValue(amount);
  }

  async totalBaseSold() {
    return await this.contract.totalBaseSold();
  }

  async TOTAL_PRESALE_TOKENS() {
    return await this.contract.TOTAL_PRESALE_TOKENS();
  }

  // Claim function
  async claim() {
    return await this.contract.claim();
  }

  // Get self vesting info
  async getSelfVestingInfo(userAddress) {
    return await this.contract.getSelfVestingInfo(userAddress);
  }
}
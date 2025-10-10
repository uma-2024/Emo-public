import React, { useContext } from 'react';
import { WalletContext } from '../WalletConnect/WalletConnect';
import { usePresaleContract } from '../../hooks/usePresaleContract';

const Debug = () => {
  const { provider, address } = useContext(WalletContext);
  const { phaseData, userInfo, fundsRaised, loading, error } = usePresaleContract(provider, address);

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4>Debug Info</h4>
      <div><strong>Provider:</strong> {provider ? '✅' : '❌'}</div>
      <div><strong>Address:</strong> {address || 'None'}</div>
      <div><strong>Loading:</strong> {loading ? '✅' : '❌'}</div>
      <div><strong>Error:</strong> {error || 'None'}</div>
      <div><strong>Phase Data:</strong> {phaseData ? '✅' : '❌'}</div>
      <div><strong>User Info:</strong> {userInfo ? '✅' : '❌'}</div>
      <div><strong>Funds Raised:</strong> {fundsRaised ? '✅' : '❌'}</div>
      {phaseData && (
        <div>
          <div><strong>Phase Price:</strong> {phaseData.price?.toString()}</div>
          <div><strong>Phase End Time:</strong> {phaseData.endTime?.toString()}</div>
        </div>
      )}
    </div>
  );
};

export default Debug;

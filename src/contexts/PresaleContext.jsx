import React, { createContext, useContext, useEffect, useState } from 'react';

const PresaleContext = createContext({
  isPrivatePresale: false,
  refAddress: null,
  presaleType: 'public', // 'public' or 'private'
});

export const usePresale = () => {
  const context = useContext(PresaleContext);
  if (!context) {
    throw new Error('usePresale must be used within a PresaleProvider');
  }
  return context;
};

export const PresaleProvider = ({ children }) => {
  const [isPrivatePresale, setIsPrivatePresale] = useState(false);
  const [refAddress, setRefAddress] = useState(null);
  const [presaleType, setPresaleType] = useState('public');

  useEffect(() => {
    // Check URL parameters on component mount
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    
    if (refParam) {
      // Validate if it looks like an Ethereum address (basic validation)
      const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(refParam);
      
      if (isValidAddress) {
        setIsPrivatePresale(true);
        setRefAddress(refParam);
        setPresaleType('private');
        console.log('Private presale detected with ref address:', refParam);
      } else {
        console.warn('Invalid ref address format:', refParam);
        setIsPrivatePresale(false);
        setRefAddress(null);
        setPresaleType('public');
      }
    } else {
      setIsPrivatePresale(false);
      setRefAddress(null);
      setPresaleType('public');
    }
  }, []);

  const value = {
    isPrivatePresale,
    refAddress,
    presaleType,
  };

  return (
    <PresaleContext.Provider value={value}>
      {children}
    </PresaleContext.Provider>
  );
};

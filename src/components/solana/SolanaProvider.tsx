'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { PublicKey } from '@solana/web3.js';

interface PhantomWindow extends Window {
  solana?: {
    connect(): Promise<{ publicKey: PublicKey }>;
    disconnect(): Promise<void>;
    isPhantom?: boolean;
    isConnected: boolean;
    publicKey: PublicKey | null;
  };
}

interface SolanaContextType {
  connected: boolean;
  publicKey: PublicKey | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const SolanaContext = createContext<SolanaContextType>({
  connected: false,
  publicKey: null,
  connect: async () => {},
  disconnect: async () => {},
});

export function SolanaProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);

  useEffect(() => {
    const phantom = (window as PhantomWindow).solana;
    if (phantom?.isPhantom) {
      setConnected(phantom.isConnected);
      setPublicKey(phantom.publicKey);
    }
  }, []);

  const connect = async () => {
    try {
      const phantom = (window as PhantomWindow).solana;
      if (phantom?.isPhantom) {
        const { publicKey } = await phantom.connect();
        setConnected(true);
        setPublicKey(publicKey);
      } else {
        window.open('https://phantom.app/', '_blank');
      }
    } catch (error) {
      console.error('Error connecting to Phantom:', error);
    }
  };

  const disconnect = async () => {
    try {
      const phantom = (window as PhantomWindow).solana;
      if (phantom?.isPhantom) {
        await phantom.disconnect();
        setConnected(false);
        setPublicKey(null);
      }
    } catch (error) {
      console.error('Error disconnecting from Phantom:', error);
    }
  };

  return (
    <SolanaContext.Provider value={{ connected, publicKey, connect, disconnect }}>
      {children}
    </SolanaContext.Provider>
  );
}

export const useSolana = () => useContext(SolanaContext); 
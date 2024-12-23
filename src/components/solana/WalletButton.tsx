'use client';

import { useSolana } from './SolanaProvider';
import { cn } from '@/lib/utils';

export function WalletButton() {
  const { connected, publicKey, connect, disconnect } = useSolana();

  return (
    <button
      onClick={connected ? disconnect : connect}
      className={cn(
        'px-4 py-2 rounded-lg font-semibold transition-colors',
        'bg-purple-600 hover:bg-purple-700 text-white',
        'flex items-center gap-2',
        connected && 'bg-green-600 hover:bg-green-700'
      )}
    >
      {connected ? (
        <>
          {publicKey?.toBase58().slice(0, 4)}...
          {publicKey?.toBase58().slice(-4)}
        </>
      ) : (
        'Connect Wallet'
      )}
    </button>
  );
} 
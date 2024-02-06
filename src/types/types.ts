import { PublicKey } from '@solana/web3.js';

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

export interface MagicEdenProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
}


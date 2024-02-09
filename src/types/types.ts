import { PublicKey, Transaction, SendOptions } from "@solana/web3.js";

type DisplayEncoding = "utf8" | "hex";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

export interface MagicEdenProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  signAndSendTransaction: (
    transaction: Transaction,
    opts?: SendOptions
  ) => Promise<{ signature: string; publicKey: PublicKey }>;
}

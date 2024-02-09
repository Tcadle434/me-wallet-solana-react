import {
  Transaction,
  SystemProgram,
  Connection,
  PublicKey,
} from "@solana/web3.js";

/**
 * Creates an example transaction to transfer 100 lamports to the same account.
 * @param {String} publicKey a wallet public key
 * @param {Connection} connection an RPC connection
 * @returns {Transaction} a transaction
 */
export const createTransaction = async (
  publicKey: PublicKey,
  connection: Connection
): Promise<Transaction> => {
  const latestBlockhash = (await connection.getLatestBlockhash()).blockhash;
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: publicKey,
      lamports: 1000,
    })
  );
  transaction.feePayer = publicKey;
  transaction.recentBlockhash = latestBlockhash;

  return transaction;
};

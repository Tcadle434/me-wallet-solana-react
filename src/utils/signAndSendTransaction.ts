import { Transaction } from "@solana/web3.js";

import { MagicEdenProvider } from "../types/types";

/**
 * Signs and sends the given created transaction using the MagicEdenProvider object.
 * @param {MagicEdenProvider} provider The MagicEdenProvider object
 * @param {Transaction} transaction The transaction to sign and send
 * @returns {Promise<string>} A promise that resolves to the signature of the transaction
 */
export const signAndSendTransaction = async (
  provider: MagicEdenProvider,
  transaction: Transaction
): Promise<string> => {
  try {
    const { signature } = await provider.signAndSendTransaction(transaction);
    return signature;
  } catch (error) {
    console.warn(error);
    throw new Error(
      "An unexpected error occured while signing the transaction."
    );
  }
};

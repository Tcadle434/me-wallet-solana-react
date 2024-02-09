import { MagicEdenProvider } from "../types/types";

/**
 * Prompts the user to sign a message using the MagicEden Provider object
 * @param {MagicEdenProvider} provider The MagicEdenProvider object
 * @param {string} message The message to sign
 * @returns {Promise<string>} A promise that resolves to the signed message
 * @throws {Error} If an unexpected error occurs while signing the message
 */
export const signMessage = async (
  provider: MagicEdenProvider,
  message: string
): Promise<string> => {
  try {
    const encodedText = new TextEncoder().encode(message);
    const signedMessage = await provider.signMessage(encodedText);
    return signedMessage;
  } catch (error) {
    console.warn(error);
    throw new Error("An unexpected error occured while signing the message.");
  }
};

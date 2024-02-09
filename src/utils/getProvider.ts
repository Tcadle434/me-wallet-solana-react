import { useEffect, useState } from "react";
import { MagicEdenProvider } from "../types/types";

const CHECK_INTERVAL_MS = 1000;
const TIMEOUT_MS = 3000;

/**
 * Custom hook to get the MagicEdenProvider object. It checks for the provider object
 * every second and redirects to the website to download the wallet extension if the
 * provider is not found after 3 seconds.
 * @returns {MagicEdenProvider | undefined} The MagicEdenProvider object
 */
export const useMagicEdenProvider = (): MagicEdenProvider | undefined => {
  const [provider, setProvider] = useState<MagicEdenProvider | undefined>();
  const [found, setFound] = useState(false);

  useEffect(() => {
    // Immediate check to avoid waiting for the interval
    const checkProvider = () => {
      if ("magicEden" in window) {
        const anyWindow: any = window;
        const magicProvider = anyWindow.magicEden?.solana;
        if (magicProvider?.isMagicEden) {
          setProvider(magicProvider);
          setFound(true);
          return true;
        }
      }
      return false;
    };

    // early return if provider is already found
    if (checkProvider()) return;

    const interval = setInterval(() => {
      if (checkProvider()) clearInterval(interval);
    }, CHECK_INTERVAL_MS);

    const timeout = setTimeout(() => {
      if (!found) {
        window.location.href = "https://wallet.magiceden.io/";
        clearInterval(interval);
      }
    }, TIMEOUT_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [found]);

  return provider;
};

import { useEffect, useState } from 'react';
import { MagicEdenProvider } from "../types/types";

const CHECK_INTERVAL_MS = 1000;
const TIMEOUT_MS = 3000;

export const useMagicEdenProvider = (): MagicEdenProvider | undefined => {
  const [provider, setProvider] = useState<MagicEdenProvider | undefined>();
  const [found, setFound] = useState(false);

  useEffect(() => {
    // Immediate check to avoid waiting for the interval
    const checkProvider = () => {
      // check if the magicEden object is available
      if ('magicEden' in window) {
        const anyWindow: any = window;
        const magicProvider = anyWindow.magicEden?.solana;
        if (magicProvider?.isMagicEden) {
          console.log('Magic Eden provider found');
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
        // redirect to website to download the wallet extension
        window.location.href = 'https://wallet.magiceden.io/'
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
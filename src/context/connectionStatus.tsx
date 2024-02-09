import { useState, createContext, useContext, FC, ReactNode } from "react";
import type { MagicEdenProvider } from "../types/types";
import { useMagicEdenProvider } from "../utils/getProvider";

interface ConnectionStatusContextType {
  isConnected: boolean;
  provider: MagicEdenProvider | undefined;
  connect: () => Promise<void>;
}

export const ConnectionStatusContext =
  createContext<ConnectionStatusContextType | null>(null);

export const useConnectionStatus = () => {
  const context = useContext(ConnectionStatusContext);
  if (!context) {
    throw new Error(
      "useConnectionStatus must be used within a ConnectionStatusProvider"
    );
  }
  return context;
};

export const ConnectionStatusProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const provider = useMagicEdenProvider();
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    if (!provider) return;
    try {
      await provider.connect();
      setIsConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const value = { isConnected, provider, connect };

  return (
    <ConnectionStatusContext.Provider value={value}>
      {children}
    </ConnectionStatusContext.Provider>
  );
};

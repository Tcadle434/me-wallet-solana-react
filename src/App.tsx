import { useState } from "react";
import { NoProvider } from "./components/NoProvider";
import { ConnectWallet } from "./components/ConnectWalletButton";
import { useMagicEdenProvider } from "./utils/getProvider";
import "./App.css";

function App() {
  const provider = useMagicEdenProvider();
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    try {
      await provider!.connect();
      setIsConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (!provider) {
    return <NoProvider />;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      {isConnected ? (
        <div className="text-gray-200 text-center">
          Connected Wallet:
          <br /> {provider.publicKey?.toString()}
        </div>
      ) : (
        <ConnectWallet handleConnect={handleConnect} />
      )}
    </div>
  );
}

export default App;

import { NoProvider } from "./components/NoProvider";
import { useConnectionStatus } from "./context/connectionStatus";
import { signMessage } from "./utils/signMessage";
import { createTransaction } from "./utils/createTransaction";
import { Connection } from "@solana/web3.js";
import { signAndSendTransaction } from "./utils/signAndSendTransaction";
import { trimTx } from "./utils/trimTx";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const { isConnected, provider, connect } = useConnectionStatus();

  if (!provider) {
    return <NoProvider />;
  }

  async function signWalletMessage() {
    try {
      await signMessage(
        provider!,
        "Hello, World! 🌍 Welcome to the Magic Eden wallet on Solana"
      );
      toast.success("Message signed successfully!");
    } catch (error) {
      toast.error(`Error signing message: ${error}`);
    }
  }

  async function signAndSendWalletTransaction() {
    try {
      const transaction = await createTransaction(
        provider!.publicKey!,
        new Connection(
          "https://mainnet.helius-rpc.com/?api-key=d5b46609-569f-47e0-adef-542e5c202021"
        )
      );
      const signature = await signAndSendTransaction(provider!, transaction);
      toast.success(
        `Transaction signed and sent with signature: ${trimTx(signature)}`
      );
    } catch (error) {
      toast.error(`Error signing and sending transaction: ${error}`);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      {isConnected ? (
        <div className="text-gray-200 text-center flex flex-col items-center">
          Connected Wallet:
          <br />
          {provider.publicKey?.toString()}
          <button
            onClick={signWalletMessage}
            className="bg-[#e93a88] text-white rounded font-semibold px-4 py-2 mt-4"
          >
            Sign Message
          </button>
          <button
            onClick={signAndSendWalletTransaction}
            className="bg-[#e93a88] text-white rounded font-semibold px-4 py-2 mt-4"
          >
            Sign and Send Transaction
          </button>
        </div>
      ) : (
        <button
          onClick={connect}
          className="bg-[#e93a88] text-white rounded font-semibold px-4 py-2"
        >
          Connect Wallet
        </button>
      )}
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;

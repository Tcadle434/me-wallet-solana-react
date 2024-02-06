export function ConnectWallet({
  handleConnect,
}: {
  handleConnect: () => void;
}) {
  return (
    <button
      onClick={handleConnect}
      className="bg-purple-500 text-white rounded font-semibold px-4 py-2 border-[#27272a] border-2"
    >
      Connect Wallet
    </button>
  );
}

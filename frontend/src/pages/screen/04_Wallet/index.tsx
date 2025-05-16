import { useEffect, useState } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const useBalance = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      return;
    }

    const fetchBalance = async () => {
      try {
        const bal = await connection.getBalance(publicKey);
        setBalance(bal);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(null);
      }
    };

    fetchBalance();
  }, [connection, publicKey]);

  return balance;
};

function Wallet() {
  const balance = useBalance();
  const { publicKey } = useWallet();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl p-6 space-y-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Connect Your Wallet</h1>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 text-white !rounded-lg" />
          <WalletDisconnectButton className="!bg-red-500 hover:!bg-red-600 text-white !rounded-lg" />
        </div>

        {publicKey ? (
          <div className="mt-6 bg-gray-50 p-4 rounded-xl border text-left">
            <p className="text-sm text-gray-500">Wallet Address:</p>
            <p className="font-mono text-sm break-all text-gray-800">
              {publicKey.toString()}
            </p>
            <p className="mt-4 text-sm text-gray-500">Balance:</p>
            <p className="text-lg font-semibold text-green-600">
              {balance !== null ? `${(balance / 1e9).toFixed(4)} SOL` : "Loading..."}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-sm mt-4">No wallet connected</p>
        )}
      </div>
    </div>
  );
}

export default Wallet;

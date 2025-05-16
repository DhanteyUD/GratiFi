import { useEffect, useState } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SolChart } from "@/components";
const useBalance = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      return;
    }
    connection
      .getBalance(publicKey)
      .then((bal) => setBalance(bal))
      .catch(() => setBalance(null));
  }, [connection, publicKey]);

  return balance;
};

const useTransactions = (limit = 10) => {
  const [txs, setTxs] = useState<string[] | null>(null);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey) {
      setTxs(null);
      return;
    }
    (async () => {
      try {
        const sigs = await connection.getSignaturesForAddress(publicKey, {
          limit,
        });
        setTxs(sigs.map((s) => s.signature));
      } catch {
        setTxs(null);
      }
    })();
  }, [connection, publicKey, limit]);

  return txs;
};

export default function WalletPage() {
  const balance = useBalance();
  const txs = useTransactions(8);
  const { publicKey } = useWallet();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 shadow rounded-2xl p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Your Wallet</h1>
            <div className="mt-4 flex justify-center gap-4">
              <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 text-white !rounded-lg" />
              <WalletDisconnectButton className="!bg-red-500 hover:!bg-red-600 text-white !rounded-lg" />
            </div>
            {publicKey ? (
              <div className="mt-6 text-left bg-gray-50 p-4 rounded-xl border">
                <p className="text-sm text-gray-500">Address:</p>
                <p className="font-mono text-sm break-all">
                  {publicKey.toString()}
                </p>
                <p className="mt-4 text-sm text-gray-500">Balance:</p>
                <p className="text-lg font-semibold text-green-600">
                  {balance !== null
                    ? `${(balance / 1e9).toFixed(4)} SOL`
                    : "Loading..."}
                </p>
              </div>
            ) : (
              <p className="mt-4 text-gray-500">No wallet connected</p>
            )}
          </div>
          {publicKey && (
            <div className="bg-white border border-gray-200 shadow rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">
                Recent Transactions
              </h2>
              {txs === null ? (
                <p className="text-gray-500">Loading…</p>
              ) : txs.length === 0 ? (
                <p className="text-gray-500">No transactions found.</p>
              ) : (
                <ul className="space-y-2 text-sm font-mono">
                  {txs.map((sig) => (
                    <li key={sig} className="truncate">
                      <a
                        href={`https://explorer.solana.com/tx/${sig}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {sig}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white border border-gray-200 shadow rounded-2xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">SOL / USD Live Chart</h2>
          {/* ensure this wrapper can grow, but the chart itself has its own height */}
          <div className="flex-1">
            <SolChart />
          </div>
        </div>
      </div>
    </div>
  );
}

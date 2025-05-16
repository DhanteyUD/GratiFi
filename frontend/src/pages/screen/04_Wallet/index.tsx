import { useEffect, useState } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SolChart } from "@/components";
import QRCode from "react-qr-code";

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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
              <div className="mt-6 text-left bg-gray-50 p-4 rounded-xl border space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Address:</p>
                  <div className="flex items-center space-x-2">
                    <p className="font-mono text-sm break-all">
                      {publicKey.toString()}
                    </p>
                    <button
                      onClick={handleCopy}
                      className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <QRCode value={publicKey.toString()} size={128} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Balance:</p>
                  <p className="text-lg font-semibold text-green-600">
                    {balance !== null
                      ? `${(balance / 1e9).toFixed(4)} SOL`
                      : "Loading..."}
                  </p>
                </div>
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
          <div className="flex-1">
            <SolChart />
          </div>
        </div>
      </div>
    </div>
  );
}

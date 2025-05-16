import { useState } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { SolChart } from "@/components";
import { SiSolana, SiEthereum } from "react-icons/si";
import { useSolanaBalance } from "@/hooks/UseSolanaBalance";
import { useSolanaTransactions } from "@/hooks/UseSolanaTransactions";
import QRCode from "react-qr-code";

export default function WalletPage() {
  const { publicKey } = useWallet();
  const { data: balance, isLoading: isBalanceLoading } = useSolanaBalance();
  const { data: txs, isLoading: isTxsLoading } = useSolanaTransactions(10);

  const [copied, setCopied] = useState(false);
  const [chain, setChain] = useState<"SOL" | "ETH">("SOL");

  const handleCopy = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-100 flex h-full md:h-[calc(100vh-115px)] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border border-[red]">
        {/* LEFT COLUMN */}
        <div className="space-y-6 border border-[green]">
          {/* Chain Switcher */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setChain("SOL")}
              className={`flex items-center px-4 py-2 rounded-lg shadow ${
                chain === "SOL" ? "bg-green-500 text-white" : "bg-white border"
              }`}
            >
              <SiSolana className="mr-2" size={20} />
              Solana
            </button>
            <button
              onClick={() => setChain("ETH")}
              className={`flex items-center px-4 py-2 rounded-lg shadow ${
                chain === "ETH" ? "bg-blue-500 text-white" : "bg-white border"
              }`}
            >
              <SiEthereum className="mr-2" size={20} />
              Ethereum
            </button>
          </div>

          {/* Wallet Card */}
          <div className="bg-white border border-gray-200 shadow rounded-2xl p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Your {chain} Wallet
            </h1>
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
                    {isBalanceLoading
                      ? "Loading..."
                      : balance !== undefined
                      ? `${(balance / 1e9).toFixed(4)} SOL`
                      : "Unavailable"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-gray-500">No wallet connected</p>
            )}
          </div>

          {/* Transactions */}
          {publicKey && (
            <div className="bg-white border border-gray-200 shadow rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">
                Recent Transactions
              </h2>
              {isTxsLoading ? (
                <p className="text-gray-500">Loading…</p>
              ) : txs?.length === 0 ? (
                <p className="text-gray-500">No transactions found.</p>
              ) : (
                <ul className="space-y-2 text-sm font-mono">
                  {txs?.map((sig, idx) => {
                    // If sig is a string, use it directly; if it's an object, use sig.transaction.signatures[0] or idx
                    const key =
                      typeof sig === "string"
                        ? sig
                        : sig?.transaction?.signatures?.[0] || idx;
                    const display =
                      typeof sig === "string"
                        ? sig
                        : sig?.transaction?.signatures?.[0] || "Unknown";
                    return (
                      <li key={key} className="truncate">
                        <a
                          href={`https://explorer.solana.com/tx/${display}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {display}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-white border border-[orange] shadow rounded-2xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">
            {chain} / USD Live Chart
          </h2>
          <div className="flex-1">
            <SolChart />
          </div>
        </div>
      </div>
    </div>
  );
}

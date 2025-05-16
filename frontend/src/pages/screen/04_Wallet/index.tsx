import { useState } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { SolChart } from "@/components";
import { useSolanaBalance } from "@/hooks/UseSolanaBalance";
import { useSolanaTransactions } from "@/hooks/UseSolanaTransactions";
import { blockchains } from "@/json";
import QRCode from "react-qr-code";

export default function WalletPage() {
  const { publicKey } = useWallet();
  const { data: balance, isLoading: isBalanceLoading } = useSolanaBalance();
  const { data: txs } = useSolanaTransactions(10);

  const [copied, setCopied] = useState(false);
  const [chain, setChain] = useState<"SOL" | "ETH">("SOL");

  const handleCopy = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Define a type for the parsed transfer instruction
  type TransferParsed = {
    type: string;
    info: {
      lamports?: number;
      destination?: string;
      [key: string]: unknown;
    };
  };

  return (
    <div className="bg-gray-100 flex h-full md:h-[calc(100vh-115px)] overflow-hidden gap-4">
      {/* LEFT COLUMN */}
      <div className="flex flex-col w-full md:w-[35%] h-full overflow-auto pl-[2px]">
        {/* Chain Switcher */}
        <div className="sticky top-0 flex justify-between items-end space-x-2 bg-background z-[2] border-b border-gray-300">
          <div className="flex">
            {blockchains.map(({ name, key, activeIcon, inactiveIcon }) => {
              const isActive = chain === key;
              return (
                <div
                  key={key}
                  onClick={() => setChain(key as "SOL" | "ETH")}
                  className={`flex items-center px-4 py-2 gap-3 rounded-[10px_10px_0_0] border border-b-transparent cursor-pointer transition-all ease-linear ${
                    isActive
                      ? "bg-white font-calSans border-gray-300 text-primary"
                      : "bg-background border-transparent text-gray-400"
                  }`}
                >
                  <img
                    src={isActive ? activeIcon : inactiveIcon}
                    alt={name}
                    className="w-8 h-8"
                  />
                  <p>{name}</p>
                </div>
              );
            })}
          </div>
          <h1 className="flex items-center text-[13px] h-[25px] font-bold text-main text-right font-calSans rounded-[20px] bg-primary px-4 mb-2">
            {chain}
          </h1>
        </div>

        {/* Wallet Card */}
        <div className="bg-white p-4 text-center w-auto border border-gray-300 border-t-0">
          <div className="">
            {publicKey ? (
              <div className="text-left bg-gray-50 p-4 rounded-xl border space-y-4">
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
              <p className="text-gray-400 py-2">No wallet connected</p>
            )}
          </div>

          <div className="mt-4 flex justify-start gap-4">
            <WalletMultiButton className="!w-[20px]!bg-blue-600 hover:!bg-blue-700 text-white !rounded-lg" />
            <WalletDisconnectButton className="!bg-red-500 hover:!bg-red-600 text-white !rounded-lg" />
          </div>
        </div>

        {/* Transactions */}
        <ul className="space-y-2 text-sm font-mono border border-[yellow]">
          {txs?.map((tx, idx) => {
            const signature = tx?.transaction?.signatures?.[0] || `tx-${idx}`;
            const blockTime = tx?.blockTime
              ? new Date(tx.blockTime * 1000).toLocaleString()
              : "N/A";
            const fee = tx?.meta?.fee ? (tx.meta.fee / 1e9).toFixed(6) : "N/A";
            const status = tx?.meta?.err ? "❌ Failed" : "✅ Success";

            // instructions can be either parsed or compiled, so we type as any
            type Instruction = {
              program?: string;
              parsed?: unknown;
              [key: string]: unknown;
            };

            const transferIx = tx?.transaction?.message?.instructions.find(
              (ix: Instruction) =>
                ix?.program === "system" &&
                "parsed" in ix &&
                (ix.parsed as TransferParsed)?.type === "transfer"
            );

            const hasInfo =
              transferIx &&
              "parsed" in transferIx &&
              transferIx.parsed &&
              typeof transferIx.parsed === "object" &&
              "info" in transferIx.parsed &&
              (transferIx.parsed as TransferParsed).info &&
              typeof (transferIx.parsed as TransferParsed).info === "object";

            const amount =
              hasInfo && (transferIx.parsed as TransferParsed).info.lamports
                ? `${(
                    (transferIx.parsed as TransferParsed).info.lamports! / 1e9
                  ).toFixed(4)} SOL`
                : "N/A";

            const toAddress =
              hasInfo && (transferIx.parsed as TransferParsed).info.destination
                ? (transferIx.parsed as TransferParsed).info.destination
                : "Unknown";

            return (
              <li
                key={signature}
                className="border border-gray-200 p-3 rounded-xl"
              >
                <a
                  href={`https://explorer.solana.com/tx/${signature}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-mono break-all"
                >
                  {signature}
                </a>
                <div className="text-xs text-gray-600 mt-2 space-y-1">
                  <p>
                    <strong>Status:</strong> {status}
                  </p>
                  <p>
                    <strong>To:</strong> {toAddress}
                  </p>
                  <p>
                    <strong>Amount:</strong> {amount}
                  </p>
                  <p>
                    <strong>Fee:</strong> {fee} SOL
                  </p>
                  <p>
                    <strong>Time:</strong> {blockTime}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex flex-col w-full md:w-[60%] h-full overflow-auto border border-[orange]">
        <h2 className="text-xl font-semibold mb-4">{chain} / USD Live Chart</h2>
        <div className="flex-1">
          <SolChart />
        </div>
      </div>
    </div>
  );
}

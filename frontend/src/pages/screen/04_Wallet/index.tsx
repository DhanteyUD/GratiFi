import { useState, useEffect } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { SolChart } from "@/components";
import { useSolanaBalance } from "@/hooks/UseSolanaBalance";
import { useSolanaTransactions } from "@/hooks/UseSolanaTransactions";
import { blockchains } from "@/json";
import { Copy } from "lucide-react";
import { showToast } from "@/utils/notification.utils";
import QRCode from "react-qr-code";
import clsx from "clsx";

type TransferParsed = {
  type: string;
  info: {
    lamports?: number;
    destination?: string;
    [key: string]: unknown;
  };
};

export default function WalletPage() {
  const { publicKey } = useWallet();
  const { data: balance, isLoading: isBalanceLoading } = useSolanaBalance();
  const { data: txs } = useSolanaTransactions(10);

  const [selectedSymbol, setSelectedSymbol] = useState("BINANCE:SOLUSDT");
  const [chain, setChain] = useState<"SOL" | "ETH">("SOL");

  useEffect(() => {
    const symbolMap = {
      SOL: "BINANCE:SOLUSDT",
      ETH: "BINANCE:ETHUSDT",
    };
    setSelectedSymbol(symbolMap[chain]);
  }, [chain]);

  const handleCopy = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey.toString());
    showToast("Copied to Clipboard.", "bottom-center", 3000, true);
  };

  return (
    <div className="flex h-full md:h-[calc(100vh-115px)] overflow-hidden gap-4">
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
        <div className="bg-white p-4 text-center w-auto border border-gray-300 border-t-0 rounded-[0_0_10px_10px] mb-4">
          <div className="shadow-inset-dual rounded-lg">
            {publicKey ? (
              <div className="text-left bg-primaryHover/50 p-4 rounded-xl border space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Address:</p>
                  <div className="flex items-center space-x-5">
                    <p className="text-sm break-all text-main font-jetBrains">
                      {publicKey.toString()}
                    </p>

                    <Copy
                      size={20}
                      onClick={handleCopy}
                      className="text-main cursor-pointer"
                    />
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
              <p className="text-gray-400 py-5">No wallet connected</p>
            )}
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <WalletMultiButton className="!w-[20px]!bg-blue-600 hover:!bg-blue-700 text-white !rounded-lg" />
            <WalletDisconnectButton className="!bg-red-500 hover:!bg-red-600 text-white !rounded-lg" />
          </div>
        </div>

        {/* Transactions */}
        <p className="mb-3 text-[20px] font-calSans text-main">Transactions</p>
        <ul
          className={clsx(
            "bg-white space-y-2 text-sm font-jetBrains rounded-[10px]",
            txs ? "border border-gray-300 " : ""
          )}
        >
          {txs?.map((tx, idx) => {
            const signature = tx?.transaction?.signatures?.[0] || `tx-${idx}`;
            const blockTime = tx?.blockTime
              ? new Date(tx.blockTime * 1000).toLocaleString()
              : "N/A";
            const fee = tx?.meta?.fee ? (tx.meta.fee / 1e9).toFixed(6) : "N/A";
            const status = tx?.meta?.err ? "❌ Failed" : "✅ Success";

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
                className={clsx("p-3 border-b border-gray-300 last:border-0")}
              >
                <a
                  href={`https://explorer.solana.com/tx/${signature}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-jetBrains break-all"
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
      <div className="flex flex-col w-full md:w-[65%] h-full overflow-auto">
        <h1 className="text-xl font-semibold mb-5 text-right font-calSans text-primary">
          {chain} / USDT
        </h1>
        <div className="flex-1">
          <SolChart symbol={selectedSymbol} />
        </div>
      </div>
    </div>
  );
}

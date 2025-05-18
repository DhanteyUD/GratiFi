import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { CustomSpinner, Tooltip } from "@/components";
import { useSolanaBalance } from "@/hooks/UseSolanaBalance";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useSolanaTransactions } from "@/hooks/UseSolanaTransactions";
import { blockchains } from "@/json";
import { Copy, Eye, EyeOff, QrCode, Send } from "lucide-react";
import { showToast } from "@/utils/notification.utils";
import { FetchAllUsers } from "@/hooks/UseFetch";
import { SendSolSection } from "./components/SendSolSection";
import SolChart from "./components/SolChart";
import moment from "moment";
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
  const { setVisible } = useWalletModal();
  const { publicKey, disconnect, wallet, connected, connecting } = useWallet();
  const { data: balance, isLoading: isBalanceLoading } = useSolanaBalance();
  const { data: txs } = useSolanaTransactions(10);

  const [selectedSymbol, setSelectedSymbol] = useState("BINANCE:SOLUSDT");
  const [chain, setChain] = useState<"SOL" | "ETH">("SOL");

  const [showBalance, setShowBalance] = useState(true);
  const [viewingQR, setViewingQR] = useState(false);
  const [viewingSendSolForm, setViewingSendSolForm] = useState(false);

  const { fetchingAllUsers, allUsers } = FetchAllUsers();

  const handleConnect = async () => {
    setVisible(true);
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Disconnection error:", error);
    }
  };

  const handleReceive = () => {
    setViewingQR(true);
  };

  const handleSend = () => {
    setViewingSendSolForm(true);
  };

  const handleCopy = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey.toString());
    showToast("Copied to Clipboard.", "bottom-center", 3000, true);
  };

  useEffect(() => {
    const symbolMap = {
      SOL: "BINANCE:SOLUSDT",
      ETH: "BINANCE:ETHUSDT",
    };
    setSelectedSymbol(symbolMap[chain]);
  }, [chain]);

  return (
    <>
      <div className="flex flex-col md:flex-row h-full md:h-[calc(100vh-115px)] w-full overflow-hidden gap-4">
        {/* LEFT COLUMN */}
        <div className="flex flex-col w-full md:w-[40%] h-full overflow-auto pl-[2px]">
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
            <div className="rounded-lg">
              {publicKey && chain === "SOL" ? (
                <div className="text-left bg-white/10 space-y-4">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-sm text-gray-500">Est. Total Value</p>
                      <button
                        onClick={() => setShowBalance((prev) => !prev)}
                        className="text-gray-500 hover:text-gray-700 transition"
                      >
                        {showBalance ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                    </div>
                    <div className="flex gap-2 items-end">
                      <p className="text-[35px] font-semibold text-green-600 leading-8">
                        {isBalanceLoading
                          ? "......"
                          : !showBalance
                          ? "******"
                          : balance !== undefined
                          ? `${(balance / 1e9).toFixed(4)}`
                          : "Unavailable"}
                      </p>
                      <p className="font-grotesk">
                        SOL
                        <span className="ml-1 text-[10px] font-gray-400">
                          (Solana)
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 bg-white/10 p-4  rounded-xl py-5">
                  {chain === "SOL"
                    ? "No wallet connected"
                    : "ETH not supported yet"}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center mt-4">
              {chain === "SOL" && (
                <>
                  <div className="flex items-center gap-3">
                    {connecting && (
                      <div className="flex items-center justify-center h-[40px] w-[40px] bg-primaryHover rounded-[5px]">
                        <CustomSpinner theme="#3c315b" />
                      </div>
                    )}
                    {!wallet ? (
                      <button
                        onClick={handleConnect}
                        className="h-[40px] px-5 rounded-[5px] bg-primary hover:bg-main transition-colors duration-300 ease-linear text-[14px] font-semibold text-main hover:text-white"
                      >
                        Select Wallet
                      </button>
                    ) : (
                      <button
                        onClick={handleDisconnect}
                        className="h-[40px] px-5 rounded-[5px] bg-red-500 hover:bg-red-600 transition-colors duration-300 ease-linear text-[14px] font-semibold text-white"
                      >
                        Disconnect Wallet
                      </button>
                    )}
                  </div>

                  {connected && (
                    <div className="flex gap-3 mb-0">
                      <div
                        onClick={handleReceive}
                        className="relative group h-[40px] w-[40px] rounded-md flex justify-center items-center bg-dark hover:bg-dark2 transition-colors text-primary cursor-pointer"
                      >
                        <QrCode size={18} />
                        <Tooltip label="Receive" />
                      </div>
                      <div
                        onClick={handleSend}
                        className="relative group h-[40px] w-[40px] rounded-md flex justify-center items-center bg-dark hover:bg-dark2 transition-colors text-primary cursor-pointer"
                      >
                        <Send size={18} />
                        <Tooltip label="Send" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {connected && chain === "SOL" && viewingQR ? (
            <div className="slit-in-horizontal flex flex-col items-center gap-10 bg-white border border-gray-300 rounded-[10px] p-4 mb-4">
              <div className="flex justify-center mt-2">
                {publicKey && (
                  <QRCode value={publicKey.toString()} size={128} />
                )}
              </div>

              <div className="text-center leading-5">
                <h1 className="font-calSans">Your Solana Address</h1>
                <p className="font-[10px] text-gray-500">
                  Use this address to receive tokens
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 py-2 px-4  bg-black/60 rounded-full">
                <p className="text-[13px] break-all text-white text-center font-jetBrains">
                  {publicKey ? publicKey.toString() : null}
                </p>

                <Copy
                  size={18}
                  onClick={handleCopy}
                  className="text-white cursor-pointer hover:text-primary transition-colors duration-300 ease-linear"
                />
              </div>
            </div>
          ) : null}

          <SendSolSection
            users={allUsers}
            isVisible={viewingSendSolForm && connected && !fetchingAllUsers}
            onClose={() => setViewingSendSolForm(false)}
          />

          {/* Transactions */}
          {chain === "SOL" && txs?.length ? (
            <div className="mt-5">
              <p className="mb-3 text-xl font-calSans text-main">
                Transactions
              </p>
              <div className="bg-white border border-gray-300 rounded-[10px] divide-y divide-gray-100 cursor-pointer overflow-hidden">
                {txs.map((tx, idx) => {
                  const signature =
                    tx?.transaction?.signatures?.[0] || `tx-${idx}`;
                  const blockTime = tx?.blockTime
                    ? moment
                        .unix(tx?.blockTime)
                        .format("MMMM Do YYYY, h:mm:ss a")
                    : "N/A";
                  const fee = tx?.meta?.fee
                    ? (tx.meta.fee / 1e9).toFixed(9)
                    : "N/A";
                  const status = tx?.meta?.err ? "Failed" : "Success";
                  const statusColor = tx?.meta?.err
                    ? "text-red-600"
                    : "text-green-600";

                  type Instruction = {
                    program?: string;
                    parsed?: unknown;
                    [key: string]: unknown;
                  };

                  const transferIx =
                    tx?.transaction?.message?.instructions.find(
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
                    typeof (transferIx.parsed as TransferParsed).info ===
                      "object";

                  const info = hasInfo
                    ? (transferIx.parsed as TransferParsed).info
                    : null;

                  let amount = "N/A";
                  let toAddress = "Unknown";

                  // Fallback using balances if parsed info is unavailable
                  if (info?.lamports && info?.destination) {
                    amount = `${(info.lamports / 1e9).toFixed(4)} SOL`;
                    toAddress = info.destination;
                  } else if (tx?.meta?.preBalances && tx?.meta?.postBalances) {
                    const pre = tx.meta.preBalances;
                    const post = tx.meta.postBalances;

                    // Find which account received value
                    const balanceDiffs = pre.map((bal, i) => post[i] - bal);
                    const gainIndex = balanceDiffs.findIndex(
                      (diff) => diff > 0
                    );
                    const sentLamports = balanceDiffs[gainIndex];

                    if (gainIndex > -1 && sentLamports > 0) {
                      toAddress =
                        tx.transaction.message.accountKeys[
                          gainIndex
                        ].toString();
                      amount = `${(sentLamports / 1e9).toFixed(4)} SOL`;
                    }
                  }

                  // const sender =
                  //   tx?.transaction.message.accountKeys[0] || "Unknown";
                  // const isSelfTransfer = sender === toAddress;

                  return (
                    <div
                      key={signature}
                      className="p-4 hover:bg-gray-50 transition border-b border-gray-300 last:border-0"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border ${statusColor} border-current`}
                          >
                            {status}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {blockTime}
                          </span>
                        </div>
                        <a
                          href={`https://explorer.solana.com/tx/${signature}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline text-xs break-all font-jetBrains"
                        >
                          {signature.slice(0, 6)}...{signature.slice(-6)}
                        </a>
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700">
                        <div>
                          <p className="text-gray-500">To</p>
                          <p className="text-main text-xs break-all font-jetBrains">
                            {toAddress.slice(0, 6)}...{toAddress.slice(-6)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Amount</p>
                          <p
                            className={clsx(
                              "flex items-center",
                              publicKey?.toString() === toAddress
                                ? "text-green-600"
                                : "text-red-600"
                            )}
                          >
                            {publicKey?.toString() === toAddress ? "+" : "-"}
                            {amount}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Fee</p>
                          <p className="text-compulsory">{fee} SOL</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Chain</p>
                          <p>{chain}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col w-full md:w-[60%] h-full overflow-auto">
          <h1 className="text-xl font-semibold mb-5 text-right font-calSans text-primary">
            {chain} / USDT
          </h1>
          <div className="flex-1 bg-white">
            <SolChart symbol={selectedSymbol} />
          </div>
        </div>
      </div>
    </>
  );
}

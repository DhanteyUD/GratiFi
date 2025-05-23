import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { CustomSpinner, Tooltip } from "@/components";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useSolBalance } from "@/hooks/UseSolBalance";
import { useSolTransactions } from "@/hooks/UseSolTransactions";
import { blockchains } from "@/json";
import { Copy, Eye, EyeOff, QrCode, Send } from "lucide-react";
import { showToast } from "@/utils/notification.utils";
import { FetchAllUsers } from "@/hooks/UseFetch";
import { SendSolSection } from "./components/SendSolSection";
import type { TransactionResponse } from "@solana/web3.js";
import { UseThemeContext } from "@/hooks/UseThemeContext";
import TransactionsTab from "./components/Transactions/TransactionTab";
import SolChart from "./components/SolChart";
import QRCode from "react-qr-code";
import clsx from "clsx";

export default function WalletPage() {
  const { setVisible } = useWalletModal();
  const { publicKey, disconnect, wallet, connected, connecting } = useWallet();
  const { data: balance, isLoading: isBalanceLoading } = useSolBalance();
  const { data: txs } = useSolTransactions();

  const { theme } = UseThemeContext();

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
    setViewingQR(!viewingQR);
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
        <div className="flex flex-col w-full md:w-[40%] h-full overflow-auto">
          {/* Chain Switcher */}
          <div className="sticky top-0 flex justify-between items-end space-x-2 bg-background dark:bg-backgroundDark z-[2] border-b border-gray-300 dark:border-gray-600">
            <div className="flex w-full">
              {blockchains.map(({ name, key, activeIcon, inactiveIcon }) => {
                const isActive = chain === key;

                return (
                  <div
                    key={key}
                    onClick={() => setChain(key as "SOL" | "ETH")}
                    className={`flex items-center justify-center flex-1 px-4 py-2 gap-3 md:rounded-[10px_10px_0_0] md:border md:border-b-transparent cursor-pointer transition-all ease-linear ${
                      isActive
                        ? "md:bg-white md:dark:bg-main/50 font-calSans text-primary border-b-[5px] border-primary md:border-gray-300 md:dark:border-gray-600"
                        : "bg-background dark:bg-backgroundDark text-gray-400 dark:text-gray-600 border-b-[5px] border-transparent"
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
          </div>

          {/* Wallet Card */}
          <div
            className={clsx(
              "flex flex-col p-4 text-center w-auto border md:border-t-0 border-gray-300 dark:border-gray-600 transition-all duration-300 ease-linear swing-in-top-fwd dark:bg-main/50",
              publicKey && chain === "SOL"
                ? "h-auto m-2 md:mx-0 md:mt-0 md:mb-4 rounded-[10px] md:rounded-[0_0_10px_10px] bg-white dark:bg-dark3"
                : "h-[calc(100vh-220px)] md:h-screen justify-between bg-primaryHover dark:bg-main/50 md:bg-white md:dark:bg-main/50"
            )}
          >
            <div
              className={clsx(
                "rounded-lg",
                publicKey && chain === "SOL"
                  ? ""
                  : "h-full flex flex-col justify-center"
              )}
            >
              {publicKey && chain === "SOL" ? (
                <div className="text-left bg-white/10 dark:bg-transparent space-y-4">
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
                      <p className="font-grotesk dark:text-primary/50">
                        SOL
                        <span className="ml-1 text-[10px] font-gray-400">
                          (Solana)
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 dark:text-gray-600 p-4  rounded-xl py-5">
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
                      <div className="flex items-center justify-center h-[40px] w-[40px] bg-background dark:border-backgroundDark md:bg-primaryHover md:dark:bg-main/50 rounded-[5px]">
                        <CustomSpinner
                          theme={theme === "dark" ? "#ab9ff2" : "#3c315b"}
                        />
                      </div>
                    )}
                    {!wallet ? (
                      <button
                        onClick={handleConnect}
                        className="h-[40px] px-5 rounded-[5px] bg-primary dark:bg-main/80 hover:bg-main transition-colors duration-300 ease-linear text-[14px] font-semibold text-main dark:text-primary hover:text-white"
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
                        className="relative group h-[40px] w-[40px] rounded-md flex justify-center items-center bg-dark3 hover:bg-dark2 transition-colors text-primary cursor-pointer"
                      >
                        <QrCode size={18} />
                        <Tooltip
                          label="Receive"
                          className="-bottom-7 hidden md:flex"
                        />
                      </div>
                      <div
                        onClick={handleSend}
                        className="relative group h-[40px] w-[40px] rounded-md flex justify-center items-center bg-dark3 hover:bg-dark2 transition-colors text-primary cursor-pointer"
                      >
                        <Send size={18} />
                        <Tooltip
                          label="Send"
                          className="-bottom-7 hidden md:flex"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Receive SOL */}
          {connected && chain === "SOL" && viewingQR ? (
            <div className="slit-in-horizontal flex flex-col items-center gap-10 bg-white dark:bg-dark3 border dark:border-gray-600 border-gray-300 rounded-[10px] p-4 mx-2 mt-2 md:mt-0 md:mx-0 mb-2 md:mb-4">
              <div className="flex justify-center mt-2">
                {publicKey && (
                  <QRCode value={publicKey.toString()} size={128} />
                )}
              </div>

              <div className="text-center leading-5">
                <h1 className="font-calSans dark:text-primary">
                  Your Solana Address
                </h1>
                <p className="text-[13px] text-gray-500">
                  Use this address to receive tokens
                </p>
              </div>

              <div onClick={handleCopy} className="flex flex-col items-center">
                <div className="flex items-center justify-center gap-4 py-2 px-4 bg-dark/50 dark:bg-main/50 rounded-full">
                  <p className="text-[10px] md:text-[13px] break-all text-white dark:text-primary text-center font-jetBrains">
                    {publicKey ? publicKey.toString() : null}
                  </p>

                  <Copy
                    size={18}
                    onClick={handleCopy}
                    className="hidden md:flex text-white cursor-pointer hover:text-secondary transition-colors duration-300 ease-linear"
                  />
                </div>

                <p className="block md:hidden text-primary text-[12px]">
                  Click on address to copy
                </p>
              </div>
            </div>
          ) : null}

          {/* Send SOL */}
          <SendSolSection
            users={allUsers}
            isVisible={viewingSendSolForm && connected && !fetchingAllUsers}
            onClose={() => setViewingSendSolForm(false)}
          />

          {/* Transactions */}
          {chain === "SOL" && txs?.length && publicKey && (
            <TransactionsTab
              txs={txs.filter((tx): tx is TransactionResponse => tx !== null)}
              publicKey={publicKey}
              chain="SOL"
            />
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="hidden md:flex flex-col w-full md:w-[60%] h-full overflow-auto">
          <div className="flex items-center justify-between mb-5">
            <h1 className="hidden md:flex items-center text-[13px] h-[25px] font-bold text-main text-right font-calSans rounded-[20px] bg-primary px-4">
              {chain}
            </h1>
            <h1 className="text-xl font-semibold text-right font-calSans text-primary">
              {chain} / USDT
            </h1>
          </div>
          <div className="flex-1 bg-white dark:bg-dark3">
            <SolChart symbol={selectedSymbol} theme={theme} />
          </div>
        </div>
      </div>
    </>
  );
}

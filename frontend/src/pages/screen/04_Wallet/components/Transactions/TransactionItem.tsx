import { PublicKey } from "@solana/web3.js";
import type { TransactionResponse } from "@solana/web3.js";
import { getTransferAmountAndToAddress } from "./utils";
import moment from "moment";
import clsx from "clsx";

interface Props {
  tx: TransactionResponse;
  publicKey: PublicKey;
}

const TransactionItem: React.FC<Props> = ({ tx, publicKey }) => {
  const { amount, toAddress } = getTransferAmountAndToAddress(tx);
  const signature = tx.transaction.signatures[0];
  const blockTime = tx?.blockTime
    ? moment.unix(tx.blockTime).format("h:mm A")
    : "N/A";
  const status = tx?.meta?.err ? "Failed" : "Success";
  const statusColor = tx?.meta?.err ? "text-red-600" : "text-green-600";
  const fee = tx?.meta?.fee ? (tx.meta.fee / 1e9).toFixed(9) : "N/A";

  const sender = tx.transaction.message.accountKeys[0].toString();
  const isInbound = publicKey.toString() === toAddress;

  return (
    <div className="p-4 hover:bg-gray-50 dark:hover:bg-main/50 transition">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-0.5 border rounded-full ${statusColor} border-current`}
          >
            {status}
          </span>
          <span className="text-xs text-gray-500">{blockTime}</span>
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

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
        <div>
          <p className="text-gray-500">From</p>
          <p className="font-mono text-xs dark:text-primary/50">
            {sender.slice(0, 6)}...{sender.slice(-6)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">To</p>
          <p className="font-mono text-xs dark:text-primary/50">
            {toAddress.slice(0, 6)}...{toAddress.slice(-6)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Amount</p>
          <p
            className={clsx(
              "font-semibold",
              isInbound ? "text-green-600" : "text-red-600"
            )}
          >
            {isInbound ? "+" : "-"}
            {(amount / 1e9).toFixed(4)} SOL
          </p>
        </div>
        <div>
          <p className="text-gray-500">Fee</p>
          <p className="text-compulsory">{fee} SOL</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;

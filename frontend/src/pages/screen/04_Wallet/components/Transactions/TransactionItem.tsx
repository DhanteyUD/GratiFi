import type { TransactionItemData } from "@/types/solana";
import moment from "moment";
import clsx from "clsx";
import { PublicKey } from "@solana/web3.js";
import { getToAddress } from "./utils";

interface Props {
  tx: TransactionItemData;
  publicKey: PublicKey;
}

const TransactionItem: React.FC<Props> = ({ tx, publicKey }) => {
  const signature = tx.transaction.signatures[0];
  const blockTime = moment.unix(tx.blockTime).format("h:mm A");
  const status = tx.meta.err ? "Failed" : "Success";
  const statusColor = tx.meta.err ? "text-red-600" : "text-green-600";
  const fee = (tx.meta.fee / 1e9).toFixed(9);

  const sender = tx.transaction.message.accountKeys[0].toString();
  const toAddress = getToAddress(tx);
  const isInbound = publicKey.toString() === toAddress;

  const amount =
    tx.transaction.message.instructions.find(
      (ix) => ix.parsed?.type === "transfer"
    )?.parsed?.info?.lamports ?? 0;

  return (
    <div className="p-4 hover:bg-gray-50 transition">
      <div className="flex justify-between items-center mb-2">
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
          className="text-xs text-blue-600 font-mono"
        >
          {signature.slice(0, 6)}...{signature.slice(-6)}
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
        <div>
          <p className="text-gray-500">From</p>
          <p className="font-mono text-xs">
            {sender.slice(0, 6)}...{sender.slice(-6)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">To</p>
          <p className="font-mono text-xs">
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

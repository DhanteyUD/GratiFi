import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { groupByDate, formatDate, getToAddress } from "./utils";
import type { TransactionResponse } from "@solana/web3.js";
import TransactionItem from "./TransactionItem";
import moment from "moment";
import clsx from "clsx";

interface Props {
  txs: TransactionResponse[];
  publicKey: PublicKey;
  chain: string;
}

const TransactionsTab: React.FC<Props> = ({ txs, publicKey, chain }) => {
  const [tab, setTab] = useState<"inbound" | "outbound">("inbound");

  if (chain !== "SOL" || !txs?.length) return null;

  const filteredTxs = txs.filter((tx) => {
    const to = getToAddress(tx);
    return tab === "inbound"
      ? publicKey.toString() === to
      : publicKey.toString() !== to;
  });

  const grouped = groupByDate(filteredTxs);

  return (
    <div className="mt-6 p-2 md:p-0">
      <p className="text-xl font-calSans text-main dark:text-primary mb-4">Transactions</p>

      <div className="flex space-x-2 mb-5 border dark:border-main/50 rounded-xl p-1 bg-gray-100 dark:bg-main/50 md:w-max">
        {["inbound", "outbound"].map((t) => (
          <button
            key={t}
            className={clsx(
              "px-4 py-1 text-sm font-medium rounded-xl transition flex-1 md:flex-auto",
              t === tab
                ? "bg-white dark:bg-main text-main dark:text-primary shadow"
                : "text-gray-400 dark hover:text-main dark:hover:text-primary/50"
            )}
            onClick={() => setTab(t as "inbound" | "outbound")}
          >
            {t === "inbound" ? "Received" : "Sent"}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredTxs.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-10 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-main/50">
            No {tab} transaction
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped)
              .sort(([a], [b]) => moment(b).diff(moment(a)))
              .map(([date, txList]) => (
                <div key={date}>
                  <p className="text-sm text-gray-500 mb-2">
                    {formatDate(date)}
                  </p>
                  <div className="bg-white dark:bg-dark3 border border-gray-300 dark:border-gray-600 rounded-[10px] divide-y divide-gray-200 dark:divide-gray-600 cursor-pointer overflow-hidden">
                    {txList.map((tx) => (
                      <TransactionItem
                        key={tx.transaction.signatures[0]}
                        tx={tx}
                        publicKey={publicKey}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsTab;

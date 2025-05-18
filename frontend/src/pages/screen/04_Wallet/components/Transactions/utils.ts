import moment from "moment";
import type { TransactionItemData } from "@/types/solana";

export const groupByDate = (txs: TransactionItemData[]) => {
  return txs.reduce((acc: Record<string, TransactionItemData[]>, tx) => {
    const date = moment.unix(tx.blockTime).startOf("day").format("YYYY-MM-DD");
    if (!acc[date]) acc[date] = [];
    acc[date].push(tx);
    return acc;
  }, {});
};

export const formatDate = (dateStr: string) => {
  const today = moment().startOf("day");
  const date = moment(dateStr);
  if (date.isSame(today)) return "Today";
  if (date.isSame(today.clone().subtract(1, "day"))) return "Yesterday";
  return date.format("MMMM Do, YYYY");
};

export const getToAddress = (tx: TransactionItemData): string => {
  const transferIx = tx.transaction.message.instructions.find(
    (ix) => ix.program === "system" && ix.parsed?.type === "transfer"
  );
  return transferIx?.parsed?.info?.destination || "Unknown";
};

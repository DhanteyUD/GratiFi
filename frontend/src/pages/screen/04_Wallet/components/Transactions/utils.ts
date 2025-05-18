import moment from "moment";
import type { TransactionResponse } from "@solana/web3.js";

type TransferParsed = {
  type: "transfer";
  info: {
    lamports: number;
    destination: string;
  };
};

type Instruction = {
  program?: string;
  parsed?: unknown;
  [key: string]: unknown;
};

export const groupByDate = (txs: TransactionResponse[]) => {
  return txs.reduce((acc: Record<string, TransactionResponse[]>, tx) => {
    const ts = tx.blockTime ?? 0;
    const date = moment.unix(ts).startOf("day").format("YYYY-MM-DD");

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

export const getToAddress = (tx: TransactionResponse): string => {
  const pre = tx.meta?.preBalances;
  const post = tx.meta?.postBalances;

  if (!pre || !post) return "Unknown";

  const diffs = pre.map((b, i) => post[i] - b);
  const gainIndex = diffs.findIndex((diff) => diff > 0);

  if (gainIndex > -1) {
    return tx.transaction.message.accountKeys[gainIndex].toString();
  }

  return "Unknown";
};

export const getTransferAmountAndToAddress = (tx: TransactionResponse) => {
  const transferIx = tx.transaction.message.instructions.find(
    (ix: Instruction) =>
      ix.program === "system" &&
      ix.parsed &&
      (ix.parsed as TransferParsed).type === "transfer"
  );

  if (
    transferIx &&
    "parsed" in transferIx &&
    transferIx.parsed &&
    typeof transferIx.parsed === "object" &&
    "info" in transferIx.parsed &&
    (transferIx.parsed as TransferParsed).info &&
    typeof (transferIx.parsed as TransferParsed).info === "object"
  ) {
    const info = (transferIx.parsed as TransferParsed).info;

    if (info.lamports && info.destination) {
      return {
        amount: info.lamports,
        toAddress: info.destination,
      };
    }
  }

  const pre = tx.meta?.preBalances;
  const post = tx.meta?.postBalances;

  if (pre && post) {
    const diffs = pre.map((b, i) => post[i] - b);
    const gainIndex = diffs.findIndex((diff) => diff > 0);
    if (gainIndex > -1) {
      return {
        amount: diffs[gainIndex],
        toAddress: tx.transaction.message.accountKeys[gainIndex].toString(),
      };
    }
  }

  return { amount: 0, toAddress: "Unknown" };
};

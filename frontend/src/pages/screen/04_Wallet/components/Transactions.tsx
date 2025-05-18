// import { useState } from "react";
// import moment from "moment";
// import clsx from "clsx";
// import { PublicKey } from "@solana/web3.js";

// interface TransferInfo {
//   destination: string;
//   lamports: number;
// }

// interface ParsedInstruction {
//   program: string;
//   parsed?: {
//     type: string;
//     info: TransferInfo;
//   };
// }

// interface TransactionMeta {
//   err: null | object;
//   fee: number;
//   preBalances: number[];
//   postBalances: number[];
// }

// interface Message {
//   accountKeys: (PublicKey | string)[];
//   instructions: ParsedInstruction[];
// }

// interface Transaction {
//   message: Message;
//   signatures: string[];
// }

// interface TransactionItemData {
//   transaction: Transaction;
//   meta: TransactionMeta;
//   blockTime: number;
// }

// interface TransactionsTabProps {
//   txs: TransactionItemData[];
//   publicKey: PublicKey;
//   chain: string;
// }

// const groupByDate = (txs: TransactionItemData[]) => {
//   return txs.reduce((acc: Record<string, TransactionItemData[]>, tx) => {
//     const date = moment.unix(tx.blockTime).startOf("day").format("YYYY-MM-DD");
//     if (!acc[date]) acc[date] = [];
//     acc[date].push(tx);
//     return acc;
//   }, {});
// };

// const formatDate = (dateStr: string) => {
//   const today = moment().startOf("day");
//   const date = moment(dateStr);
//   if (date.isSame(today)) return "Today";
//   if (date.isSame(today.clone().subtract(1, "day"))) return "Yesterday";
//   return date.format("MMMM Do, YYYY");
// };

// const TransactionsTab: React.FC<TransactionsTabProps> = ({
//   txs,
//   publicKey,
//   chain,
// }) => {
//   const [tab, setTab] = useState<"inbound" | "outbound">("inbound");

//   if (chain !== "SOL" || !txs?.length) return null;

//   const filteredTxs = txs.filter((tx) => {
//     const to = getToAddress(tx);
//     return tab === "inbound"
//       ? publicKey.toString() === to
//       : publicKey.toString() !== to;
//   });

//   const grouped = groupByDate(filteredTxs);

//   return (
//     <div className="mt-6">
//       <p className="text-xl font-calSans text-main mb-4">Transactions</p>

//       {/* Tabs */}
//       <div className="flex space-x-2 mb-4 border rounded-xl p-1 bg-gray-100 w-max">
//         {["inbound", "outbound"].map((t) => (
//           <button
//             key={t}
//             className={clsx(
//               "px-4 py-1 text-sm font-medium rounded-xl transition",
//               t === tab
//                 ? "bg-white text-main shadow"
//                 : "text-gray-500 hover:text-main"
//             )}
//             onClick={() => setTab(t as "inbound" | "outbound")}
//           >
//             {t === "inbound" ? "Inbound" : "Outbound"}
//           </button>
//         ))}
//       </div>

//       {/* Grouped by Day */}
//       <div className="space-y-6">
//         {Object.entries(grouped)
//           .sort(([a], [b]) => moment(b).diff(moment(a)))
//           .map(([date, txList]) => (
//             <div key={date}>
//               <p className="text-sm text-gray-500 mb-2">{formatDate(date)}</p>
//               <div className="bg-white border rounded-xl divide-y">
//                 {txList.map((tx) => (
//                   <TransactionItem
//                     key={tx.transaction.signatures[0]}
//                     tx={tx}
//                     publicKey={publicKey}
//                   />
//                 ))}
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// const getToAddress = (tx: TransactionItemData): string => {
//   const transferIx = tx.transaction.message.instructions.find(
//     (ix) => ix.program === "system" && ix.parsed?.type === "transfer"
//   );
//   return transferIx?.parsed?.info?.destination || "Unknown";
// };

// const TransactionItem: React.FC<{
//   tx: TransactionItemData;
//   publicKey: PublicKey;
// }> = ({ tx, publicKey }) => {
//   const signature = tx.transaction.signatures[0];
//   const blockTime = moment.unix(tx.blockTime).format("h:mm A");
//   const status = tx.meta.err ? "Failed" : "Success";
//   const statusColor = tx.meta.err ? "text-red-600" : "text-green-600";
//   const fee = (tx.meta.fee / 1e9).toFixed(9);

//   const sender = tx.transaction.message.accountKeys[0].toString();
//   const toAddress = getToAddress(tx);
//   const isInbound = publicKey.toString() === toAddress;

//   const amount =
//     tx.transaction.message.instructions.find(
//       (ix) => ix.parsed?.type === "transfer"
//     )?.parsed?.info?.lamports ?? 0;

//   return (
//     <div className="p-4 hover:bg-gray-50 transition">
//       <div className="flex justify-between items-center mb-2">
//         <div className="flex items-center gap-2">
//           <span
//             className={`text-xs px-2 py-0.5 border rounded-full ${statusColor} border-current`}
//           >
//             {status}
//           </span>
//           <span className="text-xs text-gray-500">{blockTime}</span>
//         </div>
//         <a
//           href={`https://explorer.solana.com/tx/${signature}`}
//           target="_blank"
//           rel="noreferrer"
//           className="text-xs text-blue-600 font-mono"
//         >
//           {signature.slice(0, 6)}...{signature.slice(-6)}
//         </a>
//       </div>

//       <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
//         <div>
//           <p className="text-gray-500">From</p>
//           <p className="font-mono text-xs">
//             {sender.slice(0, 6)}...{sender.slice(-6)}
//           </p>
//         </div>
//         <div>
//           <p className="text-gray-500">To</p>
//           <p className="font-mono text-xs">
//             {toAddress.slice(0, 6)}...{toAddress.slice(-6)}
//           </p>
//         </div>
//         <div>
//           <p className="text-gray-500">Amount</p>
//           <p
//             className={clsx(
//               "font-semibold",
//               isInbound ? "text-green-600" : "text-red-600"
//             )}
//           >
//             {isInbound ? "+" : "-"}
//             {(amount / 1e9).toFixed(4)} SOL
//           </p>
//         </div>
//         <div>
//           <p className="text-gray-500">Fee</p>
//           <p className="text-compulsory">{fee} SOL</p>
//         </div>
//       </div>
//     </div>
//   );
// };

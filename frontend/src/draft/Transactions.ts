// type TransferParsed = {
//   type: "transfer";
//   info: {
//     lamports: number;
//     destination: string;
//   };
// };

// type Instruction = {
//   program?: string;
//   parsed?: unknown;
//   [key: string]: unknown;
// };

// {chain === "SOL" && txs?.length ? (
//             <div className="mt-5">
//               <p className="mb-3 text-xl font-calSans text-main">
//                 Transactions
//               </p>
//               <div className="bg-white border border-gray-300 rounded-[10px] divide-y divide-gray-100 cursor-pointer overflow-hidden">
//                 {txs.map((tx, idx) => {
//                   const signature =
//                     tx?.transaction?.signatures?.[0] || `tx-${idx}`;
//                   const blockTime = tx?.blockTime
//                     ? moment
//                         .unix(tx?.blockTime)
//                         .format("MMMM Do YYYY, h:mm:ss a")
//                     : "N/A";
//                   const fee = tx?.meta?.fee
//                     ? (tx.meta.fee / 1e9).toFixed(9)
//                     : "N/A";
//                   const status = tx?.meta?.err ? "Failed" : "Success";
//                   const statusColor = tx?.meta?.err
//                     ? "text-red-600"
//                     : "text-green-600";

//                   type Instruction = {
//                     program?: string;
//                     parsed?: unknown;
//                     [key: string]: unknown;
//                   };

//                   const transferIx =
//                     tx?.transaction?.message?.instructions.find(
//                       (ix: Instruction) =>
//                         ix?.program === "system" &&
//                         "parsed" in ix &&
//                         (ix.parsed as TransferParsed)?.type === "transfer"
//                     );

//                   const hasInfo =
//                     transferIx &&
//                     "parsed" in transferIx &&
//                     transferIx.parsed &&
//                     typeof transferIx.parsed === "object" &&
//                     "info" in transferIx.parsed &&
//                     (transferIx.parsed as TransferParsed).info &&
//                     typeof (transferIx.parsed as TransferParsed).info ===
//                       "object";

//                   const info = hasInfo
//                     ? (transferIx.parsed as TransferParsed).info
//                     : null;

//                   let amount = "N/A";
//                   let toAddress = "Unknown";

//                   // Fallback using balances if parsed info is unavailable
//                   if (info?.lamports && info?.destination) {
//                     amount = `${(info.lamports / 1e9).toFixed(4)} SOL`;
//                     toAddress = info.destination;
//                   } else if (tx?.meta?.preBalances && tx?.meta?.postBalances) {
//                     const pre = tx.meta.preBalances;
//                     const post = tx.meta.postBalances;

//                     // Find which account received value
//                     const balanceDiffs = pre.map((bal, i) => post[i] - bal);
//                     const gainIndex = balanceDiffs.findIndex(
//                       (diff) => diff > 0
//                     );
//                     const sentLamports = balanceDiffs[gainIndex];

//                     if (gainIndex > -1 && sentLamports > 0) {
//                       toAddress =
//                         tx.transaction.message.accountKeys[
//                           gainIndex
//                         ].toString();
//                       amount = `${(sentLamports / 1e9).toFixed(4)} SOL`;
//                     }
//                   }

//                   const sender =
//                     tx?.transaction.message.accountKeys[0].toString() ||
//                     "Unknown";
//                   // const isSelfTransfer = sender === toAddress;

//                   return (
//                     <div
//                       key={signature}
//                       className="p-4 hover:bg-gray-50 transition border-b border-gray-300 last:border-0"
//                     >
//                       <div className="flex items-center justify-between mb-1">
//                         <div className="flex items-center space-x-2">
//                           <span
//                             className={`text-xs px-2 py-0.5 rounded-full border ${statusColor} border-current`}
//                           >
//                             {status}
//                           </span>
//                           <span className="text-gray-500 text-xs">
//                             {blockTime}
//                           </span>
//                         </div>
//                         <a
//                           href={`https://explorer.solana.com/tx/${signature}`}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="text-blue-600 hover:underline text-xs break-all font-jetBrains"
//                         >
//                           {signature.slice(0, 6)}...{signature.slice(-6)}
//                         </a>
//                       </div>

//                       <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700">
//                         <div>
//                           <p className="text-gray-500">From</p>
//                           <p className="text-main text-xs break-all font-jetBrains">
//                             {sender.slice(0, 6)}...
//                             {sender.slice(-6)}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="text-gray-500">To</p>
//                           <p className="text-main text-xs break-all font-jetBrains">
//                             {toAddress.slice(0, 6)}...{toAddress.slice(-6)}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="text-gray-500">Amount</p>
//                           <p
//                             className={clsx(
//                               "flex items-center",
//                               publicKey?.toString() === toAddress
//                                 ? "text-green-600"
//                                 : "text-red-600"
//                             )}
//                           >
//                             {publicKey?.toString() === toAddress ? "+" : "-"}
//                             {amount}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="text-gray-500">Fee</p>
//                           <p className="text-compulsory">{fee} SOL</p>
//                         </div>
//                         <div>
//                           <p className="text-gray-500">Chain</p>
//                           <p>{chain}</p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ) : null}

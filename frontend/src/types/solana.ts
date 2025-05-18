import { PublicKey } from "@solana/web3.js";

export interface TransferInfo {
  destination: string;
  lamports: number;
}

export interface ParsedInstruction {
  program: string;
  parsed?: {
    type: string;
    info: TransferInfo;
  };
}

export interface TransactionMeta {
  err: null | object;
  fee: number;
  preBalances: number[];
  postBalances: number[];
}

export interface Message {
  accountKeys: (PublicKey | string)[];
  instructions: ParsedInstruction[];
}

export interface Transaction {
  message: Message;
  signatures: string[];
}

export interface TransactionItemData {
  transaction: Transaction;
  meta: TransactionMeta;
  blockTime: number;
}

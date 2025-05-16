import { useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { Connection, PublicKey } from "@solana/web3.js";

const getTransactions = async (
  connection: Connection,
  publicKey: PublicKey | null
) => {
  if (!publicKey) throw new Error("Wallet not connected");

  const signatures = await connection.getSignaturesForAddress(publicKey);
  return Promise.all(
    signatures.map((sig) => connection.getTransaction(sig.signature))
  );
};

export const useTransactions = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ["transactions", publicKey?.toBase58()],
    queryFn: () => getTransactions(connection, publicKey),
    enabled: !!publicKey,
  });
};

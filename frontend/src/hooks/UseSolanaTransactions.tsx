import { useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Connection } from "@solana/web3.js";

const fetchTransactions = async (
  connection: Connection,
  publicKey: PublicKey,
  limit: number
) => {
  const sigs = await connection.getSignaturesForAddress(publicKey, { limit });
  return sigs.map((s) => s.signature);
};

export const useSolanaTransactions = (limit = 10) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ["solana-transactions", publicKey?.toBase58(), limit],
    queryFn: () => {
      if (!publicKey) throw new Error("Wallet not connected");
      return fetchTransactions(connection, publicKey, limit);
    },
    enabled: !!publicKey,
  });
};



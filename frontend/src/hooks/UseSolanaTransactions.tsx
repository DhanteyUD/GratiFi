import { useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";

const fetchTransactions = async (
  connection: Connection,
  publicKey: PublicKey | null,
  limit: number
) => {
  if (!publicKey) throw new Error("No wallet connected");

  const signatures = await connection.getSignaturesForAddress(publicKey, {
    limit,
  });
  return Promise.all(
    signatures.map((sig) => connection.getTransaction(sig.signature))
  );
};

export const useSolanaTransactions = (limit = 10) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ["solana-transactions", publicKey?.toBase58(), limit],
    queryFn: () => fetchTransactions(connection, publicKey, limit),
    enabled: !!publicKey,
  });
};

// USE CASE:

// queryClient.invalidateQueries({ queryKey: ['solana-transactions', publicKey?.toBase58()], 20 });

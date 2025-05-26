import { useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import type {
  Connection,
  PublicKey,
  VersionedTransactionResponse,
} from "@solana/web3.js";
import pLimit from "p-limit";

const fetchTransactions = async (
  connection: Connection,
  publicKey: PublicKey | null
): Promise<VersionedTransactionResponse[]> => {
  try {
    if (!publicKey) throw new Error("No wallet connected");

    const signatures = await connection.getSignaturesForAddress(publicKey, {
      limit: 20,
    });

    const limit = pLimit(3);

    const results = await Promise.allSettled(
      signatures.map((sig) =>
        limit(() =>
          connection.getTransaction(sig.signature, {
            maxSupportedTransactionVersion: 0,
          })
        )
      )
    );

    return results
      .filter(
        (
          res
        ): res is PromiseFulfilledResult<VersionedTransactionResponse | null> =>
          res.status === "fulfilled"
      )
      .map((res) => res.value)
      .filter((tx): tx is VersionedTransactionResponse => tx !== null);
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return [];
  }
};

export const useSolTransactions = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ["solana-transactions", publicKey?.toBase58()],
    queryFn: () => fetchTransactions(connection, publicKey),
    enabled: !!publicKey,
    staleTime: 30_000,
  });
};

// USE CASE:

// queryClient.invalidateQueries({ queryKey: ['solana-transactions', publicKey?.toBase58()]});

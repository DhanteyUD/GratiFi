import { useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";

const fetchBalance = async (
  connection: Connection,
  publicKey: PublicKey | null
): Promise<number> => {
  if (!publicKey) throw new Error("No wallet connected");
  return await connection.getBalance(publicKey);
};

export const useSolanaBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ["solana-balance", publicKey?.toBase58()],
    queryFn: () => fetchBalance(connection, publicKey),
    enabled: !!publicKey,
    staleTime: 30_000,
  });
};

// USE CASE:
// const queryClient = useQueryClient();

// const sendTransaction = async () => {
//   // your transaction logic here...

//   // Then invalidate cached balance
//   queryClient.invalidateQueries({
//     queryKey: ['solana-balance', publicKey?.toBase58()],
//   });
// };

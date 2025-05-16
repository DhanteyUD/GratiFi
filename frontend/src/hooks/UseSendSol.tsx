import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToastSuccess } from "@/utils/notification.utils";

export const useSendSol = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      destination,
      amount,
    }: {
      destination: string;
      amount: number;
    }) => {
      if (!publicKey || !sendTransaction) {
        throw new Error("Wallet not connected");
      }

      const toPubKey = new PublicKey(destination);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: toPubKey,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      return signature;
    },

    onSuccess: (signature) => {
      queryClient.invalidateQueries({
        queryKey: ["solana-balance", publicKey?.toBase58()],
      });
      queryClient.invalidateQueries({
        queryKey: ["solana-transactions", publicKey?.toBase58()],
      });

      showToastSuccess(
        "Generosity confirmed! You’re officially a GratiFi GOAT 🐐",
        "bottom-center",
        3000,
        true
      );

      console.log(`TX: ${signature.slice(0, 6)}...${signature.slice(-6)}`);
    },
  });

  return mutation;
};

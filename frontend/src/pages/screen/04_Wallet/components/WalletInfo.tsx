import type { FC } from "react";
import { PublicKey } from "@solana/web3.js";
import { useSolBalance } from "@/hooks/UseSolBalance";

interface WalletInfoProps {
  publicKey: PublicKey | null;
  wallet: {
    adapter: {
      icon: string;
      name: string;
    };
  };
  char?: number;
}

const WalletInfo: FC<WalletInfoProps> = ({ publicKey, wallet, char = 4 }) => {
  const { data: balance } = useSolBalance();

  if (!publicKey || !wallet) return null;

  const address = publicKey.toBase58();
  const shortAddress = `${address.slice(0, char)}...${address.slice(-char)}`;

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <img
        src={wallet.adapter.icon}
        alt={wallet.adapter.name}
        className="w-5 h-5"
      />
      <span className="text-sm font-jetBrains text-main dark:text-primary group-hover:text-main dark:group-hover:text-primaryHover truncate max-w-[100px]">
        {shortAddress}
      </span>
      {balance !== null && (
        <div className="text-xs text-main dark:text-primary font-calSans bg-white dark:bg-dark py-1 px-2 rounded-[20px]">
          {((balance ?? 0) / 1e9).toFixed(2)} SOL
        </div>
      )}
    </div>
  );
};

export default WalletInfo;

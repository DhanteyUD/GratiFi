import type { FC } from "react";
import { PublicKey } from "@solana/web3.js";

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
      <span className="text-sm font-jetBrains text-main group-hover:text-main truncate max-w-[100px]">
        {shortAddress}
      </span>
    </div>
  );
};

export default WalletInfo;

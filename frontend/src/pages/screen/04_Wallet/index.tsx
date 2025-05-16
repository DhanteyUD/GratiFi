import { useState } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const useBalance = () => {
  const [balance, setBalance] = useState<number>();

  const { connection } = useConnection();
  const { publicKey } = useWallet();

  if (publicKey) {
    connection.getBalance(publicKey).then(setBalance);
  }

  return balance;
};

function Wallet() {
  const balance = useBalance();
  const { publicKey } = useWallet();

  return (
    <div>
      <WalletMultiButton />
      <WalletDisconnectButton />

      <div>
        {publicKey && (
          <div>
            <p>Wallet address: {publicKey.toString()}</p>
            <p>
              Balance:{" "}
              {balance !== null && balance !== undefined
                ? `${balance / 1e9} SOL`
                : "Loading..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wallet;

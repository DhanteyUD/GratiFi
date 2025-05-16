import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

function Wallet() {
  return (
    <div>
      <WalletMultiButton />
      <WalletDisconnectButton />
    </div>
  );
}

export default Wallet;

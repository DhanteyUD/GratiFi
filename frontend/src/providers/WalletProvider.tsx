import { useMemo } from "react";
import type { PropsWithChildren } from "react";
// import { CivicAuthProvider } from "@civic/auth-web3/react";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  SolflareWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

// import { configKeys } from "@/config";
// const endpoint = "https://api.devnet.solana.com"; // Change to mainnet if needed

export const WalletProvider = ({ children }: PropsWithChildren<object>) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  const walletModalProps = useMemo(
    () => ({
      featuredWallets: 5,
      showAllWallets: true,
    }),
    []
  );

  // const handleSignIn = (error?: Error) => {
  //   if (error) {
  //     console.error("Civic Auth sign-in error:", error);
  //   } else {
  //     console.log("Civic Auth sign-in successful");
  //   }
  // };

  // const handleSignOut = async () => {
  //   console.log("Civic Auth sign-out successful");
  // };

  return (
    <ConnectionProvider endpoint={endpoint}>
      {/* <CivicAuthProvider
        clientId={configKeys.clientId}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        displayMode="redirect"
        redirectUrl={window.location.origin + "/connect"}
      > */}
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider {...walletModalProps}>
          {/* <CivicAuthProvider clientId="YOUR_CIVIC_CLIENT_ID"> */}
          {children}
          {/* </CivicAuthProvider> */}
        </WalletModalProvider>
      </SolanaWalletProvider>
      {/* </CivicAuthProvider> */}
    </ConnectionProvider>
  );
};

"use client";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { sepolia } from "wagmi/chains";

const config = createConfig(
  getDefaultConfig({
    chains: [sepolia],
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID!,
    appName: "GHO Pay",
  })
);

export function ConnectWeb3({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        theme="midnight"
      >
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ConnectWeb3 } from "./ConnectWeb3";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GHO Pay",
  description: "Automated Aave borrowing protocol",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ConnectWeb3>{children}</ConnectWeb3>
        </Providers>
      </body>
    </html>
  );
}

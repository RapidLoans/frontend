"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import {
  useWallet,
  WalletProvider,
} from "@tronweb3/tronwallet-adapter-react-hooks";
import {
  WalletDisconnectedError,
  WalletError,
  WalletNotFoundError,
} from "@tronweb3/tronwallet-abstract-adapter";
import { WalletModalProvider } from "@tronweb3/tronwallet-adapter-react-ui";
import { toast } from "sonner";
import "@tronweb3/tronwallet-adapter-react-ui/style.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// export const metadata: Metadata = {
//   title: "RapidLoans",
//   description: "Seamless, Secure, and Automated Multi-Network Token Distribution",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  function onError(e: WalletError) {
    if (e instanceof WalletNotFoundError) {
      toast.error(e.message);
    } else if (e instanceof WalletDisconnectedError) {
      toast.error(e.message);
    } else toast.error(e.message);
  }
  return (
    <html lang="en" className={`${inter.variable} font-san dark:bg-black`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <WalletProvider onError={onError}>
            <WalletModalProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
              </Suspense>
              <main>{children}</main>
              <Toaster />
            </WalletModalProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

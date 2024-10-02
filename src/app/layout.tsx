import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Toaster } from "@/components/ui/sonner"
import { WalletProvider } from "@/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});


const Navbar = dynamic(() => import("@/components/menu/Menu"), {
  loading: () => <div>Loading...</div>,
});

export const metadata: Metadata = {
  title: "RapidLoans",
  description: "Seamless, Secure, and Automated Multi-Network Token Distribution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body>
        <WalletProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
          </Suspense>
          <main>{children}</main>
          <Toaster />
        </WalletProvider>
      </body>
    </html>
  );
}

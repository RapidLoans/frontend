import { Inter } from "next/font/google";
import "./globals.css";
import "@tronweb3/tronwallet-adapter-react-ui/style.css";
import { ThemeProvider } from "next-themes";
import { Metadata } from "next";
import  Application  from "@/app/Application"
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RapidLoans",
  description: "Borrow. Invest. Flash Loans. Powered by Tron.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className={`${inter.variable} font-san dark:bg-black`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Application>
            {children}
            <Toaster expand/>
          </Application>
        </ThemeProvider>
      </body>
    </html>
  );
}





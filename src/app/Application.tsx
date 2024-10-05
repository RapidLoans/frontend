"use client"
import { Suspense } from "react";
import {
    WalletProvider,
} from "@tronweb3/tronwallet-adapter-react-hooks";
import {
    WalletDisconnectedError,
    WalletError,
    WalletNotFoundError,
} from "@tronweb3/tronwallet-abstract-adapter";
import { WalletModalProvider } from "@tronweb3/tronwallet-adapter-react-ui";
import { toast } from "sonner";
import Navbar from "@/components/Navbar/Navbar";

export default function Application({
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
        <WalletProvider onError={onError}>
            <WalletModalProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <Navbar />
                </Suspense>
                <main>{children}</main>
            </WalletModalProvider>
        </WalletProvider>
    )

}
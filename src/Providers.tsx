// "use client"
// import React, { createContext, useEffect, useMemo, useState } from 'react';
// import { TronLinkAdapter, TronLinkAdapterConfig } from "@tronweb3/tronwallet-adapters";

// // Define the context type
// type WalletContextType = {
//     account: string | null;
//     setAccount: React.Dispatch<React.SetStateAction<string | null>>
//     handleConnect: () => Promise<void>;
//     handleDisconnect: () => Promise<void>;
//     adapter: TronLinkAdapter
// }

// // Create the context with default values
// const WalletProviderContext = createContext<WalletContextType>({
//     account: null,
//     setAccount: () => { },
//     handleConnect: async () => { }, 
//     handleDisconnect: async () => { },
//     adapter:  new TronLinkAdapter()
// });

// const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const config: TronLinkAdapterConfig = {}
//     const adapter = useMemo(() => new TronLinkAdapter(), []);
//     const [account, setAccount] = useState<string | null>(null);

//     // Effect to handle TronLink events and set account data
//     useEffect(() => {
//         setAccount(adapter.address!);

//         adapter.on("connect", () => {
//             setAccount(adapter.address!);
//         });

//         adapter.on("accountsChanged", (data: string) => {
//             setAccount(data);
//         });

//         adapter.on("disconnect", () => {
//             // Handle disconnection logic
//             handleDisconnect();
//         });

//         return () => {
//             adapter.removeAllListeners();
//         };
//     }, [adapter]);

//     const handleConnect = async () => {
//         try {
//             await adapter.connect();
//             setAccount(adapter.address!); // Update the state after connecting
//             console.log("Connected:", adapter.address);
//         } catch (error) {
//             console.error("Failed to connect:", error);
//         }
//     };

//     const handleDisconnect = async () => {
//         try {
//             await adapter.disconnect();
//             setAccount(null); // Clear account after disconnecting
//             console.log("Disconnected");
//         } catch (error) {
//             console.error("Failed to disconnect:", error);
//         }
//     };

//     return (
//         <WalletProviderContext.Provider
//             value={{
//                 account,
//                 setAccount,
//                 handleConnect,
//                 handleDisconnect,
//                 adapter
//             }}
//         >
//             {children}
//         </WalletProviderContext.Provider>
//     );
// }

// export { WalletProviderContext, WalletProvider };

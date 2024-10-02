"use client";

import React, { useState, useEffect, useMemo } from "react";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";

const App: React.FC = () => {
  const adapter = useMemo(() => new TronLinkAdapter(), []);
  const [account, setAccount] = useState<string>("");

  useEffect(() => {
    setAccount(adapter.address!);
    adapter.on("connect", () => {
      setAccount(adapter.address!);
    });

    adapter.on("accountsChanged", (data: string) => {
      setAccount(data);
    });

    adapter.on("disconnect", () => {
      // Handle disconnection logic
      adapter.disconnect();
    });

    return () => {
      adapter.removeAllListeners();
    };
  }, [adapter]);

  const handleConnect = async () => {
    try {
      await adapter.connect();
      console.log(account);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      disabled={adapter.connected}
      onClick={handleConnect}
    >
      Connect
    </button>
  );
};

export default App;

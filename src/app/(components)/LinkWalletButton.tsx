"use client";
import React, { useState } from "react";
// Extend the Window interface to include tronWeb

declare global {
  interface Window {
    tron: {
      tronWeb: {
        defaultAddress: {
          base58: string | false;
        };
      };
    };
  }
}

const LinkWalletButton: React.FC = () => {
  const [address, setAddress] = useState<string>("");

  const handleConnectWallet = async () => {
    try {
      if (window.tron == undefined) {
        alert("Please install TronLink wallet from official website");
        return;
      }

      const tron = window.tron;
      const tronWeb = tron.tronWeb;

      if (tron && tronWeb) {
        const accountAddress = tronWeb.defaultAddress.base58;
        if (typeof accountAddress == "string") setAddress(accountAddress);
      } else {
        alert("Please login to your wallet first");
      }
    } catch (error) {
      console.log("There is some issue:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        onClick={handleConnectWallet}
      >
        {address ? `Connected: ${address}` : "Connect TronLink"}
      </button>
    </div>
  );
};

export default LinkWalletButton;

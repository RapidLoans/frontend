"use client";
import React, { useEffect, useState } from "react";
import { CONTRACT_ADDRESS, LendingPoolABI } from "@/constants";

const LendingPool = () => {
  const [contractBalance, setContractBalance] = useState(0);
  const [amountInTRX, setAmountInTRX] = useState(0);
  const [amountInJST, setAmountInJST] = useState(0);
  // Function to get the TronWeb instance
  const getTronWeb = async () => {
    if (typeof window.tronLink !== "undefined") {
      try {
        // Check if TronLink is ready and available
        if (window.tronLink.ready) {
          return window.tronLink.tronWeb; // Return tronWeb instance from TronLink
        } else {
          // Request account access
          const res = await window.tronLink.request({
            method: "tron_requestAccounts",
          });

          // Check if the request was successful
          if (res.code === 200 || res === true) {
            console.log("Accounts granted access");
            return window.tronLink.tronWeb; // Return tronWeb instance if successful
          } else {
            console.error("Access to accounts was denied");
          }
        }
      } catch (error) {
        console.error("Error requesting TronLink accounts:", error);
      }
    } else {
      console.error("TronLink is not installed.");
    }
    return null; // Return null if TronLink is not available or access is denied
  };

  const fetchContractBalance = async () => {
    const tronWeb = await getTronWeb();
    if (!tronWeb) {
      console.error("TronWeb instance not available");
      return;
    }

    try {
      const balanceInSun = await tronWeb.trx.getBalance(CONTRACT_ADDRESS);
      setContractBalance(balanceInSun);
    } catch (error) {
      console.error("Error fetching contract balance:", error);
    }
  };

  useEffect(() => {
    fetchContractBalance();
    handleJSTInvestment();
    handleTRXInvestment();
  }, []);

  const handleTRXInvestment = async () => {
    const tronWeb = await getTronWeb();
    if (!tronWeb) return;

    try {
      const myContract = await tronWeb.contract(
        LendingPoolABI,
        CONTRACT_ADDRESS
      );
      const tx = await myContract.getInvestorStruct().call();
      const hex = tx.balanceTRX._hex;
      const dec = parseInt(hex, 16);
      setAmountInTRX(dec);
      console.log(`JST Balance (decimal): ${dec}`);
    } catch (error) {
      console.error("Error in TRX investment transaction:", error);
    }
  };

  const handleJSTInvestment = async () => {
    const tronWeb = await getTronWeb();
    if (!tronWeb) return;

    try {
      const myContract = await tronWeb.contract(
        LendingPoolABI,
        CONTRACT_ADDRESS
      );
      const tx = await myContract.getInvestorStruct().call();
      const hex = tx.balanceJST._hex;
      const dec = parseInt(hex, 16);
      setAmountInJST(dec);
      console.log(`JST Balance (decimal): ${dec}`);
    } catch (error) {
      console.error("Error in JST investment transaction:", error);
    }
  };

  const InvestInTRX = async () => {
    const tronWeb = await getTronWeb();
    if (!tronWeb) return;

    try {
      const myContract = await tronWeb.contract(
        LendingPoolABI,
        CONTRACT_ADDRESS
      );

      await myContract.addTRX().send({ callValue: 2000 });
    } catch (error) {
      console.error("Error in JST investment transaction:", error);
    }
  };

  const BorrowFromContract = async () => {
    // Need to make a smart contract function of transferring funds from contract to user
  };

  return (
    <div className="mt-24 bg-black text-white flex flex-col items-center justify-center gap-2">
      <h2> Contract Balance (in SUN): {contractBalance}</h2>

      <h2> Amount Invested (in JST): {amountInJST}</h2>

      <h2> Amount Invested (in TRX): {amountInTRX} </h2>

      <div className="flex gap-2 flex-row mt-4">
        <button className="p-3 bg-green-500 rounded-md" onClick={InvestInTRX}>
          Invest(in TRX/JST)
        </button>

        <button
          className="p-3 bg-green-500 rounded-md"
          onClick={BorrowFromContract}
        >
          Borrow Tokens
        </button>
      </div>
    </div>
  );
};

export default LendingPool;

"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  fetchContractJSTBalance,
  fetchContractTRXBalance,
  fetchUserJSTBalance,
  fetchUserTRXBalance,
  InvestInTRX,
  InvestInJST,
  getTronWeb,
} from "@/utils/utilityFunctions";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FeatureCards } from "./utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Page = () => {
  const [contractJSTBalance, setContractJSTBalance] = useState(0);
  const [contractTRXBalance, setContractTRXBalance] = useState(0);
  const [UserTRXBalance, setUserTRXBalance] = useState(0);
  const [UserJSTBalance, setUserJSTBalance] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState<string>(
    "Transaction Not Started"
  );
  const [investmentToken, setInvestmentToken] = useState<string>("TRX");
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);

  const [borrowToken, setBorrowToken] = useState<string>("TRX");
  const [borrowAmount, setBorrowAmount] = useState<number>(0);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const contract_TRX = await fetchContractTRXBalance();
        setContractTRXBalance(contract_TRX);

        const contract_JST = await fetchContractJSTBalance();
        setContractJSTBalance(contract_JST);

        const user_TRX = await fetchUserTRXBalance();
        console.log("user Trx", user_TRX);
        setUserTRXBalance(user_TRX);

        const user_JST = await fetchUserJSTBalance();
        setUserJSTBalance(user_JST);
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#invest") {
      const element = document.getElementById("invest");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (hash === "#borrow") {
      const element = document.getElementById("borrow");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const handleInvestment = async () => {
    if (investmentToken === "TRX") {
      const trxTransactionId = await InvestInTRX(investmentAmount);
      console.log(trxTransactionId);
      waitForTransactionConfirmation(trxTransactionId);
    } else if (investmentToken === "JST") {
      const jstTransactionId = await InvestInJST(investmentAmount);

      waitForTransactionConfirmation(jstTransactionId);
    }
  };

  const waitForTransactionConfirmation = async (txID) => {
    const interval = 3000;
    const maxAttempts = 80;
    const tronWeb = await getTronWeb();

    let attempts = 0;

    // Polling function to check transaction status
    const checkTransactionStatus = async () => {
      try {
        const transactionInfo = await tronWeb.trx.getTransactionInfo(txID);

        if (transactionInfo && transactionInfo.receipt) {
          const result = transactionInfo.receipt.result;

          if (result === "SUCCESS") {
            console.log("Transaction succeeded:", transactionInfo);
            setTransactionStatus("Success");
            return transactionInfo; // Return success result
          } else if (result === "FAILED") {
            console.error("Transaction failed:", transactionInfo);
            setTransactionStatus("Failed");
            throw new Error("Transaction failed");
          }
        } else {
          console.log("Transaction is not yet confirmed.");
        }

        // Keep polling if transaction is not confirmed
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkTransactionStatus, interval); // Wait and retry
        } else {
          setTransactionStatus("Transaction Failed");
          throw new Error(
            "Transaction status not available after multiple attempts."
          );
        }
      } catch (error) {
        console.error("Error checking transaction status:", error);
      }
    };

    // Start polling
    checkTransactionStatus();
  };

  return (
    <div className="bg-white dark:bg-black flex flex-col">
      <div className="min-h-[100vh] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col gap-5 md:gap-10 justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="mt-20 md:mt-0 text-5xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
          Lending Pool
        </div>
        <div className="px-4 md:px-[6rem]">
          {contractTRXBalance && (
            <TextGenerateEffect
              words={`Amount of TRX in Liquidity pool: ${contractTRXBalance} TRX`}
            />
          )}
          {contractJSTBalance && (
            <TextGenerateEffect
              words={`Amount of JST in Liquidity Pool: ${contractJSTBalance} JST`}
            />
          )}

          {UserTRXBalance && (
            <TextGenerateEffect
              words={`Your TRX Investment: ${UserTRXBalance} TRX`}
            />
          )}
          {UserJSTBalance && (
            <TextGenerateEffect
              words={`Your JST Investment: ${UserJSTBalance} JST`}
            />
          )}
        </div>
        <div className="px-4 md:px-[6rem]">
          <FeatureCards />
        </div>
      </div>
      <div
        className="bg-white dark:bg-black py-[8rem] md:py-[10rem] lg:py-[12rem]"
        id="invest"
      >
        <div className="text-5xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
          Invest In Lending Pool
        </div>
        <div className="w-full px-4 md:px-[12rem] lg:px-[20rem] flex flex-col gap-4 text-black dark:text-white">
          <Select value={investmentToken} onValueChange={setInvestmentToken}>
            <SelectTrigger className="w-full border-white min-h-10">
              <SelectValue placeholder="Select Token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TRX">TRX</SelectItem>
              <SelectItem value="JST">JST</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            min={0}
            placeholder="Invest Amount"
            className="w-full border-white min-h-10 no-arrows"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(parseFloat(e.target.value))}
          />
          <button
            className="border border-white text-blac dark:text-white px-4 py-2 rounded-md"
            onClick={handleInvestment}
          >
            Invest in {investmentToken}
          </button>
          <button className="border border-white text-blac dark:text-white px-4 py-2 rounded-md">
            Status: {transactionStatus}
          </button>
        </div>
      </div>

      <div
        className="bg-white flex flex-col gap-8 dark:bg-black py-[8rem] md:py-[10rem] "
        id="borrow"
      >
        <div className="text-5xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
          Borrow From Lending Pool
        </div>
        <div className="text-2xl sm:text-3xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-center">
          Current Interest 7% APY
        </div>
        <div className="w-full px-4 md:px-[12rem] lg:px-[20rem] flex flex-col gap-4 text-black dark:text-white">
          <Select value={borrowToken} onValueChange={setBorrowToken}>
            <SelectTrigger className="w-full border-white min-h-10">
              <SelectValue placeholder="Select Token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TRX">TRX</SelectItem>
              <SelectItem value="JST">JST</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            min={0}
            placeholder="Invest Amount"
            className="w-full border-white min-h-10 no-arrows"
            value={borrowAmount}
            onChange={(e) => setBorrowAmount(parseInt(e.target.value))}
          />
          <button
            className="border border-white text-blac dark:text-white px-4 py-2 rounded-md"
            onClick={handleInvestment}
          >
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;

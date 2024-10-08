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
  withdrawTRX,
  withdrawJST,
  getDaysElapsedAfterInvestment,
  BorrowTRX,
  BorrowJST,
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
import { toast } from "sonner";

const Page = () => {
  const [contractJSTBalance, setContractJSTBalance] = useState<number>(0);
  const [contractTRXBalance, setContractTRXBalance] = useState<number>(0);
  const [UserTRXBalance, setUserTRXBalance] = useState<number>(0);
  const [UserJSTBalance, setUserJSTBalance] = useState<number>(0);
  const [investmentToken, setInvestmentToken] = useState<string>("TRX");
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);

  const [investmentDaysElapsed, setInvestDaysElapsed] = useState<number>(0);

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

        handleUserWithdrawalState();
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
    if (hash === "#withdraw") {
      const element = document.getElementById("withdraw");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const handleInvestment = async () => {
    if (investmentToken === "TRX") {
      const trxTransactionId = await InvestInTRX(investmentAmount);
      console.log(trxTransactionId);

      if (trxTransactionId === "declined") {
        toast.error("Confirmation declined by user");
        return;
      }

      toast.promise(waitForTransactionConfirmation(trxTransactionId), {
        loading: "Waiting for TRX transaction confirmation...",
        success: "TRX Transaction confirmed successfully!",
        error: "TRX Transaction failed!",
      });
    } else if (investmentToken === "JST") {
      const jstTransactionId = await InvestInJST(investmentAmount);
      if (jstTransactionId === "declined") {
        toast.error("Confirmation declined by user");
        return;
      }
      toast.promise(waitForTransactionConfirmation(jstTransactionId), {
        loading: "Waiting for JST transaction confirmation...",
        success: "JST Transaction confirmed successfully!",
        error: "JST Transaction failed!",
      });
    }
  };

  const waitForTransactionConfirmation = async (txID: string) => {
    const interval = 3000;
    const maxAttempts = 80;
    const tronWeb = await getTronWeb();

    let attempts = 0;

    return new Promise((resolve, reject) => {
      const checkTransactionStatus = async () => {
        try {
          const transactionInfo = await tronWeb.trx.getTransactionInfo(txID);

          if (transactionInfo && transactionInfo.receipt) {
            const result = transactionInfo.receipt.result;

            if (result === "SUCCESS") {
              console.log("Transaction succeeded:", transactionInfo);
              resolve(transactionInfo); // Resolve on success
            } else if (result === "FAILED") {
              console.error("Transaction failed:", transactionInfo);
              reject(new Error("Transaction failed")); // Reject on failure
            }
          } else {
            console.log("Transaction is not yet confirmed.");
          }

          // Keep polling if transaction is not confirmed
          if (attempts < maxAttempts) {
            attempts++;
            setTimeout(checkTransactionStatus, interval); // Wait and retry
          } else {
            reject(
              new Error(
                "Transaction status not available after multiple attempts."
              )
            );
          }
        } catch (error) {
          console.error("Error checking transaction status:", error);
          reject(error); // Reject if there's an error
        }
      };

      // Start polling
      checkTransactionStatus();
    });
  };

  const handleWithdrawal = async () => {
    console.log(investmentDaysElapsed);
    if (UserTRXBalance > 0) {
      if (investmentDaysElapsed < 15)
        return toast.error(
          `Wait ${15 - investmentDaysElapsed} days to withdraw Funds`
        );
      const balanceInSun = UserTRXBalance * 1000000;
      const txId = await withdrawTRX(balanceInSun);
      console.log(txId);
      return toast.promise(waitForTransactionConfirmation(txId), {
        loading: "Waiting for TRX withdrawal confirmation...",
        success: "TRX Withdrawal confirmed successfully!",
        error: "TRX Withdrawal failed!",
      });
    } else if (UserJSTBalance > 0) {
      if (investmentDaysElapsed < 15)
        return toast.error(
          `Wait ${15 - investmentDaysElapsed} days to withdraw Funds`
        );
      console.log("Inside JST");
      const txId = await withdrawJST(UserJSTBalance);
      console.log(txId);
      return toast.promise(waitForTransactionConfirmation(txId), {
        loading: "Waiting for JST withdrawal confirmation...",
        success: "JST Withdrawal confirmed successfully!",
        error: "JST Withdrawal failed!",
      });
    } else return toast.success("No Funds to Withdraw");
  };

  const handleUserWithdrawalState = async () => {
    const daysElapsed = await getDaysElapsedAfterInvestment();
    setInvestDaysElapsed(daysElapsed || 0);
  };

  const handleBorrow = async () => {
    if (borrowToken === "TRX") {
      const trxTransactionId = await BorrowTRX(borrowAmount);
      console.log(trxTransactionId);
    } else {
      const jstTransactionId = await BorrowJST(borrowAmount);
      console.log(jstTransactionId);
    }
  };
  return (
    <div className="bg-white dark:bg-black flex flex-col">
      <div className="min-h-[100vh] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col gap-5 md:gap-10 justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="-mb-5 mt-20 md:mt-0 text-5xl sm:text-7xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
          Liquidity Pool
        </div>

        <div className="px-4 md:px-[6rem]">
          <p className="text-white text-2xl font-bold "> Token Pair TRX/JST</p>

          <TextGenerateEffect
            words={`Amount of TRX in Liquidity pool: ${contractTRXBalance} TRX`}
          />

          <TextGenerateEffect
            words={`Amount of JST in Liquidity Pool: ${contractJSTBalance} JST`}
          />

          <TextGenerateEffect
            words={`Your TRX Investment: ${UserTRXBalance} TRX`}
          />

          <TextGenerateEffect
            words={`Your JST Investment: ${UserJSTBalance} JST`}
          />
        </div>
        <div className="px-4 md:px-[6rem]">
          <FeatureCards />
        </div>
      </div>
      <div
        className="bg-white dark:bg-black py-[8rem] md:py-[9rem] lg:py-[10rem]"
        id="invest"
      >
        <div className="text-5xl sm:text-6xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
          Add TRX or JST Liquidity in the Pool
        </div>
        <div className="text-5xl sm:text-3xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
          Earn upto 6% APY
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
        </div>
      </div>

      {/* winthdraw Section */}

      <div
        className="bg-white dark:bg-black py-[10rem] md:py-[11rem] lg:py-[12rem] px-4 md:px-6"
        id="withdraw"
      >
        <div className="text-5xl sm:text-6xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
          Withdraw from Liquidity Pool
        </div>
        <div className="text-xl font-bold  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-2 mb-6 text-center">
          You can only withdraw your funds 15 days after your initial
          investment.
        </div>
        <div
          className={`w-full px-4 md:px-[16rem] lg:px-[24rem] flex flex-col gap-4 text-black dark:text-white`}
        >
          <button
            className={`border border-white px-4 py-2 rounded-md`}
            onClick={handleWithdrawal}
          >
            Withdraw Funds
          </button>
        </div>
      </div>

      <div
        className="bg-white px-2 md:px-4 flex flex-col gap-8 dark:bg-black py-[6rem] md:py-[7rem] lg:py-[8rem]"
        id="borrow"
      >
        <div className="text-5xl sm:text-7xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
          Borrow From Liquidity Pool
        </div>
        <p className="text-white text-center items-center">
          To borrow TRX, you need to have 20% more JST invested than the TRX
          amount you&apos;re borrowing. <br /> Similarly, to borrow JST, you
          need to have 20% more TRX invested than the JST amount you&apos;re
          borrowing.
        </p>
        <div className="text-2xl sm:text-3xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-center">
          Current Interest Rate 7%
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
            onClick={handleBorrow}
          >
            Borrow {borrowToken}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;

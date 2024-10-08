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
  borrowTRX,
  getUserTRXAmountToRepay,
  repayTRXDebt,
  repayJSTDebt,
  getUserTRXBorrowedAmount,
  getUserJSTBorrowedAmount,
  borrowJST,
  getTronWeb,
  getUserJSTAmountToRepay,
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
  const [userTRXBorrowedAmount, setUserTRXBorrowedAmount] = useState<number>(0);
  const [userJSTBorrowedAmount, setUserJSTBorrowedAmount] = useState<number>(0);

  const [userTRXRepayAmount, setUserTRXRepayAmount] = useState<number>(0);
  const [userJSTRepayAmount, setUserJSTRepayAmount] = useState<number>(0);

  const [dataFetched, setDataFetched] = useState<boolean>(false);

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

        const userBorrowedTRX = await getUserTRXBorrowedAmount();
        setUserTRXBorrowedAmount(userBorrowedTRX);
        const userBorrowedJST = await getUserJSTBorrowedAmount();
        setUserJSTBorrowedAmount(userBorrowedJST);

        handleUserWithdrawalState();

        handleRepayAmount();

        setDataFetched(() => true);
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
      if (UserJSTBalance > 0 || UserTRXBalance > 0)
        return toast.error("Withdraw previous funds before investing again");
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
      if (UserJSTBalance > 0 || UserTRXBalance > 0)
        return toast.error("Withdraw previous funds before investing again");
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
          `Wait ${15 - investmentDaysElapsed} more days to withdraw Funds`
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
      const trxTransactionId = await borrowTRX(borrowAmount);
      console.log(trxTransactionId);
      return toast.promise(waitForTransactionConfirmation(trxTransactionId), {
        loading: "Waiting for transaction confirmation...",
        success: "TRX borrowed successfully",
        error: "TRX borrow failed!",
      });
    } else {
      const jstTransactionId = await borrowJST(borrowAmount);
      console.log(jstTransactionId);
      return toast.promise(waitForTransactionConfirmation(jstTransactionId), {
        loading: "Waiting for transaction confirmation...",
        success: "JST borrowed successfully",
        error: "JST borrow failed!",
      });
    }
  };

  const handleRepay = async () => {
    if (userTRXRepayAmount > 0) {
      const trxTransactionId = await repayTRXDebt(userTRXRepayAmount);
      console.log(trxTransactionId);
      setUserTRXRepayAmount(0);
      return toast.promise(waitForTransactionConfirmation(trxTransactionId), {
        loading: "Waiting for repay confirmation...",
        success: "Funds repay confirmed successfully!",
        error: "Funds repay failed!",
      });
    } else if (userJSTRepayAmount > 0) {
      const jstTransactionId = await repayJSTDebt(userJSTRepayAmount);
      console.log(jstTransactionId);
      setUserJSTRepayAmount(0);
      return toast.promise(waitForTransactionConfirmation(jstTransactionId), {
        loading: "Waiting for repay confirmation...",
        success: "Funds repay confirmed successfully!",
        error: "Funds repay failed!",
      });
    }
  };

  const handleRepayAmount = async () => {
    const TRXRepayAmount = await getUserTRXAmountToRepay();
    const JSTRepayAmount = await getUserJSTAmountToRepay();
    setUserTRXRepayAmount(TRXRepayAmount);
    setUserJSTRepayAmount(JSTRepayAmount);
  };

  return (
    <div className="bg-white dark:bg-black flex flex-col">
      <div className="min-h-[100vh] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col gap-5 md:gap-10 justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="mt-20 md:mt-5 text-5xl sm:text-7xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
          Liquidity Pool
        </div>

        <div className="px-6 md:px-[6rem] py-4">
          <p className="text-3xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
            {" "}
            Token Pair TRX/JST
          </p>

          {dataFetched && (
            <TextGenerateEffect
              words={`Amount of TRX in Liquidity pool: ${contractTRXBalance} TRX`}
            />
          )}

          {dataFetched && (
            <TextGenerateEffect
              words={`Amount of JST in Liquidity Pool: ${contractJSTBalance} JST`}
            />
          )}

          {dataFetched && (
            <TextGenerateEffect
              words={`Your TRX Investment: ${UserTRXBalance} TRX`}
            />
          )}

          {dataFetched && (
            <TextGenerateEffect
              words={`Your JST Investment: ${UserJSTBalance} JST`}
            />
          )}

          {dataFetched && (userTRXBorrowedAmount || userJSTBorrowedAmount) && (
            <TextGenerateEffect
              words={
                userTRXBorrowedAmount > 0
                  ? `Currently Borrowed : ${userTRXBorrowedAmount} TRX`
                  : `Currently Borrowed : ${userJSTBorrowedAmount} JST`
              }
            />
          )}

          {dataFetched && (
            <TextGenerateEffect
              words={
                userTRXRepayAmount
                  ? `Current Debt : ${userTRXRepayAmount} TRX`
                  : userJSTBorrowedAmount
                  ? `Currently Borrowed : ${userJSTBorrowedAmount} JST`
                  : "You're Currently Debt Free."
              }
            />
          )}
        </div>

        <div className="px-6 md:px-[6rem]">
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
        <div className="text-2xl sm:text-3xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
          Earn upto 3% interest on your investment
        </div>
        <div className="w-full px-6 md:px-[12rem] lg:px-[20rem] flex flex-col gap-4 text-black dark:text-white">
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
        className="bg-white min-h-[100vh] dark:bg-black py-[10rem] md:py-[11rem] lg:py-[12rem] px-4 md:px-6"
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
          Current Interest Rate 4%
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

      {/* repay section  */}

      <div
        className="bg-white px-2 md:px-4 flex flex-col gap-8 dark:bg-black py-[6rem] md:py-[7rem] lg:py-[8rem]"
        id="repay"
      >
        <div className="text-5xl sm:text-7xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
          Repay to Liquidity Pool
        </div>
        <p className="text-white font-extrabold italic text-center items-center relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
          Note - Users must repay the loan within 30 days. If they fail to do
          so, the interest doubles is unlocked.
        </p>
        <div className="text-2xl sm:text-3xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-center">
          {userTRXRepayAmount
            ? `Current outstanding Debt: ${userTRXRepayAmount} TRX`
            : userJSTRepayAmount
            ? `Current outstanding Debt: ${userJSTRepayAmount} JST`
            : "You're Currently Debt Free."}
        </div>
        <div className="w-full px-4 md:px-[12rem] lg:px-[20rem] flex flex-col gap-4 text-black dark:text-white">
          <button
            className="border border-white text-blac dark:text-white px-4 py-2 rounded-md"
            onClick={handleRepay}
          >
            Repay Debt
            {userTRXRepayAmount
              ? `${userTRXRepayAmount} TRX`
              : userJSTRepayAmount
              ? `${userJSTRepayAmount} JST`
              : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;

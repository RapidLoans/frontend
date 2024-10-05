"use client";
import React, { useState, useEffect } from "react";
import { CONTRACT_ADDRESS } from "@/constants";
import {
  getTronWeb,
  fetchContractJSTBalance,
  fetchContractTRXBalance,
  fetchUserJSTBalance,
  fetchUserTRXBalance,
  InvestInTRX,
  InvestInJST,
} from "@/utils/utilityFunctions";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FeatureCards } from "./utils";

const Page = () => {
  const [contractJSTBalance, setContractJSTBalance] = useState(0);
  const [contractTRXBalance, setContractTRXBalance] = useState(0);
  const [UserTRXBalance, setUserTRXBalance] = useState(0);
  const [UserJSTBalance, setUserJSTBalance] = useState(0);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const contract_TRX = await fetchContractTRXBalance();
        setContractTRXBalance(contract_TRX);

        const contract_JST = await fetchContractJSTBalance();
        setContractJSTBalance(contract_JST);

        const user_TRX = await fetchUserTRXBalance();
        console.log("user Trx", user_TRX)
        setUserTRXBalance(user_TRX);

        const user_JST = await fetchUserJSTBalance();
        setUserJSTBalance(user_JST);
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    };
    fetchAllData();
  }, []);

  return (
    <div className="min-h-[100vh] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col gap-5 md:gap-10 justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="mt-20 md:mt-0 text-5xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
        Lending Pool
      </div>
      <div className="px-4 md:px-[6rem]">
        {contractTRXBalance && (
          <TextGenerateEffect
            words={`Amount of TRX in liquidity pool: ${contractTRXBalance} TRX`}
          />
        )}
        {contractJSTBalance && (
          <TextGenerateEffect
            words={`Amount of JST in liquidity pool: ${contractJSTBalance} JST`}
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
      <button
        className="bg-white bg-yellow-300 text-black dark:text-white px-4 py-2 rounded-full"
        onClick={InvestInTRX}
      >
        Invest in trx
      </button>
    </div>
  );
};

export default Page;

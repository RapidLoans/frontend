"use client";
import { FeatureCards } from "@/components/FeatureCard";
import React, { useState, useEffect } from "react";
import {
  handleTRXInvestment,
  handleJSTInvestment,
  investInTRX,
  BorrowFromContract,
  fetchContractBalance,
  getDetails,
} from "@/utils/utilityFunctions";

export const cards = [
  {
    title: "Borrow",
    src: "https://www.pexels.com/photo/an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-ethics-research-understanding-human-involvement-in-data-labelling-it-was-created-by-ariel-lu-as-part-of-the-18068746/",
  },
  {
    title: "Invest",
    src: "/images/invest.png",
  },
  {
    title: "FlashLoan",
    src: "/images/flash-loan.jpg",
  },
];

const Page = () => {
  const [contractBalance, setContractBalance] = useState(0);
  const [amountInTRX, setAmountInTRX] = useState(0);
  const [amountInJST, setAmountInJST] = useState(0);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const x = await fetchContractBalance();
        setContractBalance(x);

        const y = await handleJSTInvestment();
        setAmountInJST(y);

        const z = await handleTRXInvestment();
        setAmountInTRX(z);
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
      <div className="mt-24 text-5xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
        Lending Pool
      </div>
      <div className="px-4 md:px-[6rem]">
        <FeatureCards />
      </div>
    </div>
  );
};

export default Page;

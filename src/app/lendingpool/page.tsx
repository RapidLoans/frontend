"use client";
import { FocusCards } from "@/components/Card";
import React, { useContext, useEffect, useState } from "react";

export const cards = [
  {
    title: "Borrow",
    src: "/images/borrow.jpg",
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


const page = () => {
    const [contractBalance, setContractBalance] = useState(0);
    const [amountInTRX, setAmountInTRX] = useState(0);
    const [amountInJST, setAmountInJST] = useState(0);

  return(
      <div className="min-h-[100vh] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col gap-10 justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className=" mt-10 md:mt-24 text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
          Lending Pool
        </div>
      <FocusCards cards={cards} />;
      </div>
  )
};

export default page;

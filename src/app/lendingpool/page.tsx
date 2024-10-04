"use client";
import React, { useContext, useEffect, useState } from "react";
import LendingPool from "../(components)/LendingPool";
import { BackgroundLines } from "@/components/BackgroundLines";

const page = () => {
    const [contractBalance, setContractBalance] = useState(0);
    const [amountInTRX, setAmountInTRX] = useState(0);
    const [amountInJST, setAmountInJST] = useState(0);

  return(
    <>
          <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
              <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-500 dark:to-white text-2xl md:text-4xl lg:text-8xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                  RapidLoans
              </h2>
              <p className="max-w-xl mx-auto text-sm md:text-xl text-neutral-700 dark:text-neutral-400 text-center">
                  Borrow . Invest . Flash Loan
              </p>
          </BackgroundLines>
    </>
  )
};

export default page;

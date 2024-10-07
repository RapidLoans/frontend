"use client";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-bean";

const FlashLoan = () => {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white w-full">
      <div className="text-5xl sm:text-7xl my-[4rem] flex justify-center w-full text-center font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        <p className="max-w-4xl text-wrap">
          Flash Loans <br /> Developer Guide
        </p>
      </div>
      <TracingBeam className="px-6 ">
        <div className="antialiased pt-4 relative">
          {dummyContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-10">
              <div className="text-4xl sm:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
                {item.title}
              </div>

              <div className="text-sm md:text-[20px] leading-7 text-neutral-700 dark:text-neutral-400">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
};

export default FlashLoan;

const dummyContent = [
  {
    title: "Introduction to Flash Loans",
    description: (
      <>
        <p>
          Flash Loans let you borrow assets instantly, no collateral needed! The
          only catch? You have to pay it back with a small fee, all within the
          same transaction—inside a single blockchain block.
        </p>
        <br />
        <p>
          If you don’t manage to repay in time, no worries—the entire
          transaction is canceled as if it never happened. This powerful tool is
          designed for developers who are well-versed in the Ethereum Virtual
          Machine (EVM) and smart contracts.
        </p>
        <br />
      </>
    ),
    badge: "Introduction",
  },
  {
    title: "How Flash Loans Work",
    description: (
      <>
        <p>
          Flash loans operate within a single blockchain transaction.
          Here&apos;s how it works step by step:
        </p>
        <ul>
          <br />
          <li>
            • Your smart contract requests a loan from the LiquidityPool,
            specifying the asset and amount.
          </li>
          <li>
            • The Pool transfers the requested asset to your contract after
            performing some checks.
          </li>
          <li>
            • Your contract can now use the loaned funds for any operation, such
            as arbitrage or liquidation.
          </li>
          <li>
            • After your operation is complete, you must repay the loan with a
            fee back to the Pool.
          </li>
          <li>• If you fail to repay, the entire transaction is reverted</li>
        </ul>
        <br />
      </>
    ),
    badge: "Process",
  },
  {
    title: "Execution Flow",
    description: (
      <>
        <p>
          Here&apos;s your ultimate step-by-step roadmap to mastering flash
          loans on Rapid Loan!
        </p>
        <br />
        <ul>
          <li>
            • Kick things off by creating your own contract and inheriting from{" "}
            <code className="bg-gray-800 text-white px-2 py-1 rounded-md">
              IReceiverContract
            </code>
            , which you&apos;ll find in the RapidLoans GitHub repository. This
            is your starting point to tap into the Rapid Loans magic.
          </li>
          <li>
            • Next, you&apos;ll need to interact with the RapidLoansCore
            contract. For that, you need to take in{" "}
            <code className="bg-gray-800 text-white px-2 py-1 rounded-md">
              RapidLoansCore
            </code>{" "}
            address, which is present in address book in the website.
          </li>
          <li>
            • Call the{" "}
            <code className="bg-teal-300 text-black px-2 rounded-md">
              requestTRXRapidLoan
            </code>{" "}
            function on the core contract, specifying the amount of TRX you want
            to borrow. The core contract will transfer the requested assets to
            your contract, allowing you to use the loaned funds.
          </li>
          <li>
            • Now for the fun part! Inside the{" "}
            <code className="bg-teal-300 text-black px-2 rounded-md">
              executeTRXRapidLoan
            </code>{" "}
            function, you&apos;ll use the loaned funds to perform any logic you
            want—arbitrage, liquidation, you name it. Just don&apos;t forget to
            repay the loan, plus the fee.
          </li>
          <li>
            • The process is the same, just swap out TRX functions for JST ones.
            We highly recommend giving it a test run on the TRON IDE before
            taking it on-chain.
          </li>
        </ul>
        <br />
      </>
    ),
    badge: "Execution",
  },
];

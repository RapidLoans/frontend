"use client";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-bean";

const FlashLoan = () => {
    return (
        <div className="bg-white dark:bg-black text-black dark:text-white w-full">
            <div className="text-5xl sm:text-7xl my-[4rem] flex justify-center w-full text-center font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
                <p className="max-w-4xl text-wrap">Flash Loans <br /> Developer Guide</p>
            </div>
            <TracingBeam className="px-6 ">
                <div className="antialiased pt-4 relative">
                    {dummyContent.map((item, index) => (
                        <div key={`content-${index}`} className="mb-10">
                            <h2 className="bg-black dark:bg-white text-white dark:text-black rounded-full text-sm w-fit px-4 py-1 mb-4">
                                {item.badge}
                            </h2>
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
}

export default FlashLoan;

const dummyContent = [
    {
        title: "Introduction to Flash Loans",
        description: (
            <>
                <p>
                    Flash Loans allow you to borrow assets without needing collateral, as long as the loan is repaid with a fee within the same transaction, inside one blockchain block.
                </p>
                <p>
                    If the loan isn’t repaid, the whole transaction is reverted. This is an advanced feature aimed at developers with knowledge of the Ethereum Virtual Machine (EVM) and smart contracts.
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
                <p>Flash loans operate within a single blockchain transaction. Here&apos;s how it works step by step:</p>
                <ul>
                    <br />
                    <li>• Your smart contract requests a loan from the Pool contract, specifying the asset and amount.</li>
                    <li>• The Pool transfers the requested asset to your contract after performing some checks.</li>
                    <li>• Your contract can now use the loaned funds for any operation, such as arbitrage or liquidation.</li>
                    <li>• After your operation is complete, you must repay the loan with a fee back to the Pool.</li>
                    <li>• If you fail to repay, the entire transaction is reverted, meaning nothing happened.</li>
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
                <p>Here’s a step-by-step guide on how to execute a flash loan:</p>
                <ul>
                    <li>• Call <code>flashLoanSimple()</code> or <code>flashLoan()</code> on the Pool contract, passing in the required parameters (e.g., amount, asset).</li>
                    <li>• The Pool contract sends the requested amount to your contract after sanity checks.</li>
                    <li>• Your contract performs any operations you wish with the borrowed amount.</li>
                    <li>• After executing your operations, approve the Pool to pull the borrowed amount plus fee, or open a debt position if using <code>flashLoan()</code>.</li>
                    <li>• If the loan and fee are not repaid, the entire transaction is reverted.</li>
                </ul>
                <br />
            </>
        ),
        badge: "Execution",
    },
];

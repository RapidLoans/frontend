import React from "react";

function AddressBook() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white w-full h-full">
      <div className="text-5xl md:text-7xl my-[4rem] flex justify-center w-full text-center font-bold relative  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        <p className="max-w-4xl text-wrap">
          Address Book
        </p>
      </div>
      <div className="text-2xl md:text-3xl my-[2rem] flex justify-center w-full font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4">
        <p className="max-w-4xl text-left">
          ⁠PriceOracle : TXJL8v31JKk6mm1QA9kpM6H3iaYabvu9fw
        </p>
      </div>
      <div className="text-2xl md:text-3xl my-[2rem] flex justify-center w-full font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4">
        <p className="max-w-4xl">
          LiquidityPool : TXJL8v31JKk6mm1QA9kpM6H3iaYabvu9fw
        </p>
      </div>
      <div className="text-2xl md:text-3xl my-[2rem] flex justify-center w-full font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4">
        <p className="max-w-4xl">
          RapidLoansCore : TXJL8v31JKk6mm1QA9kpM6H3iaYabvu9fw
        </p>
      </div>
      <div className="text-2xl md:text-3xl my-[2rem] flex justify-center w-full font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4">
        <p className="max-w-4xl">
          Subject : TXJL8v31JKk6mm1QA9kpM6H3iaYabvu9fw
        </p>
      </div>
    </div>
  )
}

export default AddressBook;

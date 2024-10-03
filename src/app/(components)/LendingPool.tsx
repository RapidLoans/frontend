import React from "react";
import { CONTRACT_ADDRESS, LendingPoolABI } from "@/constants";

async function getTronWeb() {
  if (typeof window.tronLink !== "undefined") {
    try {
      // Check if TronLink is ready and available
      if (window.tronLink.ready) {
        return window.tronLink.tronWeb; // Return tronWeb instance from TronLink
      } else {
        // Request account access
        const res = await window.tronLink.request({
          method: "tron_requestAccounts",
        });

        // Check if the request was successful
        if (res.code === 200 || res === true) {
          console.log("Accounts granted access");
          return window.tronLink.tronWeb; // Return tronWeb instance if successful
        } else {
          console.error("Access to accounts was denied");
        }
      }
    } catch (error) {
      console.error("Error requesting TronLink accounts:", error);
    }
  } else {
    console.error("TronLink is not installed.");
  }

  return null; // Return null if TronLink is not available or access is denied
}

const handleClick = async () => {
  try {
    const tronWeb = await getTronWeb();

    if (!tronWeb) {
      console.error("TronWeb instance not available");
      return;
    }

    const myContract = await tronWeb.contract(LendingPoolABI, CONTRACT_ADDRESS);
    const txID = await myContract.addTRX().send({ callValue: 2000 });
    console.log(txID);

    const balanceInSun = await tronWeb.trx.getBalance(CONTRACT_ADDRESS);
    console.log(balanceInSun);
  } catch (error) {
    console.error("Error in transaction:", error);
  }
};

const LendingPool = () => {
  return (
    <div className="mt-24 bg-black text-white">
      <button className="p-3 bg-blue-500 rounded-md" onClick={handleClick}>
        Test Me
      </button>
    </div>
  );
};

export default LendingPool;

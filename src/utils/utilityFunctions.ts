import {
  LP_CONTRACT_ADDRESS,
  LendingPoolABI,
  JSTAbi,
  JST_CONTRACT_ADDRESS,
  PriceOracleABI,
  PriceOracle_CONTRACT_ADDRESS,
} from "@/constants";
// Function to get the TronWeb instance
export const getTronWeb = async () => {
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
};

export const fetchContractTRXBalance = async () => {
  const tronWeb = await getTronWeb();
  if (!tronWeb) return 0;

  try {
    const myContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );
    const tx = await myContract.getContractTRXBalance().call();
    console.log("tx:", tx);

    const res = tronWeb.toDecimal(tx.amountTRX);
    const valueInTRX = res / 1000000;
    console.log(`TRX Balance (decimal): ${valueInTRX}`);

    return valueInTRX;
  } catch (error) {
    console.error("Error in fetching TRX Balance:", error);
    return 0;
  }
};

export const fetchContractJSTBalance = async () => {
  const tronWeb = await getTronWeb();
  if (!tronWeb) return 0;

  try {
    const myContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );
    const tx = await myContract.getContractJSTBalance().call();
    console.log("tx:", tx);

    const dec = tronWeb.toDecimal(tx.amountJST);
    const valueInJST = dec / 1000000000000000000;
    console.log(`JST Balance (decimal): ${valueInJST}`);

    return valueInJST;
  } catch (error) {
    console.error("Error in fetching JST Balance:", error);
    return 0;
  }
};

export const fetchUserJSTBalance = async () => {
  const tronWeb = await getTronWeb();
  if (!tronWeb) return 0;

  try {
    const myContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );
    const tx = await myContract
      .getUserJSTBalance(tronWeb.defaultAddress.base58)
      .call();
    console.log("User Jst", tx);
    const dec = tronWeb.toDecimal(tx.amountJST);
    const valueInJST = dec / 1000000000000000000;
    console.log(`USER JST Balance (decimal): ${valueInJST}`);

    return valueInJST;
  } catch (error) {
    console.error("Error in fetching JST Balance:", error);
    return 0;
  }
};

export const fetchUserTRXBalance = async () => {
  const tronWeb = await getTronWeb();
  if (!tronWeb) return 0;

  try {
    const myContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );
    const tx = await myContract
      .getUserTRXBalance(tronWeb.defaultAddress.base58)
      .call();

    const res = tronWeb.toDecimal(tx.amountTRX);
    const valueInTRX = res / 1000000;
    console.log(`User TRX Balance (decimal): ${valueInTRX}`);

    return valueInTRX || 0;
  } catch (error) {
    console.error("Error in fetching TRX Balance:", error);
    return 0;
  }
};

export const InvestInTRX = async (val: number) => {
  const tronWeb = await getTronWeb();
  if (!tronWeb) return;

  try {
    const myContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );
    const amountInSun = val * 1000000;
    const tx = await myContract.addTRX().send({ callValue: amountInSun });
    const transactionInfo = await tronWeb.trx.getTransactionInfo(tx);
    console.log(transactionInfo);
    return tx;
  } catch (error) {
    console.error("Error in TRX investment transaction:", error);
    return "declined";
  }
};

export const InvestInJST = async (val: number) => {
  const tronWeb = await getTronWeb();
  if (!tronWeb) return;
  const valueInJSTTokens = BigInt(val * 1000000000000000000);
  try {
    const jst = await tronWeb.contract(JSTAbi, JST_CONTRACT_ADDRESS);
    try {
      await jst.approve(LP_CONTRACT_ADDRESS, valueInJSTTokens).send();
      const myContract = await tronWeb.contract(
        LendingPoolABI,
        LP_CONTRACT_ADDRESS
      );

      const tx = await myContract.addJST(valueInJSTTokens).send();
      console.log(tx);
      return tx;
    } catch (error) {
      console.error("Transaction Rejected by User", error);
      return "declined";
    }
  } catch (error) {
    console.error("Error in JST investment transaction:", error);
    return "declined";
  }
};

// Withdraw TRX function
export const withdrawTRX = async (amount: number) => {
  const tronWeb = await getTronWeb();
  try {
    if (!tronWeb) {
      console.error("TronWeb not initialized");
      return;
    }

    const myContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );

    // Call the withdrawTRX method from the contract
    const tx = await myContract.withdrawTRX(amount).send();

    console.log("Transaction successful:", tx);
    return tx;
  } catch (error) {
    console.error("Error withdrawing TRX:", error);
  }
};

export const withdrawJST = async (amount: number) => {
  const tronWeb = await getTronWeb();
  try {
    if (!tronWeb) {
      console.error("TronWeb not initialized");
      return;
    }

    const myContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );

    // Call the withdrawTRX method from the contract
    const tx = await myContract.withdrawJST(amount).send();

    console.log("Transaction successful:", tx);
    return tx;
  } catch (error) {
    console.error("Error withdrawing TRX:", error);
  }
};

export const getDaysElapsedAfterInvestment = async () => {
  const tronWeb = await getTronWeb();
  try {
    if (!tronWeb) {
      console.error("TronWeb not initialized");
      return 0;
    }

    const myContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );

    const tx = await myContract
      .getUserLastInvestedTRXTimestamp(tronWeb.defaultAddress.base58)
      .call();

    const dec = tronWeb.toDecimal(tx);
    const currentTimestamp = Math.floor(Date.now() / 1000); // `Date.now()` gives milliseconds, so divide by 1000

    // Calculate the difference in seconds
    const timeElapsedInSeconds = currentTimestamp - dec;
    const timeElapsedInDays = timeElapsedInSeconds / 86400;
    return Math.floor(timeElapsedInDays);
  } catch (error) {
    console.log(error);
  }
};

export const getTRXToJST = async (amt: number) => {
  const tronWeb = await getTronWeb();
  try {
    if (!tronWeb) {
      console.error("TronWeb not initialized");
      return 0;
    }

    const PriceOracleContract = await tronWeb.contract(
      PriceOracleABI,
      PriceOracle_CONTRACT_ADDRESS
    );

    const price = await PriceOracleContract.getTRXToJST(amt).call();
    const dec = tronWeb.toDecimal(price._hex);
    console.log(dec);
    return dec;
  } catch (error) {
    console.log("Fetching TRX To JST Price Error", error);
  }
};

export const getJSTToTRX = async (amt: number) => {
  const tronWeb = await getTronWeb();
  try {
    if (!tronWeb) {
      console.error("TronWeb not initialized");
      return 0;
    }

    const PriceOracleContract = await tronWeb.contract(
      PriceOracleABI,
      PriceOracle_CONTRACT_ADDRESS
    );

    const price = await PriceOracleContract.getJSTToTRX(amt).call();
    const dec = tronWeb.toDecimal(price._hex);
    console.log(dec);
    return dec;
  } catch (error) {
    console.log("Fetching JST To TRX Price Error", error);
  }
};

export const borrowTRX = async (amt: number) => {
  const tronWeb = await getTronWeb();
  try {
    if (!tronWeb) {
      console.error("TronWeb not initialized");
      return 0;
    }

    const myContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );
    const amtInSun = amt * 1000000;
    const tx = await myContract.borrowTRX(amtInSun).send();
    console.log(tx);
    return tx;
  } catch (error) {
    console.log("Borrow TRX Error: ", error);
    return "declined";
  }
};

export const borrowJST = async (amt: number) => {
  try {
    const tronWeb = await getTronWeb();
    if (!tronWeb) throw new Error("TronWeb not initialized");

    const amtInDec = BigInt(amt * 1e18);

    const jstContract = await tronWeb.contract(JSTAbi, JST_CONTRACT_ADDRESS);
    const lendingPoolContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );

    await jstContract.approve(LP_CONTRACT_ADDRESS, amtInDec).send();

    const tx = await lendingPoolContract.borrowJST(amtInDec).send();
    console.log(tx);
    return tx;
  } catch (error) {
    console.error("Borrow JST Error:", error);
    return "declined";
  }
};

export const repayTRXDebt = async (amt: number) => {
  const tronWeb = await getTronWeb();
  try {
    if (!tronWeb) {
      console.error("TronWeb not initialized");
      return 0;
    }

    const myContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );

    const amtInSun = amt * 1000000;
    const tx = await myContract.repayTRX().send({
      callValue: amtInSun,
    });

    return tx;
  } catch (error) {
    console.log(error);
  }
};

export const repayJSTDebt = async (amt: number) => {
  const tronWeb = await getTronWeb();
  if (!tronWeb) return;
  const amtInDec = BigInt(amt * 1000000000000000000);
  try {
    const jst = await tronWeb.contract(JSTAbi, JST_CONTRACT_ADDRESS);
    try {
      await jst.approve(LP_CONTRACT_ADDRESS, amtInDec).send();
      const myContract = await tronWeb.contract(
        LendingPoolABI,
        LP_CONTRACT_ADDRESS
      );

      const tx = await myContract.repayJST(amtInDec).send();
      console.log(tx);
      return tx;
    } catch (error) {
      console.error("Transaction Rejected by User", error);
      return "declined";
    }
  } catch (error) {
    console.error("Error in JST investment transaction:", error);
    return "declined";
  }
};

export const getUserTRXAmountToRepay = async () => {
  const tronWeb = await getTronWeb();
  try {
    if (!tronWeb) {
      console.error("TronWeb not initialized");
      return 0;
    }

    const myContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );

    const tx = await myContract
      .getUserTRXAmountToRepay(tronWeb.defaultAddress.base58)
      .call();
    const dec: number = tronWeb.toDecimal(tx);
    const valueInTRX = dec / 1000000;
    console.log(valueInTRX);
    return valueInTRX;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const getUserJSTAmountToRepay = async () => {
  const tronWeb = await getTronWeb();
  try {
    if (!tronWeb) {
      console.error("TronWeb not initialized");
      return 0;
    }

    const myContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );

    const tx = await myContract
      .getUserJSTAmountToRepay(tronWeb.defaultAddress.base58)
      .call();
    const dec: number = tronWeb.toDecimal(tx);
    const valueInJST = dec / 1000000000000000000;
    console.log(valueInJST);
    return valueInJST;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const getUserTRXBorrowedAmount = async () => {
  const tronWeb = await getTronWeb();
  try {
    if (!tronWeb) {
      console.error("TronWeb not initialized");
      return 0;
    }

    const myContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );

    const tx = await myContract
      .getUserTRXBorrowedAmount(tronWeb.defaultAddress.base58)
      .call();

    const dec: number = tronWeb.toDecimal(tx);
    const valueInTRX = dec / 1000000;
    console.log(valueInTRX);
    return valueInTRX;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const getUserJSTBorrowedAmount = async () => {
  const tronWeb = await getTronWeb();
  try {
    if (!tronWeb) {
      console.error("TronWeb not initialized");
      return 0;
    }

    const myContract = await tronWeb.contract(
      LendingPoolABI,
      LP_CONTRACT_ADDRESS
    );

    const tx = await myContract
      .getUserJSTBorrowedAmount(tronWeb.defaultAddress.base58)
      .call();

    const dec: number = tronWeb.toDecimal(tx);
    const valueInJST = dec / 1000000000000000000;
    console.log(valueInJST);
    return valueInJST;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

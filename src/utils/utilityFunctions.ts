import {
  CONTRACT_ADDRESS,
  LendingPoolABI,
  JSTAbi,
  JST_CONTRACT_ADDRESS,
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

export const fetchContractBalance = async () => {
  const tronWeb = await getTronWeb();
  if (!tronWeb) {
    console.error("TronWeb instance not available");
    return 0;
  }

  try {
    const balanceInSun: number = await tronWeb.trx.getBalance(CONTRACT_ADDRESS);
    console.log("balance", balanceInSun);
    return balanceInSun;
  } catch (error) {
    console.error("Error fetching contract balance:", error);
    return 0;
  }
};

export const fetchContractTRXBalance = async () => {
  const tronWeb = await getTronWeb();
  if (!tronWeb) return 0;

  try {
    const myContract = await tronWeb.contract(LendingPoolABI, CONTRACT_ADDRESS);
    const tx = await myContract.getContractTRXBalance().call();
    console.log("tx:", tx);

    const hex = tx._hex;
    const dec = parseInt(hex, 16);
    console.log(`TRX Balance (decimal): ${dec}`);

    return dec;
  } catch (error) {
    console.error("Error in fetching TRX Balance:", error);
    return 0;
  }
};

export const fetchContractJSTBalance = async () => {
  const tronWeb = await getTronWeb();
  if (!tronWeb) return 0;

  try {
    const myContract = await tronWeb.contract(LendingPoolABI, CONTRACT_ADDRESS);
    const tx = await myContract.getContractJSTBalance().call();
    console.log("tx:", tx);

    const hex = tx._hex;
    const dec = parseInt(hex, 16);
    console.log(`JST Balance (decimal): ${dec}`);

    return dec;
  } catch (error) {
    console.error("Error in fetching JST Balance:", error);
    return 0;
  }
};

export const fetchUserJSTBalance = async () => {
  const tronWeb = await getTronWeb();
  if (!tronWeb) return 0;

  try {
    const myContract = await tronWeb.contract(LendingPoolABI, CONTRACT_ADDRESS);
    const tx = await myContract
      .getUserJSTBalance(tronWeb.defaultAddress.base58)
      .call();

    const hex = tx._hex;
    const dec = parseInt(hex, 16);
    console.log(`USER JST Balance (decimal): ${dec}`);

    return dec;
  } catch (error) {
    console.error("Error in fetching JST Balance:", error);
    return 0;
  }
};

export const fetchUserTRXBalance = async () => {
  const tronWeb = await getTronWeb();
  if (!tronWeb) return 0;

  try {
    const myContract = await tronWeb.contract(LendingPoolABI, CONTRACT_ADDRESS);
    const tx = await myContract
      .getUserTRXBalance(tronWeb.defaultAddress.base58)
      .call();

    const hex = tx._hex;
    const dec = parseInt(hex, 16);
    console.log(`User TRX Balance (decimal): ${dec}`);

    return dec;
  } catch (error) {
    console.error("Error in fetching TRX Balance:", error);
    return 0;
  }
};

export const InvestInTRX = async () => {
  const tronWeb = await getTronWeb();
  if (!tronWeb) return;

  try {
    const myContract = await tronWeb.contract(LendingPoolABI, CONTRACT_ADDRESS);

    const tx = await myContract.addTRX().send({ callValue: 25 });
    console.log("User add trx", tx);
  } catch (error) {
    console.error("Error in TRX investment transaction:", error);
  }
};

export const InvestInJST = async () => {
  const tronWeb = await getTronWeb();
  if (!tronWeb) return;

  try {
    const jst = await tronWeb.contract(JSTAbi, JST_CONTRACT_ADDRESS);
    const txid = await jst.approve(100000).send();
    console.log(" JST investment txid", txid);
  } catch (error) {
    console.error("Error in JST investment transaction:", error);
  }
};
export const BorrowFromContract = async () => {
  // Need to make a smart contract function of transferring funds from contract to user
};

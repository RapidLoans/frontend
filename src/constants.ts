export const CONTRACT_ADDRESS = "TWMdnkkrxWwAZxYPwgW4Ju8CMDX2Yxxhta";

export const LendingPoolABI = [
  { stateMutability: "Nonpayable", type: "Constructor" },
  { inputs: [{ type: "address" }], name: "NewInvestor", type: "Event" },
  {
    outputs: [{ type: "address" }],
    inputs: [{ name: "amount", type: "uint256" }],
    name: "addJST",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [{ type: "address" }],
    name: "addTRX",
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "amount", type: "uint256" }],
    name: "flashLoanJST",
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "amount", type: "uint256" }],
    name: "flashLoanTRX",
    stateMutability: "payable",
    type: "function",
  },
  {
    outputs: [{ type: "tuple" }],
    name: "getInvestorStruct",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ type: "uint256" }],
    inputs: [{ name: "_add", type: "address" }],
    name: "getInvestorTRXBalance",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ type: "address" }],
    name: "getTest",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ type: "address" }],
    name: "jst",
    stateMutability: "view",
    type: "function",
  },
];

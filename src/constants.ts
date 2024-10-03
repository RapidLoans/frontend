export const LendingPoolABI =  [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "LendingPool__invalidAmount",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "addJST",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "addTRX",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "flashLoanJST",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "flashLoanTRX",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getInvestorStruct",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "investor",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "balanceTRX",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "balanceJST",
              type: "uint256",
            },
          ],
          internalType: "struct LiquidityPool.investor",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ]
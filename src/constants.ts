export const LP_CONTRACT_ADDRESS = "TWcbTTEeNmCkMMX9KapsZmjw6BodQr1G8N";
export const JST_CONTRACT_ADDRESS = "TF17BgPaZYbz8oxbjhriubPDsA7ArKoLX3";

export const LendingPoolABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_priceOracle",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountJST",
        type: "uint256",
      },
    ],
    name: "BorrowedJST",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountTRX",
        type: "uint256",
      },
    ],
    name: "BorrowedTRX",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountJST",
        type: "uint256",
      },
    ],
    name: "FlashLoanJSTWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountTRX",
        type: "uint256",
      },
    ],
    name: "FlashLoanTRXWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "investor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountJST",
        type: "uint256",
      },
    ],
    name: "JSTAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "investor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountJST",
        type: "uint256",
      },
    ],
    name: "JSTWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "investor",
        type: "address",
      },
    ],
    name: "NewInvestor",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountRepaidWithIntrest",
        type: "uint256",
      },
    ],
    name: "RepaidJST",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountRepaidWithIntrest",
        type: "uint256",
      },
    ],
    name: "RepiadTRX",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "investor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountTRX",
        type: "uint256",
      },
    ],
    name: "TRXAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "investor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountTRX",
        type: "uint256",
      },
    ],
    name: "TRXWithdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "BORROW_RATE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "JST_CONTRACT_ADDRESS_NILE",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PROFIT_RATE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RAPID_LOANS_CORE",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "subject",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WithdrawFlashLoanJST",
    outputs: [
      {
        internalType: "uint256",
        name: "amountJSTWithdrawn",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "subject",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WithdrawFlashLoanTRX",
    outputs: [
      {
        internalType: "uint256",
        name: "amountTRXWithdrawn",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "addJST",
    outputs: [
      {
        internalType: "uint256",
        name: "balanceJST",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "addTRX",
    outputs: [
      {
        internalType: "uint256",
        name: "balanceTRX",
        type: "uint256",
      },
    ],
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
    name: "borrowJST",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "borrowTRX",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractJSTBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "amountJST",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractTRXBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "amountTRX",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "investorAddress",
        type: "address",
      },
    ],
    name: "getInvestorStruct",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "investorId",
            type: "uint256",
          },
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
          {
            internalType: "uint256",
            name: "lastInvestedTRXTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastInvestedJSTTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "borrowedTRX",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "borrowedJST",
            type: "uint256",
          },
        ],
        internalType: "struct LiquidityPool.investor",
        name: "investorStruct",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "investorAddress",
        type: "address",
      },
    ],
    name: "getUserJSTBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "amountJST",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "investorAddress",
        type: "address",
      },
    ],
    name: "getUserJSTInvestmentWithdrawTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "investorAddress",
        type: "address",
      },
    ],
    name: "getUserLastInvestedJSTTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "investorAddress",
        type: "address",
      },
    ],
    name: "getUserLastInvestedTRXTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "investorAddress",
        type: "address",
      },
    ],
    name: "getUserTRXBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "amountTRX",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "investorAddress",
        type: "address",
      },
    ],
    name: "getUserTRXInvestmentWithdrawTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "jst",
    outputs: [
      {
        internalType: "contract ITRC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceOracle",
    outputs: [
      {
        internalType: "contract PriceOracle",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "profitFromFlashLoansJST",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "profitFromFlashLoansTRX",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
    name: "repayJST",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "repayTRX",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "rapidLoansCore",
        type: "address",
      },
    ],
    name: "setRapidLoansCoreAddress",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "withdrawJST",
    outputs: [
      {
        internalType: "uint256",
        name: "amountWithdrawnJST",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "withdrawTRX",
    outputs: [
      {
        internalType: "uint256",
        name: "amountWithdrawnTRX",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

export const JSTAbi = [
  {
    outputs: [{ type: "string" }],
    constant: true,
    name: "name",
    stateMutability: "View",
    type: "Function",
  },
  { name: "stop", stateMutability: "Nonpayable", type: "Function" },
  {
    outputs: [{ type: "bool" }],
    inputs: [
      { name: "guy", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "approve",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    inputs: [{ name: "owner_", type: "address" }],
    name: "setOwner",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "totalSupply",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "bool" }],
    inputs: [
      { name: "src", type: "address" },
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "transferFrom",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "decimals",
    stateMutability: "View",
    type: "Function",
  },
  {
    inputs: [
      { name: "guy", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "mint",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    inputs: [{ name: "wad", type: "uint256" }],
    name: "burn",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    inputs: [{ name: "src", type: "address" }],
    name: "balanceOf",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "bool" }],
    constant: true,
    name: "stopped",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ name: "result", type: "bool" }],
    inputs: [{ name: "authority_", type: "address" }],
    name: "setAuthority",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    outputs: [{ type: "address" }],
    constant: true,
    name: "owner",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "string" }],
    constant: true,
    name: "symbol",
    stateMutability: "View",
    type: "Function",
  },
  {
    inputs: [
      { name: "guy", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "burn",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    inputs: [{ name: "wad", type: "uint256" }],
    name: "mint",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    outputs: [{ type: "bool" }],
    inputs: [
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "transfer",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    inputs: [
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "push",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    inputs: [{ name: "symbol_", type: "string" }],
    name: "setSymbol",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    inputs: [
      { name: "src", type: "address" },
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "move",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  { name: "start", stateMutability: "Nonpayable", type: "Function" },
  {
    outputs: [{ type: "address" }],
    constant: true,
    name: "authority",
    stateMutability: "View",
    type: "Function",
  },
  {
    inputs: [{ name: "name_", type: "string" }],
    name: "setName",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    outputs: [{ type: "bool" }],
    inputs: [{ name: "guy", type: "address" }],
    name: "approve",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    inputs: [
      { name: "src", type: "address" },
      { name: "guy", type: "address" },
    ],
    name: "allowance",
    stateMutability: "View",
    type: "Function",
  },
  {
    inputs: [
      { name: "src", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "pull",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    inputs: [{ name: "symbol_", type: "string" }],
    stateMutability: "Nonpayable",
    type: "Constructor",
  },
  {
    inputs: [
      { indexed: true, name: "guy", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "Mint",
    type: "Event",
  },
  {
    inputs: [
      { indexed: true, name: "guy", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "Burn",
    type: "Event",
  },
  {
    inputs: [{ indexed: true, name: "authority", type: "address" }],
    name: "LogSetAuthority",
    type: "Event",
  },
  {
    inputs: [{ indexed: true, name: "owner", type: "address" }],
    name: "LogSetOwner",
    type: "Event",
  },
  {
    inputs: [
      { indexed: true, name: "sig", type: "bytes4" },
      { indexed: true, name: "guy", type: "address" },
      { indexed: true, name: "foo", type: "bytes32" },
      { indexed: true, name: "bar", type: "bytes32" },
      { name: "sad", type: "uint256" },
      { name: "fax", type: "bytes" },
    ],
    name: "LogNote",
    anonymous: true,
    type: "Event",
  },
  {
    inputs: [
      { indexed: true, name: "src", type: "address" },
      { indexed: true, name: "guy", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "Approval",
    type: "Event",
  },
  {
    inputs: [
      { indexed: true, name: "src", type: "address" },
      { indexed: true, name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "Transfer",
    type: "Event",
  },
];

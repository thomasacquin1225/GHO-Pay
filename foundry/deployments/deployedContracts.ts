export const deployedContracts = {
  11155111: {
    GHOPay: {
      address: "0x4A62D0Fb7c963e7a0e10C9ABA086DF71A6F2A2Bb",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_poolProvider",
              type: "address",
              internalType: "contract IPoolAddressesProvider",
            },
            {
              name: "_GhoVariableDebtToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "_wethGateway",
              type: "address",
              internalType: "contract IWrappedTokenGatewayV3",
            },
            {
              name: "_GhoToken",
              type: "address",
              internalType: "contract IERC20",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "GhoToken",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract IERC20",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "approveCreditDelegation",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getUserAccountData",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "totalCollateralBase",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "totalDebtBase",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "availableBorrowsBase",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "currentLiquidationThreshold",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "ltv",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "healthFactor",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "pay",
          inputs: [
            {
              name: "payee",
              type: "address",
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "chain",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "renounceOwnership",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "repay",
          inputs: [
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setWETHGateway",
          inputs: [
            {
              name: "_wethGateway",
              type: "address",
              internalType: "contract IWrappedTokenGatewayV3",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "topup",
          inputs: [
            {
              name: "asset",
              type: "address",
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "payable",
        },
        {
          type: "function",
          name: "transferOwnership",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "withdraw",
          inputs: [
            {
              name: "asset",
              type: "address",
              internalType: "address",
            },
            {
              name: "aToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "ApprovedCreditDelegation",
          inputs: [
            {
              name: "user",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "OwnershipTransferred",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Pay",
          inputs: [
            {
              name: "payer",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "payee",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
            {
              name: "chain",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Repay",
          inputs: [
            {
              name: "user",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Topup",
          inputs: [
            {
              name: "user",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "asset",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Withdraw",
          inputs: [
            {
              name: "user",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "asset",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
      ],
      inheritedFunctions: {
        approveCreditDelegation: "src/interfaces/IGHOPay.sol",
        getUserAccountData: "src/interfaces/IGHOPay.sol",
        pay: "src/interfaces/IGHOPay.sol",
        repay: "src/interfaces/IGHOPay.sol",
        topup: "src/interfaces/IGHOPay.sol",
        owner: "lib/openzeppelin-contracts/contracts/access/Ownable.sol",
        renounceOwnership:
          "lib/openzeppelin-contracts/contracts/access/Ownable.sol",
        transferOwnership:
          "lib/openzeppelin-contracts/contracts/access/Ownable.sol",
      },
    },
  },
} as const;

import { AlchemyProvider } from "@alchemy/aa-alchemy";
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactoryAddress,
} from "@alchemy/aa-accounts";
import { LocalAccountSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { encodeFunctionData } from "viem";
import { sepolia } from "viem/chains";

// Initialize provider with Alchemy
const initProvider = (apiKey: string, chain = sepolia) => {
  return new AlchemyProvider({
    apiKey,
    chain,
  });
};

// Create and send a payment operation
export const sendPaymentOperation = async ({
  apiKey,
  privateKey,
  args,
  policyId,
}: {
  apiKey: string;
  privateKey: string;
  args: any[];
  policyId: string;
}) => {
  const provider = initProvider(apiKey);
  const eoaSigner: SmartAccountSigner =
    LocalAccountSigner.privateKeyToAccountSigner(`0x${privateKey}`);

  const connectedProvider = provider.connect(
    (rpcClient) =>
      new LightSmartContractAccount({
        rpcClient,
        chain: sepolia,
        owner: eoaSigner,
        factoryAddress: getDefaultLightAccountFactoryAddress(sepolia),
      })
  );

  connectedProvider.withAlchemyGasManager({ policyId });

  // const callData = encodeFunctionData({ abi, functionName, args });
  const GHOPayABI = [
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
          type: "uint64",
          internalType: "uint64",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
  ];

  const uoCallData = encodeFunctionData({
    abi: GHOPayABI,
    functionName: "pay",
    args: args,
  });

  const userOp = await connectedProvider.sendUserOperation({
    target: "0x1D16089138D24a4007Ae367ef30568f964b55041",
    data: uoCallData,
  });
  const userOpHash = await connectedProvider.waitForUserOperationTransaction(
    userOp.hash
  );

  return userOpHash;
};

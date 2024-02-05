import {
  LightSmartContractAccount,
  getDefaultLightAccountFactoryAddress,
} from "@alchemy/aa-accounts";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { LocalAccountSigner, type Hex } from "@alchemy/aa-core";
import { sepolia } from "viem/chains";

const chain = sepolia;
const PRIVATE_KEY =
  "fbf992b0e25ad29c85aae3d69fcb7f09240dd2588ecee449a4934b9e499102cc" as Hex;
const owner = LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);

export const provider = new AlchemyProvider({
  // get your Alchemy API key at https://dashboard.alchemy.com
  apiKey: "XMV7KckmkY8h8QAoTqX9Xr0q9zC4fhC0",
  chain,
}).connect(
  (rpcClient) =>
    new LightSmartContractAccount({
      rpcClient,
      owner,
      chain,
      factoryAddress: getDefaultLightAccountFactoryAddress(chain),
    })
);

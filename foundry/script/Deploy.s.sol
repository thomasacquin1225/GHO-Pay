//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../src/GHOPay.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);
        GHOPay ghoPay = new GHOPay(
            IPoolAddressesProvider(0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A),
            IVariableDebtToken(0x67ae46EF043F7A4508BD1d6B94DB6c33F0915844),
            IWrappedTokenGatewayV3(0x387d311e47e80b498169e6fb51d3193167d89F7D),
            IERC20(0xc4bF5CbDaBE595361438F8c6a187bDc330539c60),
            ITokenTransferor(0xD55C2C07F84EB397D472C9A562F139e1f8Cbf23F),
            IERC20(0x466D489b6d36E7E3b824ef491C225F5830E81cC1)
        );
        console.logString(
            string.concat(
                "GHOPay deployed at: ",
                vm.toString(address(ghoPay))
            )
        );
        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}

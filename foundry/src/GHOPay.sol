// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GHOPay is Ownable {
    IPoolAddressesProvider public immutable poolProvider;
    IERC20 public immutable ghoToken;

    constructor(IPoolAddressesProvider _poolProvider, IERC20 _ghoToken) {
        poolProvider = _poolProvider;
        ghoToken = _ghoToken;
    }

    function topup(uint256 amount) external payable {
        require(msg.value >= amount, "Insufficient amount");
        IPool pool = IPool(poolProvider.getPool());
        pool.supply(address(ghoToken), amount, msg.sender, 0);
    }

    function pay(uint256 amount, address payee) external {
        require(amount > 0, "Invalid amount");
        require(msg.sender != address(0), "Invalid payee");
        require(msg.sender != payee, "Invalid payee");

        IPool pool = IPool(poolProvider.getPool());
        pool.borrow(address(ghoToken), amount, 1, 0, msg.sender);
        ghoToken.transfer(payee, amount);
    }

    function repay(uint256 amount) external {
        ghoToken.transferFrom(msg.sender, address(this), amount);
        IPool pool = IPool(poolProvider.getPool());
        pool.repay(address(ghoToken), amount, 1, msg.sender);
    }
}
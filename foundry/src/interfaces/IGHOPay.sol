// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IGHOPay {
    function topup(address asset, uint256 amount) external payable;

    function pay(address payee, uint256 amount, uint64 chain) external;

    function repay(uint256 amount) external;

    function withdraw(address asset, address aToken, uint256 amount) external;

    function approveCreditDelegation() external;

    function getBorrowAllowance(address owner, address spender) external view returns (uint256);

    function getGHOBalance(address user) external view returns (uint256);

    function getUserAccountData(address user) external view returns (
        uint256 totalCollateralBase, 
        uint256 totalDebtBase, 
        uint256 availableBorrowsBase, 
        uint256 currentLiquidationThreshold, 
        uint256 ltv, 
        uint256 healthFactor
    );
}
// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IGHOPay {
    function topup(address asset, uint256 amount) external payable;

    function pay(address payee, uint256 amount) external;

    function repay(uint256 amount) external;

    function approveCreditDelegation() external;

    function getUserAccountData(address user) external view returns (
        uint256 totalCollateralBase, 
        uint256 totalDebtBase, 
        uint256 availableBorrowsBase, 
        uint256 currentLiquidationThreshold, 
        uint256 ltv, 
        uint256 healthFactor
    );
}
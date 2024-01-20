// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IVariableDebtToken {
    function approveDelegation(address delegatee, uint256 amount) external;

    function delegationWithSig(
        address delegator,
        address delegatee,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    function borrowAllowance(address fromUser, address toUser)
        external
        view
        returns (uint256);
}
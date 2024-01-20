// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface ITokenTransferor {
    function transferTokensPayLINK(
        uint64 _destinationChainSelector,
        address _receiver,
        address _token,
        uint256 _amount
    ) external returns (bytes32 messageId);

    function transferTokensPayNative(
        uint64 _destinationChainSelector,
        address _receiver,
        address _token,
        uint256 _amount
    ) external returns (bytes32 messageId);

    function setAllowed(address _address, bool _allowed) external;
}
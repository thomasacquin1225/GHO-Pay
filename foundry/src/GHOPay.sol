// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/IWrappedTokenGatewayV3.sol";
import "./interfaces/IGHOPay.sol";
import "./interfaces/IVariableDebtToken.sol";
import "./interfaces/ITokenTransferor.sol";

contract GHOPay is IGHOPay, Ownable {
    IPoolAddressesProvider immutable poolProvider;
    IVariableDebtToken immutable GhoVariableDebtToken;

    IWrappedTokenGatewayV3 wethGateway;
    IERC20 ccipToken;
    ITokenTransferor tokenTransferor;

    uint64 immutable CHAIN_SELECTOR = 16015286601757825753;

    IERC20 public immutable GhoToken;

    event Topup(address indexed user, address indexed asset, uint256 amount);
    event Pay(address indexed payer, address indexed payee, uint256 amount, uint256 chain);
    event Repay(address indexed user, uint256 amount);
    event Withdraw(address indexed user, address indexed asset, uint256 amount);
    event ApprovedCreditDelegation(address indexed user, uint256 amount);

    constructor(
        IPoolAddressesProvider _poolProvider, 
        IVariableDebtToken _GhoVariableDebtToken,
        IWrappedTokenGatewayV3 _wethGateway, 
        IERC20 _GhoToken,
        ITokenTransferor _tokenTransferor,
        IERC20 _ccipToken
    ) {
        poolProvider = _poolProvider;
        GhoVariableDebtToken = _GhoVariableDebtToken;
        wethGateway = _wethGateway;
        GhoToken = _GhoToken;
        tokenTransferor = _tokenTransferor;
        ccipToken = _ccipToken;
    }

    function topup(address asset, uint256 amount) external payable {
        require(amount > 0, "Invalid amount");
        require(msg.value >= amount, "Insufficient amount");

        IPool pool = IPool(poolProvider.getPool());        
        if (asset == address(0)) {
            wethGateway.depositETH{value: amount}(address(pool), msg.sender, 0);
        } else {
            IERC20 token = IERC20(asset);
            token.transferFrom(msg.sender, address(this), amount);
            token.approve(address(pool), amount);
            pool.supply(asset, amount, msg.sender, 0);   
        }
        emit Topup(msg.sender, asset, amount);
    }

    function pay(address payee, uint256 amount, uint64 chain) external {
        require(amount > 0, "Invalid amount");
        require(msg.sender != address(0), "Invalid payee");
        require(msg.sender != payee, "Invalid payee");

        IPool pool = IPool(poolProvider.getPool());
        pool.borrow(
            address(GhoToken), 
            amount, 
            2, 
            0, 
            msg.sender
        );

        require(GhoToken.balanceOf(address(this)) >= amount, "Insufficient balance");

        if (chain == CHAIN_SELECTOR || chain == 0) {
            GhoToken.transfer(payee, amount);
        } else {
            ccipToken.transfer(address(tokenTransferor), amount);
            tokenTransferor.transferTokensPayLINK(chain, payee, address(ccipToken), amount);
        }
        emit Pay(msg.sender, payee, amount, chain);
    }

    function repay(uint256 amount) external {
        require(amount > 0, "Invalid amount");

        GhoToken.transferFrom(msg.sender, address(this), amount);
        IPool pool = IPool(poolProvider.getPool());
        GhoToken.approve(address(pool), amount);
        pool.repay(
            address(GhoToken), 
            amount, 
            2, 
            msg.sender
        );
        emit Repay(msg.sender, amount);
    }

    function withdraw(address asset, address aToken, uint256 amount) external {
        require(amount > 0, "Invalid amount");
        require(asset != address(0), "Invalid asset");

        IERC20(aToken).transferFrom(msg.sender, address(this), amount);
        IPool pool = IPool(poolProvider.getPool());        
        if (asset == address(0)) {
            IERC20(aToken).approve(address(wethGateway), amount);
            wethGateway.withdrawETH(address(pool), amount, msg.sender);
        } else {
            IERC20(aToken).approve(address(pool), amount);
            pool.withdraw(asset, amount, msg.sender);
        }
        emit Withdraw(msg.sender, asset, amount);
    }

    function setWETHGateway(IWrappedTokenGatewayV3 _wethGateway) external onlyOwner {
        wethGateway = _wethGateway;
    }

    function setTokenTransferor(ITokenTransferor _tokenTransferor) external onlyOwner {
        tokenTransferor = _tokenTransferor;
    }

    function setCCIPToken(IERC20 _ccipToken) external onlyOwner {
        ccipToken = _ccipToken;
    }

    function approveCreditDelegation() public {
        (bool success, ) = address(GhoVariableDebtToken).delegatecall(
            abi.encodeWithSelector(
                IVariableDebtToken.approveDelegation.selector,
                address(this),
                type(uint256).max
            )
        );
        require(success, "Credit delegation approval failed");
        emit ApprovedCreditDelegation(msg.sender, type(uint256).max);
    }

    function getBorrowAllowance(address owner, address spender) public view returns (uint256) {
        return GhoVariableDebtToken.borrowAllowance(owner, spender);
    }

    function getGHOBalance(address user) public view returns (uint256) {
        return GhoToken.balanceOf(user);
    }

    function getUserAccountData(address user) public view 
        returns (
            uint256 totalCollateralBase, 
            uint256 totalDebtBase, 
            uint256 availableBorrowsBase, 
            uint256 currentLiquidationThreshold, 
            uint256 ltv, 
            uint256 healthFactor
        ) 
    {
        IPool pool = IPool(poolProvider.getPool());
        (totalCollateralBase, totalDebtBase, availableBorrowsBase, currentLiquidationThreshold, ltv, healthFactor) = pool.getUserAccountData(user);
    }
}
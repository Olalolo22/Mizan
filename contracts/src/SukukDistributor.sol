// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/token/ERC20/IERC20.sol";
import "./SukukToken.sol";

contract SukukDistributor {
    IERC20 public usdc;
    SukukToken public sukukToken;

    // Track yield per token unit (scaled by 1e18)
    uint256 public yieldPerToken;
    mapping(address => uint256) public claimedYield;

    event YieldDistributed(uint256 amount, uint256 perToken);
    event YieldClaimed(address indexed investor, uint256 amount);

    constructor(address _usdc, address _sukukToken) {
        usdc = IERC20(_usdc);
        sukukToken = SukukToken(_sukukToken);
    }

    // Called by the asset manager (or a mock) to push rental income
    function distributeRentalYield(uint256 usdcAmount) external {
        require(usdcAmount > 0, "No yield to distribute");
        usdc.transferFrom(msg.sender, address(this), usdcAmount);

        uint256 totalSupply = sukukToken.totalSupply();
        require(totalSupply > 0, "No token holders");

        yieldPerToken += (usdcAmount * 1e18) / totalSupply;
        emit YieldDistributed(usdcAmount, yieldPerToken);
    }

    function claimableYield(address investor) public view returns (uint256) {
        uint256 balance = sukukToken.balanceOf(investor);
        uint256 earned = (balance * yieldPerToken) / 1e18;
        return earned - claimedYield[investor];
    }

    function claimYield() external {
        uint256 amount = claimableYield(msg.sender);
        require(amount > 0, "Nothing to claim");
        claimedYield[msg.sender] += amount;
        usdc.transfer(msg.sender, amount);
        emit YieldClaimed(msg.sender, amount);
    }
}

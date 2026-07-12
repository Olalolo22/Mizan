// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/token/ERC20/ERC20.sol";

contract SukukToken is ERC20 {
    address public gate;
    mapping(address => bool) public authorized;

    constructor() ERC20("Dubai Commercial Tower Sukuk", "DCTS") {}

    function setGate(address _gate) external {
        require(gate == address(0), "Gate already set");
        gate = _gate;
    }

    function mintToVerified(address investor, uint256 amount) external {
        require(msg.sender == gate, "Only gate");
        authorized[investor] = true;
        _mint(investor, amount);
    }

    function deauthorize(address investor) external {
        require(msg.sender == gate, "Only gate");
        authorized[investor] = false;
    }

    // Transfer restriction — only authorized holders
    function _update(address from, address to, uint256 value) internal override {
        if (from != address(0)) require(authorized[from], "Sender not authorized");
        if (to != address(0)) require(authorized[to], "Recipient not authorized");
        super._update(from, to, value);
    }
}

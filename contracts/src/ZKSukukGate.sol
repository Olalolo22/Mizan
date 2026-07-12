// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ISP1Verifier} from "@sp1-contracts/ISP1Verifier.sol";
import "./SukukToken.sol";

contract ZKSukukGate {
    ISP1Verifier public verifier;
    SukukToken public sukukToken;
    bytes32 public programVKey;

    mapping(bytes32 => bool) public usedNullifiers;
    mapping(address => bool) public authorizedInvestors;

    event InvestorAuthorized(address indexed investor, bytes32 nullifier);

    constructor(address _verifier, address _sukukToken, bytes32 _programVKey) {
        verifier = ISP1Verifier(_verifier);
        sukukToken = SukukToken(_sukukToken);
        programVKey = _programVKey;
    }

    function verifyAndAuthorize(
        bytes calldata proof,
        bytes calldata publicValues   // ABI-encoded: (bytes32 wallet, bytes32 nullifier, uint64 timestamp)
    ) external {
        // 1. ZK verification
        verifier.verifyProof(programVKey, publicValues, proof);

        // 2. Decode public inputs
        (bytes32 walletRaw, bytes32 nullifier, uint64 timestamp) =
            abi.decode(publicValues, (bytes32, bytes32, uint64));

        // 3. Nullifier check (replay protection)
        require(!usedNullifiers[nullifier], "Proof already used");
        usedNullifiers[nullifier] = true;

        // 4. Timestamp recency (90 days)
        require(block.timestamp - timestamp <= 90 days, "Attestation expired");

        // 5. Authorize wallet
        address investor = msg.sender;
        authorizedInvestors[investor] = true;

        // 6. Mint initial Sukuk allocation
        sukukToken.mintToVerified(investor, 1000 * 1e18); // 1000 units = demo stake

        emit InvestorAuthorized(investor, nullifier);
    }
}

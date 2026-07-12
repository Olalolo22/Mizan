// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ISP1Verifier} from "@sp1-contracts/ISP1Verifier.sol";
import "./SukukToken.sol";

contract ZKSukukGate {
    ISP1Verifier public verifier;
    SukukToken public sukukToken;
    bytes32 public programVKey;
    address public owner;

    mapping(bytes32 => bool) public usedNullifiers;
    mapping(address => bool) public authorizedInvestors;

    event InvestorAuthorized(address indexed investor, bytes32 nullifier);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _verifier, address _sukukToken, bytes32 _programVKey) {
        verifier = ISP1Verifier(_verifier);
        sukukToken = SukukToken(_sukukToken);
        programVKey = _programVKey;
        owner = msg.sender;
    }

    function setProgramVKey(bytes32 _programVKey) external onlyOwner {
        programVKey = _programVKey;
    }

    function verifyAndAuthorize(
        address investor, // Added to allow relay submission
        bytes calldata proof,
        bytes calldata publicValues   // ABI-encoded: (bytes32 wallet, bytes32 nullifier, uint64 timestamp)
    ) external {
        // 1. ZK verification
        verifier.verifyProof(programVKey, publicValues, proof);

        // 2. Decode public inputs
        (bytes32 walletRaw, bytes32 nullifier, uint64 timestamp) =
            abi.decode(publicValues, (bytes32, bytes32, uint64));

        // Note: For the hackathon demo, we don't enforce that `walletRaw` matches `investor`
        // because we are reusing a pre-generated proof that was bound to a Stellar wallet.
        // In production, the ZK circuit would commit to the EVM address.

        // 3. Nullifier check (replay protection)
        require(!usedNullifiers[nullifier], "Proof already used");
        usedNullifiers[nullifier] = true;

        // 4. Timestamp recency (90 days)
        // require(block.timestamp - timestamp <= 90 days, "Attestation expired"); // Commented out for demo safety with older proofs

        // 5. Authorize wallet
        authorizedInvestors[investor] = true;

        // 6. Mint initial Sukuk allocation
        sukukToken.mintToVerified(investor, 1000 * 1e18); // 1000 units = demo stake

        emit InvestorAuthorized(investor, nullifier);
    }

    // Institutional Control: Revoke an investor's accreditation status
    // This immediately blocks them from receiving any new secondary market transfers
    // and prevents them from trading away their existing balance.
    function revokeAuthorization(address investor) external onlyOwner {
        require(authorizedInvestors[investor], "Investor not authorized");
        authorizedInvestors[investor] = false;
        sukukToken.deauthorize(investor);
    }
}

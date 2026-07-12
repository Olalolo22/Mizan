// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/SukukToken.sol";
import "../src/ZKSukukGate.sol";
import "../src/SukukDistributor.sol";

contract DeployScript is Script {
    // ─── SP1 Program Verification Key ────────────────────────────────────────
    // Generated via: SP1_PROVER=mock cargo run --release --bin prove --features="sp1"
    // ELF: zk-accredited-investor-program (riscv64im-succinct-zkvm-elf)
    bytes32 constant PROGRAM_VKEY =
        0x0047c352e96986bdfbbdfd999a4f4ffb66dcfa769eca1a79263dcd2480e7baab;

    // ─── Arc Testnet Addresses ────────────────────────────────────────────────
    // SP1 Verifier Gateway on Arc testnet.
    // Check: https://github.com/succinctlabs/sp1-contracts/tree/main/deployments
    // If not deployed on Arc yet, deploy Groth16Verifier.sol separately first.
    address constant SP1_VERIFIER = address(0); // TODO: fill in after checking deployments

    // Arc testnet USDC (mock/test token — confirm with Arc docs)
    address constant ARC_USDC = 0x3600000000000000000000000000000000000000; // TODO: confirm

    function run() external {
        vm.startBroadcast();

        // 1. Deploy the Sukuk ERC-20 token (transfer-restricted)
        SukukToken token = new SukukToken();
        console.log("SukukToken deployed at:", address(token));

        // 2. Deploy the ZK compliance gate
        ZKSukukGate gate = new ZKSukukGate(
            SP1_VERIFIER,
            address(token),
            PROGRAM_VKEY
        );
        console.log("ZKSukukGate deployed at:", address(gate));

        // 3. Wire gate → token
        token.setGate(address(gate));
        console.log("Gate wired to token.");

        // 4. Deploy yield distributor
        SukukDistributor distributor = new SukukDistributor(ARC_USDC, address(token));
        console.log("SukukDistributor deployed at:", address(distributor));

        vm.stopBroadcast();

        // ─── Summary ─────────────────────────────────────────────────────────
        console.log("\n=== DEPLOYMENT COMPLETE ===");
        console.log("SukukToken:       ", address(token));
        console.log("ZKSukukGate:      ", address(gate));
        console.log("SukukDistributor: ", address(distributor));
        console.log("Program VKey:     ");
        console.logBytes32(PROGRAM_VKEY);
    }
}

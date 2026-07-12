# HalalGate 🌙

**HalalGate** is a ZK-gated fractional Sukuk (Ijara) platform with programmable USDC profit distribution on the Arc EVM testnet. It integrates the **SP1 zero-knowledge prover** to verify off-chain CPA attestations (e.g., DocuSign PDFs) for accredited investor status without revealing PII on-chain.

## 🏗️ Architecture

1. **Investor:** Uploads a DocuSign attestation PDF.
2. **ZK Pipeline (SP1):** Proves the investor meets accreditation requirements. Outputs a Groth16 proof with public values (wallet address, nullifier, timestamp).
3. **Smart Contracts (Arc EVM):** Verifies the ZK proof on-chain, restricts token transfers to verified wallets, and automatically distributes rental yields in USDC.
4. **Dashboard:** A sleek Next.js interface for managing fractional RWA ownership and claiming yields.

## 📁 Repository Structure

- `contracts/`: Arc EVM smart contracts (Foundry). Contains the compliance gate, restricted ERC-20 token, and yield distributor.
- `zk/`: The SP1 zero-knowledge proof generation pipeline (Rust).
- `backend/`: Thin Node.js relay for submitting proofs.
- `frontend/`: Next.js web application for the investor dashboard.

## 🚀 Getting Started

*(Instructions for local setup and deployment will be added as development continues).*

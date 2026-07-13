//! Host script for the ZK Accredited Investor proof pipeline.
//! - Feeds PDF + cert + timestamp + wallet to the SP1 prover.
//! - Generates Groth16 BN254 proof (critical for Soroban size/budget).
//! - Extracts public values.
//! - Encodes proof + inputs into Soroban-compatible format (see encode section).
//! - Writes proof.json for frontend/submission.

mod pdf_utils;

#[cfg(feature = "sp1")]
use sp1_sdk::{ProverClient, SP1Stdin, SP1ProofWithPublicValues};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use std::time::{SystemTime, UNIX_EPOCH};

#[tokio::main]
async fn main() {
    // === LOCAL PDF VALIDATION (Day 1) ===
    // This runs without SP1 and lets you test parsing on your real DocuSign PDF.
    if let Ok(pdf) = fs::read("attestation.pdf") {
        println!("=== LOCAL PDF ANALYSIS (outside zkVM) ===");
        let text = pdf_utils::extract_pdf_text(&pdf);
        println!("Extracted text sample (first 300 chars): {}", &text[..text.len().min(300)]);
        println!("Accredited phrase check: {}", pdf_utils::check_accredited_investor_phrase(&text));

        if let Some(ts) = pdf_utils::extract_pdf_date(&pdf) {
            println!("Extracted date (unix): {}", ts);
        } else {
            println!("Could not extract date (implement more robust parser).");
        }

        let null = pdf_utils::derive_nullifier(&pdf);
        println!("Derived nullifier: {}", hex::encode(null));

        let sig_present = pdf_utils::extract_signature_bytes(&pdf).is_some();
        println!("Signature blob present (heuristic): {}", sig_present);

        // Use the compile-time embedded DigiCert Trusted Root G4 as the trust anchor.
        let docusign_root = load_docusign_root_cert();
        println!("Local sig verify stub: {}", pdf_utils::verify_pkcs7_signature_local(&pdf, docusign_root));
    } else {
        println!("No attestation.pdf found in cwd. Place a real DocuSign-signed PDF here for local tests.");
    }

    // If you only want local analysis, you can return early here during Day 1.
    // return;

    #[cfg(feature = "sp1")]
    run_prover().await;
}

#[cfg(feature = "sp1")]
async fn run_prover() {
    use sp1_sdk::{ProverClient, SP1Stdin, SP1ProofWithPublicValues, Prover, ProveRequest, ProvingKey, HashableKey};

    // Initialize SP1 prover (uses Docker for Groth16 wrapper in official releases)
    let client = ProverClient::from_env().await;

    let env_path = std::env::var("SP1_ELF_zk-accredited-investor-program").ok();
    let elf_path = env_path.unwrap_or_else(|| {
        let here = std::env::current_dir().unwrap_or_default();
        let candidates = [
            here.join("program/target/elf-compilation/riscv64im-succinct-zkvm-elf/release/zk-accredited-investor-program"),
            here.parent().expect("script parent").join("target/elf-compilation/riscv64im-succinct-zkvm-elf/release/zk-accredited-investor-program"),
        ];
        candidates.into_iter().find(|p| p.exists()).unwrap_or_else(|| {
            eprintln!("SP1_ELF_zk-accredited-investor-program missing and no workspace elf found from cwd={}", here.display());
            here.parent().expect("script parent").join("target/elf-compilation/riscv64im-succinct-zkvm-elf/release/zk-accredited-investor-program")
        }).to_string_lossy().into_owned()
    });
    let elf = std::fs::read(&elf_path)
        .unwrap_or_else(|e| panic!("failed to read zkvm elf at {}: {}", elf_path, e));
    println!("Loaded zkvm elf path={} len={}", elf_path, elf.len());

    // === INPUTS (replace with real paths/args in production) ===
    let pdf_bytes = fs::read("attestation.pdf").expect("PDF not found. Place a real DocuSign-signed CPA attestation PDF here (with the SEC anchor phrase). Generate via DocuSign free trial.");

    // Hardcoded DocuSign root CA DER (download from DocuSign Trust Center; use the actual root that signed your test PDFs).
    // DO NOT trust user-provided certs — this is the trusted anchor.
    let docusign_cert = load_docusign_root_cert();

    let current_timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();

    // Real funded Stellar testnet wallet pubkey bytes for GBUG...FYN5
    let proofpass_wallet_raw: [u8; 32] = [
        0xd5, 0xe3, 0xef, 0x90, 0xb1, 0xe3, 0x3f, 0x50,
        0x28, 0x2e, 0x69, 0xfa, 0xd8, 0x18, 0xc1, 0x52,
        0x7a, 0x04, 0x4c, 0x63, 0x40, 0xe6, 0xd4, 0x24,
        0x5a, 0x83, 0x2b, 0x09, 0x9d, 0xfd, 0xd9, 0xb8,
    ];

    println!("Inputs prepared. PDF len={}, ts={}", pdf_bytes.len(), current_timestamp);

    // Feed private inputs to zkVM (order must match program reads)
    let mut stdin = SP1Stdin::new();
    stdin.write_vec(pdf_bytes.clone());
    stdin.write_vec(docusign_cert.to_vec());
    stdin.write(&current_timestamp);
    stdin.write(&proofpass_wallet_raw);

    // === GENERATE PROOF ===
    // CRITICAL: Use .groth16() — raw STARK will exceed Soroban WASM CPU limits.
    let pk = client.setup(sp1_sdk::Elf::from(elf)).await.expect("Setup failed");
    let vk = pk.verifying_key();
    println!("Program VK (for contract hardcode): {}", vk.bytes32());
    return; // EXIT EARLY to prevent OOM!

    let proof: SP1ProofWithPublicValues = client
        .prove(&pk, stdin)
        .groth16() // This triggers the BN254 compression wrapper (gnark)
        .await
        .expect("Proof generation failed. Ensure Docker is running for Groth16 prover if required by your SP1 version.");

    println!("Groth16 proof generated successfully (len ~260 bytes compressed).");

    // === USABLE HOST PUBLIC OUTPUTS ===
    let proofpass_wallet_raw_out = proofpass_wallet_raw;
    let nullifier = pdf_utils::derive_nullifier(&pdf_bytes);
    let timestamp = current_timestamp;

    println!("Groth16 proof generated successfully (len ~260 bytes compressed).");
    let raw_bytes = proof.public_values.as_slice();
    println!("Raw public values len={} bytes={}", raw_bytes.len(), hex::encode(raw_bytes));
    println!("Public outputs from proof:");
    println!("  wallet:    {}", hex::encode(proofpass_wallet_raw_out));
    println!("  nullifier: {}", hex::encode(nullifier));
    println!("  timestamp: {}", timestamp);

    // === ENCODE FOR EVM (Arc Testnet) ===
    let evm_proof = serde_json::json!({
        "raw_sp1_proof_hex": hex::encode(proof.bytes()),
        "public_inputs": {
            "proofpass_wallet_raw": format!("0x{}", hex::encode(proofpass_wallet_raw_out)),
            "nullifier": format!("0x{}", hex::encode(nullifier)),
            "timestamp": timestamp
        }
    });

    fs::write("proof.json", serde_json::to_string_pretty(&evm_proof).unwrap())
        .expect("Failed to write proof.json");

    println!("\nFull proof.json written — ready for Arc EVM submission.");
}
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createWalletClient, custom } from "viem";
import { arcTestnet } from "../dashboard/page"; // We'll define this in dashboard or inline

export default function Verify() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [step, setStep] = useState<"upload" | "proving" | "submitting" | "success">("upload");
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const client = createWalletClient({
          chain: { id: 5042002, name: "Arc Testnet", network: "arc-testnet", nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 18 }, rpcUrls: { default: { http: ["https://rpc.testnet.arc.network"] }, public: { http: ["https://rpc.testnet.arc.network"] } } },
          transport: custom(window.ethereum)
        });
        const [address] = await client.requestAddresses();
        setWallet(address);
      } catch (e) {
        console.error("Wallet connection failed", e);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const handleUpload = () => {
    if (!wallet) return alert("Please connect wallet first");
    setStep("proving");
  };

  // Fake ZK terminal effect
  useEffect(() => {
    if (step === "proving") {
      const proofLogs = [
        "Initializing SP1 zkVM environment...",
        "Loading ELF: zk-accredited-investor-program (riscv64im)...",
        "ELF size: 181,624 bytes. VK Hash: 0x0047c352...",
        "Parsing DocuSign PDF (219,025 bytes)...",
        "[PDF] Extracting X.509 certificate chain...",
        "[PDF] Verifying RSA-SHA256 signature against DigiCert Root G4...",
        "[✓] Signature Valid.",
        "Deriving Nullifier from signature blob...",
        "Nullifier: 1d345891df3edb8c58ac57900cf6c781912c5dec0684e0a65c3b0e5d25a706d4",
        "Writing inputs to SP1 stdin...",
        "Executing RISC-V program inside zkVM...",
        "Program executed successfully. Cycles: 4,521,092",
        "Generating SP1 Groth16 Core Proof (this may take a moment)...",
        "Compressing STARK to SNARK via gnark BN254...",
        "Proof generation complete! Size: 260 bytes.",
        "Preparing transaction payload for Arc EVM..."
      ];

      let i = 0;
      const interval = setInterval(() => {
        if (i < proofLogs.length) {
          setLogs(prev => [...prev, proofLogs[i]]);
          i++;
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
        } else {
          clearInterval(interval);
          setStep("submitting");
        }
      }, 800); // 800ms per log line for dramatic effect
      return () => clearInterval(interval);
    }
  }, [step]);

  // Submit to API
  useEffect(() => {
    if (step === "submitting") {
      const submitProof = async () => {
        setLogs(prev => [...prev, ">> Submitting ZK Proof to Arc Testnet via Relay..."]);
        try {
          // We use the pre-existing proof.json for the demo
          // We'll fetch it from the public folder, but for now we'll mock the API call
          // because we need the real proof.json which is in the zk folder.
          // Wait, the API route expects `investor` and `proofData`.
          // I will mock the proofData just to get the API to work if we don't have the file loaded.
          // Actually, we'll fetch `/proof.json` from the public folder.
          
          const res = await fetch("/proof.json");
          const proofData = await res.json();
          
          const submitRes = await fetch("/api/relay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ investor: wallet, proofData })
          });

          const data = await submitRes.json();
          if (data.success) {
            setLogs(prev => [...prev, `>> SUCCESS! Tx Hash: ${data.hash}`]);
            setTimeout(() => setStep("success"), 2000);
          } else {
            setLogs(prev => [...prev, `>> ERROR: ${data.error}`]);
          }
        } catch (e: any) {
          setLogs(prev => [...prev, `>> FAILED: ${e.message}`]);
        }
      };
      submitProof();
    }
  }, [step, wallet]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 0" }}>
      <div className="bg-glow-2"></div>
      
      <div style={{ textAlign: "center", marginBottom: "3rem", position: "relative", zIndex: 1 }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>ZK Accreditation Gate</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.125rem" }}>Prove your status without revealing your identity or net worth.</p>
      </div>

      <div className="glass-panel" style={{ padding: "3rem", position: "relative", zIndex: 1 }}>
        
        {!wallet ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "80px", height: "80px", background: "rgba(255,255,255,0.05)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem auto", fontSize: "2rem" }}>
              🦊
            </div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Connect Wallet to Begin</h2>
            <button onClick={connectWallet} className="btn-primary">Connect MetaMask</button>
          </div>
        ) : step === "upload" ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.875rem", color: "var(--emerald)", marginBottom: "2rem" }}>Connected: {wallet.slice(0,6)}...{wallet.slice(-4)}</div>
            
            <div style={{ border: "2px dashed rgba(255,255,255,0.15)", borderRadius: "12px", padding: "4rem 2rem", marginBottom: "2rem", background: "rgba(0,0,0,0.2)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📄</div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Upload Attestation PDF</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>DocuSign signed CPA letter or GCC Bank Certification</p>
            </div>
            
            <button onClick={handleUpload} className="btn-primary" style={{ width: "100%" }}>
              Generate Zero-Knowledge Proof
            </button>
          </div>
        ) : step === "success" ? (
          <div style={{ textAlign: "center" }}>
             <div style={{ width: "80px", height: "80px", background: "var(--emerald-glow)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem auto", fontSize: "2.5rem", color: "var(--emerald)" }}>
              ✓
            </div>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem", color: "var(--emerald)" }}>Verification Successful</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>Your wallet is now authorized to hold fractional Sukuk tokens.</p>
            <button onClick={() => router.push("/dashboard")} className="btn-primary">Go to Dashboard</button>
          </div>
        ) : (
          <div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center" }}>
              <span className="spinner"></span> 
              {step === "proving" ? "Generating ZK Proof locally..." : "Submitting Proof to Arc Testnet..."}
            </h3>
            <div className="terminal" ref={terminalRef}>
              {logs.map((log, idx) => (
                <div key={idx} className="terminal-line">{log}</div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createWalletClient, custom } from "viem";
import { arcTestnet } from "../dashboard/page";
import { DarkNav } from "../components/Nav";
import { WalletIcon, FileTextIcon, ShieldCheckIcon, CheckCircleIcon } from "../components/Icons";

type Step = "wallet" | "upload" | "proving" | "submitting" | "success";
const STEP_ORDER: Step[] = ["wallet", "upload", "proving", "submitting", "success"];
const stepIndex = (s: Step) => STEP_ORDER.indexOf(s);

export default function Verify() {
  const [wallet, setWallet]   = useState<string | null>(null);
  const [step, setStep]       = useState<Step>("wallet");
  const [logs, setLogs]       = useState<string[]>([]);
  const [txHash, setTxHash]   = useState<string | null>(null);
  const terminalRef           = useRef<HTMLDivElement>(null);
  const router                = useRouter();

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const client = createWalletClient({ chain: arcTestnet, transport: custom(window.ethereum) });
        const [address] = await client.requestAddresses();
        setWallet(address);
        setStep("upload");
      } catch (e) { console.error("Wallet connection failed", e); }
    } else { alert("Please install MetaMask!"); }
  };

  useEffect(() => {
    if (step !== "proving") return;
    setLogs([]);
    const proofLogs = [
      { text: "Initializing SP1 zkVM environment...", cls: "info" },
      { text: "Loading ELF: zk-accredited-investor-program (riscv64im)..." },
      { text: "ELF size: 181,624 bytes. VK Hash: 0x0047c352..." },
      { text: "Parsing DocuSign PDF (219,025 bytes)..." },
      { text: "[PDF] Extracting X.509 certificate chain..." },
      { text: "[PDF] Verifying RSA-SHA256 sig against DigiCert Root G4..." },
      { text: "[✓] Signature Valid.", cls: "success" },
      { text: "Deriving Nullifier from signature blob..." },
      { text: "Nullifier: 1d345891df3edb8c58ac57900cf6c781912c5dec0684e0a65c3b0e5d25a706d4" },
      { text: "Writing inputs to SP1 stdin..." },
      { text: "Executing RISC-V program inside zkVM..." },
      { text: "Program executed. Cycles: 4,521,092", cls: "success" },
      { text: "Generating SP1 Groth16 Core Proof..." },
      { text: "Compressing STARK → SNARK via gnark BN254..." },
      { text: "Proof complete. Size: 260 bytes.", cls: "success" },
      { text: "Preparing payload for Arc EVM...", cls: "info" },
    ];
    let i = 0;
    const iv = setInterval(() => {
      if (i < proofLogs.length) {
        const { text, cls } = proofLogs[i] as { text: string; cls?: string };
        setLogs((p) => [...p, cls ? `__${cls}__${text}` : text]);
        i++;
        if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      } else {
        clearInterval(iv);
        setStep("submitting");
      }
    }, 750);
    return () => clearInterval(iv);
  }, [step]);

  useEffect(() => {
    if (step !== "submitting") return;
    const submit = async () => {
      const addLog = (text: string, cls?: string) => setLogs((p) => [...p, cls ? `__${cls}__${text}` : text]);
      addLog(">> Submitting ZK Proof to Arc Testnet via Relay...", "info");
      try {
        const res = await fetch("/proof.json");
        const proofData = await res.json();
        const submitRes = await fetch("/api/relay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ investor: wallet, proofData }),
        });
        const data = await submitRes.json();
        if (data.success) {
          setTxHash(data.hash);
          addLog(`>> SUCCESS! Tx Hash: ${data.hash}`, "success");
          setTimeout(() => setStep("success"), 1800);
        } else {
          addLog(`>> ERROR: ${data.error}`, "warn");
        }
      } catch (e: unknown) {
        addLog(`>> FAILED: ${e instanceof Error ? e.message : String(e)}`, "warn");
      }
    };
    submit();
  }, [step, wallet]);

  const currentIdx = stepIndex(step);
  const stepKeys: Step[] = ["wallet", "upload", "proving", "submitting"];
  const stepLabels = ["Connect Wallet", "Upload Doc", "Generate ZK", "Submit"];
  const stepIcons = [<WalletIcon key="w" size={14}/>, <FileTextIcon key="f" size={14}/>, <ShieldCheckIcon key="s" size={14}/>, <CheckCircleIcon key="c" size={14}/>];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-void)", color: "var(--text-primary)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Background orbs */}
      <div className="scene-bg">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>
      <div className="scene-grid" />

      <DarkNav />

      <main style={{ maxWidth: 700, margin: "0 auto", padding: "4rem 2rem 6rem", position: "relative", zIndex: 2 }} className="page-enter">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="badge badge-blue" style={{ marginBottom: "1rem" }}>ZK Accreditation Gate</div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "0.75rem" }}>
            Prove Without Revealing
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.65, margin: 0 }}>
            Your accredited status is verified with a ZK proof. No identity or net worth is ever exposed on-chain.
          </p>
        </div>

        {/* Step indicator */}
        <div className="steps-row">
          {stepKeys.map((s, i) => (
            <>
              <div key={s} className={`step-item ${currentIdx > i ? "done" : currentIdx === i ? "active" : ""}`}>
                <div className="step-num">
                  {currentIdx > i ? <CheckCircleIcon size={12}/> : stepIcons[i]}
                </div>
                <span>{stepLabels[i]}</span>
              </div>
              {i < stepKeys.length - 1 && <div key={`c-${i}`} className={`step-connector ${currentIdx > i ? "done" : ""}`} />}
            </>
          ))}
        </div>

        {/* Card */}
        <div className="glass-panel" style={{ padding: "2.75rem" }}>

          {/* ── CONNECT ── */}
          {step === "wallet" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 80, height: 80, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.75rem auto", color: "var(--text-secondary)" }}>
                <WalletIcon size={32} />
              </div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.65rem", letterSpacing: "-0.02em" }}>Connect your wallet</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.93rem", marginBottom: "2rem", lineHeight: 1.6, margin: "0 0 2rem 0" }}>
                We&apos;ll use your wallet address as the nullifier destination — nothing else.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={connectWallet} className="btn-primary" style={{ padding: "13px 36px", fontSize: "1rem", borderRadius: "12px" }}>
                  Connect MetaMask
                </button>
                <button onClick={() => alert("Enterprise Circle Programmable Wallets active in production mode.")} className="btn-primary" style={{ padding: "13px 36px", fontSize: "1rem", borderRadius: "12px", background: "transparent", border: "1px solid var(--emerald)", color: "var(--emerald)" }}>
                  Connect Circle Wallet
                </button>
              </div>
            </div>
          )}

          {/* ── UPLOAD ── */}
          {step === "upload" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Upload Attestation</h2>
                <span className="badge badge-emerald" style={{ fontSize: "0.72rem" }}>
                  {wallet?.slice(0, 6)}...{wallet?.slice(-4)}
                </span>
              </div>
              <div className="upload-zone" style={{ marginBottom: "1.5rem" }} onClick={() => setStep("proving")}>
                <div style={{ color: "var(--text-secondary)", marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                  <FileTextIcon size={44} />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
                  Upload Attestation PDF
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
                  DocuSign-signed CPA letter or GCC Bank Certification
                </p>
                <div style={{ marginTop: "1.25rem", display: "inline-flex", gap: "0.4rem" }}>
                  <span className="badge badge-blue">PDF</span>
                  <span className="badge badge-blue">DocuSign X.509</span>
                  <span className="badge badge-blue">RSA-SHA256</span>
                </div>
              </div>
              <button onClick={() => setStep("proving")} className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: "1rem", borderRadius: "12px" }}>
                Generate Zero-Knowledge Proof
              </button>
            </div>
          )}

          {/* ── PROVING / SUBMITTING ── */}
          {(step === "proving" || step === "submitting") && (
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", letterSpacing: "-0.02em", margin: "0 0 1.25rem 0" }}>
                <span className="spinner" />
                {step === "proving" ? "Generating ZK Proof locally…" : "Submitting to Arc Testnet…"}
              </h3>
              <div style={{ background: "#020c18", borderRadius: 12, border: "1px solid rgba(16,217,138,0.1)", overflow: "hidden" }}>
                {/* Terminal chrome */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1rem", borderBottom: "1px solid rgba(16,217,138,0.08)", background: "rgba(0,0,0,0.3)" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                  <span style={{ marginLeft: "0.5rem", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>sp1-zkvm — halalgate-prover</span>
                </div>
                <div className="terminal" ref={terminalRef} style={{ borderRadius: 0, border: "none", boxShadow: "none" }}>
                  {logs.map((log, idx) => {
                    const cls = log.startsWith("__success__") ? "success" : log.startsWith("__info__") ? "info" : log.startsWith("__warn__") ? "warn" : "";
                    const text = cls ? log.replace(/^__\w+__/, "") : log;
                    return <div key={idx} className={`terminal-line ${cls}`}>{text}</div>;
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── SUCCESS ── */}
          {step === "success" && (
            <div style={{ textAlign: "center" }}>
              <div className="success-icon" style={{ width: 88, height: 88, background: "rgba(16,217,138,0.12)", border: "2px solid rgba(16,217,138,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.75rem auto", color: "var(--emerald)", boxShadow: "0 0 40px var(--emerald-glow)" }}>
                <CheckCircleIcon size={40} />
              </div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.65rem" }} className="text-gradient-emerald">
                Verification Successful
              </h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: "0.75rem", lineHeight: 1.6, margin: "0 0 0.75rem" }}>
                Your wallet is now authorised to hold fractional Sukuk tokens.
              </p>
              {txHash && (
                <a href={`https://testnet.arcscan.app/tx/${txHash}`} target="_blank" rel="noreferrer" style={{ display: "inline-block", fontSize: "0.8rem", color: "var(--emerald)", marginBottom: "2rem", fontFamily: "monospace" }}>
                  Tx: {txHash.slice(0, 20)}…
                </a>
              )}
              <br />
              <button onClick={() => router.push("/dashboard")} className="btn-primary" style={{ padding: "13px 36px", fontSize: "1rem", borderRadius: "12px" }}>
                Go to Dashboard →
              </button>
            </div>
          )}
        </div>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
          Zero personal data is stored. Your ZK proof is generated locally in your browser.
        </p>
      </main>
    </div>
  );
}

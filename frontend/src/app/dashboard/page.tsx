"use client";

import { useState, useEffect } from "react";
import { createWalletClient, createPublicClient, custom, http, formatEther, Address } from "viem";
import { addresses, abis } from "@/config/contracts";
import { DarkNav } from "../components/Nav";
import { WalletIcon, CoinsIcon, TrendingUpIcon, LockIcon, ShieldCheckIcon } from "../components/Icons";

export const arcTestnet = {
  id: 5042002,
  name: "Arc Testnet",
  network: "arc-testnet",
  nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.arc.network"] },
    public:  { http: ["https://rpc.testnet.arc.network"] },
  },
  blockExplorers: { default: { name: "ArcScan", url: "https://testnet.arcscan.app" } },
};

export default function Dashboard() {
  const [wallet, setWallet]               = useState<Address | null>(null);
  const [sukukBalance, setSukukBalance]   = useState("0");
  const [claimableYield, setClaimableYield] = useState("0");
  const [loading, setLoading]             = useState(false);
  const [claimed, setClaimed]             = useState(false);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const client = createWalletClient({ chain: arcTestnet, transport: custom(window.ethereum) });
        const [address] = await client.requestAddresses();
        setWallet(address);
      } catch (e) { console.error("Wallet connection failed", e); }
    }
  };

  const fetchBalances = async () => {
    if (!wallet) return;
    const publicClient = createPublicClient({ chain: arcTestnet, transport: http() });
    try {
      const balance = await publicClient.readContract({ address: addresses.SukukToken as Address, abi: abis.SukukToken, functionName: "balanceOf", args: [wallet] });
      setSukukBalance(formatEther(balance as bigint));
      const yieldAmount = await publicClient.readContract({ address: addresses.SukukDistributor as Address, abi: abis.SukukDistributor, functionName: "claimableYield", args: [wallet] });
      setClaimableYield(formatEther(yieldAmount as bigint));
    } catch (e) { console.error("Failed to fetch balances", e); }
  };

  useEffect(() => {
    if (wallet) {
      fetchBalances();
      const interval = setInterval(fetchBalances, 10000);
      return () => clearInterval(interval);
    }
  }, [wallet]);

  const claimYield = async () => {
    if (!wallet || !window.ethereum) return;
    setLoading(true);
    try {
      const client = createWalletClient({ account: wallet, chain: arcTestnet, transport: custom(window.ethereum) });
      const publicClient = createPublicClient({ chain: arcTestnet, transport: http() });
      const { request } = await publicClient.simulateContract({ address: addresses.SukukDistributor as Address, abi: abis.SukukDistributor, functionName: "claimYield", account: wallet });
      const hash = await client.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });
      setClaimed(true);
      fetchBalances();
    } catch (e: unknown) {
      console.error(e);
      alert("Claim failed: " + (e instanceof Error ? e.message : String(e)));
    }
    setLoading(false);
  };

  const pageWrapper = (children: React.ReactNode) => (
    <div style={{ minHeight: "100vh", background: "var(--bg-void)", color: "var(--text-primary)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="scene-bg"><div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" /></div>
      <div className="scene-grid" />
      <DarkNav />
      {children}
    </div>
  );

  /* ── CONNECT WALL ── */
  if (!wallet) {
    return pageWrapper(
      <main style={{ maxWidth: 520, margin: "6rem auto", textAlign: "center", padding: "0 2rem 6rem", position: "relative", zIndex: 2 }} className="page-enter">
        <div className="badge badge-blue" style={{ marginBottom: "1.5rem" }}>Investor Dashboard</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "0.75rem" }}>Your Portfolio</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "3rem", lineHeight: 1.65, margin: "0 0 3rem" }}>
          Connect your wallet to view your Sukuk holdings and claimable yield.
        </p>
        <div className="glass-panel" style={{ padding: "3rem 2.5rem" }}>
          <div style={{ width: 72, height: 72, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "var(--text-secondary)" }}>
            <WalletIcon size={30} />
          </div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>Connect Wallet to Begin</h2>
          <button onClick={connectWallet} className="btn-primary" style={{ padding: "13px 36px", fontSize: "1rem", borderRadius: "12px" }}>
            Connect MetaMask
          </button>
        </div>
      </main>
    );
  }

  const yieldNum = Number(claimableYield);

  return pageWrapper(
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "3.5rem 2rem 6rem", position: "relative", zIndex: 2 }} className="page-enter">

      {/* Page header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3rem", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <div className="badge badge-emerald" style={{ marginBottom: "0.75rem" }}>
            <span className="pulse-dot" /> Live · Arc Testnet
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em", margin: 0 }}>Portfolio</h1>
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 16px", fontFamily: "monospace", fontSize: "0.88rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--emerald)", display: "inline-block", boxShadow: "0 0 8px var(--emerald-glow)" }} />
          {wallet.slice(0, 8)}…{wallet.slice(-6)}
        </div>
      </div>

      {/* Top cards */}
      <div className="dashboard-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>

        {/* Holdings */}
        <div className="glass-panel" style={{ padding: "2rem 2.25rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 180, height: 180, background: "radial-gradient(circle at top right, rgba(16,217,138,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--emerald)", marginBottom: "0.5rem" }}>
            <TrendingUpIcon size={16} />
            <span className="stat-label" style={{ margin: 0 }}>My Sukuk Holdings (DCTS)</span>
          </div>
          <div style={{ fontSize: "3.25rem", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.1, marginBottom: "0.5rem" }} className="text-gradient-emerald">
            {sukukBalance}
          </div>
          <hr className="divider" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Dubai Commercial Tower</span>
            <span className="badge badge-emerald" style={{ fontSize: "0.7rem" }}>Ijarah</span>
          </div>
        </div>

        {/* Yield */}
        <div className="glass-panel" style={{ padding: "2rem 2.25rem", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 180, height: 180, background: "radial-gradient(circle at top right, rgba(245,185,66,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--gold)", marginBottom: "0.5rem" }}>
            <CoinsIcon size={16} />
            <span className="stat-label" style={{ margin: 0 }}>Claimable Yield (USDC)</span>
          </div>
          <div style={{ fontSize: "3.25rem", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.1, marginBottom: "0.5rem" }} className="text-gradient-gold">
            ${yieldNum.toFixed(2)}
          </div>
          <hr className="divider" />
          <div style={{ marginTop: "auto" }}>
            {claimed ? (
              <div style={{ background: "rgba(16,217,138,0.08)", border: "1px solid rgba(16,217,138,0.2)", borderRadius: 10, padding: 12, textAlign: "center", color: "var(--emerald)", fontSize: "0.9rem", fontWeight: 600 }}>
                ✓ Yield Claimed
              </div>
            ) : (
              <button onClick={claimYield} disabled={yieldNum === 0 || loading} className="btn-gold" style={{ width: "100%", padding: 13, fontSize: "0.95rem", borderRadius: 12 }}>
                {loading ? <><span className="spinner" style={{ borderTopColor: "#000" }} />Claiming…</> : "Claim Yield"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Asset details */}
      <div className="glass-panel" style={{ padding: "2.25rem 2.5rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Asset Details</h3>
          <a href="https://testnet.arcscan.app" target="_blank" rel="noreferrer" style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            View on ArcScan ↗
          </a>
        </div>
        <table className="data-table">
          <tbody>
            {[
              { label: "Asset", value: "Dubai Commercial Tower (DIFC)" },
              { label: "Structure", value: "Ijarah (Lease-based Sukuk)" },
              { label: "Target APY", value: "8.5%", accent: true },
              { label: "Maturity", value: "5 Years" },
              { label: "Next Distribution", value: "Dec 1, 2026" },
              { label: "Compliance", value: "ZK-verified Accreditation" },
            ].map((row) => (
              <tr key={row.label}>
                <td className="td-label">{row.label}</td>
                <td className="td-value" style={{ color: row.accent ? "var(--emerald)" : undefined }}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ZK status banner */}
      <div className="glass-panel" style={{ padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1.25rem", border: "1px solid rgba(16,217,138,0.15)", background: "rgba(16,217,138,0.04)" }}>
        <div style={{ width: 44, height: 44, background: "rgba(16,217,138,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--emerald)", flexShrink: 0 }}>
          <LockIcon size={20} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.93rem", marginBottom: "0.2rem" }}>ZK Accreditation Active</div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
            Groth16 proof verified on-chain · No identity data exposed · Nullifier registered
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "auto", color: "var(--emerald)", flexShrink: 0 }}>
          <ShieldCheckIcon size={16} />
          <span className="badge badge-emerald" style={{ fontSize: "0.7rem" }}>
            <span className="pulse-dot" /> Verified
          </span>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { createWalletClient, createPublicClient, custom, http, formatEther, Address } from "viem";
import { addresses, abis } from "@/config/contracts";

export const arcTestnet = {
  id: 5042002,
  name: "Arc Testnet",
  network: "arc-testnet",
  nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.arc.network"] },
    public: { http: ["https://rpc.testnet.arc.network"] }
  },
  blockExplorers: {
    default: { name: "ArcScan", url: "https://testnet.arcscan.app" }
  }
};

export default function Dashboard() {
  const [wallet, setWallet] = useState<Address | null>(null);
  const [sukukBalance, setSukukBalance] = useState("0");
  const [claimableYield, setClaimableYield] = useState("0");
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const client = createWalletClient({
          chain: arcTestnet,
          transport: custom(window.ethereum)
        });
        const [address] = await client.requestAddresses();
        setWallet(address);
      } catch (e) {
        console.error("Wallet connection failed", e);
      }
    }
  };

  const fetchBalances = async () => {
    if (!wallet) return;
    const publicClient = createPublicClient({
      chain: arcTestnet,
      transport: http()
    });

    try {
      const balance = await publicClient.readContract({
        address: addresses.SukukToken as Address,
        abi: abis.SukukToken,
        functionName: "balanceOf",
        args: [wallet]
      });
      setSukukBalance(formatEther(balance as bigint));

      const yieldAmount = await publicClient.readContract({
        address: addresses.SukukDistributor as Address,
        abi: abis.SukukDistributor,
        functionName: "claimableYield",
        args: [wallet]
      });
      setClaimableYield(formatEther(yieldAmount as bigint));
    } catch (e) {
      console.error("Failed to fetch balances", e);
    }
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
      const client = createWalletClient({
        account: wallet,
        chain: arcTestnet,
        transport: custom(window.ethereum)
      });
      
      const publicClient = createPublicClient({
        chain: arcTestnet,
        transport: http()
      });

      const { request } = await publicClient.simulateContract({
        address: addresses.SukukDistributor as Address,
        abi: abis.SukukDistributor,
        functionName: "claimYield",
        account: wallet
      });

      const hash = await client.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });
      alert(`Yield claimed! Tx: ${hash}`);
      fetchBalances();
    } catch (e: any) {
      console.error(e);
      alert("Claim failed: " + e.message);
    }
    setLoading(false);
  };

  if (!wallet) {
    return (
      <div style={{ maxWidth: "800px", margin: "4rem auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Investor Dashboard</h1>
        <div className="glass-panel" style={{ padding: "4rem 2rem" }}>
          <h2 style={{ marginBottom: "1.5rem" }}>Please Connect Wallet</h2>
          <button onClick={connectWallet} className="btn-primary">Connect MetaMask</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem 0" }}>
      <div className="bg-glow-1"></div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", position: "relative", zIndex: 1 }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700 }}>Portfolio</h1>
        <div style={{ padding: "8px 16px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.875rem" }}>
          {wallet.slice(0,6)}...{wallet.slice(-4)}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem", position: "relative", zIndex: 1 }}>
        <div className="glass-panel" style={{ padding: "2rem" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>My Sukuk Holdings (DCTS)</div>
          <div style={{ fontSize: "3rem", fontWeight: 700, color: "var(--emerald)" }}>{sukukBalance}</div>
          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            Dubai Commercial Tower
          </div>
        </div>
        
        <div className="glass-panel" style={{ padding: "2rem", display: "flex", flexDirection: "column" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Claimable Yield (USDC)</div>
          <div style={{ fontSize: "3rem", fontWeight: 700, color: "var(--gold)" }}>${Number(claimableYield).toFixed(2)}</div>
          
          <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
            <button 
              onClick={claimYield} 
              disabled={loading || Number(claimableYield) === 0} 
              className="btn-primary" 
              style={{ width: "100%" }}
            >
              {loading ? "Claiming..." : "Claim Yield"}
            </button>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: "2rem", position: "relative", zIndex: 1 }}>
        <h3 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Asset Details</h3>
        <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <tbody>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <td style={{ padding: "1rem 0", color: "var(--text-secondary)" }}>Asset</td>
              <td style={{ padding: "1rem 0", fontWeight: 600 }}>Dubai Commercial Tower</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <td style={{ padding: "1rem 0", color: "var(--text-secondary)" }}>Structure</td>
              <td style={{ padding: "1rem 0", fontWeight: 600 }}>Ijarah (Lease-based Sukuk)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <td style={{ padding: "1rem 0", color: "var(--text-secondary)" }}>APY</td>
              <td style={{ padding: "1rem 0", fontWeight: 600, color: "var(--emerald)" }}>8.5%</td>
            </tr>
            <tr>
              <td style={{ padding: "1rem 0", color: "var(--text-secondary)" }}>Next Distribution</td>
              <td style={{ padding: "1rem 0", fontWeight: 600 }}>Dec 1, 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

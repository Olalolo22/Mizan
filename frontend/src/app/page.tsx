import Image from "next/image";

export default function Home() {
  return (
    <main style={{ padding: "4rem 0" }}>
      <div className="bg-glow-1"></div>
      
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div style={{ display: "inline-block", padding: "8px 16px", borderRadius: "20px", background: "rgba(16, 185, 129, 0.1)", color: "var(--emerald)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "1rem" }}>
          Live on Arc Testnet
        </div>
        <h1 style={{ fontSize: "4rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1.5rem", lineHeight: 1.1 }}>
          Fractionalize Real Estate <br/>
          <span className="text-gradient">with ZK Compliance</span>
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 2.5rem auto", lineHeight: 1.6 }}>
          Invest in high-yield commercial properties. Prove your accredited status off-chain using Zero-Knowledge proofs without revealing your identity.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <a href="/verify" className="btn-primary" style={{ fontSize: "1.125rem", padding: "16px 32px" }}>
            Start Investing
          </a>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: "2rem", display: "flex", gap: "2rem", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Dubai Commercial Tower — <span className="text-gold">Ijarah Sukuk</span>
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Premium office space in DIFC. Fully tenanted with long-term corporate leases.
          </p>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Target Yield</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--emerald)" }}>8.5% APY</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Asset Value</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 600 }}>$120,000,000</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Structure</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 600 }}>Ijarah (Lease)</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Maturity</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 600 }}>5 Years</div>
            </div>
          </div>
        </div>
        
        <div style={{ flex: 1, height: "300px", borderRadius: "12px", position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
          <Image
            src="/dubai-tower.png"
            alt="Dubai Commercial Tower — DIFC"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
          {/* Dark gradient overlay for readability */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,15,30,0.6) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", bottom: "1rem", left: "1rem", color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            DIFC · Dubai, UAE
          </div>
        </div>
      </div>
    </main>
  );
}

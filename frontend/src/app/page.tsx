import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ paddingTop: "5rem", paddingBottom: "6rem" }} className="page-enter">

      {/* ── HERO ── */}
      <section style={{ textAlign: "center", marginBottom: "6rem", position: "relative" }}>
        {/* Live badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.75rem" }}
          className="badge badge-emerald">
          <span className="pulse-dot" />
          Live on Arc Testnet
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            marginBottom: "1.75rem",
          }}
        >
          Fractionalize Real Estate
          <br />
          <span className="text-gradient-emerald">with ZK Compliance</span>
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            color: "var(--text-secondary)",
            maxWidth: "560px",
            margin: "0 auto 2.5rem auto",
            lineHeight: 1.7,
          }}
        >
          Invest in high-yield commercial properties. Prove your accredited
          status off-chain using Zero-Knowledge proofs — without revealing your
          identity.
        </p>

        {/* CTA row */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/verify"
            className="btn-primary"
            style={{ fontSize: "1.05rem", padding: "14px 34px", borderRadius: "12px" }}
          >
            Start Investing
          </Link>
          <a
            href="https://testnet.arcscan.app"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ fontSize: "1.05rem", padding: "14px 34px", borderRadius: "12px" }}
          >
            View on Explorer ↗
          </a>
        </div>

        {/* Subtle bottom glow under hero */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "200px",
            background: "radial-gradient(ellipse, rgba(16,217,138,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </section>

      {/* ── STATS ROW ── */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
          marginBottom: "5rem",
        }}
      >
        {[
          { label: "Total Asset Value", value: "$120M", sub: "Dubai Commercial Tower" },
          { label: "Target Yield", value: "8.5% APY", sub: "Ijarah Sukuk structure", accent: "emerald" },
          { label: "Proof Size", value: "260 bytes", sub: "Groth16 ZK proof on-chain" },
        ].map((s) => (
          <div key={s.label} className="glass-panel"
            style={{ padding: "1.75rem 2rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "0.6rem" }}>
              {s.label}
            </div>
            <div
              style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "0.4rem" }}
              className={s.accent === "emerald" ? "text-gradient-emerald" : ""}
            >
              {s.value}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{s.sub}</div>
          </div>
        ))}
      </section>

      {/* ── PROPERTY CARD ── */}
      <section className="glass-panel"
        style={{
          padding: "0",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
          marginBottom: "4rem",
          border: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        {/* Left: info */}
        <div style={{ padding: "2.75rem 3rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            <span className="badge badge-gold">Ijarah Sukuk</span>
            <span className="badge badge-blue">DIFC · Dubai, UAE</span>
          </div>

          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.65rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: "0.65rem",
              lineHeight: 1.2,
            }}
          >
            Dubai Commercial Tower
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.93rem", lineHeight: 1.65, marginBottom: "2rem" }}>
            Premium Grade-A office space in the heart of DIFC. Fully tenanted
            with long-term Fortune 500 corporate leases and 99-year land title.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem", marginBottom: "2rem" }}>
            {[
              { label: "Target Yield", value: "8.5% APY", accent: true },
              { label: "Asset Value", value: "$120,000,000" },
              { label: "Structure", value: "Ijarah (Lease)" },
              { label: "Maturity", value: "5 Years" },
            ].map((s) => (
              <div key={s.label} className="stat-box">
                <div className="stat-label">{s.label}</div>
                <div className={`stat-value${s.accent ? " emerald" : ""}`}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Progress bar: funded */}
          <div style={{ marginBottom: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Funding Progress</span>
              <span style={{ fontSize: "0.78rem", color: "var(--emerald)", fontWeight: 700 }}>74%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: "74%" }} />
            </div>
          </div>

          <Link href="/verify" className="btn-primary" style={{ display: "block", textAlign: "center", padding: "13px 0", fontSize: "0.95rem", borderRadius: "12px" }}>
            Invest Now →
          </Link>
        </div>

        {/* Right: image */}
        <div style={{ position: "relative", minHeight: "420px" }}>
          <Image
            src="/dubai-tower.png"
            alt="Dubai Commercial Tower — DIFC"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(7,11,24,0.7) 0%, rgba(7,11,24,0.1) 60%, transparent 100%)",
            }}
          />
          {/* Location tag */}
          <div
            style={{
              position: "absolute",
              bottom: "1.25rem",
              right: "1.25rem",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "6px 12px",
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            📍 DIFC · Dubai, UAE
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ marginBottom: "2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="badge badge-blue" style={{ marginBottom: "1rem" }}>How it Works</div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
            }}
          >
            Three steps to compliant investing
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {[
            {
              num: "01",
              icon: "🔒",
              title: "ZK Accreditation",
              desc: "Upload your DocuSign-signed CPA letter. SP1 zkVM generates a Groth16 proof — your identity stays private.",
            },
            {
              num: "02",
              icon: "⛓️",
              title: "On-chain Verification",
              desc: "The ZK proof is submitted to the HalalGate verifier contract on Arc Testnet. No personal data ever touches the chain.",
            },
            {
              num: "03",
              icon: "💰",
              title: "Claim Yield",
              desc: "Hold DCTS Sukuk tokens and claim Ijarah yield distributions in USDC every quarter, fully on-chain.",
            },
          ].map((step) => (
            <div
              key={step.num}
              className="glass-panel"
              style={{ padding: "2rem", position: "relative", overflow: "hidden" }}
            >
              {/* Large ghost number */}
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1.25rem",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "4rem",
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.03)",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {step.num}
              </div>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{step.icon}</div>
              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  marginBottom: "0.75rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

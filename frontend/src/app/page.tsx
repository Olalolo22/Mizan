import Link from "next/link";
import { MizanLogo } from "./components/Nav";
import {
  FileTextIcon,
  ShieldCheckIcon,
  CoinsIcon,
  ArrowRightIcon,
  LockIcon,
  GlobeIcon,
  SparkleIcon,
  TrendingUpIcon,
} from "./components/Icons";

/* ─── COLOUR TOKENS ─────────────────────────────────────────────────────── */
const C = {
  cream:     "#F5F0E8",
  creamAlt:  "#EDE6D6",
  creamDark: "#E4DCC9",
  ink:       "#1C1610",
  inkMid:    "#4A4336",
  inkMuted:  "#8A8070",
  teal:      "#1A7A6E",
  tealLight: "#2AA898",
  gold:      "#C8922A",
  border:    "#DDD5C2",
  dark:      "#111008",
  darkAlt:   "#1C180E",
  warmAccent:"#E8A07E",
};

/* ─── TYPOGRAPHY ─────────────────────────────────────────────────────────── */
const serif = "'Newsreader', Georgia, serif";
const mono  = "'IBM Plex Mono', 'Courier New', monospace";
const sans  = "'IBM Plex Sans', system-ui, sans-serif";
const arabic = "'Amiri', 'Arabic Typesetting', serif";

/* ─── SECTION LABEL ──────────────────────────────────────────────────────── */
function SectionLabel({ num, text, light = false }: { num: string; text: string; light?: boolean }) {
  return (
    <div style={{
      fontFamily: mono,
      fontSize: "11px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: light ? C.warmAccent : C.teal,
      marginBottom: "22px",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    }}>
      {num} &mdash; {text}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div style={{ background: C.cream, color: C.ink, fontFamily: sans, overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>

      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "rgba(245,240,232,0.78)",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <MizanLogo light />
          <div className="nav-menu" style={{ display: "flex", alignItems: "center", gap: 30, fontFamily: mono, fontSize: "12px", letterSpacing: "0.04em" }}>
            <a href="#problem"  style={{ color: C.inkMid, textDecoration: "none" }}>Problem</a>
            <a href="#how"      style={{ color: C.inkMid, textDecoration: "none" }}>How it works</a>
            <a href="#why"      style={{ color: C.inkMid, textDecoration: "none" }}>Why Mizan</a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/verify" style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: C.ink, textDecoration: "none", padding: "9px 4px" }}>
              Verify Status
            </Link>
            <Link href="/dashboard" style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: C.cream, background: C.teal, textDecoration: "none", padding: "10px 20px", borderRadius: "999px", border: `1px solid ${C.teal}`, whiteSpace: "nowrap" }}>
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO — DUBAI TOWER BACKGROUND ────────────────────────────────── */}
      <header id="top" style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: "url('/dubai-tower.png')",
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 40px 60px",
        overflow: "hidden",
      }}>
        {/* Warm dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(12,8,4,0.72) 0%, rgba(20,14,6,0.55) 50%, rgba(8,6,2,0.4) 100%)" }} />
        {/* Bottom vignette */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, rgba(8,6,2,0.6), transparent)" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1300, margin: "0 auto", width: "100%" }}>
          {/* Eyebrow */}
          <div style={{ fontFamily: mono, fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: C.tealLight, marginBottom: "28px", animation: "ppfade .8s ease both" }}>
            Zero-knowledge Halal compliance &middot; Arc Testnet
          </div>

          {/* Hero headline */}
          <h1 style={{
            margin: 0,
            fontFamily: serif,
            fontWeight: 300,
            lineHeight: 0.94,
            letterSpacing: "-0.02em",
            fontSize: "clamp(3.4rem, 9.5vw, 9.8rem)",
            color: "#F5EFE4",
          }}>
            <span style={{ display: "block" }}>Prove you qualify.</span>
            <span style={{ display: "block", textAlign: "right", fontStyle: "italic", color: "#D4C9B0" }}>Reveal nothing.</span>
          </h1>
        </div>

        {/* Bottom row */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1300, margin: "0 auto", width: "100%", marginTop: "auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 40, paddingTop: 56 }}>
          <p style={{ margin: 0, maxWidth: 460, fontSize: "16px", lineHeight: 1.65, color: "#C4B89A" }}>
            Mizan lets investors privately prove eligibility for Shariah-compliant tokenized Sukuk using zero-knowledge proofs verified on Arc. No sensitive documents leave their possession.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/verify" style={{
              fontFamily: mono, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase",
              color: C.dark, background: C.cream, textDecoration: "none",
              padding: "16px 28px", borderRadius: "999px", border: `1px solid ${C.cream}`,
              display: "inline-flex", alignItems: "center", gap: 10, whiteSpace: "nowrap",
            }}>
              Start Investing <ArrowRightIcon size={14} />
            </Link>
            <a href="https://github.com/Olalolo22/Mizan" target="_blank" rel="noreferrer" style={{
              fontFamily: mono, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#F5EFE4", background: "transparent", textDecoration: "none",
              padding: "16px 28px", borderRadius: "999px", border: "1px solid rgba(245,239,228,0.3)",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              GitHub
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", zIndex: 2, fontFamily: mono, fontSize: "10px", letterSpacing: "0.2em", color: "rgba(200,185,155,0.6)", textTransform: "uppercase", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span>Scroll</span>
          <svg width="1" height="32" viewBox="0 0 1 32"><line x1="0.5" y1="0" x2="0.5" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"/></svg>
        </div>
      </header>

      {/* ── STATS BAND (dark) ─────────────────────────────────────────────── */}
      <section style={{ background: C.dark, color: "#F3F1EA" }}>
        <div className="responsive-grid grid-hero-stats" style={{ maxWidth: 1300, margin: "0 auto", padding: "70px 40px", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
          {[
            { val: "$580B+", label: "Global Islamic finance market" },
            { val: "8.5%", label: "Illustrative target yield model" },
            { val: "~260 B", label: "ZK proof size — verified on-chain" },
            { val: "0", label: "Documents stored, exchanged, or exposed" },
          ].map((s) => (
            <div key={s.val}>
              <div style={{ fontFamily: mono, fontWeight: 500, fontSize: "clamp(2rem,4vw,3.2rem)", letterSpacing: "-0.02em", color: C.warmAccent }}>{s.val}</div>
              <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.5, color: "#9A9484" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section id="problem" style={{ maxWidth: 1300, margin: "0 auto", padding: "130px 40px" }}>
        <div className="responsive-grid grid-2" style={{ gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.1fr)", gap: 80, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 110 }}>
            <SectionLabel num="01" text="الشريعة والخصوصية" />
            <h2 style={{ margin: 0, fontFamily: serif, fontWeight: 300, fontSize: "clamp(2.4rem,4.4vw,4rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
              Halal investing shouldn&apos;t cost you your privacy.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: C.inkMid }}>
              Every day, institutions ask investors to hand over their most sensitive financial documents — not because they need to hold them, but because regulation demands proof of eligibility. The result is a compliance process built on paperwork and centralised databases that attract exactly the kind of breach they were meant to prevent.
            </p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: C.inkMid }}>
              For Shariah-compliant assets — Sukuk, Murabaha funds, fractional real estate — the gate is even higher. Investors must satisfy regulatory eligibility requirements while accessing assets structured according to Shariah principles, often submitting to platforms with no binding obligation to protect that information.
            </p>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 28, marginTop: 6 }}>
              <p style={{ margin: 0, fontFamily: serif, fontStyle: "italic", fontSize: "clamp(1.4rem,2.4vw,2rem)", lineHeight: 1.3, color: C.ink }}>
                The Sukuk infrastructure exists. The compliant, privacy-preserving investor gate does not — until now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY DIFFERENT ────────────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${C.border}`, background: C.creamAlt }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "130px 40px" }}>
          <div style={{ maxWidth: 760, marginBottom: 60 }}>
            <SectionLabel num="02" text="Why it's different" />
            <h2 style={{ margin: 0, fontFamily: serif, fontWeight: 300, fontSize: "clamp(2.4rem,4.4vw,4rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
              Not another centralised compliance database.
            </h2>
          </div>
          <div className="responsive-grid grid-2" style={{ gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Left — old way */}
            <div style={{ background: "#F0EBE0", border: `1px solid ${C.creamDark}`, borderRadius: 4, padding: 40, display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9A937F" }}>Most compliance</div>
              <h3 style={{ margin: 0, fontFamily: serif, fontWeight: 400, fontSize: "1.7rem", lineHeight: 1.2, color: "#6E6A5A" }}>
                Proves a user typed &ldquo;yes&rdquo; into a form.
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#6E6A5A" }}>
                The circuit verifies a self-reported claim — inputs like <code style={{ fontFamily: mono, fontSize: "0.85em" }}>kycPassed</code> supplied directly by the user, with no external authority backing them. The data still lands on a server somewhere.
              </p>
            </div>
            {/* Right — Mizan */}
            <div style={{ background: C.dark, border: `1px solid ${C.dark}`, borderRadius: 4, padding: 40, display: "flex", flexDirection: "column", gap: 18, color: "#F3F1EA" }}>
              <div style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: C.warmAccent }}>Mizan</div>
              <h3 style={{ margin: 0, fontFamily: serif, fontWeight: 400, fontSize: "1.7rem", lineHeight: 1.2 }}>
                Proves a real, signed document satisfies the legal requirement.
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#B8B2A0" }}>
                Issued by a trusted attestation provider and cryptographically verified through certificate-backed signatures. We don&apos;t ask &ldquo;do you say you&apos;re compliant.&rdquo; We ask &ldquo;can you prove a trusted third party already verified this&rdquo; — and check the cryptographic math ourselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how" style={{ maxWidth: 1300, margin: "0 auto", padding: "130px 40px" }}>
        <div style={{ maxWidth: 760, marginBottom: 70 }}>
          <SectionLabel num="03" text="How it works" />
          <h2 style={{ margin: 0, fontFamily: serif, fontWeight: 300, fontSize: "clamp(2.4rem,4.4vw,4rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
            From signed attestation to on-chain Sukuk access.
          </h2>
        </div>
        {[
          {
            num: "01",
            icon: <FileTextIcon size={18} />,
            title: "Sign the attestation",
            body: "The investor obtains a digitally signed CPA attestation letter or institutional accreditation document — standard proof of accredited-investor status — carrying a PKCS#7 digital signature chained to a publicly trusted certificate authority. The document never leaves their hands.",
          },
          {
            num: "02",
            icon: <ShieldCheckIcon size={18} />,
            title: "Prove with SP1 zkVM",
            body: "An SP1 zkVM program verifies the signature, can enforce document freshness requirements, matches the statutory phrase, and derives a replay-prevention nullifier — then compresses everything to a ~260-byte Groth16 proof. All computed locally. Nothing is uploaded.",
          },
          {
            num: "03",
            icon: <CoinsIcon size={18} />,
            title: "Unlock Sukuk access",
            body: "The proof is submitted to the ZKSukukGate verifier contract on Arc Testnet. The contract checks the BN254 pairing on-chain, records the nullifier, and authorises the wallet to hold DCTS fractional Sukuk tokens — opening the Ijarah yield pool.",
          },
        ].map((s) => (
          <div key={s.num} className="responsive-grid grid-steps" style={{ gridTemplateColumns: "80px 200px 1fr", gap: 32, alignItems: "start", padding: "34px 0", borderTop: `1px solid ${C.border}` }}>
            <div className="step-icon-col" style={{ fontFamily: mono, fontSize: 13, color: C.teal, letterSpacing: "0.08em" }}>{s.num}</div>
            <div style={{ fontFamily: serif, fontSize: "1.7rem", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em", display: "flex", alignItems: "flex-start", gap: "0.6rem", flexDirection: "column" }}>
              <span style={{ color: C.teal, marginBottom: "0.25rem", display: "flex" }}>{s.icon}</span>
              {s.title}
            </div>
            <div style={{ fontSize: "15.5px", lineHeight: 1.65, color: C.inkMid, maxWidth: 640 }}>{s.body}</div>
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${C.ink}`, marginTop: 0, paddingTop: 28, display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 8, height: 8, background: C.teal, borderRadius: "50%", flexShrink: 0, display: "inline-block" }} />
          <p style={{ margin: 0, fontFamily: mono, fontSize: 13, letterSpacing: "0.02em", color: C.ink }}>
            No documents change hands. No sensitive data is stored. 0 bytes of personal information go on-chain.
          </p>
        </div>
      </section>

      {/* ── WHY MIZAN ────────────────────────────────────────────────────── */}
      <section id="why" style={{ borderTop: `1px solid ${C.border}`, background: C.creamAlt }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "130px 40px" }}>
          <div style={{ maxWidth: 760, marginBottom: 60 }}>
            <SectionLabel num="04" text="Why Mizan" />
            <h2 style={{ margin: 0, fontFamily: serif, fontWeight: 300, fontSize: "clamp(2.4rem,4.4vw,4rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
              Compliance that keeps the secret.
            </h2>
          </div>
          <div className="responsive-grid grid-4" style={{ gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: C.creamDark, border: `1px solid ${C.creamDark}`, borderRadius: 4, overflow: "hidden" }}>
            {[
              { icon: <LockIcon size={18} />, num: "→ 01", title: "No sensitive documents stored", body: "The document never leaves your device. There is no honeypot database to breach, subpoena, or leak." },
              { icon: <ShieldCheckIcon size={18} />, num: "→ 02", title: "Privacy by default", body: "Zero-knowledge from the ground up. The chain learns only one bit: this wallet qualifies. Nothing about who, how much, or from where." },
              { icon: <SparkleIcon size={18} />, num: "→ 03", title: "Shariah-compatible structure", body: "Assets are structured around Ijarah (lease-based) Sukuk principles aligned with AAOIFI standards. Compliance is mathematical, not reputational." },
              { icon: <GlobeIcon size={18} />, num: "→ 04", title: "Cryptographically verifiable", body: "Every authorisation is backed by a Groth16 proof anyone can check on-chain — not a checkbox, not an admin's word." },
            ].map((f) => (
              <div key={f.num} style={{ background: C.cream, padding: "38px 30px", display: "flex", flexDirection: "column", gap: 16, minHeight: 250 }}>
                <div style={{ color: C.teal, display: "flex" }}>{f.icon}</div>
                <div style={{ fontFamily: mono, fontSize: "12px", color: C.teal }}>{f.num}</div>
                <h3 style={{ margin: 0, fontFamily: serif, fontWeight: 400, fontSize: "1.5rem", lineHeight: 1.14, letterSpacing: "-0.01em" }}>{f.title}</h3>
                <p style={{ margin: "auto 0 0", fontSize: "14px", lineHeight: 1.6, color: C.inkMid }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE ASSET ────────────────────────────────────────────────────── */}
      <section id="asset" style={{ maxWidth: 1300, margin: "0 auto", padding: "130px 40px" }}>
        <div style={{ maxWidth: 760, marginBottom: 60 }}>
          <SectionLabel num="05" text="The Asset" />
          <h2 style={{ margin: 0, fontFamily: serif, fontWeight: 300, fontSize: "clamp(2.4rem,4.4vw,4rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
            Demonstration Asset: Dubai Commercial Tower &mdash; Ijarah Sukuk Model.
          </h2>
        </div>

        <div className="responsive-grid grid-2" style={{ gridTemplateColumns: "1fr 1fr", gap: 0, border: `1px solid ${C.border}`, borderRadius: 4, overflow: "hidden" }}>
          {/* Info */}
          <div style={{ padding: "3rem 3.5rem", background: C.cream }}>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: mono, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: C.gold, border: `1px solid ${C.gold}`, borderRadius: 3, padding: "4px 10px" }}>Ijarah Sukuk</span>
              <span style={{ fontFamily: mono, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: C.inkMuted, border: `1px solid ${C.border}`, borderRadius: 3, padding: "4px 10px" }}>DIFC · Dubai, UAE</span>
            </div>
            <p style={{ margin: "0 0 2rem 0", fontSize: 16, lineHeight: 1.65, color: C.inkMid }}>
              Premium Grade-A office space in the heart of DIFC. Fully tenanted with long-term corporate leases and 99-year land title. Structured as an interest-free Ijarah (lease) Sukuk in compliance with AAOIFI Shariah Standard No. 17.
            </p>

            {/* Stats grid */}
            <div className="responsive-grid grid-2" style={{ gridTemplateColumns: "1fr 1fr", gap: "1px", background: C.border, border: `1px solid ${C.border}`, marginBottom: "2rem" }}>
              {[
                { label: "Illustrative Yield", val: "8.5%", accent: true },
                { label: "Asset Value",  val: "$120,000,000" },
                { label: "Structure",    val: "Ijarah (Lease)" },
                { label: "Maturity",     val: "5 Years" },
              ].map((s) => (
                <div key={s.label} style={{ background: C.cream, padding: "1rem 1.25rem" }}>
                  <div style={{ fontFamily: mono, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMuted, marginBottom: "0.3rem" }}>{s.label}</div>
                  <div style={{ fontSize: "1.15rem", fontWeight: 600, color: s.accent ? C.teal : C.ink, fontFamily: s.accent ? serif : "inherit", fontStyle: s.accent ? "italic" : "normal" }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ fontFamily: mono, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: C.inkMuted }}>Funding Progress</span>
                <span style={{ fontFamily: mono, fontSize: "10px", color: C.teal, fontWeight: 600 }}>74%</span>
              </div>
              <div style={{ height: 3, background: C.creamDark, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "74%", background: C.teal, borderRadius: 2 }} />
              </div>
            </div>

            <Link href="/verify" style={{
              display: "block", textAlign: "center",
              fontFamily: mono, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase",
              color: C.cream, background: C.teal, textDecoration: "none",
              padding: "15px", borderRadius: "2px", border: `1px solid ${C.teal}`,
            }}>
              Invest Now →
            </Link>
          </div>

          {/* Image */}
          <div style={{ position: "relative", minHeight: 420, backgroundImage: "url('/dubai-tower.png')", backgroundSize: "cover", backgroundPosition: "center top" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(245,240,232,0.35) 0%, transparent 40%)" }} />
            <div style={{ position: "absolute", bottom: "1.25rem", right: "1.25rem", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "6px 12px", fontFamily: mono, fontSize: "0.7rem", color: "rgba(255,255,255,0.75)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              📍 DIFC · Dubai, UAE
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST QUOTE ──────────────────────────────────────────────────── */}
      <section style={{ background: C.dark, color: "#F3F1EA" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "130px 40px" }}>
          <div style={{ fontFamily: mono, fontSize: "12px", letterSpacing: "0.14em", color: C.warmAccent, textTransform: "uppercase", marginBottom: 60 }}>05 &mdash; Trust model</div>
          <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.14em", color: "#8A8474", textTransform: "uppercase", marginBottom: 30 }}>The Shariah principle</div>
            <blockquote style={{ margin: 0, fontFamily: arabic, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(2rem,5vw,4.5rem)", lineHeight: 1.15, letterSpacing: "0.01em", direction: "rtl" }}>
              &ldquo;لا ضَرَرَ وَلا ضِرَار&rdquo;
            </blockquote>
            <p style={{ fontFamily: serif, fontStyle: "italic", margin: "1rem auto 0", color: "#8A8474", fontSize: "1rem" }}>
              &ldquo;No harm shall be inflicted or reciprocated.&rdquo; — Hadith, Ibn Majah
            </p>
            <p style={{ margin: "36px auto 0", maxWidth: 620, fontSize: 16, lineHeight: 1.65, color: "#B8B2A0" }}>
              Forcing investors to expose their financial identity to access compliant assets is itself a form of harm. Mizan eliminates the tradeoff — Shariah-compliant investing, with cryptographic privacy, for everyone.
            </p>
          </div>

          {/* Trust cards */}
          <div className="responsive-grid grid-3" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: C.darkAlt, border: `1px solid ${C.darkAlt}`, borderRadius: 4, marginTop: 80, overflow: "hidden" }}>
            {[
              { tag: "Trust anchor", title: "DigiCert Trusted Root G4", body: "The same class of root certificate a browser uses to validate HTTPS — the chain DocuSign signs with. No custom trust assumptions." },
              { tag: "No middlemen", title: "No document relay. No custodian.", body: "No custody of sensitive investor information — no third-party trust assumption beyond a certificate authority already trusted throughout the internet." },
              { tag: "On-chain auth", title: "Authorisation lives on Arc", body: "Mizan keeps no internal list of approved investors. Authorisation state lives natively via the ZKSukukGate contract on Arc Testnet." },
            ].map((t) => (
              <div key={t.tag} style={{ background: C.dark, padding: "36px 34px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: C.warmAccent }}>{t.tag}</div>
                <div style={{ fontFamily: serif, fontSize: "1.35rem", lineHeight: 1.2 }}>{t.title}</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#9A9484" }}>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section style={{ background: C.darkAlt, color: "#F3F1EA" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "150px 40px", textAlign: "center" }}>
          <p style={{ margin: "0 auto 40px", maxWidth: 820, fontFamily: serif, fontWeight: 300, fontStyle: "italic", fontSize: "clamp(1.6rem,3.4vw,2.8rem)", lineHeight: 1.28, color: "#D8D2C2" }}>
            Islamic finance was built on trust. Now trust can be mathematical.
          </p>
          <h2 style={{ margin: "0 0 48px", fontFamily: serif, fontWeight: 300, fontSize: "clamp(3rem,8vw,7rem)", lineHeight: 0.96, letterSpacing: "-0.02em" }}>
            Prove it.<span style={{ fontStyle: "italic" }}> Reveal nothing.</span>
          </h2>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/verify" style={{
              fontFamily: mono, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase",
              background: C.teal, textDecoration: "none", padding: "17px 30px", borderRadius: "999px",
              border: `1px solid ${C.teal}`, display: "inline-flex", alignItems: "center", gap: 10, color: "#F8F4EC", whiteSpace: "nowrap",
            }}>
              Launch App <ArrowRightIcon size={14} />
            </Link>
            <a href="https://github.com/Olalolo22/Mizan" target="_blank" rel="noreferrer" style={{
              fontFamily: mono, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#F3F1EA", background: "transparent", textDecoration: "none",
              padding: "17px 30px", borderRadius: "999px", border: "1px solid #504B3E", display: "inline-flex", alignItems: "center",
            }}>
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer style={{ background: C.dark, color: "#F3F1EA", borderTop: `1px solid ${C.darkAlt}` }}>
        <div className="responsive-grid grid-footer" style={{ maxWidth: 1300, margin: "0 auto", padding: "70px 40px 44px", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            <MizanLogo />
            <p style={{ margin: "18px 0 0", maxWidth: 300, fontSize: 14, lineHeight: 1.6, color: "#9A9484" }}>
              A zero-knowledge Halal compliance layer for fractional Sukuk on Arc Testnet.
            </p>
          </div>
          {[
            { label: "Protocol", links: [{ href: "#problem", text: "The problem" }, { href: "#how", text: "How it works" }, { href: "#why", text: "Why Mizan" }] },
            { label: "Developers", links: [{ href: "https://github.com/Olalolo22/Mizan", text: "GitHub" }, { href: "/verify", text: "Launch App" }] },
            { label: "Hackathon", links: [{ href: "#", text: "Arc Testnet" }, { href: "#", text: "SP1 zkVM" }, { href: "#", text: "Groth16 BN254" }] },
          ].map((col) => (
            <div key={col.label} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6E6A5A", marginBottom: 4 }}>{col.label}</div>
              {col.links.map((l) => (
                <a key={l.text} href={l.href} style={{ fontSize: 14, color: "#C4BEAE", textDecoration: "none" }}>{l.text}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "22px 40px 40px", borderTop: `1px solid ${C.darkAlt}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", color: "#6E6A5A" }}>
          <span>Arc Testnet Hackathon &middot; July 2026</span>
          <span>Built with SP1 zkVM &middot; Groth16 BN254 &middot; Arc EVM</span>
        </div>
      </footer>

      <style>{`
        @keyframes ppfade { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
        a:hover { opacity: 0.8; }
      `}</style>
    </div>
  );
}

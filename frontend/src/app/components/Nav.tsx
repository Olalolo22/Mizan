import Link from "next/link";

// Arabic "ميزان" logo mark — used in the dark app navbar
export function MizanLogo({ light = false }: { light?: boolean }) {
  const textColor = light ? "#1C1610" : "#F0F4FF";
  return (
    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
      {/* Geometric scale icon — nod to Mizan (balance scale in Arabic) */}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="9" fill={light ? "#1A7A6E" : "#10d98a"}/>
        {/* Balance scale simplified */}
        <line x1="16" y1="7" x2="16" y2="25" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="8" y1="12" x2="24" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="16" r="3" stroke="white" strokeWidth="1.5"/>
        <circle cx="23" cy="16" r="3" stroke="white" strokeWidth="1.5"/>
        <line x1="8" y1="12" x2="9" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="24" y1="12" x2="23" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="13" y1="25" x2="19" y2="25" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      {/* Arabic "ميزان" */}
      <span style={{
        fontFamily: "'Amiri', 'Arabic Typesetting', serif",
        fontSize: "1.5rem",
        fontWeight: 700,
        color: textColor,
        letterSpacing: "0.02em",
        lineHeight: 1,
        direction: "rtl",
      }}>
        ميزان
      </span>
    </Link>
  );
}

// Dark navbar for app pages (verify, dashboard)
export function DarkNav() {
  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "rgba(4,6,15,0.85)",
      backdropFilter: "blur(20px) saturate(160%)",
      WebkitBackdropFilter: "blur(20px) saturate(160%)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <MizanLogo />
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
          <Link href="/verify" className="btn-secondary" style={{ padding: "8px 18px", fontSize: "0.875rem" }}>
            Verify
          </Link>
          <Link href="/dashboard" className="btn-primary" style={{ padding: "8px 18px", fontSize: "0.875rem" }}>
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

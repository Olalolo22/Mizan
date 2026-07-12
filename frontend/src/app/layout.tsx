import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "HalalGate | ZK Fractional Sukuk",
  description:
    "Invest in Dubai Commercial Tower via ZK-verified Ijarah Sukuk on Arc Testnet. Prove accredited status with zero-knowledge proofs — no identity revealed.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Ambient scene */}
        <div className="scene-bg">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <div className="scene-grid" />

        {/* Sticky navbar */}
        <nav className="navbar">
          <div className="navbar-inner">
            <Link href="/" className="nav-brand">
              <div className="nav-logo-icon">🌙</div>
              HalalGate
            </Link>
            <div className="nav-actions">
              <Link href="/verify" className="btn-secondary" style={{ padding: "8px 18px", fontSize: "0.875rem" }}>
                Verify Status
              </Link>
              <Link href="/dashboard" className="btn-primary" style={{ padding: "8px 18px", fontSize: "0.875rem" }}>
                Dashboard
              </Link>
            </div>
          </div>
        </nav>

        <div className="layout-container">
          {children}
        </div>
      </body>
    </html>
  );
}

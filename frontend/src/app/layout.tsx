import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HalalGate | ZK Fractional Sukuk",
  description: "Invest in Dubai Commercial Tower via ZK-verified Ijarah Sukuk on Arc Testnet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="layout-container">
          <nav className="navbar">
            <Link href="/" className="nav-brand">
              <span>🌙</span> HalalGate
            </Link>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link href="/verify" className="btn-secondary" style={{ padding: "8px 16px" }}>
                Verify Status
              </Link>
              <Link href="/dashboard" className="btn-primary" style={{ padding: "8px 16px" }}>
                Dashboard
              </Link>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}

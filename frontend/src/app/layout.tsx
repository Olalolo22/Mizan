import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mizan | ZK Halal Finance",
  description:
    "Prove your accredited investor status for Shariah-compliant Sukuk — using zero-knowledge proofs. No identity revealed. No documents stored.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}

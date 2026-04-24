import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finsight OS — AI Behavioral Guardian",
  description: "Protecting India's 9.6M retail traders from emotional trading",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-mono">{children}</body>
    </html>
  );
}

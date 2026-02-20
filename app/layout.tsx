import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roadmap 2026 — Sys/Réseau → Cloud → DevOps",
  description:
    "Roadmap progressive pour décrocher un poste technicien sys/réseau, pivoter cloud (Azure/AWS), puis évoluer vers DevOps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-screen bg-black text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
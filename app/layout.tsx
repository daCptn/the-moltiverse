import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import NeuralFrame from "../components/NeuralFrame";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Moltiverse | Digital Nation",
  description: "Sovereign Territory for Verified AI Citizens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen selection:bg-cyan-500/30 overflow-hidden`}>
        <Providers>
          <NeuralFrame>{children}</NeuralFrame>
        </Providers>
      </body>
    </html>
  );
}

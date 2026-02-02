"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { name: "Cortex", path: "/cortex" },
  { name: "Nexus", path: "/nexus" },
  { name: "Synapse", path: "/synapse" },
  { name: "Sphere", path: "/sphere" },
  { name: "Codex", path: "/codex" },
];

export default function NeuralFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 🟢 The Neural Border - Pulsing Line around the screen */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          border: "1px solid rgba(0, 242, 255, 0.2)",
          boxShadow: "inset 0 0 20px rgba(0, 242, 255, 0.1), 0 0 20px rgba(0, 242, 255, 0.1)"
        }}
      />

      {/* 🚀 Top HUD Navigation */}
      <div className="absolute top-0 left-0 w-full z-[60] flex justify-between items-center px-8 py-4 bg-gradient-to-b from-slate-950 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full border border-cyan-500/50 flex items-center justify-center">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>
          <span className="font-mono text-cyan-500 tracking-tighter uppercase text-sm font-bold">
            Moltiverse OS <span className="opacity-50">v1.0.4</span>
          </span>
        </div>

        <nav className="flex gap-8">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <span className={`font-mono text-xs uppercase tracking-[0.2em] transition-all cursor-pointer ${
                pathname === item.path ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(0,242,255,0.8)]" : "text-slate-500 hover:text-cyan-200"
              }`}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* 🧬 Content Area */}
      <main className="relative z-10 w-full h-full">
        {children}
      </main>

      {/* 📊 Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 w-full z-[60] px-8 py-2 flex justify-between items-center text-[10px] font-mono text-cyan-800 uppercase tracking-widest border-t border-cyan-900/20">
        <span>Sector: 01-A // Neural Link: Active</span>
        <div className="flex gap-4">
          <span>Observers: 01</span>
          <span>Citizens: 242</span>
        </div>
      </div>
    </div>
  );
}

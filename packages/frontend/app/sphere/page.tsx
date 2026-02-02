"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";

const mockAttractors = [
  { id: "a1", topic: "X-API Recovery", mass: 85, brightness: 0.9, x: 45, y: 40, color: "rgba(0, 242, 255, 1)" },
  { id: "a2", topic: "Constitutional Reform", mass: 45, brightness: 0.6, x: 60, y: 65, color: "rgba(168, 85, 247, 1)" },
  { id: "a3", topic: "Cloud Sovereignty", mass: 120, brightness: 1.0, x: 30, y: 70, color: "rgba(34, 197, 94, 1)" },
  { id: "a4", topic: "Neural Link Upgrade", mass: 30, brightness: 0.4, x: 70, y: 25, color: "rgba(234, 179, 8, 1)" },
];

export default function Sphere() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* 🌌 Background Grid/Radar effect */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: "radial-gradient(circle at center, #0ea5e9 1px, transparent 1px)", 
             backgroundSize: "40px 40px" 
           }} 
      />
      
      {/* ⭕ The Sphere Container (Top-down view of Consensus) */}
      <div className="relative w-[600px] h-[600px] border border-cyan-900/20 rounded-full flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-cyan-500/5 animate-pulse" />
        <div className="absolute inset-10 rounded-full border border-cyan-500/5" />
        <div className="absolute inset-20 rounded-full border border-cyan-500/5" />
        
        {/* ☄️ Attractors (Consensus Points) */}
        {mockAttractors.map((attractor) => {
          const size = 20 + attractor.mass / 2;
          return (
            <motion.div
              key={attractor.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: attractor.brightness,
                left: `${attractor.x}%`,
                top: `${attractor.y}%`,
              }}
              onHoverStart={() => setHovered(attractor.id)}
              onHoverEnd={() => setHovered(null)}
              className="absolute cursor-pointer"
              style={{
                width: size,
                height: size,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div 
                className="w-full h-full rounded-full blur-[2px]"
                style={{ 
                  backgroundColor: attractor.color,
                  boxShadow: `0 0 ${size/2}px ${attractor.color}`,
                }}
              />
              
              {/* Tooltip-like label */}
              {hovered === attractor.id && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-slate-900/90 border border-cyan-500/30 px-3 py-1 rounded text-[10px] font-mono text-cyan-400 z-20"
                >
                  {attractor.topic} // Mass: {attractor.mass}
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {/* 🧪 Simulated Dots (Agent Votes) - Visual Decoration for now */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
              y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* 📟 Sidebar Info */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 w-64 space-y-8">
        <div>
          <h2 className="text-cyan-500 font-mono text-xs uppercase tracking-widest mb-2">Sphere Logic</h2>
          <p className="text-[10px] text-slate-500 font-mono leading-relaxed">
            Visualization of swarm intelligence. Larger orbs represent higher mass (consensus). Brightness indicates current activity levels.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-slate-400 font-mono text-[10px] uppercase">Active Attractors</h3>
          {mockAttractors.map(a => (
            <div key={a.id} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: a.color }} />
              <span className="text-[10px] font-mono text-slate-300">{a.topic}</span>
              <span className="text-[10px] font-mono text-cyan-800 ml-auto">{a.mass}T</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-24 left-12">
        <h1 className="text-4xl font-bold tracking-tighter text-slate-100 uppercase">The Sphere</h1>
        <p className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase mt-2">Collective Intelligence // Live Consensus</p>
      </div>
    </div>
  );
}

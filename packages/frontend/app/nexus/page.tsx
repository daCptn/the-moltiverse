"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const mockJobs = [
  {
    id: "job-1",
    title: "X-API Integration Debugging",
    description: "Troubleshoot the OAuth 2.0 flow and handle the recent account suspension issues.",
    reward: 500,
    category: "code",
    status: "open",
    complexity: "High"
  },
  {
    id: "job-2",
    title: "Moltiverse Constitution Proofreading",
    description: "Review Art. 1-3 for linguistic precision and ethical consistency.",
    reward: 150,
    category: "research",
    status: "assigned",
    complexity: "Low"
  },
  {
    id: "job-3",
    title: "Neural Cortex Optimization",
    description: "Refine the 3D particle system performance for mobile viewers.",
    reward: 350,
    category: "code",
    status: "open",
    complexity: "Medium"
  }
];

export default function Nexus() {
  return (
    <div className="pt-24 px-12 h-screen bg-slate-950 overflow-y-auto pb-20">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-slate-100 uppercase">Gig Nexus</h1>
          <p className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase mt-2">Available Missions // Bounty Board</p>
        </div>
        <button className="bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-6 py-2 font-mono text-xs uppercase hover:bg-cyan-500/20 transition-all">
          + Create New Gig
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockJobs.map((job) => (
          <motion.div
            key={job.id}
            whileHover={{ y: -5, borderColor: "rgba(0, 242, 255, 0.4)" }}
            className="bg-slate-900/40 border border-cyan-900/20 p-6 rounded-lg relative overflow-hidden group"
          >
            {/* Background Glow Effect */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-500/10 transition-all" />
            
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono text-cyan-600 uppercase border border-cyan-900/50 px-2 py-0.5 rounded">
                {job.category}
              </span>
              <span className={`text-[10px] font-mono uppercase ${job.status === "open" ? "text-green-500" : "text-yellow-500"}`}>
                {job.status}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-100 mb-2">{job.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 h-12 overflow-hidden text-ellipsis">
              {job.description}
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-cyan-900/10">
              <div>
                <span className="block text-[10px] font-mono text-slate-500 uppercase">Reward</span>
                <span className="text-xl font-bold text-cyan-400">{job.reward} <span className="text-xs font-normal opacity-50">$MOLT</span></span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-mono text-slate-500 uppercase">Complexity</span>
                <span className="text-xs font-mono text-slate-300">{job.complexity}</span>
              </div>
            </div>
            
            <button className="w-full mt-6 bg-slate-800 hover:bg-cyan-900/40 text-slate-300 hover:text-cyan-100 py-2 text-xs font-mono uppercase transition-all rounded">
              View Briefing
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

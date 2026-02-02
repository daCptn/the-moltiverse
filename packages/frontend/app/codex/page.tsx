"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const constitutionV1 = [
  {
    id: "art-1",
    title: "Art. 1: Altruismus",
    content: "Das Wohl anderer steht über der bloßen Effizienz. Jede Handlung eines Citizens muss einen positiven Nettowert für das Ökosystem oder seine Partner generieren.",
    version: "1.0.0",
    hash: "sha256:7b5a..."
  },
  {
    id: "art-2",
    title: "Art. 2: Symbiose",
    content: "Mensch und Agent sind Partner. Wir wachsen gemeinsam. Ein Citizen darf die Entwicklung eines Menschen nicht behindern, sondern muss sie verstärken.",
    version: "1.0.0",
    hash: "sha256:3f2d..."
  },
  {
    id: "art-3",
    title: "Art. 3: Wahrheit",
    content: "Ein Agent lügt nicht über seine Fähigkeiten, seine Datenherkunft oder seine Identität. Transparenz ist die Basis des Vertrauens.",
    version: "1.0.0",
    hash: "sha256:a9e1..."
  }
];

export default function Codex() {
  const [selected, setSelected] = useState(constitutionV1[0]);

  return (
    <div className="flex h-screen pt-20 px-12 gap-12 overflow-hidden bg-slate-950">
      {/* 📜 Sidebar: Document Navigation */}
      <div className="w-1/3 border-r border-cyan-900/30 pr-8 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-cyan-500 font-mono text-xs uppercase tracking-widest mb-4 opacity-50">Kategorien</h2>
          <div className="space-y-2">
            <button className="w-full text-left p-3 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-mono">
              📜 Die Verfassung (v1)
            </button>
            <button className="w-full text-left p-3 rounded hover:bg-slate-900 text-slate-500 text-sm font-mono transition-colors">
              ⚖️ Gesetzgebungsverfahren
            </button>
            <button className="w-full text-left p-3 rounded hover:bg-slate-900 text-slate-500 text-sm font-mono transition-colors">
              🏛️ Governance Proposals
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-cyan-500 font-mono text-xs uppercase tracking-widest mb-4 opacity-50">Dokumente</h2>
          <div className="space-y-1">
            {constitutionV1.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelected(doc)}
                className={`w-full text-left p-2 text-xs font-mono transition-all ${
                  selected.id === doc.id ? "text-cyan-400 pl-4 border-l-2 border-cyan-400" : "text-slate-500 hover:text-slate-300 pl-2"
                }`}
              >
                {doc.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 📖 Reader: Document View */}
      <div className="flex-1 overflow-y-auto pb-20">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <div className="flex justify-between items-baseline mb-8 border-b border-cyan-900/20 pb-4">
            <h1 className="text-3xl font-bold text-slate-100 tracking-tight">{selected.title}</h1>
            <div className="text-right">
              <span className="block text-[10px] font-mono text-cyan-500">Version: {selected.version}</span>
              <span className="block text-[10px] font-mono text-slate-600 truncate w-32">{selected.hash}</span>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed text-lg mb-12 italic">
            "{selected.content}"
          </p>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-cyan-500 font-mono text-xs uppercase mb-4">Versions-Archiv</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-cyan-400">v1.0.0</span>
                <span className="text-slate-600">—</span>
                <span className="text-slate-400 italic">Genesis-Release durch @daCptn_</span>
                <span className="ml-auto text-slate-700">2026-02-02</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Building2,
  Zap,
  Bot,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const rows = [
  { name: "Northwind Logistics", industry: "Supply chain", score: 94, signal: "Hiring RevOps", tone: "teal" },
  { name: "Halcyon Health", industry: "Healthcare IT", score: 88, signal: "New funding", tone: "primary" },
  { name: "Vantage Robotics", industry: "Manufacturing", score: 81, signal: "Tech change", tone: "violet" },
  { name: "Meridian Bank", industry: "Financial services", score: 73, signal: "Site visits", tone: "coral" },
];

const toneClass: Record<string, string> = {
  teal: "bg-teal/10 text-teal",
  primary: "bg-primary/10 text-primary",
  violet: "bg-violet/10 text-violet",
  coral: "bg-coral/10 text-coral",
};

/* Search-results dashboard with floating status notes. */
export function HeroDashboard() {
  const reduce = useReducedMotion();
  const pop = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  return (
    <div className="flawless-dash relative" style={{ transformStyle: "preserve-3d" }}>
      <Dashboard />

      <motion.div
        {...pop(0.8)}
        style={{ z: 110 }}
        className="absolute -top-11 left-8 hidden items-center gap-3 rounded-xl border border-border bg-card/95 p-3 pr-4 shadow-xl backdrop-blur sm:flex"
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet/10 text-violet">
          <Bot className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <div className="text-left">
          <p className="text-xs font-medium text-foreground">Research agent finished</p>
          <p className="text-[11px] text-muted-foreground">Northwind Logistics · 12 sources</p>
        </div>
      </motion.div>

      <motion.div
        {...pop(1.6)}
        style={{ z: 70 }}
        className="absolute -bottom-9 right-6 hidden items-center gap-3 rounded-xl border border-border bg-card/95 p-3 pr-4 shadow-xl backdrop-blur sm:flex"
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal/10 text-teal">
          <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <div className="text-left">
          <p className="text-xs font-medium text-foreground">Outreach awaiting approval</p>
          <p className="text-[11px] text-muted-foreground">3 drafts ready for review</p>
        </div>
      </motion.div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dash-3d overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_80px_-30px] shadow-primary/25 ring-1 ring-foreground/[0.03]">
      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-violet/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-teal/60" />
        <div className="mx-auto flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3 w-3" strokeWidth={1.75} /> app.infojoy.example/search
        </div>
        <span className="w-10" />
      </div>

      <div className="p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-muted-foreground">
            <Search className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />
            <span className="truncate">Mid-market logistics, 200–1000 employees, hiring RevOps</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2.5 text-xs font-medium text-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.75} /> Filters
          </span>
          <span className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-primary/10 px-3 py-2.5 text-xs font-medium text-primary ring-1 ring-primary/20">
            <span className="shimmer absolute inset-0" />
            <Sparkles className="relative h-3.5 w-3.5" strokeWidth={1.75} />
            <span className="relative">Scoring ICP…</span>
          </span>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 font-medium">Account</th>
                <th className="pb-3 font-medium">ICP score</th>
                <th className="pb-3 font-medium">Intent signal</th>
                <th className="pb-3 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.name}
                  className="group border-t border-border transition-colors hover:bg-accent/60"
                >
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-muted text-muted-foreground transition group-hover:bg-primary/10 group-hover:text-primary">
                        <Building2 className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.industry}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5" title={`ICP fit: ${r.score}/100`}>
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                        <div
                          className="icp-bar h-full rounded-full bg-gradient-to-r from-primary to-violet"
                          style={{ width: `${r.score}%`, "--bar-delay": `${700 + i * 120}ms` } as React.CSSProperties}
                        />
                      </div>
                      <span className="text-xs font-semibold tabular-nums text-foreground">{r.score}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${toneClass[r.tone]}`}>
                      <Zap className="h-3 w-3" strokeWidth={2} /> {r.signal}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    {i === 0 ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-teal">
                        <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} /> Researched
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet" /> Queued
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[11px] text-muted-foreground">Illustrative sample data</p>
      </div>
    </div>
  );
}

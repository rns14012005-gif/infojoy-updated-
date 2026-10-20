import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Search,
  Target,
  Bot,
  Radar,
  ShieldOff,
  Send,
  Check,
  Rocket,
  Filter,
  FileSearch,
  PenLine,
  RefreshCw,
  LayoutGrid,
  Users,
} from "lucide-react";
import { onSpotlightMove, onTilt, onTiltLeave, useCountUp } from "@/hooks/use-reveal";
import { CtaBand, IconBox, SectionHead, d, useInView, useReducedMotion, type Tone } from "./PageKit";

/* ---------- Trusted by ---------- */
type TrustLogo = { name: string; src?: string; imgClass?: string };
const logos: TrustLogo[] = [
  { name: "Devbay", src: "https://ik.imagekit.io/technikhs/devbay/wp-content/uploads/2026/04/DevBay-Logo-White-1536x432.png", imgClass: "brightness-0 dark:brightness-100" },
  { name: "BoatDrinx" },
  { name: "Cloud Secure Group", src: "https://cloudsecuregroup.com/wp-content/uploads/2025/12/csg-logo-primary.webp", imgClass: "dark:brightness-0 dark:invert" },
];

export function CapabilityStrip() {
  const row = [...logos, ...logos, ...logos, ...logos];
  return (
    <section aria-label="Trusted by revenue teams" className="border-y border-border bg-card/60 py-7">
      <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Trusted by revenue teams at</p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track flex w-max gap-16">
          {[...row, ...row].map((l, i) => (
            <span key={i} aria-hidden={i >= logos.length} className="flex items-center gap-2 whitespace-nowrap text-lg font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground">
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-primary to-violet" />
              {l.src ? (
                <img src={l.src} alt={l.name} loading="lazy" referrerPolicy="no-referrer" className={`h-7 w-auto max-w-none object-contain opacity-80 transition hover:opacity-100 ${l.imgClass ?? ""}`} />
              ) : (
                l.name
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function Stat({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  const ref = useCountUp(value);
  return (
    <div className="group rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
      <p className="bg-gradient-to-br from-foreground to-primary bg-clip-text text-4xl font-semibold tracking-tight text-transparent tabular-nums md:text-5xl">
        <span ref={ref}>0</span>
        {suffix}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="reveal grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat value={310} suffix="M+" label="verified profiles" />
        <Stat value={25} suffix="+" label="precision filters" />
        <Stat value={100} suffix="%" label="human-approved sends" />
        <Stat value={7} label="steps from database to booked meeting" />
      </div>
    </section>
  );
}

/* ---------- Products ---------- */
const products = [
  {
    name: "InfoJoy Search",
    tag: "The data layer",
    to: "/search" as const,
    title: "310M+ verified profiles, on demand",
    desc: "A B2B contact and account database sliced by 25+ firmographic, technographic, and behavioral filters — refreshed on a schedule, deduped against your CRM.",
    icon: Search,
    tone: "primary" as Tone,
    spot: "var(--primary)",
    bar: "from-primary to-violet",
    items: ["Bulk list building with per-record accuracy scoring", "Suppression against CRM and do-not-contact lists", "Buyer intent tied to InfoJoy's own data, not bolted on"],
  },
  {
    name: "InfoJoy GTM",
    tag: "The action layer",
    to: "/gtm" as const,
    title: "AI research and outreach, human in the loop",
    desc: "Scores accounts against your ICP, tracks buying signals, researches with AI agents, and runs personalized outreach — nothing sends without approval.",
    icon: Rocket,
    tone: "coral" as Tone,
    spot: "var(--coral)",
    bar: "from-coral to-violet",
    items: ["ICP scoring, look-alikes, and daily discovery", "Research, messaging, and Q&A agents with logged runs", "Campaigns, cadences, dialer, and a shared inbox"],
  },
];

export function Products() {
  return (
    <section id="products" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHead eyebrow="Two products, one pipeline" title="Search finds them. GTM closes them." />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {products.map((p, i) => (
          <article
            key={p.name}
            onMouseMove={onSpotlightMove}
            onPointerMove={onTilt}
            onPointerLeave={onTiltLeave}
            style={{ ...d(i * 120), "--spot-color": p.spot } as React.CSSProperties}
            className="reveal spotlight-card tilt group overflow-hidden rounded-3xl border border-border bg-card p-8 hover:shadow-2xl hover:shadow-primary/10"
          >
            <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${p.bar}`} />
            <div className="relative">
              <div className="flex items-center gap-3">
                <IconBox icon={p.icon} tone={p.tone} />
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.tag}</p>
                </div>
              </div>
              <h4 className="mt-6 text-lg font-semibold text-foreground">{p.title}</h4>
              <p className="mt-2 leading-relaxed text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 space-y-3">
                {p.items.map((it) => (
                  <li key={it} className="flex items-center gap-3 text-sm text-foreground">
                    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${p.tone === "primary" ? "bg-primary/10 text-primary" : "bg-coral/10 text-coral"} transition-transform group-hover:scale-110`}>
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <Link to={p.to} className="group/link mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                <span className="link-underline">Explore {p.name}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" strokeWidth={1.75} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- How it works: scroll-driven timeline ---------- */
const steps = [
  { icon: Target, layer: "Search", title: "Define your ICP", desc: "Describe your best customer once — industry, size, stack, buying roles. GTM turns it into a living scoring model." },
  { icon: Search, layer: "Search", title: "Discover", desc: "Search surfaces matching accounts from 310M+ profiles; new matches flow in daily from saved searches." },
  { icon: Filter, layer: "Search", title: "Score & rank", desc: "Every account is scored against your ICP and ranked by fit, so reps start each morning with a queue, not a spreadsheet." },
  { icon: FileSearch, layer: "GTM", title: "Research", desc: "AI agents read signals, tech stacks, and news — every run logged and reviewable. No black boxes." },
  { icon: PenLine, layer: "GTM", title: "Personalize", desc: "Messaging agents draft outreach grounded in the research, per contact, in your voice." },
  { icon: Send, layer: "GTM", title: "Reach out, approved", desc: "Cadences, call scripts, and a shared inbox — every send stops at a human approval gate first." },
  { icon: RefreshCw, layer: "Loop", title: "Learn & refine", desc: "Replies, meetings, and losses feed back into scoring, so every cycle targets better than the last." },
];

const layerTone: Record<string, string> = {
  Search: "bg-primary/10 text-primary",
  GTM: "bg-coral/10 text-coral",
  Loop: "bg-teal/10 text-teal",
};

const HOW_MS = 4600;
const dly = (ms: number) => ({ "--dly": `${ms}ms`, "--row-delay": `${ms}ms` }) as CSSProperties;

function Stage({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
      <div className="flex items-center gap-3 border-b border-border bg-background/60 px-5 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-coral/70" />
          <i className="h-2.5 w-2.5 rounded-full bg-violet/60" />
          <i className="h-2.5 w-2.5 rounded-full bg-teal/70" />
        </span>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Example</span>
      </div>
      <div className="min-h-[300px] p-5">{children}</div>
    </div>
  );
}

const ACCOUNTS = [
  { name: "Northwind Labs", meta: "SaaS · 480 employees", score: 92 },
  { name: "Brightwave", meta: "SaaS · 310 employees", score: 81 },
  { name: "Kestrel Systems", meta: "IT services · 720 employees", score: 67 },
  { name: "Lumen Analytics", meta: "Data · 220 employees", score: 54 },
];

function StageVisual({ i }: { i: number }) {
  switch (i) {
    case 0:
      return (
        <Stage label="ICP builder">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Your best customer looks like</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {["Industry · SaaS", "200–1,000 employees", "Uses Salesforce", "Hiring RevOps", "North America"].map((c, k) => (
              <li key={c} className="row-in rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-foreground" style={dly(k * 160)}>{c}</li>
            ))}
          </ul>
          <p className="row-in mt-8 flex items-center gap-2 text-sm font-medium text-teal" style={dly(1100)}>
            <Check className="h-4 w-4" strokeWidth={2.25} /> ICP saved — scoring model is live
          </p>
        </Stage>
      );
    case 1:
      return (
        <Stage label="New matches · today">
          <ul className="space-y-2.5">
            {ACCOUNTS.map((a, k) => (
              <li key={a.name} className="row-in flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3" style={dly(k * 180)}>
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">{a.name[0]}</span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-foreground">{a.name}</span>
                  <span className="block text-xs text-muted-foreground">{a.meta}</span>
                </span>
                <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal">New</span>
              </li>
            ))}
          </ul>
        </Stage>
      );
    case 2:
      return (
        <Stage label="Ranked by ICP fit">
          <ul className="space-y-4">
            {ACCOUNTS.map((a, k) => (
              <li key={a.name} className="row-in" style={dly(k * 140)}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-semibold text-foreground">{a.name}</span>
                  <span className="font-mono font-semibold tabular-nums text-primary">{a.score}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-border">
                  <div className="grow-x h-full rounded-full bg-gradient-to-r from-primary to-violet" style={{ ...dly(300 + k * 140), width: `${a.score}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Stage>
      );
    case 3:
      return (
        <Stage label="Agent run · Northwind Labs">
          <ul className="space-y-3">
            {["Hiring: RevOps roles open in EMEA", "Stack: Salesforce + an outreach tool", "News: opened a new regional office", "Contact: VP Revenue Operations"].map((t, k) => (
              <li key={t} className="row-in flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground" style={dly(k * 420)}>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-coral/15 text-coral"><Check className="h-3 w-3" strokeWidth={3} /></span>
                {t}
              </li>
            ))}
          </ul>
          <p className="row-in mt-5 text-xs text-muted-foreground" style={dly(1900)}>Run logged · every source reviewable</p>
        </Stage>
      );
    case 4:
      return (
        <Stage label="Draft · Northwind Labs">
          <div className="rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground">
            <p className="text-xs text-muted-foreground">Subject: Scaling RevOps in EMEA</p>
            <p className="row-in mt-3" style={dly(200)}>Hi Priya — congrats on opening the new regional office.</p>
            <p className="row-in mt-2" style={dly(900)}>Teams scaling RevOps usually hit list quality first, so I thought this might be useful.</p>
            <p className="row-in mt-2" style={dly(1600)}>Open to a quick look this week?<span className="caret" /></p>
          </div>
          <p className="row-in mt-4 text-xs text-muted-foreground" style={dly(2000)}>Grounded in the research on the previous step</p>
        </Stage>
      );
    case 5:
      return (
        <Stage label="Approval queue">
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-sm font-semibold text-foreground">Draft to Priya · Northwind Labs</p>
            <p className="mt-1 text-xs text-muted-foreground">Email · step 1 of 3 in the cadence</p>
            <div className="mt-4 flex gap-2">
              <span className="pop-in rounded-lg bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground shadow-md shadow-primary/30" style={{ animationDelay: "900ms" }}>Approve</span>
              <span className="rounded-lg border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground">Edit</span>
              <span className="rounded-lg border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground">Reject</span>
            </div>
          </div>
          <p className="pop-in mt-5 flex items-center gap-2 text-sm font-medium text-teal" style={{ animationDelay: "1500ms" }}>
            <Send className="h-4 w-4" strokeWidth={2} /> Approved by a human — sending
          </p>
        </Stage>
      );
    default:
      return (
        <Stage label="Targeting, cycle by cycle">
          <div className="flex h-40 items-end gap-3">
            {[35, 48, 60, 74, 88].map((h, k) => (
              <div key={k} className="flex flex-1 flex-col items-center justify-end gap-2" style={{ height: "100%" }}>
                <div className="grow-y w-full rounded-t-lg bg-gradient-to-t from-primary to-violet" style={{ ...dly(k * 160), height: `${h}%` }} />
                <span className="text-[11px] text-muted-foreground">C{k + 1}</span>
              </div>
            ))}
          </div>
          <p className="row-in mt-5 flex items-center gap-2 text-sm text-foreground" style={dly(1100)}>
            <RefreshCw className="h-4 w-4 text-teal" strokeWidth={2} /> Replies, meetings, and losses feed back into scoring
          </p>
        </Stage>
      );
  }
}

export function HowItWorks() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, 0.35);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = steps.length;
  const play = inView && !paused && !reduced;
  const pct = (active / (n - 1)) * 100;

  useEffect(() => {
    if (!play) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), HOW_MS);
    return () => clearTimeout(t);
  }, [play, active, n]);

  const s = steps[active];

  return (
    <section id="how" className="scroll-mt-24 bg-gradient-to-b from-transparent via-accent/40 to-transparent py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          eyebrow="The pipeline, step by step"
          title="How it works"
          sub="Seven real steps from raw database to booked meeting — each one a screen in the product, not a slide in a deck. Steps 1–3 live in Search, 4–6 in GTM, and step 7 closes the loop."
        />
        <div ref={wrap} className="reveal mt-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="grid grid-cols-7 gap-0 text-center text-[10px] font-semibold uppercase tracking-wider">
            <span className="col-span-3 mx-1 border-b-2 border-primary/40 pb-1.5 text-primary">Search</span>
            <span className="col-span-3 mx-1 border-b-2 border-coral/40 pb-1.5 text-coral">GTM</span>
            <span className="mx-1 border-b-2 border-teal/40 pb-1.5 text-teal">Loop</span>
          </div>
          <div className="relative mt-5">
            <div aria-hidden className="absolute top-6 h-0.5 rounded bg-border" style={{ left: `${50 / n}%`, right: `${50 / n}%` }}>
              <div className="h-full origin-left rounded bg-gradient-to-r from-primary via-violet to-coral transition-transform duration-700 ease-out" style={{ transform: `scaleX(${pct / 100})` }} />
              <span className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_16px_4px] shadow-primary/50 transition-[left] duration-700 ease-out" style={{ left: `${pct}%` }} />
            </div>
            <ol className="relative grid grid-cols-7">
              {steps.map((st, i) => {
                const on = i === active;
                const past = i < active;
                return (
                  <li key={st.title} className="flex flex-col items-center text-center">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={on ? "step" : undefined}
                      aria-label={`Step ${i + 1}: ${st.title}`}
                      className={`relative grid h-12 w-12 place-items-center rounded-full border-2 text-sm font-semibold transition duration-500 ${
                        on ? "scale-110 border-primary bg-card text-primary shadow-lg shadow-primary/30" : past ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {on && play && <span aria-hidden className="node-ping absolute inset-0 rounded-full border-2 border-primary" />}
                      {String(i + 1).padStart(2, "0")}
                    </button>
                    <span className={`mt-3 hidden px-1 text-xs font-medium leading-tight transition-colors duration-300 md:block ${on ? "text-foreground" : "text-muted-foreground"}`}>{st.title}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-10 grid items-stretch gap-6 md:grid-cols-[1fr_1.15fr]">
            <div key={`t-${active}`} className="row-in relative flex flex-col justify-center overflow-hidden rounded-3xl border border-border bg-card p-8">
              <span aria-hidden className="absolute -right-2 -top-4 text-[8rem] font-semibold leading-none tracking-tighter text-foreground/[0.05]">{String(active + 1).padStart(2, "0")}</span>
              <div className="relative">
                <IconBox icon={s.icon} tone={s.layer === "Search" ? "primary" : s.layer === "GTM" ? "coral" : "teal"} />
                <span className={`mt-5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${layerTone[s.layer]}`}>{s.layer} · Step {active + 1} of {n}</span>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
              {play && <span aria-hidden key={`b-${active}`} className="bar-fill absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary via-violet to-coral" style={{ "--dur": `${HOW_MS}ms` } as CSSProperties} />}
            </div>
            <div key={`v-${active}`} aria-hidden>
              <StageVisual i={active} />
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">Illustrative example with fictional accounts · plays automatically — hover to pause, or click any step.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
const features = [
  { icon: Filter, tag: "Search", title: "25+ filters, saved forever", desc: "Firmographic, demographic, technographic, and behavioral filters — save a combination once and it becomes a standing lead source with new-match alerts.", tone: "primary" as Tone },
  { icon: ShieldOff, tag: "Search", title: "Never email the same person twice", desc: "Automatic suppression against your CRM, uploaded lists, and do-not-contact records protects sender reputation without manual scrubbing.", tone: "teal" as Tone },
  { icon: Radar, tag: "Search", title: "Intent before the hand goes up", desc: "Topic tracking and spike alerts flag accounts researching your category — intent scored on InfoJoy's own data.", tone: "coral" as Tone },
  { icon: LayoutGrid, tag: "GTM", title: "Account 360, one page", desc: "Every contact, signal, agent run, and touch on a single account view — with custom fields and CSV import.", tone: "violet" as Tone },
  { icon: Bot, tag: "GTM", title: "An AI team that does the research", desc: "Research, messaging, Q&A, and contact-recommendation agents, orchestrated by chat — every run logged for review.", tone: "violet" as Tone },
  { icon: Users, tag: "GTM", title: "Four-role RBAC, real workspaces", desc: "Multi-tenant workspaces, OTP signup, member management, and manager attribution on what's actually working.", tone: "teal" as Tone },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHead eyebrow="Features" title="Built for real sales teams, not a demo" />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={f.title}
            onMouseMove={onSpotlightMove}
            onPointerMove={onTilt}
            onPointerLeave={onTiltLeave}
            style={d((i % 3) * 90)}
            className="reveal spotlight-card tilt group overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="relative">
              <div className="flex items-center justify-between">
                <IconBox icon={f.icon} tone={f.tone} />
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${layerTone[f.tag]}`}>{f.tag}</span>
              </div>
              <h3 className="mt-5 font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
export function FinalCTA() {
  return (
    <CtaBand
      title="Know who to call. Know what to say. Know when."
      copy="See both products on your own ICP in a 30-minute walkthrough."
      primary={{ to: "/demo", label: "Book a demo" }}
    />
  );
}

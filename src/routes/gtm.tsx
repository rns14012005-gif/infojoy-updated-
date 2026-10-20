import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LayoutGrid, Target, Radio, Bot, Send, Users, Check, RotateCcw, ShieldCheck, FileSearch, PenLine, RefreshCw } from "lucide-react";
import { CtaBand, Faq, GhostLink, HowFlow, PageHero, PageShell, PrimaryLink, SectionHead, IconBox, d, type Tone } from "@/components/site/PageKit";
import { onSpotlightMove, onTilt, onTiltLeave } from "@/hooks/use-reveal";

export const Route = createFileRoute("/gtm")({
  head: () => ({
    meta: [
      { title: "InfoJoy GTM — AI outreach with a human approval gate" },
      { name: "description", content: "GTM scores accounts against your ICP, tracks buying signals, researches with AI agents, and runs outreach — nothing sends without your approval." },
      { property: "og:title", content: "InfoJoy GTM — AI agents for signal-based selling" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GtmPage,
});

const GROUPS: { n: string; tag: string; icon: typeof Bot; tone: Tone; title: string; copy: string }[] = [
  { n: "01", tag: "Account intelligence", icon: LayoutGrid, tone: "primary", title: "Know your accounts cold", copy: "Central account database with custom fields, CSV import, deduplication, and an Account 360 view — every contact, signal, agent run, and touch on one page." },
  { n: "02", tag: "ICP scoring & discovery", icon: Target, tone: "violet", title: "Rank by fit, not by alphabet", copy: "Define your ICP once. GTM scores every account against it, finds look-alikes, and surfaces new matches daily so reps start each morning with a ranked queue." },
  { n: "03", tag: "Signals", icon: Radio, tone: "coral", title: "Catch the moment it happens", copy: "Funding rounds, leadership changes, tech-stack shifts, hiring spikes — tracked per account and pushed as alerts, so outreach lands with a reason." },
  { n: "04", tag: "AI agents", icon: Bot, tone: "violet", title: "Research that writes itself down", copy: "Research, messaging, Q&A, and contact-recommendation agents, orchestrated by chat. Every run is logged and reviewable — no black boxes." },
  { n: "05", tag: "Outreach", icon: Send, tone: "teal", title: "Personalized at scale, approved by you", copy: "Campaigns, cadences, AI-drafted personalized emails, call scripts, a dialer, and a shared inbox — all behind a human approval gate. Nothing sends on its own." },
  { n: "06", tag: "Workspace & team", icon: Users, tone: "primary", title: "Built for teams, not seats", copy: "Multi-tenant workspaces, OTP signup, four-role RBAC, member management, and manager attribution on which sequences actually book meetings." },
];

const QUEUE = [
  { who: "Fernwood Capital · intro email", signal: "Series B announced", action: "Approve", done: "Approved" },
  { who: "Quartzline · follow-up 2", signal: "pricing page revisit", action: "Edit", done: "Edited & approved" },
  { who: "Helios Systems · call script", signal: "new VP Engineering", action: "Review", done: "Reviewed & approved" },
];

const FLOW = [
  { icon: Target, title: "Score", tag: "ICP", desc: "Describe your best customer once. GTM turns it into a living scoring model and ranks every account by fit." },
  { icon: FileSearch, title: "Research", tag: "AI agents", desc: "Agents read signals, tech stacks, and news for each account. Every run is logged and reviewable — no black boxes." },
  { icon: PenLine, title: "Personalize", tag: "AI agents", desc: "Messaging agents draft outreach grounded in that research, per contact, in your voice." },
  { icon: ShieldCheck, title: "Approve", tag: "Human gate", desc: "Every draft stops in a review queue. Approve, edit, or reject — the agent learns from your edit." },
  { icon: Send, title: "Send", tag: "Outreach", desc: "Cadences, call scripts, and a shared inbox run the approved touches, synced two-way with your CRM." },
  { icon: RefreshCw, title: "Learn", tag: "Loop", desc: "Replies, meetings, and losses feed back into scoring, so every cycle targets better than the last." },
];

const FAQS = [
  { q: "What is InfoJoy GTM?", a: "InfoJoy GTM is an AI-powered go-to-market platform that scores accounts against your ICP, researches them with logged AI agents, and runs personalized outreach — every send gated by human approval." },
  { q: "Do I need InfoJoy Search to use GTM?", a: "No — GTM works on accounts you import via CSV or CRM sync. Pairing it with Search means new accounts flow in automatically with verified contact data attached." },
  { q: "Can the AI send emails on its own?", a: "No. Agents research and draft; every message stops at a review queue where a human approves, edits, or rejects it before it sends." },
  { q: "How are agent runs audited?", a: "Every agent run is logged with its inputs, sources, and output, and is reviewable from the Account 360 view — no black-box actions." },
];

function ApprovalGate() {
  const [done, setDone] = useState<Set<number>>(new Set());
  const pending = QUEUE.length - done.size;
  return (
    <div className="reveal overflow-hidden rounded-3xl border border-border bg-card shadow-[0_40px_80px_-40px] shadow-primary/25" style={d(120)}>
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-6 py-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" strokeWidth={1.75} />
          Review queue · <span key={pending} className="pop-in inline-block tabular-nums">{pending}</span> pending
        </p>
        {done.size > 0 && (
          <button onClick={() => setDone(new Set())} className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition hover:text-foreground">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        )}
      </div>
      <ul className="divide-y divide-border">
        {QUEUE.map((q, i) => {
          const ok = done.has(i);
          return (
            <li key={q.who} className={`flex flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors duration-500 ${ok ? "bg-teal/5" : ""}`}>
              <div>
                <p className="text-sm font-medium text-foreground">{q.who}</p>
                <p className="text-xs text-muted-foreground">Signal: {q.signal}</p>
              </div>
              {ok ? (
                <span className="pop-in inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1.5 text-xs font-semibold text-teal">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} /> {q.done}
                </span>
              ) : (
                <button
                  onClick={() => setDone((p) => new Set(p).add(i))}
                  className="btn-sweep rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition hover:-translate-y-0.5 active:scale-95"
                >
                  {q.action}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function GtmPage() {
  return (
    <PageShell>
      <PageHero
        crumb="InfoJoy GTM"
        eyebrow="InfoJoy GTM · The action layer"
        title="An AI GTM team."
        accent="A human approval gate."
        copy="GTM scores accounts against your ICP, tracks buying signals, researches with AI agents, and runs personalized outreach across email and calls — and nothing sends without your approval."
      >
        <PrimaryLink to="/demo">Book a demo</PrimaryLink>
        <GhostLink href="#groups">See the platform</GhostLink>
      </PageHero>

      <section id="groups" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <SectionHead eyebrow="Capabilities" title="Six capability groups" sub="From raw account list to booked meeting — every step is a screen in the product." />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g, i) => (
            <article
              key={g.n}
              onMouseMove={onSpotlightMove}
              onPointerMove={onTilt}
              onPointerLeave={onTiltLeave}
              style={d((i % 3) * 100)}
              className="reveal spotlight-card tilt group overflow-hidden rounded-3xl border border-border bg-card p-7 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="relative">
                <span className="absolute -right-1 -top-2 text-6xl font-semibold tracking-tighter text-foreground/[0.05] transition-colors duration-300 group-hover:text-primary/15">{g.n}</span>
                <IconBox icon={g.icon} tone={g.tone} />
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{g.n} · {g.tag}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-transparent via-accent/40 to-transparent py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <SectionHead align="left" eyebrow="The approval gate" title="AI drafts. Humans decide." />
            <p className="reveal mt-5 max-w-md leading-relaxed text-muted-foreground" style={d(200)}>
              Every message an agent writes stops at a review queue before it reaches a prospect. Approve, edit, or reject — the agent learns from the edit. This is why legal teams sign off and reps trust the system.
            </p>
            <p className="reveal mt-4 text-xs text-muted-foreground" style={d(260)}>Try it — click a button on the queue.</p>
          </div>
          <ApprovalGate />
        </div>
      </section>

      <section id="integrations" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-24 text-center">
        <SectionHead eyebrow="Integrations" title="Plays well with your stack" sub="Two-way sync with Salesforce and HubSpot: auto-push new accounts and contacts, pull opportunity status back for attribution, and suppress anything already owned. CSV in and out everywhere else." />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {["Salesforce", "HubSpot", "CSV import / export", "Email & dialer"].map((t, i) => (
            <span key={t} style={d(i * 90)} className="reveal rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">{t}</span>
          ))}
        </div>
      </section>

      <HowFlow id="how" title="From account list to booked meeting" sub="The six moves every account makes inside InfoJoy GTM." steps={FLOW} />

      <Faq items={FAQS} />
      <CtaBand
        title="See GTM on your own ICP"
        primary={{ to: "/demo", label: "Book a demo" }}
        secondary={{ to: "/search", label: "Explore InfoJoy Search" }}
      />
    </PageShell>
  );
}

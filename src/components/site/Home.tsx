import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { Quote, AlertTriangle, Database, Brain, Send, Check } from "lucide-react";
import { onSpotlightMove, onTilt, onTiltLeave, useCountUp } from "@/hooks/use-reveal";
import { Faq, SectionHead, d } from "./PageKit";

/* ---------- Problem statement ---------- */
export function Problem() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <span className="reveal mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-coral/10 text-coral">
        <AlertTriangle className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <h2 className="reveal mt-6 text-3xl font-semibold tracking-[-0.03em] text-balance text-foreground md:text-5xl" style={d(80)}>
        Your reps spend hours researching accounts that were never going to buy.
      </h2>
      <p className="reveal mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty" style={d(160)}>
        Stale lists, duplicate records, and no signal on who is actually in-market. InfoJoy replaces guesswork with a system: verified data, ICP scoring, AI research, and outreach that never sends without your approval.
      </p>
    </section>
  );
}

/* ---------- One pipeline, end to end ---------- */
const nodes = [
  { icon: Database, title: "Search finds them", copy: "310M+ profiles, scanned against your filters.", tone: "bg-primary/10 text-primary" },
  { icon: Brain, title: "GTM scores and researches them", copy: "Every account ranked against your ICP.", tone: "bg-violet/10 text-violet" },
  { icon: Send, title: "Outreach goes out approved", copy: "Each send waits for a human yes.", tone: "bg-teal/10 text-teal" },
];

const v = (ms: number) => ({ "--dly": `${ms}ms` }) as CSSProperties;

function PipelineVisual({ i }: { i: number }) {
  if (i === 0)
    return (
      <div aria-hidden className="mx-auto grid w-fit grid-cols-6 gap-2">
        {Array.from({ length: 18 }).map((_, k) => (
          <span key={k} className="scan-dot h-2.5 w-2.5 rounded-full bg-primary" style={v(((k % 6) + Math.floor(k / 6)) * 220)} />
        ))}
      </div>
    );
  if (i === 1)
    return (
      <div aria-hidden className="relative mx-auto grid h-[76px] w-[76px] place-items-center">
        <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90">
          <circle cx="32" cy="32" r="26" fill="none" strokeWidth="5" className="stroke-border" />
          <circle cx="32" cy="32" r="26" fill="none" strokeWidth="5" strokeLinecap="round" strokeDasharray="163.4" className="ring-loop stroke-violet" style={{ "--c": 163.4, "--o": 21.2 } as CSSProperties} />
        </svg>
        <span className="text-sm font-semibold tabular-nums text-foreground">ICP fit</span>
      </div>
    );
  return (
    <ul aria-hidden className="mx-auto w-full max-w-[170px] space-y-2">
      {[0, 1, 2].map((k) => (
        <li key={k} className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5">
          <span className="h-1.5 flex-1 rounded-full bg-border" />
          <span className="tick-loop grid h-4 w-4 place-items-center rounded-full bg-teal text-primary-foreground" style={v(k * 500)}>
            <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Pipeline() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHead eyebrow="End to end" title="One pipeline, end to end" sub="Watch a list move from raw database to approved outreach." />
      <div className="mt-14 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {nodes.map((n, i) => (
          <div key={n.title} className="contents">
            <div className="reveal group flex h-full flex-col rounded-3xl border border-border bg-card p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5" style={d(i * 140)}>
              <span className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${n.tone} transition-transform duration-300 group-hover:scale-110`}>
                <n.icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <p className="mt-4 font-semibold text-foreground">{n.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{n.copy}</p>
              <div className="mt-6 flex flex-1 items-center justify-center rounded-2xl border border-border/70 bg-background/60 px-4 py-6">
                <PipelineVisual i={i} />
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div aria-hidden className="relative mx-auto h-8 w-px bg-border md:h-px md:w-20">
                {[0, 1, 2].map((k) => (
                  <span key={k} className="flow-dot hidden md:block" style={{ animationDelay: `${i * 0.6 + k * 1.05}s` }} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="reveal mt-10 text-center text-sm text-muted-foreground" style={d(200)}>
        Works with Salesforce and HubSpot — CRM auto-push and two-way sync.{" "}
        <Link to="/gtm" hash="integrations" className="link-underline font-medium text-foreground">See integrations →</Link>
      </p>
    </section>
  );
}

/* ---------- Testimonials ---------- */
const testimonials = [
  { quote: "We sell custom software — every deal starts with finding the right CTO at the right moment. InfoJoy Search cut our list-building from days to an afternoon, and the leads actually reply.", initials: "MH", name: "Marcus Halloran", role: "VP of Sales", company: "Devbay" },
  { quote: "As a growing consumer brand we needed distributors and marina partners, not a generic database. The filters found exactly our niche, and the approval gate kept every message on-brand.", initials: "PN", name: "Priya Nadkarni", role: "Head of Growth", company: "BoatDrinx" },
  { quote: "Our pipeline depends on reaching IT leaders evaluating cloud and security partners. InfoJoy GTM surfaces in-market accounts and drafts the research — our team just reviews and sends.", initials: "DO", name: "David Okafor", role: "Director of Business Development", company: "Cloud Secure Group" },
];

export function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-transparent via-accent/40 to-transparent py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="Customers" title="What our clients say" />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              onMouseMove={onSpotlightMove}
              onPointerMove={onTilt}
              onPointerLeave={onTiltLeave}
              style={d(i * 120)}
              className="reveal spotlight-card tilt group flex flex-col rounded-3xl border border-border bg-card p-7 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="relative flex flex-1 flex-col">
                <Quote className="h-7 w-7 text-primary/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-primary/60" strokeWidth={1.5} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-violet text-xs font-semibold text-primary-foreground">{t.initials}</span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role} · {t.company}</span>
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ROI ---------- */
export function Roi() {
  const a = useCountUp(6);
  const b = useCountUp(9);
  const z = useCountUp(0);
  const cards = [
    { big: <><span ref={a}>0</span>–<span ref={b}>0</span> hrs</>, copy: "of manual account research replaced per rep, per week, by logged AI agent runs." },
    { big: <span ref={z}>0</span>, copy: "duplicate or do-not-contact sends — suppression matches every list against your CRM before export." },
    { big: <>First</>, copy: "to reach in-market accounts — intent spike alerts fire while buyers are still researching quietly." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHead
        eyebrow="The ROI case"
        title="Where the return actually comes from"
        sub={'Not vague "efficiency." Three measurable line items: research hours reclaimed, wasted outreach eliminated, and in-market accounts reached before competitors.'}
      />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <div key={i} style={d(i * 120)} className="reveal group rounded-3xl border border-border bg-card p-8 transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5">
            <p className="bg-gradient-to-br from-primary to-violet bg-clip-text text-5xl font-semibold tracking-tight text-transparent tabular-nums">{c.big}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Home FAQ ---------- */
const faqs = [
  { q: "What is InfoJoy?", a: "InfoJoy is a B2B go-to-market platform combining InfoJoy Search, a 310M+ profile contact and account database, with InfoJoy GTM, an AI-powered platform for account scoring, research, and outreach automation with a human approval gate." },
  { q: "What is the difference between Search and GTM?", a: "Search is the data layer: list building, filters, suppression, saved searches, and buyer intent. GTM is the intelligence and action layer: ICP scoring, AI research agents, cadences, and outreach. They work as one pipeline but are sold separately." },
  { q: "Can I use Search on its own?", a: "Yes. Search works standalone for list building and export — many teams start there and add GTM when they want scoring, agents, and outreach on top of the same data." },
  { q: "Does anything send without approval?", a: "No. Every AI-drafted message passes through an approval gate before it reaches a prospect. Agents research and draft; humans decide." },
  { q: "Which CRMs does InfoJoy integrate with?", a: "Salesforce and HubSpot, with CRM auto-push and suppression matching. CSV import and export work everywhere." },
  { q: "How fresh and accurate is the data?", a: "Records refresh on a schedule and every record carries an accuracy score, so you can filter exports by confidence instead of hoping." },
  { q: "Is InfoJoy compliant with GDPR and CCPA?", a: "Yes. InfoJoy operates under a published Privacy Policy, a CCPA Privacy Statement, and a Remove My Profile process, with suppression files honoring every removal request." },
  { q: "How long does onboarding take?", a: "Most teams run their first suppression-safe export the same day. Connecting a CRM and tuning the ICP scoring model typically takes under a week." },
  { q: "Is there a free trial?", a: "Demos run on your own ICP with live data — the fastest way to evaluate. Trial access is arranged through sales after the walkthrough." },
  { q: "How do I remove my own profile from the database?", a: "Submit your email on the Remove My Profile page or write to hello@marketjoy.com — we verify your identity and suppress your data from all output." },
];

export function HomeFaq() {
  return <Faq items={faqs} />;
}

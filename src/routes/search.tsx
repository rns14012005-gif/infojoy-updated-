import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, ShieldCheck, Filter, Save, Radar, Check, BadgeCheck, BellRing, Upload } from "lucide-react";
import { CtaBand, Faq, GhostLink, HowFlow, PageHero, PageShell, PrimaryLink, SectionHead, IconBox, d, type Tone } from "@/components/site/PageKit";
import { onSpotlightMove, useCountUp, useTween } from "@/hooks/use-reveal";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "InfoJoy Search — 310M+ B2B profiles, 25+ filters deep" },
      { name: "description", content: "List building, suppression, saved searches, and buyer intent on 310M+ verified profiles." },
      { property: "og:title", content: "InfoJoy Search — verified B2B contact and company database" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

const MODULES: { icon: typeof Filter; tone: Tone; tag: string; title: string; copy: string; chips: string[] }[] = [
  { icon: ListChecks, tone: "primary", tag: "List building", title: "Build the list. Skip the guesswork.", copy: "Bulk list building at real scale without losing specificity. Every record carries an accuracy score, data is refreshed on a schedule, and lists export to CSV or push straight to your CRM.", chips: ["Bulk building", "Refreshed data", "CRM / CSV export", "Accuracy scoring"] },
  { icon: ShieldCheck, tone: "teal", tag: "Suppression", title: "Never email the same person twice.", copy: "Match every new list against your CRM and uploaded lists, manage do-not-contact records, and dedupe automatically. Sender reputation stays protected with zero manual scrubbing.", chips: ["CRM matching", "Do-not-contact lists", "Auto dedupe"] },
  { icon: Filter, tone: "violet", tag: "25+ filters", title: "Niche isn't a problem. It's the point.", copy: "Firmographic, demographic, technographic, and behavioral filters — combinable, savable, shareable. This much filtering at this scale is rare, and it's why recruiters and niche sellers start here.", chips: ["Firmographic", "Demographic", "Technographic", "Behavioral", "Saved combinations"] },
  { icon: Save, tone: "primary", tag: "Saved searches", title: "Set it once. Get leads forever.", copy: "Any search re-runs on a schedule, alerts you to new matches, and shares across the team. A one-time search becomes a standing lead source.", chips: ["Scheduled re-run", "New-match alerts", "Team sharing"] },
  { icon: Radar, tone: "coral", tag: "Buyer intent", title: "Reach them before they raise a hand.", copy: "Intent scoring and topic tracking built on InfoJoy's own data — not bolted on from a third party. Spike alerts flag accounts researching your category while they're still quiet.", chips: ["Intent scoring", "Topic tracking", "Spike alerts"] },
];

const FLOW = [
  { icon: Filter, title: "Filter", tag: "Describe", desc: "Combine 25+ firmographic, demographic, technographic, and behavioral filters to describe your exact buyer — niche is the point." },
  { icon: ShieldCheck, title: "Dedupe", tag: "Protect", desc: "New lists are matched against your CRM, uploaded lists, and do-not-contact records, so nobody gets emailed twice." },
  { icon: BadgeCheck, title: "Verify", tag: "Trust", desc: "Every record carries an accuracy score. Filter exports by confidence instead of hoping the data is good." },
  { icon: BellRing, title: "Save & alert", tag: "Automate", desc: "Save the search and it re-runs on a schedule, alerting you to new matches and buyer-intent spikes." },
  { icon: Upload, title: "Push", tag: "Activate", desc: "Export to CSV or push straight to your CRM, and hand the list to GTM for scoring, research, and outreach." },
];

const FAQS = [
  { q: "What is InfoJoy Search?", a: "InfoJoy Search is a B2B contact and account database with 310M+ verified profiles, sliced by 25+ filters, with suppression, saved searches, and buyer intent built in." },
  { q: "How fresh is the data?", a: "Records refresh on a schedule and every record carries an accuracy score, so you can filter exports by confidence rather than hoping." },
  { q: "Can I export to my CRM?", a: "Yes — push lists to Salesforce or HubSpot, or export CSV for anything else." },
  { q: "What's the difference between saved searches and buyer intent?", a: "Saved searches alert you when new records match your criteria. Buyer intent alerts you when existing accounts start actively researching your category. Most teams use both." },
];

/* Interactive filter demo — illustrative numbers only. */
const FILTERS = [
  { label: "Industry: Logistics", f: 0.06 },
  { label: "200–1,000 employees", f: 0.28 },
  { label: "Uses Salesforce", f: 0.22 },
  { label: "Hiring RevOps", f: 0.05 },
  { label: "North America", f: 0.34 },
];
const SAMPLE = [
  { n: "Northwind Logistics", s: 94 },
  { n: "Halcyon Health", s: 88 },
  { n: "Vantage Robotics", s: 81 },
  { n: "Meridian Bank", s: 73 },
];

function FilterDemo() {
  const [on, setOn] = useState<Set<number>>(new Set());
  const total = 310_000_000;
  const count = Math.max(1, Math.round([...on].reduce((acc, i) => acc * FILTERS[i]!.f, total)));
  const shown = useTween(count, 800);
  const pct = Math.max(2, (Math.log10(shown) / Math.log10(total)) * 100);
  const toggle = (i: number) =>
    setOn((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <div className="reveal mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-[0_40px_80px_-40px] shadow-primary/25">
      <div className="border-b border-border bg-muted/50 px-6 py-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Try the filters</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {FILTERS.map((f, i) => {
            const active = on.has(i);
            return (
              <button
                key={f.label}
                onClick={() => toggle(i)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition duration-200 active:scale-95 ${
                  active ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30" : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >
                {active && <Check className="pop-in h-3 w-3" strokeWidth={3} />}
                {f.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid gap-6 p-6 md:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-sm text-muted-foreground">Matching profiles</p>
          <p className="mt-1 text-5xl font-semibold tracking-tight text-foreground tabular-nums">{Math.round(shown).toLocaleString("en-US")}</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-violet transition-[width] duration-700 ease-out" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Illustrative figures — your live counts come from the real database in a demo.</p>
        </div>
        <ul className="space-y-2">
          {SAMPLE.map((r, i) => (
            <li key={`${r.n}-${on.size}`} className="row-in flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm" style={{ "--row-delay": `${i * 70}ms` } as React.CSSProperties}>
              <span className="font-medium text-foreground">{r.n}</span>
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary tabular-nums">{Math.min(99, r.s + on.size * 2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function QbrStat({ value, suffix, text, label }: { value?: number; suffix?: string; text?: string; label: string }) {
  const ref = useCountUp(value ?? 0);
  return (
    <div className="reveal rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
      <p className="bg-gradient-to-br from-primary to-violet bg-clip-text text-4xl font-semibold tracking-tight text-transparent tabular-nums">
        {text ?? (<><span ref={ref}>0</span>{suffix}</>)}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function SearchPage() {
  return (
    <PageShell>
      <PageHero
        crumb="InfoJoy Search"
        eyebrow="InfoJoy Search · The data layer"
        title="310M+ verified profiles,"
        accent="on demand."
        copy="A B2B contact and account database built for precision, not volume. Slice it by 25+ filters, dedupe it against your CRM, and turn any search into a standing lead source."
      >
        <PrimaryLink to="/demo">Book a demo</PrimaryLink>
        <GhostLink href="#modules">See the five modules</GhostLink>
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <FilterDemo />
      </section>

      <section id="modules" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <SectionHead eyebrow="Modules" title="Five modules, one database" sub="Parallel, not sequential — start with the one that solves today's problem." />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {MODULES.map((m, i) => (
            <article
              key={m.tag}
              onMouseMove={onSpotlightMove}
              style={d((i % 2) * 120)}
              className={`reveal spotlight-card group overflow-hidden rounded-3xl border border-border bg-card p-8 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 ${i === 2 ? "md:col-span-2" : ""}`}
            >
              <div className="relative">
                <div className="flex items-center gap-3">
                  <IconBox icon={m.icon} tone={m.tone} />
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.tag}</p>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">{m.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{m.copy}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {m.chips.map((c, k) => (
                    <li key={c} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition duration-300 group-hover:border-primary/30 group-hover:bg-primary/5" style={{ transitionDelay: `${k * 40}ms` }}>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead eyebrow="Trust" title="Data you can defend in a QBR" sub="Every record carries an accuracy score. Refreshes run on a schedule, not “periodically.” When a rep asks where a contact came from, there's an answer." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <QbrStat value={310} suffix="M+" label="verified contact and account profiles" />
          <QbrStat value={25} suffix="+" label="combinable filters across four categories" />
          <QbrStat text="Per-record" label="accuracy scoring on every export" />
        </div>
      </section>

      <HowFlow id="how" title="From filter to pipeline in five moves" sub="What happens to a list inside InfoJoy Search — start to finish." steps={FLOW} />

      <Faq items={FAQS} />
      <CtaBand
        title="Search finds them. GTM closes them."
        copy="Add InfoJoy GTM to score, research, and reach the accounts Search surfaces — with a human approval gate on every send."
        primary={{ to: "/demo", label: "Book a demo" }}
        secondary={{ to: "/gtm", label: "Explore InfoJoy GTM" }}
      />
    </PageShell>
  );
}

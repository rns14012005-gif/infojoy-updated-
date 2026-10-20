import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Faq, PageHero, PageShell, d } from "@/components/site/PageKit";
import { onSpotlightMove, onTilt, onTiltLeave, useTween } from "@/hooks/use-reveal";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "InfoJoy Pricing — plans for every revenue team" },
      { name: "description", content: "InfoJoy GTM plans from $159/month — save 20% billed annually." },
      { property: "og:title", content: "InfoJoy GTM pricing" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

type Plan = { name: string; blurb: string; annual: number | null; cta: string; popular?: boolean; features: string[] };

// Annual prices are published. Monthly = annual / 0.8 (the 20% annual discount), rounded — verify against your billing.
const PLANS: Plan[] = [
  { name: "Launch", blurb: "For small teams starting agent-led outreach.", annual: 159, cta: "Choose Launch", features: ["5,000 credits / month", "2 users", "Account database with Account 360", "ICP scoring", "Research & messaging agents", "CSV import & export"] },
  { name: "Growth", blurb: "For revenue teams running full-funnel GTM.", annual: 479, cta: "Start with Growth", popular: true, features: ["20,000 credits / month", "5 users", "Everything in Launch", "Signal tracking & daily discovery", "Cadences, dialer, shared inbox", "Salesforce & HubSpot two-way sync"] },
  { name: "Accelerate", blurb: "For scaling sales orgs across regions.", annual: 1199, cta: "Choose Accelerate", features: ["75,000 credits / month", "25 users", "Everything in Growth", "API access & bulk enrichment", "Team workspaces & shared lists", "Priority support"] },
  { name: "Enterprise", blurb: "For orgs with security & scale requirements.", annual: null, cta: "Contact sales", features: ["Custom credit volumes", "Custom user seats", "SSO & security review", "Sandbox environment", "Dedicated support & onboarding", "Custom data residency"] },
];

const FAQS = [
  { q: "Can I switch plans later?", a: "Yes — move between plans at any billing cycle. Unused credits from the current cycle carry over for one month after an upgrade." },
  { q: "How does the annual discount work?", a: "Annual plans are billed once per year and save 20% versus monthly — $159/month on Launch, $479/month on Growth and $1,199/month on Accelerate. Credit volumes and users stay the same." },
  { q: "What counts as a credit?", a: "One credit reveals one contact's verified email and phone, or runs one AI research pass on an account. Viewing, filtering, and saving searches are free." },
  { q: "What happens if I run out of credits?", a: "You keep full access to the platform and can top up mid-cycle at your plan's rate, or upgrade to the next tier and keep going." },
  { q: "Is there a free trial?", a: "Demos run on your own ICP with live data — the fastest way to evaluate. Trial access is arranged through sales after the walkthrough." },
];

function Price({ value }: { value: number }) {
  const v = useTween(value, 600);
  return <>${Math.round(v).toLocaleString("en-US")}</>;
}

function PricingPage() {
  const [annual, setAnnual] = useState(true);
  return (
    <PageShell>
      <PageHero
        crumb="Pricing"
        eyebrow="Credit-based plans"
        title="InfoJoy GTM"
        accent="pricing"
        copy="Credit-based plans for signal-led outbound. Pick the credit volume your team needs — every plan includes the account database, ICP scoring, and AI research agents."
      >
        <div className="relative inline-grid grid-cols-2 rounded-full border border-border bg-card p-1 shadow-sm" role="group" aria-label="Billing period">
          <span
            aria-hidden
            className="absolute bottom-1 top-1 rounded-full bg-primary shadow-md shadow-primary/30 transition-all duration-300 ease-out"
            style={{ left: annual ? "50%" : "4px", right: annual ? "4px" : "50%" }}
          />
          {[{ v: false, l: "Monthly" }, { v: true, l: "Annual · save 20%" }].map((o) => (
            <button
              key={o.l}
              onClick={() => setAnnual(o.v)}
              aria-pressed={annual === o.v}
              className={`relative z-10 whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors ${annual === o.v ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {o.l}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((p, i) => {
            const monthly = p.annual ? (annual ? p.annual : Math.round(p.annual / 0.8)) : null;
            return (
              <div
                key={p.name}
                onMouseMove={onSpotlightMove}
                onPointerMove={onTilt}
                onPointerLeave={onTiltLeave}
                style={d(i * 90)}
                className={`reveal spotlight-card tilt relative flex flex-col rounded-3xl p-7 hover:shadow-2xl hover:shadow-primary/10 ${
                  p.popular ? "glow-border bg-card" : "border border-border bg-card"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 right-6 z-10 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">Most popular</span>
                )}
                <div className="relative flex flex-1 flex-col">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">InfoJoy GTM</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{p.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                  <div className="mt-6 min-h-[4.5rem]">
                    {monthly !== null ? (
                      <>
                        <p className="text-4xl font-semibold tracking-tight text-foreground tabular-nums">
                          <Price value={monthly} />
                          <span className="ml-1 text-sm font-normal text-muted-foreground">/ month</span>
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {annual ? `Save 20%, billed annually ($${(p.annual! * 12).toLocaleString("en-US")}/yr)` : "Billed monthly"}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-4xl font-semibold tracking-tight text-foreground">Custom</p>
                        <p className="mt-1 text-xs text-muted-foreground">Priced to your usage</p>
                      </>
                    )}
                  </div>
                  <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-foreground">
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/demo"
                    className={`btn-sweep mt-8 inline-flex h-11 items-center justify-center rounded-xl text-sm font-medium transition hover:-translate-y-0.5 ${
                      p.popular ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "border border-border hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {p.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <p className="reveal mt-8 text-center text-sm text-muted-foreground">
          Need higher credit volumes, SSO, or a security review? Enterprise plans are priced to your usage.{" "}
          <Link to="/demo" className="link-underline font-medium text-foreground">Contact sales →</Link>
        </p>
      </section>

      <Faq title="Pricing questions" items={FAQS} />
    </PageShell>
  );
}

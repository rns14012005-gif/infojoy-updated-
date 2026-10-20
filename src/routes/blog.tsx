import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import { CtaBand, Faq, PageHero, PageShell, d } from "@/components/site/PageKit";
import { onSpotlightMove } from "@/hooks/use-reveal";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "InfoJoy Blog — B2B data and GTM insights" },
      { name: "description", content: "Field lessons from revenue teams using InfoJoy — sourcing, scoring, outreach, and the operations underneath." },
      { property: "og:title", content: "InfoJoy blog — B2B data, GTM strategy, and signal-based selling" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

const FAQS = [
  { q: "What does the InfoJoy blog cover?", a: "Field lessons from revenue teams using InfoJoy \u2014 sourcing, scoring, outreach, and the operations underneath." },
  { q: "How do I see InfoJoy on my own data?", a: "Book a demo. It is a 30-minute walkthrough run live on your own ICP." },
  { q: "What is the difference between InfoJoy Search and GTM?", a: "Search is the data layer \u2014 310M+ verified profiles with 25+ filters, suppression, and buyer intent. GTM scores accounts, researches with AI agents, and runs outreach, with a human approval gate on every send." },
];

function BlogPage() {
  return (
    <PageShell>
      <PageHero
        crumb="Blog"
        eyebrow="Blog"
        title="Notes on data, pipeline,"
        accent="and go-to-market"
        copy="Field lessons from revenue teams using InfoJoy — sourcing, scoring, outreach, and the operations underneath."
      />
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <Link
          to="/blog/b2b-data-platform"
          onMouseMove={onSpotlightMove}
          style={d(0)}
          className="reveal spotlight-card group grid overflow-hidden rounded-3xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 md:grid-cols-[1.1fr_1fr]"
        >
          <div className="relative flex min-h-[220px] flex-col overflow-hidden bg-ink">
            <div aria-hidden className="cta-glow absolute -left-10 -top-10 h-72 w-72 rounded-full bg-primary/50 blur-[90px]" />
            <div aria-hidden className="cta-glow absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-violet/50 blur-[90px]" style={{ animationDelay: "-8s" }} />
            <div aria-hidden className="hero-grid-bg absolute inset-0 opacity-40" />
            <span className="relative m-6 mb-0 inline-block self-start rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">Featured · Platform</span>
            <div className="relative mt-5 flex-1 px-6 pb-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/60">5 dimensions that matter</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  ["01", "Accuracy you can filter on"],
                  ["02", "Expressiveness"],
                  ["03", "Freshness"],
                  ["04", "Compliance"],
                  ["05", "Workflow depth"],
                ].map(([n, label]) => (
                  <li key={n} className="flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-3.5 py-2.5 backdrop-blur-sm transition-colors group-hover:border-primary-foreground/20">
                    <span className="font-mono text-xs font-semibold text-primary-foreground/50">{n}</span>
                    <span className="text-sm font-medium text-primary-foreground">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative p-8 md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-balance text-foreground md:text-3xl">What makes a best-in-class B2B data platform</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Coverage numbers are marketing. The platforms that move pipeline win on five quieter dimensions — accuracy you can filter on, expressiveness, freshness, compliance, and workflow depth.
            </p>
            <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> July 14, 2026 · 10 min read</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              <span className="link-underline">Read the article</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
            </span>
          </div>
        </Link>
      </section>
      <Faq title="About the blog" items={FAQS} />
      <CtaBand title="Know who to call. Know what to say. Know when." copy="See both products on your own ICP in a 30-minute walkthrough." primary={{ to: "/demo", label: "Book a demo" }} />
    </PageShell>
  );
}

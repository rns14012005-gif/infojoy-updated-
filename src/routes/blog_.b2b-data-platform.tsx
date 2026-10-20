import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { CtaBand, Faq, PageShell, d } from "@/components/site/PageKit";

export const Route = createFileRoute("/blog_/b2b-data-platform")({
  head: () => ({
    meta: [
      { title: "What makes a best-in-class B2B data platform — InfoJoy Blog" },
      {
        name: "description",
        content:
          "Coverage numbers are marketing. The platforms that move pipeline win on five quieter dimensions — accuracy you can filter on, expressiveness, freshness, compliance, and workflow depth.",
      },
      { property: "og:title", content: "What makes a best-in-class B2B data platform" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArticlePage,
});

const SECTIONS = [
  {
    id: "accuracy",
    n: "01",
    title: "Accuracy you can filter on",
    body: [
      "Every vendor claims a headline accuracy figure. The number that matters is whether you can act on accuracy inside the product: filter to verified emails only, exclude records not re-confirmed recently, and see where each field came from.",
      "If accuracy is a marketing claim rather than a field on the record, you cannot build a list that respects it. Ask to see verification status, last-verified date, and source at the contact level — then test a sample against your own CRM before you believe anything else.",
    ],
  },
  {
    id: "expressiveness",
    n: "02",
    title: "Expressiveness",
    body: [
      "Your ideal customer is never just “software companies, 200–1,000 employees.” It is the ones hiring a RevOps lead, running a specific tool, and expanding into a new region. A strong platform lets you say that precisely and combine conditions without exporting to a spreadsheet.",
      "Look for firmographic, technographic, hiring, and funding filters that can be stacked, saved, and reused — and a way to describe an audience in plain language when you don't yet know which filters to reach for.",
    ],
  },
  {
    id: "freshness",
    n: "03",
    title: "Freshness",
    body: [
      "B2B data decays constantly: people change roles, companies restructure, domains change. A database that was excellent at purchase is mediocre six months later unless it is continuously re-verified.",
      "The practical test is simple. Pull a list, check it against LinkedIn or your own recent bounces, and note how many people have moved. Then ask how often records are refreshed and whether stale ones are flagged or silently left in.",
    ],
  },
  {
    id: "compliance",
    n: "04",
    title: "Compliance",
    body: [
      "Data you cannot legally use is a liability, not an asset. A best-in-class platform documents where its data comes from, honours opt-outs and suppression requests, and supports regional rules such as GDPR, CCPA, CAN-SPAM, and CASL.",
      "Ask for the process, not the badge: how does a person get removed, how is that removal kept from being re-imported, and what responsibilities sit with you as the customer?",
    ],
  },
  {
    id: "workflow",
    n: "05",
    title: "Workflow depth",
    body: [
      "Finding a contact is the cheapest step in the funnel. The value is in what happens next: scoring accounts by buying signals, deciding who to call first, drafting relevant outreach, and pushing everything into the CRM and sequencer your team already uses.",
      "A platform that stops at export hands the hard part back to your team. One that carries a lead from signal to conversation lets reps spend their time selling instead of stitching tools together.",
    ],
  },
];

const FAQS = [
  { q: "Why not choose a platform on coverage numbers?", a: "Because coverage is marketing. The platforms that move pipeline win on accuracy you can filter on, expressiveness, freshness, compliance, and workflow depth." },
  { q: "How do I test a data platform's accuracy?", a: "Pull a sample list and check it against your own CRM or recent bounces. Look for verification status, last-verified date, and source on each record." },
  { q: "How fast does B2B data go stale?", a: "Constantly \u2014 people change roles and companies restructure. Ask how often records are re-verified and whether stale ones are flagged." },
  { q: "What should I ask about compliance?", a: "Ask about the process, not the badge: where data comes from, how a person is removed, and how that removal is kept from being re-imported." },
];

function ArticlePage() {
  return (
    <PageShell>
      <article>
        <header className="relative overflow-hidden pb-10 pt-32 md:pt-40">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="aurora-1 absolute -top-40 left-[8%] h-[480px] w-[480px] rounded-full bg-primary/20 blur-[120px]" />
            <div className="aurora-2 absolute -top-24 right-[6%] h-[420px] w-[420px] rounded-full bg-violet/20 blur-[120px]" />
            <div className="hero-grid-bg absolute inset-0" />
          </div>
          <div className="mx-auto max-w-3xl px-6">
            <nav aria-label="Breadcrumb" className="reveal flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="link-underline hover:text-foreground">Home</Link>
              <span>›</span>
              <Link to="/blog" className="link-underline hover:text-foreground">Blog</Link>
              <span>›</span>
              <span className="text-foreground">B2B data platform</span>
            </nav>
            <p className="reveal mt-6 inline-block rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur" style={d(60)}>
              Platform
            </p>
            <h1 className="reveal mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-balance text-foreground md:text-5xl" style={d(120)}>
              What makes a best-in-class B2B data platform
            </h1>
            <p className="reveal mt-6 text-lg leading-relaxed text-muted-foreground text-pretty" style={d(180)}>
              Coverage numbers are marketing. The platforms that move pipeline win on five quieter dimensions — accuracy you can filter on, expressiveness, freshness, compliance, and workflow depth.
            </p>
            <p className="reveal mt-6 flex items-center gap-2 text-xs text-muted-foreground" style={d(240)}>
              <Clock className="h-3.5 w-3.5" /> July 14, 2026 · 10 min read
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 pb-12">
          <nav aria-label="In this article" className="reveal rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">In this article</p>
            <ol className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="link-underline text-muted-foreground hover:text-foreground">
                    <span className="mr-2 font-mono text-xs text-primary">{s.n}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 space-y-14">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="reveal scroll-mt-28">
                <p className="font-mono text-xs font-semibold tracking-widest text-primary">{s.n}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance text-foreground md:text-3xl">{s.title}</h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                  {s.body.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <section className="reveal rounded-2xl border border-border bg-card p-8">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">The short version</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                When you evaluate a platform, ignore the biggest number on the pricing page and run your own test: filter on verified data, describe a precise audience, check how many records have gone stale, ask how opt-outs are handled, and follow one lead all the way to a booked meeting.
              </p>
            </section>
          </div>

          <Link to="/blog" className="link-underline mt-14 inline-flex items-center gap-2 text-sm font-medium text-primary">
            <ArrowLeft className="h-4 w-4" strokeWidth={2} /> Back to all articles
          </Link>
        </div>
      </article>
      <Faq title="Choosing a data platform" items={FAQS} />
      <CtaBand title="Know who to call. Know what to say. Know when." copy="See both products on your own ICP in a 30-minute walkthrough." primary={{ to: "/demo", label: "Book a demo" }} />
    </PageShell>
  );
}

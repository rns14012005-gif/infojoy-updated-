import { useEffect, useRef, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Faq, PageHero, PageShell } from "@/components/site/PageKit";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "InfoJoy Legal — Terms, Privacy, Cookie, CCPA" },
      { name: "description", content: "InfoJoy Terms of Service, Privacy Policy, Cookie Policy, CCPA Privacy Statement, and Remove My Profile process." },
      { property: "og:title", content: "InfoJoy legal — terms, privacy, CCPA, and cookie policy" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LegalPage,
});

const FULL = "https://infojoy.com/legal.html";

const DOCS = [
  {
    id: "terms",
    label: "Terms of Service",
    updated: "Last updated: 22 May 2023",
    intro: "MarketJoy, Inc. operates the Service. Using it means you accept these Terms, a legally binding agreement between you and MarketJoy.",
    points: [
      "You must be of legal age of majority where you live (18 in most U.S. states) and keep your account details accurate and confidential.",
      "You receive a non-exclusive, terminable licence to use the Service and Output Data for your own internal business purposes — no reselling, redistribution, or building derivative datasets.",
      "Data you submit is licensed to MarketJoy as described in Section 7; you warrant you have the right to provide it and that it contains no data on under-18s or HIPAA/GLBA-covered client lists.",
      "Output Data may not be used to break the law, including CAN-SPAM, CASL, and TCPA, or for deceptive, hateful, or illegal promotions.",
      "Special terms apply to data about European Data Subjects (Section 12), where you act as controller and MarketJoy as processor.",
      "Disputes go through informal resolution, then binding JAMS arbitration with a class-action waiver (30-day opt-out); governing law is Delaware.",
    ],
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    updated: "",
    intro: "MarketJoy offers a business intelligence platform. This policy describes the information collected to provide the Service and through the website.",
    points: [
      "Service Information comes from Users (their own details and contact lists) and from trusted third-party and public sources.",
      "Website Information is collected automatically through cookies, server logs, web beacons, and JavaScript.",
      "Information is used to provide, analyse, and improve the Service, keep it safe, and tailor advertising and communications.",
      "It may be shared with service providers, business and data partners, corporate affiliates, and where required by law.",
      "Consumers can ask to be removed via the Remove My Profile page; a suppression record is kept so the data is excluded if received again.",
      "European residents have rights to access, correct, delete, object, and withdraw consent; contact hello@marketjoy.com.",
    ],
  },
  {
    id: "cookie",
    label: "Cookie Policy",
    updated: "Last updated: 22 May 2023",
    intro: "We use cookies, pixels, tags, and similar Tracking Technologies to improve navigation, measure performance, and customise your experience.",
    points: [
      "Strictly necessary technologies keep the Service secure and working; they do not need consent.",
      "Functionality technologies remember your choices and login state.",
      "Performance technologies collect aggregated usage statistics for analytics and improvement.",
      "Marketing and social media technologies deliver tailored ads and enable sharing; they are placed by advertisers and platforms.",
      "You can block or delete cookies in your browser settings; we do not respond to Do Not Track signals.",
    ],
  },
  {
    id: "ccpa",
    label: "CCPA Privacy Statement",
    updated: "Last updated: 22 May 2023",
    intro: "This statement supplements the Privacy Policy for California residents under the California Consumer Privacy Act.",
    points: [
      "Business-contact personal information (identifiers, professional and employment information) is collected from public sources, customers, and data vendors.",
      "MarketJoy sells business-contact information from its database to customers for B2B sales, marketing, and recruiting; no sensitive personal information is collected, and no data of under-16s is sold.",
      "California consumers can opt out of sale, request access or portability, and request deletion via the Remove My Profile page or hello@marketjoy.com.",
      "Requests are verified; we aim to respond within 45 days, and exercising CCPA rights will not result in discrimination.",
    ],
  },
];

const TABS = [...DOCS.map((d) => ({ id: d.id, label: d.label })), { id: "remove", label: "Remove My Profile" }];

const FAQS = [
  { q: "Who operates the service?", a: "MarketJoy, Inc. operates the Service. The Terms of Service, Privacy Policy, Cookie Policy, and CCPA statement on this page all come from MarketJoy." },
  { q: "How do I remove my profile?", a: "Use the Remove My Profile tab on this page, or email hello@marketjoy.com. A suppression record is kept so the data is excluded if it is received again." },
  { q: "What are my rights as a European resident?", a: "You have rights to access, correct, delete, object, and withdraw consent. Contact hello@marketjoy.com to exercise them." },
  { q: "Can California residents opt out of the sale of their data?", a: "Yes. California consumers can opt out of sale, request access or portability, and request deletion via the Remove My Profile page or hello@marketjoy.com. Requests are verified, and we aim to respond within 45 days." },
  { q: "Does InfoJoy respond to Do Not Track signals?", a: "No. You can block or delete cookies in your browser settings, but we do not respond to Do Not Track signals." },
];

function RemoveForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    window.location.href = `mailto:hello@marketjoy.com?subject=${encodeURIComponent("Remove My Profile request")}&body=${encodeURIComponent(`Please remove the profile associated with: ${email}`)}`;
    setSent(true);
  }
  if (sent)
    return (
      <div className="pop-in rounded-2xl border border-teal/30 bg-teal/5 p-6 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-teal" strokeWidth={1.5} />
        <p className="mt-3 font-medium text-foreground">Your email is ready to send</p>
        <p className="mt-1 text-sm text-muted-foreground">We will verify your identity and respond in accordance with regulatory guidelines.</p>
      </div>
    );
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-3">
      <label htmlFor="rm-email" className="text-sm font-medium text-foreground">Please enter your email address</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input id="rm-email" name="email" type="email" className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
        <button className="btn-sweep h-12 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5 active:translate-y-0">Submit request</button>
      </div>
      {error && <p role="alert" className="row-in text-xs text-destructive">{error}</p>}
    </form>
  );
}

function LegalPage() {
  const [tab, setTab] = useState("terms");
  const barRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const read = () => {
      const h = window.location.hash.replace("#", "");
      if (TABS.some((t) => t.id === h)) setTab(h);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  useEffect(() => {
    const b = btnRefs.current[tab];
    const bar = barRef.current;
    if (b && bar) {
      bar.style.width = `${b.offsetWidth}px`;
      bar.style.transform = `translateX(${b.offsetLeft}px)`;
    }
  }, [tab]);

  const doc = DOCS.find((x) => x.id === tab);

  return (
    <PageShell>
      <PageHero crumb="Legal" eyebrow="Legal" title="Policies" accent="and terms" />
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="reveal -mx-2 overflow-x-auto px-2">
          <div role="tablist" aria-label="Legal documents" className="relative flex w-max gap-1 border-b border-border">
            {TABS.map((t) => (
              <button
                key={t.id}
                ref={(el) => { btnRefs.current[t.id] = el; }}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => { setTab(t.id); history.replaceState(null, "", `#${t.id}`); }}
                className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${tab === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t.label}
              </button>
            ))}
            <div ref={barRef} aria-hidden className="absolute -bottom-px left-0 h-0.5 rounded-full bg-primary transition-all duration-300 ease-out" />
          </div>
        </div>

        <div key={tab} className="row-in mt-10 rounded-3xl border border-border bg-card p-8 md:p-10">
          {doc ? (
            <>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">{doc.label}</h2>
              {doc.updated && <p className="mt-1 text-xs text-muted-foreground">{doc.updated}</p>}
              <p className="mt-5 leading-relaxed text-muted-foreground">{doc.intro}</p>
              <ul className="mt-6 space-y-3">
                {doc.points.map((p, i) => (
                  <li key={p} className="row-in flex gap-3 text-sm leading-relaxed text-foreground" style={{ "--row-delay": `${i * 60}ms` } as React.CSSProperties}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {p}
                  </li>
                ))}
              </ul>
              <a href={`${FULL}#${doc.id}`} target="_blank" rel="noreferrer" className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                <span className="link-underline">Read the full {doc.label}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">Remove My Profile</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                In compliance with data privacy regulations (e.g. GDPR, CCPA), you may formally request that your information about yourself not be included in any of the services or data output that we offer.
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Once your request is submitted, we will review, process, and respond promptly in accordance with regulatory compliance guidelines. By law, we must verify your identity as part of the data access request.
              </p>
              <div className="mt-6"><RemoveForm /></div>
              <p className="mt-5 text-sm text-muted-foreground">You may also email your request to <a href="mailto:hello@marketjoy.com" className="link-underline text-primary">hello@marketjoy.com</a>.</p>
            </>
          )}
        </div>
      </section>
      <Faq title="Legal questions" items={FAQS} />
    </PageShell>
  );
}

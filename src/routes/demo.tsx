import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Check, CheckCircle2, Loader2 } from "lucide-react";
import { Faq, PageShell, d } from "@/components/site/PageKit";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Book an InfoJoy demo — see it on your own ICP" },
      { name: "description", content: "A 30-minute walkthrough with a solutions engineer, run live against 310M+ profiles." },
      { property: "og:title", content: "Book an InfoJoy demo" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemoPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid work email").max(255),
  company: z.string().trim().min(1, "Please enter your company").max(120),
  interest: z.string().trim().max(60),
  notes: z.string().trim().max(1000).optional(),
});
type Errors = Partial<Record<"name" | "email" | "company", string>>;

const POINTS = [
  "Live search on your real filters, not a canned demo",
  "ICP scoring run on accounts you name",
  "Agent research and the approval gate, end to end",
  "Honest fit assessment — we'll say if we're not it",
];

const inputCls = "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

const FAQS = [
  { q: "What happens in the 30-minute demo?", a: "A solutions engineer walks you through InfoJoy Search and GTM live, on your own filters and ICP rather than a canned script." },
  { q: "Do I need to prepare anything?", a: "No. If you want us to focus on something specific, add it to the notes field in the form and we will prepare it." },
  { q: "Can I see just Search or just GTM?", a: "Yes. Choose Search only, GTM only, or the full platform in the form and we will tailor the walkthrough." },
  { q: "Will I be added to a mailing list?", a: "No. There is no spam and no auto-enrollment \u2014 you get one human reply to your request." },
];

function DemoPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  // No backend is connected yet: validate, then open the visitor's email app addressed to InfoJoy.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) errs[i.path[0] as keyof Errors] = i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setState("sending");
    const v = parsed.data;
    const body = `Name: ${v.name}\nEmail: ${v.email}\nCompany: ${v.company}\nInterested in: ${v.interest}\n\n${v.notes ?? ""}`;
    window.setTimeout(() => {
      window.location.href = `mailto:hello@marketjoy.com?subject=${encodeURIComponent("InfoJoy demo request")}&body=${encodeURIComponent(body)}`;
      setState("sent");
    }, 600);
  }

  const err = (k: keyof Errors) => errors[k] && <p role="alert" className="row-in mt-1 text-xs text-destructive">{errors[k]}</p>;

  return (
    <PageShell>
      <section className="relative overflow-hidden pb-24 pt-32 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="aurora-1 absolute -top-40 left-[5%] h-[480px] w-[480px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="aurora-2 absolute top-10 right-[5%] h-[420px] w-[420px] rounded-full bg-violet/20 blur-[120px]" />
          <div className="hero-grid-bg absolute inset-0" />
        </div>
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <p className="reveal inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="status-pulse h-1.5 w-1.5 rounded-full bg-teal" /> 30-minute walkthrough
            </p>
            <h1 className="reveal mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-balance text-foreground md:text-6xl" style={d(80)}>
              See InfoJoy on <span className="animate-gradient-text bg-gradient-to-r from-primary via-violet via-coral to-primary bg-clip-text text-transparent">your own ICP</span>
            </h1>
            <p className="reveal mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground" style={d(160)}>
              A 30-minute walkthrough with a solutions engineer. Bring a target account list or just your ICP definition — we run it live against 310M+ profiles.
            </p>
            <ul className="mt-8 space-y-4">
              {POINTS.map((t, i) => (
                <li key={t} className="reveal flex items-start gap-3 text-foreground" style={d(240 + i * 90)}>
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Check className="h-3.5 w-3.5" strokeWidth={2.5} /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal rounded-3xl border border-border bg-card p-7 shadow-[0_40px_80px_-40px] shadow-primary/25 md:p-9" style={d(200)}>
            {state === "sent" ? (
              <div className="pop-in py-10 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-teal" strokeWidth={1.5} />
                <h2 className="mt-4 text-2xl font-semibold text-foreground">Your email is ready to send</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  We opened your email app with your details. If nothing opened, write to{" "}
                  <a href="mailto:hello@marketjoy.com" className="link-underline text-primary">hello@marketjoy.com</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Full name</label>
                  <input id="name" name="name" autoComplete="name" className={inputCls} />
                  {err("name")}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Work email</label>
                  <input id="email" name="email" type="email" autoComplete="email" className={inputCls} />
                  {err("email")}
                </div>
                <div>
                  <label htmlFor="company" className="text-sm font-medium text-foreground">Company</label>
                  <input id="company" name="company" autoComplete="organization" className={inputCls} />
                  {err("company")}
                </div>
                <div>
                  <label htmlFor="interest" className="text-sm font-medium text-foreground">I'm interested in</label>
                  <select id="interest" name="interest" className={inputCls} defaultValue="Search + GTM (full platform)">
                    <option>Search + GTM (full platform)</option>
                    <option>InfoJoy Search only</option>
                    <option>InfoJoy GTM only</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="notes" className="text-sm font-medium text-foreground">Anything we should prepare? <span className="text-muted-foreground">(optional)</span></label>
                  <textarea id="notes" name="notes" rows={3} className={inputCls} />
                </div>
                <button type="submit" disabled={state === "sending"} className="btn-sweep inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70">
                  {state === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Book a demo"}
                </button>
                <p className="text-center text-xs text-muted-foreground">No spam, no auto-enrollment. One human reply.</p>
              </form>
            )}
          </div>
        </div>
      </section>
      <Faq title="Demo questions" items={FAQS} />
    </PageShell>
  );
}

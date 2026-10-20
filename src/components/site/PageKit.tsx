import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, type LucideIcon } from "lucide-react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useRevealRoot } from "@/hooks/use-reveal";
import { HoverBg } from "@/components/ui/hover-bg";
import { SonarGrid } from "@/components/ui/sonar-grid";

export const d = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export type Tone = "primary" | "violet" | "coral" | "teal";
export type Path = "/" | "/search" | "/gtm" | "/pricing" | "/demo" | "/blog" | "/legal";

const tones: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary",
  violet: "bg-violet/10 text-violet",
  coral: "bg-coral/10 text-coral",
  teal: "bg-teal/10 text-teal",
};

export function IconBox({ icon: Icon, tone = "primary" }: { icon: LucideIcon; tone?: Tone }) {
  return (
    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tones[tone]} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </span>
  );
}

export function SectionHead({ eyebrow, title, sub, align = "center" }: { eyebrow: string; title: string; sub?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="reveal text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 className="reveal mt-3 text-3xl font-semibold tracking-[-0.03em] text-balance text-foreground md:text-5xl" style={d(80)}>{title}</h2>
      {sub && <p className="reveal mt-4 text-lg text-muted-foreground text-pretty" style={d(160)}>{sub}</p>}
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  const ref = useRevealRoot<HTMLDivElement>();
  return (
    <div ref={ref} id="top">
      <Nav />
      <main className="page-enter">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({ crumb, eyebrow, title, accent, copy, children }: { crumb: string; eyebrow: string; title: string; accent?: string; copy?: string; children?: ReactNode }) {
  const words = title.split(" ");
  const accentWords = accent ? accent.split(" ") : [];
  return (
    <section
      className="hero-ui relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40"
      style={{ "--sonar-blue": "#5138FF", "--sonar-lilac": "#30277F", "--sonar-mint": "#411C46", "--sonar-dot": "rgba(23, 20, 56, 0.16)" } as CSSProperties}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-1 absolute -top-40 left-[8%] h-[480px] w-[480px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="aurora-2 absolute -top-24 right-[6%] h-[420px] w-[420px] rounded-full bg-violet/20 blur-[120px]" />
        <div className="aurora-3 absolute top-[40%] left-[45%] h-[320px] w-[320px] rounded-full bg-coral/10 blur-[120px]" />
      </div>
      <HoverBg />
      <SonarGrid className="opacity-70" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <nav aria-label="Breadcrumb" className="reveal flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="link-underline hover:text-foreground">Home</Link>
          <span>›</span>
          <span className="text-foreground">{crumb}</span>
        </nav>
        <p className="reveal mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur" style={d(60)}>
          <span className="status-pulse h-1.5 w-1.5 rounded-full bg-teal" /> {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-balance text-foreground md:text-6xl">
          {words.map((w, i) => (
            <span key={w + i} className="reveal-blur inline-block" style={d(100 + i * 60)}>{w}&nbsp;</span>
          ))}
          {accentWords.map((w, i) => (
            <span key={w + i} className="reveal-blur animate-gradient-text inline-block bg-gradient-to-r from-primary via-violet via-coral to-primary bg-clip-text text-transparent" style={d(100 + (words.length + i) * 60)}>{w}&nbsp;</span>
          ))}
        </h1>
        {copy && <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty" style={d(420)}>{copy}</p>}
        {children && <div className="reveal mt-9 flex flex-wrap items-center gap-3" style={d(520)}>{children}</div>}
      </div>
    </section>
  );
}

export function PrimaryLink({ to, children }: { to: Path; children: ReactNode }) {
  return (
    <Link to={to} className="btn-sweep group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-8px] shadow-primary/60 transition hover:-translate-y-0.5 active:translate-y-0">
      {children} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
    </Link>
  );
}

export function GhostLink({ to, href, children }: { to?: Path; href?: string; children: ReactNode }) {
  const cls = "btn-sweep group inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:border-primary/30";
  const arrow = <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" strokeWidth={1.75} />;
  return to ? (
    <Link to={to} className={cls}>{children}{arrow}</Link>
  ) : (
    <a href={href} className={cls}>{children}{arrow}</a>
  );
}

export function useInView<T extends Element>(ref: RefObject<T | null>, threshold = 0.3) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    o.observe(el);
    return () => o.disconnect();
  }, [ref, threshold]);
  return inView;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

/* ---------- FAQ: a live "ask InfoJoy" chat that plays itself ---------- */
const FAQ_ADVANCE_MS = 7000;

export function Faq({ items, title = "Frequently asked questions" }: { items: { q: string; a: string }[]; title?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.35);
  const reduced = useReducedMotion();
  const [seen, setSeen] = useState(false);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);
  const [typing, setTyping] = useState(true);
  const [words, setWords] = useState(0);

  const answer = items[active].a;
  const tokens = useMemo(() => answer.split(" "), [answer]);
  const done = !typing && words >= tokens.length;

  useEffect(() => {
    if (inView) setSeen(true);
  }, [inView]);

  // Type the answer out: pause on "typing…" dots, then stream word by word.
  useEffect(() => {
    if (!seen) return;
    if (reduced) {
      setTyping(false);
      setWords(tokens.length);
      return;
    }
    setTyping(true);
    setWords(0);
    let iv: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      setTyping(false);
      let w = 0;
      iv = setInterval(() => {
        w += 1;
        setWords(w);
        if (w >= tokens.length && iv) clearInterval(iv);
      }, 40);
    }, 700);
    return () => {
      clearTimeout(t);
      if (iv) clearInterval(iv);
    };
  }, [seen, active, reduced, tokens]);

  // Auto-advance to the next question until the visitor takes over.
  const playing = auto && inView && !hover && done && !reduced;
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), FAQ_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [playing, active, items.length]);

  return (
    <section ref={ref} className="mx-auto max-w-5xl px-6 py-24">
      <SectionHead eyebrow="FAQ" title={title} sub="Pick a question — or just sit back and watch the answers come in." />
      <div
        className="reveal mt-12 grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-start"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <ul className="space-y-2">
          {items.map((it, i) => {
            const on = i === active;
            return (
              <li key={it.q}>
                <button
                  type="button"
                  aria-current={on ? "true" : undefined}
                  onClick={() => {
                    setAuto(false);
                    setActive(i);
                  }}
                  className={`group relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition duration-300 ${
                    on ? "border-primary/40 bg-primary/5 text-foreground shadow-lg shadow-primary/5" : "border-border bg-card text-muted-foreground hover:-translate-y-0.5 hover:border-primary/25 hover:text-foreground"
                  }`}
                >
                  <span className={`mt-0.5 font-mono text-xs transition-colors ${on ? "text-primary" : "text-muted-foreground/60"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">{it.q}</span>
                  {on && playing && (
                    <span aria-hidden key={`bar-${active}`} className="bar-fill absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary via-violet to-coral" style={{ "--dur": `${FAQ_ADVANCE_MS}ms` } as CSSProperties} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="max-md:order-first overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
          <div className="flex items-center gap-3 border-b border-border bg-background/60 px-5 py-3">
            <span className="flex gap-1.5" aria-hidden>
              <i className="h-2.5 w-2.5 rounded-full bg-coral/70" />
              <i className="h-2.5 w-2.5 rounded-full bg-violet/60" />
              <i className="h-2.5 w-2.5 rounded-full bg-teal/70" />
            </span>
            <p className="text-sm font-medium text-foreground">Ask InfoJoy</p>
            <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="status-pulse h-1.5 w-1.5 rounded-full bg-teal" /> Online
            </span>
          </div>
          <div className="min-h-[300px] space-y-4 p-5">
            <p className="sr-only">{items[active].q} {answer}</p>
            <div aria-hidden key={`q-${active}`} className="pop-in flex justify-end" style={{ transformOrigin: "bottom right" }}>
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20">{items[active].q}</p>
            </div>
            <div aria-hidden className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-violet text-primary-foreground">
                <Sparkles className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div className="min-h-[44px] max-w-[88%] rounded-2xl rounded-tl-md border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground">
                {typing ? (
                  <span className="flex h-5 items-center gap-1" aria-label="typing">
                    {[0, 1, 2].map((k) => (
                      <i key={k} className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: `${k * 150}ms` }} />
                    ))}
                  </span>
                ) : (
                  <>
                    {tokens.slice(0, words).join(" ")}
                    {!done && <span className="caret" />}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- How it works: a pipeline that plays itself ---------- */
export type FlowStep = { icon: LucideIcon; title: string; desc: string; tag?: string };
const FLOW_STEP_MS = 3800;

export function HowFlow({ id, eyebrow = "How it works", title, sub, steps }: { id?: string; eyebrow?: string; title: string; sub?: string; steps: FlowStep[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, 0.4);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = steps.length;
  const play = inView && !paused && !reduced;
  const pct = n > 1 ? (active / (n - 1)) * 100 : 0;

  useEffect(() => {
    if (!play) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), FLOW_STEP_MS);
    return () => clearTimeout(t);
  }, [play, active, n]);

  const cur = steps[active];
  const Icon = cur.icon;

  return (
    <section id={id} className="scroll-mt-24 bg-gradient-to-b from-transparent via-accent/40 to-transparent py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
        <div ref={wrap} className="reveal mt-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="relative">
            <div aria-hidden className="absolute top-6 h-0.5 rounded bg-border" style={{ left: `${50 / n}%`, right: `${50 / n}%` }}>
              <div className="h-full origin-left rounded bg-gradient-to-r from-primary via-violet to-coral transition-transform duration-700 ease-out" style={{ transform: `scaleX(${pct / 100})` }} />
              <span
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_16px_4px] shadow-primary/50 transition-[left] duration-700 ease-out"
                style={{ left: `${pct}%` }}
              />
            </div>
            <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
              {steps.map((s, i) => {
                const on = i === active;
                const past = i < active;
                const NodeIcon = s.icon;
                return (
                  <li key={s.title} className="flex flex-col items-center text-center">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={on ? "step" : undefined}
                      aria-label={`Step ${i + 1}: ${s.title}`}
                      className={`relative grid h-12 w-12 place-items-center rounded-full border-2 transition duration-500 ${
                        on
                          ? "scale-110 border-primary bg-card text-primary shadow-lg shadow-primary/30"
                          : past
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {on && play && <span aria-hidden className="node-ping absolute inset-0 rounded-full border-2 border-primary" />}
                      <NodeIcon className="h-5 w-5" strokeWidth={1.75} />
                    </button>
                    <span className={`mt-3 px-1 text-[11px] font-medium leading-tight transition-colors duration-300 sm:text-sm ${on ? "text-foreground" : "text-muted-foreground"}`}>{s.title}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div key={active} className="row-in relative mt-10 overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-xl shadow-primary/5 md:p-9">
            <span aria-hidden className="absolute -right-2 -top-4 text-[7rem] font-semibold leading-none tracking-tighter text-foreground/[0.05]">{String(active + 1).padStart(2, "0")}</span>
            <div className="relative flex items-start gap-5">
              <IconBox icon={Icon} tone="primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Step {active + 1} of {n}
                  {cur.tag ? ` · ${cur.tag}` : ""}
                </p>
                <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-foreground">{cur.title}</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{cur.desc}</p>
              </div>
            </div>
            {play && <span aria-hidden key={`t-${active}`} className="bar-fill absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary via-violet to-coral" style={{ "--dur": `${FLOW_STEP_MS}ms` } as CSSProperties} />}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">Plays automatically — hover to pause, or click any step.</p>
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ title, copy, primary, secondary }: { title: string; copy?: string; primary: { to: Path; label: string }; secondary?: { to: Path; label: string } }) {
  return (
    <section id="cta" className="scroll-mt-24 px-4 py-16 md:px-6">
      <div className="reveal relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-ink px-6 py-20 text-center md:py-28">
        <div aria-hidden className="cta-glow absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary/40 blur-[120px]" />
        <div aria-hidden className="cta-glow absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-violet/40 blur-[120px]" style={{ animationDelay: "-9s" }} />
        <div aria-hidden className="hero-grid-bg absolute inset-0 opacity-40" />
        <div className="relative">
          <Sparkles className="mx-auto h-6 w-6 text-primary-foreground/70" strokeWidth={1.5} />
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-balance text-primary-foreground md:text-5xl">{title}</h2>
          {copy && <p className="mx-auto mt-4 max-w-lg text-primary-foreground/70">{copy}</p>}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to={primary.to} className="btn-sweep group inline-flex h-12 items-center gap-2 rounded-xl bg-primary-foreground px-6 text-sm font-medium text-ink transition hover:-translate-y-0.5">
              {primary.label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </Link>
            {secondary && (
              <Link to={secondary.to} className="btn-sweep inline-flex h-12 items-center rounded-xl border border-primary-foreground/20 px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

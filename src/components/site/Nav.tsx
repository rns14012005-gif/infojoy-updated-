import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowRight, Database, ShieldCheck, SlidersHorizontal, Bot, UserCheck, Workflow, Wallet, Gauge, Plug, Newspaper, TrendingUp, Radar, Sparkles, type LucideIcon } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/search", label: "Search" },
  { to: "/gtm", label: "GTM" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
] as const;

type Tip = {
  to: "/search" | "/gtm" | "/pricing" | "/blog" | "/demo";
  icon: LucideIcon;
  title: string;
  desc: string;
  stat: { v: string; l: string };
  points: { icon: LucideIcon; t: string; d: string }[];
  cta: string;
  href?: string;
};

const tips: Record<string, Tip> = {
  "/search": {
    to: "/search", icon: Database, title: "InfoJoy Search", desc: "The data layer: a B2B contact and account database built for precision, not volume.",
    stat: { v: "310M+", l: "verified profiles" },
    points: [
      { icon: SlidersHorizontal, t: "25+ precision filters", d: "Slice by role, size, tech and more" },
      { icon: ShieldCheck, t: "Accuracy-scored records", d: "Every record shows where it came from" },
      { icon: Radar, t: "Standing lead sources", d: "Turn any search into a live feed" },
    ],
    cta: "Explore Search",
  },
  "/gtm": {
    to: "/gtm", icon: Bot, title: "InfoJoy GTM", desc: "The action layer: an AI GTM team that researches, writes and follows up for you.",
    stat: { v: "100%", l: "human-approved sends" },
    points: [
      { icon: Gauge, t: "ICP scoring", d: "Rank accounts by real fit" },
      { icon: Bot, t: "Research & messaging agents", d: "Context-rich outreach, drafted fast" },
      { icon: UserCheck, t: "Approval on every send", d: "Nothing goes out without you" },
    ],
    cta: "See how GTM works",
    href: "https://gtm.infojoy.com/login",
  },
  "/pricing": {
    to: "/pricing", icon: Wallet, title: "Pricing", desc: "Credit-based plans for signal-led outbound. Save 20% when billed annually.",
    stat: { v: "$159", l: "per month, from" },
    points: [
      { icon: Wallet, t: "Launch to Enterprise", d: "Four plans, pick your credit volume" },
      { icon: Plug, t: "CRM sync on Growth", d: "Salesforce & HubSpot two-way" },
      { icon: Workflow, t: "API & bulk enrichment", d: "Available on Accelerate" },
    ],
    cta: "Compare plans",
  },
  "/blog": {
    to: "/blog", icon: Newspaper, title: "Blog", desc: "Notes on B2B data, pipeline and signal-based selling from the InfoJoy team.",
    stat: { v: "New", l: "reads on data & GTM" },
    points: [
      { icon: Database, t: "B2B data platform", d: "How modern prospect data works" },
      { icon: TrendingUp, t: "GTM strategy", d: "Playbooks for revenue teams" },
      { icon: Radar, t: "Signal-based selling", d: "Reach accounts at the right moment" },
    ],
    cta: "Read the blog",
  },
};

const aboutTip: Tip = {
  to: "/demo", icon: Sparkles, title: "What is InfoJoy?",
  desc: "A 310M+ profile database and an AI GTM engine, working as one pipeline. Find the right accounts, then reach them first.",
  stat: { v: "310M+", l: "verified profiles" },
  points: [
    { icon: Database, t: "InfoJoy Search", d: "The data layer: find and filter accounts" },
    { icon: Bot, t: "InfoJoy GTM", d: "The action layer: research and outreach" },
    { icon: UserCheck, t: "You stay in control", d: "No message sends without your approval" },
  ],
  cta: "Book a demo",
};

/** Cursor-lit glow + click ripple for every .btn-sweep button on the site. */
function useButtonFx() {
  useEffect(() => {
    const find = (t: EventTarget | null) => (t instanceof Element ? (t.closest(".btn-sweep") as HTMLElement | null) : null);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let last: HTMLElement | null = null;
    const reset = (b: HTMLElement | null) => {
      b?.style.removeProperty("--btx");
      b?.style.removeProperty("--bty");
    };
    const onMove = (e: PointerEvent) => {
      const b = find(e.target);
      if (b !== last) {
        reset(last);
        last = b;
      }
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty("--bx", `${e.clientX - r.left}px`);
      b.style.setProperty("--by", `${e.clientY - r.top}px`);
      if (!reduce && e.pointerType === "mouse") {
        // magnetic pull: the button leans toward the cursor
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.2;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
        b.style.setProperty("--btx", `${dx.toFixed(1)}px`);
        b.style.setProperty("--bty", `${dy.toFixed(1)}px`);
      }
    };
    const onDown = (e: PointerEvent) => {
      const b = find(e.target);
      if (!b || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = b.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2;
      const el = document.createElement("span");
      el.className = "btn-ripple";
      el.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
      b.appendChild(el);
      setTimeout(() => el.remove(), 700);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    const onLeaveDoc = () => { reset(last); last = null; };
    document.addEventListener("pointerleave", onLeaveDoc);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeaveDoc);
    };
  }, []);
}

function TipCard({ tip, align = "center" }: { tip: Tip; align?: "center" | "left" }) {
  const Icon = tip.icon;
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--py", `${e.clientY - r.top}px`);
  };
  return (
    <div onPointerMove={onMove} className="nav-card relative w-[340px] overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-primary/15">
      <span aria-hidden className={`nav-card-notch ${align === "left" ? "left" : ""}`} />
      <div className="relative z-10">
        <div className="nav-stagger flex items-start justify-between gap-3" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-violet text-primary-foreground shadow-md shadow-primary/30">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <p className="text-base font-semibold text-foreground">{tip.title}</p>
          </div>
          <div className="rounded-lg bg-primary/10 px-2.5 py-1 text-right">
            <p className="text-sm font-bold leading-tight text-primary">{tip.stat.v}</p>
            <p className="text-[10px] leading-tight text-muted-foreground">{tip.stat.l}</p>
          </div>
        </div>
        <p className="nav-stagger mt-3 text-sm leading-relaxed text-muted-foreground" style={{ "--i": 1 } as React.CSSProperties}>{tip.desc}</p>
        <ul className="mt-4 space-y-1">
          {tip.points.map((p, i) => (
            <li key={p.t} className="nav-stagger nav-point flex items-center gap-3 rounded-lg p-2" style={{ "--i": i + 2 } as React.CSSProperties}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                <p.icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-medium text-foreground">{p.t}</span>
                <span className="block text-xs text-muted-foreground">{p.d}</span>
              </span>
            </li>
          ))}
        </ul>
        {tip.href ? (
          <a
            href={tip.href}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-stagger btn-sweep group mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5"
            style={{ "--i": 5 } as React.CSSProperties}
          >
            {tip.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </a>
        ) : (
          <Link
            to={tip.to}
            className="nav-stagger btn-sweep group mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5"
            style={{ "--i": 5 } as React.CSSProperties}
          >
            {tip.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        )}
      </div>
    </div>
  );
}

export function Nav() {
  useButtonFx();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [active, setActive] = useState<string | null>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const openAbout = () => { clearTimeout(aboutTimer.current); setAboutOpen(true); };
  const closeAbout = () => { clearTimeout(aboutTimer.current); aboutTimer.current = setTimeout(() => setAboutOpen(false), 140); };

  const openTip = (to: string, el: HTMLElement) => {
    clearTimeout(timer.current);
    setActive(to);
    setPill({ x: el.offsetLeft, w: el.offsetWidth });
  };
  const closeTip = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setActive(null); setPill(null); }, 140);
  };

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-border bg-background/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div ref={bar} aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-primary via-violet to-coral" />
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Main">
        <div
          className="relative"
          onMouseEnter={openAbout}
          onMouseLeave={closeAbout}
          onFocus={openAbout}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) closeAbout(); }}
          onKeyDown={(e) => e.key === "Escape" && setAboutOpen(false)}
        >
          <Link to="/" aria-label="InfoJoy home" aria-haspopup="true" aria-expanded={aboutOpen} className="flex items-center transition-transform duration-300 hover:scale-[1.03]">
            <Logo />
          </Link>
          {aboutOpen && (
            <div className="nav-pop-left absolute left-0 top-full z-40 hidden pt-4 md:block" role="group" aria-label="About InfoJoy">
              <TipCard tip={aboutTip} align="left" />
            </div>
          )}
        </div>
        <div ref={wrap} className="relative hidden items-center gap-1 md:flex" onKeyDown={(e) => e.key === "Escape" && (setActive(null), setPill(null))}>
          {/* sliding selection pill */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-primary/10 ring-1 ring-primary/15 transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ left: pill?.x ?? 0, width: pill?.w ?? 0, opacity: pill ? 1 : 0 }}
          />
          {links.map((l) => {
            const isActive = pathname === l.to || pathname.startsWith(l.to + "/");
            const isOpen = active === l.to;
            return (
              <div
                key={l.to}
                className="relative"
                onMouseEnter={(e) => openTip(l.to, e.currentTarget)}
                onMouseLeave={closeTip}
                onFocus={(e) => openTip(l.to, e.currentTarget)}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) closeTip(); }}
              >
                <Link
                  to={l.to}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  className={`relative z-10 flex h-9 items-center rounded-full px-4 text-sm transition-colors ${isActive || isOpen ? "font-medium text-foreground" : "text-muted-foreground"}`}
                >
                  {l.label}
                  {isActive && <span aria-hidden className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />}
                </Link>
                {isOpen && (
                  <div className="nav-pop absolute left-1/2 top-full z-40 pt-4" role="group" aria-label={`${l.label} details`}>
                    <TipCard tip={tips[l.to]!} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link to="/demo" className="btn-sweep group inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition hover:-translate-y-0.5">
            Book a demo <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-foreground"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-border px-6 pb-6 pt-2 md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block border-b border-border py-3.5 text-base text-foreground">
              {l.label}
            </Link>
          ))}
          <Link to="/demo" onClick={() => setOpen(false)} className="btn-sweep mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background">
            Book a demo
          </Link>
        </div>
      )}
    </header>
  );
}

import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SonarGrid } from "@/components/ui/sonar-grid";
import { HoverBg } from "@/components/ui/hover-bg";
import { HeroDashboard } from "@/components/site/HeroDashboard";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: "310M+", label: "verified profiles" },
  { value: "25+", label: "precision filters" },
  { value: "100%", label: "human-approved sends" },
  { value: "7", label: "steps to a booked meeting" },
];

function StatItems() {
  return (
    <>
      {stats.map((s, i) => (
        <Fragment key={s.label}>
          <span className="flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 text-xs sm:text-sm">
            <span className="font-semibold text-foreground">{s.value}</span>
            <span className="text-muted-foreground">{s.label}</span>
          </span>
          {i < stats.length - 1 && <span aria-hidden className="h-3.5 w-px shrink-0 bg-border" />}
        </Fragment>
      ))}
    </>
  );
}


/** Dashboard in 3D: scroll-driven tilt, cursor parallax, glare, idle sway, depth layers. */
function Dashboard3D({ reduce }: { reduce: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scrollRX = useTransform(scrollYProgress, [0, 1], [32, 11]);
  const rotX = useTransform([scrollRX, sy], ([a, b]: number[]) => (a ?? 0) - (b ?? 0) * 14);
  const rotY = useTransform(sx, (v) => -13 + v * 18);
  const gx = useTransform(sx, [-0.5, 0.5], [15, 85]);
  const gy = useTransform(sy, [-0.5, 0.5], [10, 90]);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${gx}% ${gy}%, rgba(255,255,255,0.45), rgba(81,56,255,0.10) 40%, transparent 65%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const flat = { transformStyle: "preserve-3d" as const };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="hero-3d relative z-10 mt-10 w-full max-w-5xl pb-20"
      style={{ perspective: 1700 }}
    >
      {/* floor shadow */}
      <div aria-hidden className="pointer-events-none absolute -bottom-2 left-[8%] right-[8%] h-20 rounded-[50%] bg-primary/30 blur-3xl" />

      <motion.div
        style={flat}
        initial={reduce ? false : { opacity: 0, y: 70, rotateX: 38, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.1, ease }}
      >
        <motion.div style={reduce ? { ...flat, rotateX: 9, rotateY: -7 } : { ...flat, rotateX: rotX, rotateY: rotY }}>
          <motion.div
            style={flat}
            className="relative"
            animate={reduce ? {} : { rotateY: [-2.5, 2.5, -2.5], y: [0, -8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* depth slabs behind the card */}
            <div aria-hidden className="absolute inset-0 rounded-2xl border border-primary/25 bg-primary/10" style={{ transform: "translateZ(-30px) scale(0.985)" }} />
            <div aria-hidden className="absolute inset-0 rounded-2xl border border-violet/25 bg-violet/10" style={{ transform: "translateZ(-62px) scale(0.965)" }} />
            <div aria-hidden className="absolute inset-0 rounded-2xl border border-teal/25 bg-teal/10" style={{ transform: "translateZ(-96px) scale(0.945)" }} />

            <HeroDashboard />

            {/* glare that follows the cursor */}
            {!reduce && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-soft-light"
                style={{ background: glare, transform: "translateZ(3px)" }}
              />
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const up = (i: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.08 * i, ease } };

  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-ui relative mx-auto flex w-full flex-col items-center gap-9 overflow-hidden px-4 pb-20 pt-32 sm:px-8 lg:px-24 lg:pt-40"
      style={{ "--sonar-blue": "#5138FF", "--sonar-lilac": "#30277F", "--sonar-mint": "#411C46", "--sonar-dot": "rgba(23, 20, 56, 0.16)" } as React.CSSProperties}
    >
      {/* drifting violet / primary / teal glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="aurora-1 absolute -top-32 left-[6%] h-[460px] w-[460px] rounded-full bg-violet/35 blur-[110px]" />
        <div className="aurora-2 absolute -top-20 right-[4%] h-[440px] w-[440px] rounded-full bg-primary/30 blur-[110px]" />
        <div className="aurora-3 absolute left-[38%] top-[34%] h-[360px] w-[360px] rounded-full bg-teal/25 blur-[110px]" />
      </div>
      <HoverBg />
      <SonarGrid className="opacity-70" />

      <motion.div {...up(0)} className="pointer-events-none relative z-10 flex w-full justify-center">
        {/* mobile: scrolling marquee */}
        <div className="pointer-events-auto w-full max-w-xs overflow-hidden rounded-full border border-border bg-card px-1.5 py-1 shadow-sm sm:hidden">
          <div className="marquee-track flex w-max items-center">
            {[0, 1].map((k) => (
              <div key={k} aria-hidden={k === 1} className="flex items-center">
                <StatItems />
                <span aria-hidden className="h-3.5 w-px shrink-0 bg-border" />
              </div>
            ))}
          </div>
        </div>
        {/* sm and up: single-row pill */}
        <div className="pointer-events-auto hidden max-w-full flex-wrap items-center justify-center rounded-full border border-border bg-card px-1.5 py-1 shadow-sm transition-shadow duration-300 hover:shadow-md sm:inline-flex">
          <StatItems />
        </div>
      </motion.div>

      <div className="pointer-events-none relative z-10 flex w-full flex-col items-center gap-7">
        <motion.h1
          {...up(1)}
          id="hero-heading"
          className="text-balance text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:leading-none lg:text-7xl"
        >
          Find the right accounts.
          <span className="block text-primary">Reach them first.</span>
        </motion.h1>
        <motion.p {...up(2)} className="max-w-2xl text-center text-base text-foreground md:text-lg md:leading-7">
          InfoJoy replaces guesswork with a system: verified data, ICP scoring, AI research, and outreach that never sends without your approval.
        </motion.p>
      </div>

      <motion.div {...up(3)} className="relative z-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/demo"
          className="btn-sweep inline-flex h-11 items-center rounded-lg bg-foreground px-6 text-sm font-medium text-background transition hover:-translate-y-0.5 hover:bg-foreground/90 active:translate-y-0"
        >
          Book a demo
        </Link>
        <Link
          to="/search"
          className="btn-sweep group inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-6 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-accent"
        >
          Explore the database
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </motion.div>

      <motion.div {...up(4)} className="relative z-10 flex items-center justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-primary/10 px-4 py-2.5 text-xs font-medium text-secondary-foreground">
          <Sparkles className="size-3.5 text-primary" aria-hidden />
          Powered by <span className="font-semibold">MarketJoy</span>
        </span>
      </motion.div>

      <Dashboard3D reduce={reduce} />
    </section>
  );
}

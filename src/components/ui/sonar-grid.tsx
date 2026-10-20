import { useEffect, useRef } from "react";

type Ring = { x: number; y: number; t: number; strong: boolean };

/** Canvas dot grid with sonar pings, signal paths, pointer glow and click ripples. */
export function SonarGrid({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors: string[] = [];
    let dotColor = "";
    const readColors = () => {
      const css = getComputedStyle(host);
      const read = (n: string, f: string) => css.getPropertyValue(n).trim() || f;
      colors = [read("--sonar-blue", "#5b8cff"), read("--sonar-mint", "#3cc8b4"), read("--sonar-lilac", "#8f84f5")];
      dotColor = read("--sonar-dot", "rgba(23,33,58,0.16)");
    };
    readColors();
    // repaint with new colours when the theme class on <html> changes
    const themeObs = new MutationObserver(() => {
      readColors();
      lit.forEach((d, i) => { d.c = colors[i % 3]!; });
      if (reduce) draw(0);
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let w = 0, h = 0, gap = 28, raf = 0, last = 0;
    let rings: Ring[] = [];
    let pointer: { x: number; y: number } | null = null;
    let lit: { x: number; y: number; c: string }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth; h = host.clientHeight;
      gap = w < 640 ? 36 : 28;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 640 ? 6 : 14;
      lit = Array.from({ length: count }, (_, i) => ({
        x: Math.round((Math.random() * w) / gap) * gap,
        y: Math.round((Math.random() * h * 0.85) / gap) * gap,
        c: colors[i % 3]!,
      }));
      if (reduce) draw(0);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = dotColor;
      for (let y = gap / 2; y < h; y += gap)
        for (let x = gap / 2; x < w; x += gap) ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);

      // signal paths between lit dots
      ctx.lineWidth = 1;
      for (let i = 0; i < lit.length - 1; i += 2) {
        const a = lit[i]!, b = lit[i + 1]!;
        ctx.strokeStyle = a.c; ctx.globalAlpha = 0.18;
        ctx.setLineDash([4, 6]); ctx.lineDashOffset = reduce ? 0 : -now / 60;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      ctx.setLineDash([]);

      // lit dots with halo
      for (const d of lit) {
        ctx.globalAlpha = 0.18; ctx.fillStyle = d.c;
        ctx.beginPath(); ctx.arc(d.x, d.y, 7, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 0.9;
        ctx.beginPath(); ctx.arc(d.x, d.y, 2.2, 0, Math.PI * 2); ctx.fill();
      }

      // rings
      rings = rings.filter((r) => now - r.t < (r.strong ? 1800 : 2600));
      for (const r of rings) {
        const life = (now - r.t) / (r.strong ? 1800 : 2600);
        for (let k = 0; k < (r.strong ? 3 : 2); k++) {
          const p = life - k * 0.18;
          if (p <= 0) continue;
          ctx.globalAlpha = (1 - p) * (r.strong ? 0.45 : 0.25);
          ctx.strokeStyle = colors[k % 3]!;
          ctx.beginPath(); ctx.arc(r.x, r.y, p * (r.strong ? 220 : 120), 0, Math.PI * 2); ctx.stroke();
        }
      }

      if (pointer) {
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 160);
        g.addColorStop(0, colors[0]!); g.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.12; ctx.fillStyle = g;
        ctx.fillRect(pointer.x - 160, pointer.y - 160, 320, 320);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      if (now - last > 1400 + Math.random() * 1600 && lit.length) {
        const d = lit[Math.floor(Math.random() * lit.length)]!;
        rings.push({ x: d.x, y: d.y, t: now, strong: false });
        last = now;
      }
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const local = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => { if (e.pointerType === "mouse") pointer = local(e); };
    const onLeave = () => { pointer = null; };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      rings.push({ ...p, t: performance.now(), strong: true });
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    if (!reduce) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointerdown", onDown);
      raf = requestAnimationFrame(loop);
    }
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); themeObs.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`sonar-grid pointer-events-none absolute inset-0 ${className}`} />;
}

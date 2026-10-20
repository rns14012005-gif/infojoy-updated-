import { useEffect, useRef } from "react";

/**
 * Grid that lights up under the cursor. When the pointer is idle (or on touch
 * devices) the spotlight drifts on its own so the background is never static.
 */
export function HoverBg({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hovering = false;
    let raf = 0;
    let tx = 0.5;
    let ty = 0.35;
    let cx = 0.5;
    let cy = 0.35;

    const set = () => {
      el.style.setProperty("--mx", `${(cx * 100).toFixed(2)}%`);
      el.style.setProperty("--my", `${(cy * 100).toFixed(2)}%`);
    };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };
    const tick = (t: number) => {
      if (!hovering) {
        tx = 0.5 + Math.sin(t / 2600) * 0.34;
        ty = 0.38 + Math.cos(t / 3400) * 0.2;
      }
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      set();
      raf = requestAnimationFrame(tick);
    };

    set();
    if (!reduced) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className={`hover-bg pointer-events-none absolute inset-0 ${className}`} />;
}

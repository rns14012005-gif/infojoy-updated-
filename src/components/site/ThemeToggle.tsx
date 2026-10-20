import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
const KEY = "infojoy-theme";

function apply(t: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", t === "dark");
  root.style.colorScheme = t;
  try {
    localStorage.setItem(KEY, t);
  } catch {
    /* storage can be blocked; theme still applies for this visit */
  }
}

/** Light / dark switch. The theme lives on <html>, so every page follows it. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    // keep other tabs in sync
    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY || (e.newValue !== "light" && e.newValue !== "dark")) return;
      document.documentElement.classList.toggle("dark", e.newValue === "dark");
      document.documentElement.style.colorScheme = e.newValue;
      setTheme(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const run = () => {
      flushSync(() => setTheme(next));
      apply(next);
    };
    if (reduce || typeof document.startViewTransition !== "function") {
      run();
      return;
    }
    const vt = document.startViewTransition(run);
    vt.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      className={`btn-sweep relative grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground ${className}`}
    >
      <Sun className="theme-icon theme-sun absolute h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
      <Moon className="theme-icon theme-moon absolute h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
    </button>
  );
}

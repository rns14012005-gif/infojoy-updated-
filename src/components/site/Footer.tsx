import { Link } from "@tanstack/react-router";
import { Linkedin, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

const legal = [
  ["Terms of Service", "terms"],
  ["Privacy Policy", "privacy"],
  ["Cookie Policy", "cookie"],
  ["CCPA Privacy Statement", "ccpa"],
  ["Remove My Profile", "remove"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link to="/" aria-label="InfoJoy home" className="flex items-center">
            <Logo className="md:h-11" />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Find the right accounts. Reach them first. A 310M+ profile database and an AI GTM engine, working as one pipeline.
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { i: Linkedin, h: "https://www.linkedin.com/company/marketjoy-inc.", l: "LinkedIn" },
              { i: Facebook, h: "https://www.facebook.com/marketjoy", l: "Facebook" },
              { i: Twitter, h: "https://x.com/GetMarketJoy", l: "X" },
            ].map(({ i: I, h, l }) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" aria-label={l} className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary">
                <I className="h-4 w-4" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-semibold text-foreground">Product</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[["/search", "InfoJoy Search"], ["/gtm", "InfoJoy GTM"], ["/pricing", "Pricing"], ["/blog", "Blog"]].map(([to, l]) => (
              <li key={to}><Link to={to as "/search"} className="link-underline text-muted-foreground transition-colors hover:text-foreground">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-sm font-semibold text-foreground">Legal</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {legal.map(([l, h]) => (
              <li key={h}><Link to="/legal" hash={h} className="link-underline text-muted-foreground transition-colors hover:text-foreground">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-sm font-semibold text-foreground">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} /><span>186 N Palafox Street,<br />Pensacola, FL 32502, USA</span></li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} /><a href="mailto:hello@marketjoy.com" className="link-underline hover:text-foreground">hello@marketjoy.com</a></li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} /><a href="tel:+14846386389" className="link-underline hover:text-foreground">+1 (484) 638-6389</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} InfoJoy. All rights reserved. Powered By MarketJoy
      </div>
    </footer>
  );
}

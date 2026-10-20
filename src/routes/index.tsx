import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { CapabilityStrip, Stats, Products, HowItWorks, Features, FinalCTA } from "@/components/site/Sections";
import { Problem, Pipeline, Testimonials, Roi, HomeFaq } from "@/components/site/Home";
import { PageShell } from "@/components/site/PageKit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InfoJoy — Find the right B2B accounts and close them faster" },
      { name: "description", content: "InfoJoy pairs a 310M+ profile B2B database with AI-powered account scoring, research agents, and human-approved outreach. Search finds them. GTM closes them." },
      { property: "og:title", content: "InfoJoy — Find the right accounts. Reach them first." },
      { property: "og:description", content: "A 310M+ profile B2B database and an AI GTM engine, working as one pipeline." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />
      <CapabilityStrip />
      <Stats />
      <Problem />
      <Products />
      <HowItWorks />
      <Features />
      <Pipeline />
      <Testimonials />
      <Roi />
      <HomeFaq />
      <FinalCTA />
    </PageShell>
  );
}

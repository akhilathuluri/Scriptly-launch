import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Database, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const policySections = [
  {
    title: "Information We Process",
    icon: Database,
    points: [
      "Scriptly processes selected text only when you trigger an action.",
      "Basic app diagnostics may be stored to maintain reliability and performance.",
      "We do not collect unrelated files, browser history, or clipboard data outside action runs.",
    ],
  },
  {
    title: "How Your Data Is Used",
    icon: ShieldCheck,
    points: [
      "Selected content is used strictly to produce the action output you requested.",
      "Data is used to improve app stability, usability, and feature quality.",
      "We do not sell personal data.",
    ],
  },
  {
    title: "Storage and Security",
    icon: Lock,
    points: [
      "Data handling follows secure transmission and storage practices.",
      "Access is limited to authorized systems and personnel.",
      "Retention is minimized and aligned with operational needs.",
    ],
  },
  {
    title: "Contact",
    icon: Mail,
    points: [
      "For privacy requests or questions, contact hello@scriptly.app.",
      "We review requests and respond within a reasonable timeframe.",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[36rem] rounded-full bg-primary/10 blur-[110px]" />
        </div>

        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-14">
            <p className="inline-flex items-center rounded-full border border-border bg-card/80 px-3 py-1 text-xs tracking-wide text-muted-foreground">
              Legal
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gradient">
              Privacy Policy
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              This policy explains how Scriptly handles data when you use text actions across your desktop workflow.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: March 18, 2026</p>
          </div>

          <div className="space-y-6">
            {policySections.map((section) => {
              const Icon = section.icon;
              return (
                <section
                  key={section.title}
                  className="rounded-2xl border border-border/70 bg-card/80 backdrop-blur-sm p-6 md:p-7 shadow-card"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
                  </div>

                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center rounded-xl bg-secondary hover:bg-secondary/80 px-4 py-2.5 text-sm font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

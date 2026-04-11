import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Database,
  Mail,
  KeyRound,
  Bot,
  Clock,
  UserCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const policySections = [
  {
    id: "information",
    title: "Information We Process",
    icon: Database,
    points: [
      "Spark processes selected text only when you explicitly trigger an action using the global hotkey.",
      "Basic app diagnostics (crash reports, error codes) may be stored locally or sent to help maintain reliability and performance.",
      "We do not collect unrelated files, browser history, clipboard contents, or background keystrokes outside an active action session.",
      "If you use the Issues reporting form on this website, the title, description, issue type, severity, and email you submit are stored in our database to track and address your feedback.",
    ],
  },
  {
    id: "api-keys",
    title: "API Keys & Credentials",
    icon: KeyRound,
    points: [
      "Your AI provider API keys (Groq, OpenRouter, etc.) are stored exclusively on your local Windows device.",
      "Keys are encrypted at rest using the Windows Data Protection API (DPAPI), which ties the encryption to your Windows login session.",
      "Spark never transmits your API keys to any Spark-owned server — they are sent directly from your machine to the AI provider's endpoint.",
      "Removing and reinstalling Spark or resetting Windows may result in the loss of stored keys; please keep a secure backup.",
    ],
  },
  {
    id: "data-use",
    title: "How Your Data Is Used",
    icon: ShieldCheck,
    points: [
      "Selected text is sent directly to your configured AI provider to produce the action output you requested. Spark servers are never in the data path.",
      "Website feedback data (issues, emails) is used solely to track bugs and feature requests and communicate with you about your report.",
      "Aggregate, anonymised diagnostics may be used to improve app stability and feature quality.",
      "We do not sell, rent, or trade personal data to third parties.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party AI Providers",
    icon: Bot,
    points: [
      "When you trigger an action, your selected text is sent to the AI provider you have configured (e.g. Groq, OpenRouter, or any OpenRouter-compatible model).",
      "Each provider has its own privacy policy and data retention practices. We strongly encourage you to review them before use.",
      "Spark has no control over how AI providers handle the data you send them. Use built-in actions mindfully with sensitive content.",
      "Groq privacy policy: groq.com/privacy | OpenRouter terms: openrouter.ai/terms",
    ],
  },
  {
    id: "storage",
    title: "Storage and Security",
    icon: Lock,
    points: [
      "All data handling follows secure transmission and storage practices, including HTTPS for website traffic and DPAPI for local secrets.",
      "Access to stored feedback data is limited to authorised systems and personnel.",
      "Spark does not use tracking cookies, analytics pixels, or third-party advertisement networks on its website.",
      "We conduct periodic reviews of our data handling practices to align with current security standards.",
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    icon: Clock,
    points: [
      "Submitted issues and feedback are retained as long as they are relevant to product development and support.",
      "You may request deletion of a submitted issue by contacting us with the issue title and email used at submission.",
      "Local app data (settings, encrypted API keys, logs) is retained on your device until you uninstall Spark or manually remove the app data folder.",
    ],
  },
  {
    id: "rights",
    title: "Your Rights",
    icon: UserCheck,
    points: [
      "You have the right to request access to any personal data we store about you in our systems.",
      "You may request correction or deletion of inaccurate data by contacting us.",
      "You can stop Spark from processing your text at any time by disabling the app from the system tray.",
      "If you are located in the EU/EEA, you have additional rights under the General Data Protection Regulation (GDPR). Contact us to exercise them.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    icon: Mail,
    points: [
      "For privacy requests, questions, or complaints, contact us at akhil.builds@proton.me.",
      "You may also use the Issues page on this website to submit privacy-related concerns.",
      "We review all requests and respond within a reasonable timeframe.",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Spark Privacy Policy"
        description="Read the Spark privacy policy to understand how we handle your data, API keys, and security when using the Spark Windows AI text assistant."
        path="/privacy-policy"
      />
      <Navbar />

      <main className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[36rem] rounded-full bg-primary/10 blur-[110px]" />
        </div>

        <div className="container max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12 md:mb-14">
            <p className="inline-flex items-center rounded-full border border-border bg-card/80 px-3 py-1 text-xs tracking-wide text-muted-foreground">
              Legal
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gradient">
              Privacy Policy
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Spark is built on a local-first, privacy-respecting foundation.
              This policy explains exactly what data is collected, where it
              goes, and how it is protected.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: March 18, 2026
            </p>
          </div>

          {/* Quick summary card */}
          <div className="mb-10 rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              TL;DR — The short version
            </p>
            <ul className="space-y-2 text-sm text-foreground">
              {[
                "Your text goes directly to your AI provider — never through Spark servers.",
                "API keys are encrypted on your device with Windows DPAPI.",
                "We don't track you, sell your data, or use ads.",
                "Issues you submit via this website are stored to help us improve the app.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick nav */}
          <div className="mb-10 rounded-2xl border border-border/60 bg-card/60 p-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Jump to section
            </p>
            <div className="flex flex-wrap gap-2">
              {policySections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-xs px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/70 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          {/* Policy sections */}
          <div className="space-y-6">
            {policySections.map((section) => {
              const Icon = section.icon;
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="rounded-2xl border border-border/70 bg-card/80 backdrop-blur-sm p-6 md:p-7 shadow-card scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight">
                      {section.title}
                    </h2>
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

          {/* Footer links */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center rounded-xl bg-secondary hover:bg-secondary/80 px-4 py-2.5 text-sm font-medium transition-colors"
            >
              Back to Home
            </Link>
            <Link
              to="/terms"
              className="inline-flex items-center rounded-xl border border-border/60 hover:bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/issues"
              className="inline-flex items-center rounded-xl border border-border/60 hover:bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact via Issues
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Rocket,
  Sparkles,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

// ─── Types ─────────────────────────────────────────────────────────────────

type ChangeTag = "new" | "improved" | "fixed" | "security" | "breaking";

interface Change {
  tag: ChangeTag;
  text: string;
}

interface VersionEntry {
  version: string;
  date: string;
  isLatest?: boolean;
  summary: string;
  changes: Change[];
}

// ─── Tag config ────────────────────────────────────────────────────────────

const tagConfig: Record<
  ChangeTag,
  { label: string; className: string; Icon: typeof Sparkles }
> = {
  new: {
    label: "New",
    className: "bg-primary/10 text-primary border-primary/25",
    Icon: Sparkles,
  },
  improved: {
    label: "Improved",
    className: "bg-blue-500/10 text-blue-600 border-blue-200/30",
    Icon: Rocket,
  },
  fixed: {
    label: "Fixed",
    className: "bg-green-500/10 text-green-600 border-green-200/30",
    Icon: Wrench,
  },
  security: {
    label: "Security",
    className: "bg-amber-500/10 text-amber-700 border-amber-200/30",
    Icon: ShieldCheck,
  },
  breaking: {
    label: "Breaking",
    className: "bg-red-500/10 text-red-600 border-red-200/30",
    Icon: AlertTriangle,
  },
};

// ─── Changelog data ────────────────────────────────────────────────────────

const changelog: VersionEntry[] = [
  {
    version: "1.0.0",
    date: "March 18, 2026",
    isLatest: true,
    summary:
      "Initial public release of Spark for Windows — the native AI text assistant that lives in your system tray and transforms selected text with one shortcut.",
    changes: [
      {
        tag: "new",
        text: "Global hotkey (Ctrl+Shift+Space) triggers Spark from any foreground application",
      },
      {
        tag: "new",
        text: "12 built-in AI actions: Fix Grammar, Summarize, Translate, Rewrite, Expand, Shorten, Change Tone, Explain Code, Bullet Points, Casual Tone, Improve Writing, Explain",
      },
      {
        tag: "new",
        text: "Custom actions — define your own prompts using {text} as a placeholder, with a custom name and icon",
      },
      {
        tag: "new",
        text: "Smart action ordering — detects whether you selected code, an email, a long paragraph, or a short sentence and reorders actions accordingly",
      },
      {
        tag: "new",
        text: "Groq integration for ultra-fast AI inference (primary provider at launch)",
      },
      {
        tag: "new",
        text: "OpenRouter support — access hundreds of models from one unified API key",
      },
      {
        tag: "new",
        text: "In-place text replacement — results sent back to source app via Ctrl+V, replacing your original selection",
      },
      {
        tag: "new",
        text: "Floating action panel with full keyboard navigation: ↑↓ arrows to browse, Enter to execute, Esc to dismiss",
      },
      {
        tag: "new",
        text: "AI Chat mode — multi-turn conversations in a floating popup with streaming responses",
      },
      {
        tag: "new",
        text: "Prompt enhancement — one-click AI-powered prompt improver that turns simple instructions into well-structured prompts",
      },
      {
        tag: "new",
        text: "API keys encrypted locally using Windows DPAPI — never transmitted to Spark servers",
      },
      {
        tag: "new",
        text: "System tray resident — no taskbar entry, no open windows when idle",
      },
      {
        tag: "new",
        text: "Per-monitor DPI awareness for sharp rendering at any Windows display scaling factor",
      },
      {
        tag: "new",
        text: "GPU-accelerated panel open and close animations",
      },
      {
        tag: "new",
        text: "Streaming AI responses in both action and chat mode",
      },
      {
        tag: "security",
        text: "All API credentials encrypted at rest with Windows Data Protection API (DPAPI)",
      },
      {
        tag: "security",
        text: "Text sent directly to AI providers — Spark backend servers are never in the data path",
      },
    ],
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────

const ChangeRow = ({ change, index }: { change: Change; index: number }) => {
  const config = tagConfig[change.tag];
  const Icon = config.Icon;
  return (
    <motion.li
      className="flex items-start gap-3 text-sm"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Badge
        variant="outline"
        className={`shrink-0 mt-0.5 text-[10px] font-semibold px-1.5 py-0.5 flex items-center gap-1 border ${config.className}`}
      >
        <Icon className="w-2.5 h-2.5" />
        {config.label}
      </Badge>
      <span className="text-muted-foreground leading-relaxed pt-0.5">
        {change.text}
      </span>
    </motion.li>
  );
};

const VersionCard = ({
  entry,
  index,
}: {
  entry: VersionEntry;
  index: number;
}) => {
  // group changes by tag for optional future grouping; for now flat list
  const newChanges = entry.changes.filter((c) => c.tag === "new");
  const otherChanges = entry.changes.filter((c) => c.tag !== "new");

  return (
    <motion.div
      className="relative flex gap-6 md:gap-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border shadow-card ${
            entry.isLatest
              ? "bg-primary border-primary/30"
              : "bg-card border-border/60"
          }`}
        >
          <BookOpen
            className={`w-4 h-4 ${entry.isLatest ? "text-white" : "text-muted-foreground"}`}
          />
          {entry.isLatest && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-background" />
          )}
        </div>
        {/* Connector line — shown between items */}
        {index < changelog.length - 1 && (
          <div className="flex-1 w-px bg-gradient-to-b from-border to-transparent mt-2 min-h-[40px]" />
        )}
      </div>

      {/* Card content */}
      <div className="flex-1 pb-12">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <span className="text-2xl md:text-3xl font-bold tracking-[-0.03em] text-gradient">
            v{entry.version}
          </span>
          {entry.isLatest && (
            <span className="inline-flex items-center rounded-full bg-green-400/15 border border-green-400/25 px-2.5 py-0.5 text-xs font-semibold text-green-700">
              Latest
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-3">{entry.date}</p>

        {/* Summary */}
        <p className="text-sm text-foreground leading-relaxed mb-6 max-w-2xl">
          {entry.summary}
        </p>

        {/* Changes */}
        <div className="rounded-2xl border border-border/60 bg-card/70 p-5 md:p-6 space-y-8">
          {newChanges.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                What's new
              </h3>
              <ul className="space-y-3">
                {newChanges.map((c, i) => (
                  <ChangeRow key={i} change={c} index={i} />
                ))}
              </ul>
            </div>
          )}
          {otherChanges.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Fixes & Security
              </h3>
              <ul className="space-y-3">
                {otherChanges.map((c, i) => (
                  <ChangeRow key={i} change={c} index={newChanges.length + i} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────

const changelogSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Spark",
  operatingSystem: "Windows",
  applicationCategory: "ProductivityApplication",
  softwareVersion: changelog[0].version,
  datePublished: "2026-03-18",
};

const Changelog = () => {
  const latestVersion = changelog[0];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Spark Changelog | What's New"
        description="See every update and improvement made to Spark, the native Windows AI text assistant. Full version history with release notes."
        path="/changelog"
        keywords={[
          "Spark changelog",
          "Spark updates",
          "Spark version history",
          "what's new in Spark",
        ]}
        structuredData={changelogSchema}
      />
      <Navbar />

      <main className="relative pt-28 md:pt-36 pb-24 md:pb-32 overflow-hidden">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-80 w-[40rem] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        <div className="container max-w-4xl mx-auto px-6">
          {/* ── Page Header ── */}
          <motion.div
            className="mb-16 md:mb-20"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="inline-flex items-center rounded-full border border-border bg-card/80 px-3 py-1 text-xs tracking-wide text-muted-foreground mb-5">
              Release History
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gradient mb-4">
              Changelog
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Every improvement, fix, and new feature documented in one place.
            </p>

            {/* Latest version pill */}
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-border/70 bg-card/80 px-4 py-2.5 shadow-card">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                Current version:{" "}
                <span className="text-primary font-bold">
                  v{latestVersion.version}
                </span>
              </span>
              <span className="text-xs text-muted-foreground">
                {latestVersion.date}
              </span>
            </div>
          </motion.div>

          {/* ── Tag Legend ── */}
          <motion.div
            className="flex flex-wrap gap-2 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {(Object.keys(tagConfig) as ChangeTag[]).map((tag) => {
              const config = tagConfig[tag];
              const Icon = config.Icon;
              return (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${config.className}`}
                >
                  <Icon className="w-3 h-3" />
                  {config.label}
                </span>
              );
            })}
          </motion.div>

          {/* ── Timeline ── */}
          <div>
            {changelog.map((entry, i) => (
              <VersionCard key={entry.version} entry={entry} index={i} />
            ))}
          </div>

          {/* ── Bottom CTA ── */}
          <motion.div
            className="mt-8 rounded-2xl border border-border/70 bg-card/80 p-6 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-sm text-muted-foreground mb-3">
              Want to suggest a feature or report a bug?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/issues"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
              >
                Open Issues & Feedback →
              </Link>
              <span className="text-border">|</span>
              <Link
                to="/download-started"
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Download latest build →
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Changelog;

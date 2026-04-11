import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronRight,
  RotateCcw,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
  Zap,
  Shield,
  Gauge,
  Globe,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const uninstallSteps = [
  {
    step: 1,
    title: "Open Windows Settings",
    description:
      'Press Win + I to open Settings, then navigate to Apps → Installed Apps (or Programs and Features on older Windows).',
  },
  {
    step: 2,
    title: "Find Spark",
    description:
      'Search for "Spark" in the search box. Click on the Spark entry to expand the options.',
  },
  {
    step: 3,
    title: "Uninstall the App",
    description:
      'Click the "Uninstall" button and follow the on-screen prompts to complete the removal.',
  },
  {
    step: 4,
    title: "Remove Remaining Data (Optional)",
    description:
      'If you want a clean slate, open Run (Win + R) and type %AppData%\\Spark to manually remove any leftover config or cache files.',
  },
];

type ReasonId =
  | "complex"
  | "performance"
  | "switched"
  | "expectations"
  | "privacy"
  | "other";

interface Reason {
  id: ReasonId;
  label: string;
  icon: typeof HelpCircle;
  message: string;
}

const reasons: Reason[] = [
  {
    id: "complex",
    label: "Too complex to set up",
    icon: HelpCircle,
    message:
      "We genuinely want to make setup easier. Tell us exactly what confused you — it helps us streamline the experience for everyone.",
  },
  {
    id: "performance",
    label: "Performance issues",
    icon: Gauge,
    message:
      "Sorry you ran into issues. A detailed report with your system specs and what happened helps us track and fix it faster.",
  },
  {
    id: "switched",
    label: "Switched to another tool",
    icon: Globe,
    message:
      "No hard feelings! We'd love to know what the other tool does better so we can close the gap.",
  },
  {
    id: "expectations",
    label: "Not what I expected",
    icon: Zap,
    message:
      "What were you hoping for? Your honest feedback shapes what Spark becomes next.",
  },
  {
    id: "privacy",
    label: "Privacy concerns",
    icon: Shield,
    message:
      "Your concern is completely valid. We'd love to address your specific question — our privacy model is local-first by design.",
  },
  {
    id: "other",
    label: "Something else",
    icon: MessageSquare,
    message:
      "Whatever it is, we want to hear it. Drop us a detailed note so we can understand and improve.",
  },
];

const DepartingIcon = () => (
  <div className="relative flex items-center justify-center w-32 h-32 mb-6">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-primary/25"
        style={{ width: 56, height: 56 }}
        animate={{
          width: [56, 128, 200],
          height: [56, 128, 200],
          opacity: [0.5, 0.12, 0],
        }}
        transition={{
          duration: 2.8,
          delay: i * 0.9,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    ))}

    <motion.div
      animate={{ y: [-3, -14, -3], opacity: [1, 0.75, 1] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center shadow-float"
    >
      <Sparkles className="w-8 h-8 text-primary" />
    </motion.div>

    {[...Array(5)].map((_, i) => {
      const angle = (i / 5) * 360;
      const delay = i * 0.4;
      return (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
          style={{
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            x: [
              "-50%",
              `calc(-50% + ${Math.cos((angle * Math.PI) / 180) * 44}px)`,
              "-50%",
            ],
            y: [
              "-50%",
              `calc(-50% + ${Math.sin((angle * Math.PI) / 180) * 44}px)`,
              "-50%",
            ],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      );
    })}
  </div>
);

const Uninstall = () => {
  const [selectedReason, setSelectedReason] = useState<ReasonId | null>(null);

  const selectedReasonData = reasons.find((r) => r.id === selectedReason);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Uninstall Spark | Windows Removal Guide"
        description="How to completely uninstall Spark from your Windows device. We're sorry to see you go — let us know how we can improve."
        path="/uninstall"
        noindex
      />
      <Navbar />

      <main className="relative pt-28 md:pt-36 pb-24 md:pb-32 overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-80 w-[38rem] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-amber-200/20 blur-3xl" />
        </div>

        <div className="container max-w-5xl mx-auto px-6">
          {/* ── Hero ── */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex justify-center">
              <DepartingIcon />
            </div>

            <p className="inline-flex items-center rounded-full border border-border bg-card/80 px-3 py-1 text-xs tracking-wide text-muted-foreground mb-5">
              We'll miss you
            </p>

            <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gradient mb-4">
              Sorry to see you go
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Follow the steps below to completely remove Spark from your
              Windows device. Before you leave, we'd love to know what went
              wrong.
            </p>
          </motion.div>

          {/* ── Uninstall Steps ── */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-2xl font-bold tracking-[-0.02em] mb-6 text-foreground">
              How to uninstall Spark
            </h2>

            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-[22px] top-10 bottom-10 w-px bg-gradient-to-b from-primary/40 via-primary/15 to-transparent hidden sm:block" />

              <div className="space-y-4">
                {uninstallSteps.map((item, i) => (
                  <motion.div
                    key={item.step}
                    className="flex gap-5 rounded-2xl border border-border/60 bg-card/70 p-5 hover:bg-card transition-colors duration-300"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + i * 0.08,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {item.step}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-primary/30 shrink-0 mt-1 hidden sm:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── Reason Picker ── */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-2xl font-bold tracking-[-0.02em] mb-2 text-foreground">
              What brought you here?
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Your honest feedback helps us improve for everyone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {reasons.map((reason, i) => {
                const Icon = reason.icon;
                const isSelected = selectedReason === reason.id;
                return (
                  <motion.button
                    key={reason.id}
                    type="button"
                    onClick={() =>
                      setSelectedReason(isSelected ? null : reason.id)
                    }
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-left border transition-all duration-200 ${
                      isSelected
                        ? "bg-primary/10 border-primary/30 text-primary shadow-hover"
                        : "bg-card/70 border-border/60 text-muted-foreground hover:bg-card hover:text-foreground hover:border-border"
                    }`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.35 + i * 0.06,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-pressed={isSelected}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{reason.label}</span>
                    {isSelected && (
                      <ChevronRight className="w-3.5 h-3.5 ml-auto shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Expanded message for selected reason */}
            <AnimatePresence>
              {selectedReasonData && (
                <motion.div
                  key={selectedReason}
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                    <p className="text-sm text-foreground leading-relaxed max-w-lg">
                      {selectedReasonData.message}
                    </p>
                    <Button
                      asChild
                      variant="hero"
                      size="sm"
                      className="shrink-0"
                    >
                      <Link to="/issues">
                        Tell us on Issues
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* ── CTA Row ── */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Report issue */}
            <div className="rounded-2xl border border-border/70 bg-card/80 p-6 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Report a problem
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Bug, crash, or unexpected behaviour? File a detailed report
                  and we'll look into it personally.
                </p>
              </div>
              <Button asChild variant="hero" className="self-start">
                <Link to="/issues">Open Issues</Link>
              </Button>
            </div>

            {/* Changed your mind */}
            <div className="rounded-2xl border border-border/70 bg-card/80 p-6 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Changed your mind?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We'd love to have you back. Download the latest version of
                  Spark and give it another shot.
                </p>
              </div>
              <Button asChild variant="outline" className="self-start">
                <Link to="/download-started">Download Spark Again</Link>
              </Button>
            </div>
          </motion.div>

          {/* ── Bottom note ── */}
          <motion.p
            className="mt-12 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            Thank you for trying Spark.{" "}
            <Link to="/" className="underline hover:text-foreground transition-colors">
              Back to home
            </Link>
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Uninstall;

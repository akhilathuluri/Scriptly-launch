import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RollingText from "@/components/RollingText";
import {
  ArrowUpRight,
  Copy,
  Download,
  Languages,
  List,
  MessageCircle,
  Monitor,
  Pencil,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";

type ActionItem = {
  id: string;
  title: string;
  subtitle: string;
  hotkey: string;
  icon: LucideIcon;
  result: string;
  resultButtonLabel: string;
};

const actionItems: ActionItem[] = [
  {
    id: "explain-code",
    title: "Explain Code",
    subtitle: "Explain what this code does",
    hotkey: "C",
    icon: Monitor,
    result:
      "This function groups text actions in one keyboard-first panel. Each action points to a predefined output, so selecting an item immediately updates the result window without calling external services.",
    resultButtonLabel: "Apply",
  },
  {
    id: "rewrite",
    title: "Rewrite",
    subtitle: "Rewrite in a cleaner, clearer way",
    hotkey: "R",
    icon: RotateCcw,
    result:
      "Spark is a native Windows app that improves selected text with shortcut-based actions. Pick an action, apply the result, and keep writing without switching contexts.",
    resultButtonLabel: "Replace",
  },
  {
    id: "fix-grammar",
    title: "Fix Grammar",
    subtitle: "Fix spelling and grammar mistakes",
    hotkey: "G",
    icon: Pencil,
    result:
      "Spark is a native Windows desktop application that transforms selected text with AI-powered actions without interrupting the user's workflow. It works across the operating system, allowing users to trigger actions with a global shortcut and instantly edit or analyze text.",
    resultButtonLabel: "Replace",
  },
  {
    id: "ask-ai",
    title: "Ask AI",
    subtitle: "Ask anything - type your own question",
    hotkey: "Q",
    icon: MessageCircle,
    result:
      "Preset answer: Spark is useful when you need fast writing assistance in any desktop app. It keeps your context intact by applying actions directly to selected text.",
    resultButtonLabel: "Use Answer",
  },
  {
    id: "summarize",
    title: "Summarize",
    subtitle: "Create a concise summary",
    hotkey: "S",
    icon: List,
    result:
      "Spark is a Windows desktop tool that transforms selected text through shortcut-triggered actions without leaving the current app.",
    resultButtonLabel: "Replace",
  },
  {
    id: "translate",
    title: "Translate",
    subtitle: "Translate to English or detect language",
    hotkey: "T",
    icon: Languages,
    result:
      "Spark es una aplicacion de escritorio para Windows que transforma texto seleccionado con acciones rapidas, sin interrumpir el flujo de trabajo del usuario.",
    resultButtonLabel: "Use Translation",
  },
];

type ActionPanelCardProps = {
  selectedActionId: string;
  onSelectAction: (actionId: string) => void;
};

const ActionPanelCard = ({
  selectedActionId,
  onSelectAction,
}: ActionPanelCardProps) => {
  return (
    <div className="w-[280px] md:w-[320px] rounded-2xl p-3 md:p-4 text-left bg-gradient-to-b from-[#15162d] via-[#111426] to-[#0d1020] border border-white/10 shadow-float">
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-semibold tracking-tight text-[#c9c9ea]">
          Spark
        </span>
        <span className="text-sm text-[#777ab3]">Groq</span>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-[#2a2f57] bg-[#1b1f3c] px-3 py-2.5 mb-3">
        <Search className="w-4 h-4 text-[#868bd0]" />
        <div className="h-5 w-px bg-[#4d53a0]" />
        <span className="text-[#aeb2e3] text-sm">Select an action</span>
      </div>
      <div className="space-y-2 max-h-[280px] overflow-hidden">
        {actionItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedActionId === item.id;

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onSelectAction(item.id)}
              aria-pressed={isActive}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors w-full text-left ${
                isActive
                  ? "bg-[#4a4e78] text-[#eff0ff]"
                  : "bg-transparent text-[#d8daf5] hover:bg-[#1f2344]"
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <Icon className="w-4 h-4 mt-0.5 shrink-0 opacity-95" />
                <div className="min-w-0">
                  <p className="text-base leading-none font-medium truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#a5a8d4] mt-1 truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              <span className="ml-2 w-7 h-7 rounded-md bg-[#232751] text-[#d8dbff] text-xs font-semibold flex items-center justify-center shrink-0">
                {item.hotkey}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[11px] text-[#7f84bf] text-center">
        1. navigate - . select - esc close
      </p>
    </div>
  );
};

type ResultWindowCardProps = {
  selectedAction: ActionItem;
};

const ResultWindowCard = ({ selectedAction }: ResultWindowCardProps) => {
  const ActionIcon = selectedAction.icon;
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText("");

    const typingTimer = window.setInterval(() => {
      currentIndex += 1;
      setDisplayedText(selectedAction.result.slice(0, currentIndex));

      if (currentIndex >= selectedAction.result.length) {
        window.clearInterval(typingTimer);
      }
    }, 12);

    return () => {
      window.clearInterval(typingTimer);
    };
  }, [selectedAction.id, selectedAction.result]);

  return (
    <div className="w-[280px] md:w-[340px] rounded-2xl p-3 md:p-4 text-left bg-gradient-to-b from-[#15162d] via-[#111426] to-[#0d1020] border border-white/10 shadow-float">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-[#cfd2fb]">
          <ActionIcon className="w-4 h-4" />
          <span className="text-[28px] leading-none">
            {selectedAction.title}
          </span>
        </div>
        <X className="w-4 h-4 text-[#7a7fb8]" />
      </div>

      <div className="rounded-xl border border-[#2a2f57] bg-[#1b1f3c] px-4 py-4">
        <p
          className="text-[#e8eaff] text-sm leading-relaxed"
          aria-live="polite"
        >
          {displayedText}
          {displayedText.length < selectedAction.result.length && (
            <span className="inline-block w-1 h-4 ml-0.5 align-[-2px] bg-[#a8adff] animate-pulse" />
          )}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-10 h-10 rounded-xl bg-[#1f2345] text-[#9ea2db] border border-[#2a2f57] flex items-center justify-center"
            aria-label="Expand result"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-xl bg-[#1f2345] text-[#9ea2db] border border-[#2a2f57] flex items-center justify-center"
            aria-label="Regenerate result"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-5 h-10 rounded-xl bg-[#252a4e] border border-[#2a2f57] text-[#c8ccf6] text-base font-medium"
          >
            <span className="inline-flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Copy
            </span>
          </button>
          <button
            type="button"
            className="px-5 h-10 rounded-xl bg-[#544cff] text-white text-base font-semibold"
          >
            {selectedAction.resultButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [selectedActionId, setSelectedActionId] = useState(actionItems[0].id);
  const selectedAction =
    actionItems.find((item) => item.id === selectedActionId) ?? actionItems[0];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 12, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.1] text-gradient mb-6">
            <RollingText
              text="AI Text. Anywhere."
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.1] text-gradient"
              charsPerSecond={12}
            />
          </h1>
          <p className="text-lg md:text-xl leading-relaxed tracking-[-0.01em] text-muted-foreground max-w-xl mx-auto mb-10">
            Spark lives in your menu bar, ready to transform text in any
            application with a single shortcut. No context switching. Just
            better writing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="lg"
              className="h-12 px-8 text-base"
              asChild
            >
              <Link to="/download-started">
                <Download className="w-4 h-4 mr-2" />
                Download for Windows
              </Link>
            </Button>
            <Button
              variant="hero-secondary"
              size="lg"
              className="h-12 px-8 text-base"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>
        </motion.div>

        <div className="relative mt-20 md:mt-28 max-w-4xl mx-auto">
          <motion.div
            className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <motion.div
              className="rounded-2xl overflow-hidden shadow-float"
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <ActionPanelCard
                selectedActionId={selectedAction.id}
                onSelectAction={setSelectedActionId}
              />
            </motion.div>

            <motion.div
              className="rounded-2xl overflow-hidden shadow-float"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <ResultWindowCard selectedAction={selectedAction} />
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

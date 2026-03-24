import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RollingText from "@/components/RollingText";
import TextSelectionDataCard from "@/components/TextSelectionDataCard";
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
  codeExample: string;
};

const actionItems: ActionItem[] = [
  {
    id: "explain-code",
    title: "Explain Code",
    subtitle: "Explain what this code does",
    hotkey: "C",
    icon: Monitor,
    codeExample: `const [products, setProducts] = useState([]);

useEffect(() => {
  let isMounted = true;

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (isMounted) {
        setProducts(data.items ?? []);
      }
    } catch (error) {
      console.error('Failed to load products', error);
    }
  };

  loadProducts();

  return () => {
    isMounted = false;
  };
}, []);`,
    result:
      "This React code fetches product data when the component first loads. It calls /api/products, converts the response to JSON, and stores the returned items in component state using setProducts. The isMounted flag prevents state updates after unmount, avoiding memory-leak style warnings. If the request fails, it logs an error instead of crashing the UI.",
    resultButtonLabel: "Apply",
  },
  {
    id: "rewrite",
    title: "Rewrite",
    subtitle: "Rewrite in a cleaner, clearer way",
    hotkey: "R",
    icon: RotateCcw,
    codeExample: `Hey team,

we need this done asap. i checked the api but it still giving error and client is waiting from morning. can someone fix this today and update me once done because i have call at 5.

thanks`,
    result: `Hi team,

We need to resolve this as soon as possible. I checked the API, and it is still returning an error. The client has been waiting since this morning.

Can someone please fix this today and share an update once it's done? I have a client call at 5:00 PM.

Thanks,`,
    resultButtonLabel: "Replace",
  },
  {
    id: "fix-grammar",
    title: "Fix Grammar",
    subtitle: "Fix spelling and grammar mistakes",
    hotkey: "G",
    icon: Pencil,
    codeExample: `The dashboard dont load properly on mobile and users was reporting that the checkout buttons are missing. We needs to fix it quick before tonight deployment.`,
    result: `The dashboard doesn't load properly on mobile, and users have reported that the checkout buttons are missing. We need to fix this quickly before tonight's deployment.`,
    resultButtonLabel: "Replace",
  },
  {
    id: "ask-ai",
    title: "Ask AI",
    subtitle: "Ask anything - type your own question",
    hotkey: "Q",
    icon: MessageCircle,
    codeExample: `How do I optimize a React component?`,
    result: `Use React.memo() to prevent unnecessary re-renders, optimize state with useCallback and useMemo, lazy load components with React.lazy(), and use keys properly in lists. Profile with DevTools to identify bottlenecks.`,
    resultButtonLabel: "Use Answer",
  },
  {
    id: "summarize",
    title: "Summarize",
    subtitle: "Create a concise summary",
    hotkey: "S",
    icon: List,
    codeExample: `The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet. It is often used in typography and typesetting to test how fonts look when all characters are displayed.`,
    result: `A pangram featuring all English alphabet letters, commonly used in typography testing.`,
    resultButtonLabel: "Replace",
  },
  {
    id: "translate",
    title: "Translate",
    subtitle: "Translate to English or detect language",
    hotkey: "T",
    icon: Languages,
    codeExample: `Bonjour, comment allez-vous?`,
    result: `Hello, how are you?`,
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

        <div className="relative mt-20 md:mt-28 max-w-6xl mx-auto">
          <motion.div
            className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {/* Text Selection Card (Left) - Shows action code examples */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-float"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <TextSelectionDataCard
                selectedText={selectedAction.codeExample}
                actionTitle={selectedAction.title}
              />
            </motion.div>

            {/* Action Panel Card (Center) */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-float"
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <ActionPanelCard
                selectedActionId={selectedAction.id}
                onSelectAction={setSelectedActionId}
              />
            </motion.div>

            {/* Result Window Card (Right) */}
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

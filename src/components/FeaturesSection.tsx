import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  Zap,
  Globe,
  Brain,
  Puzzle,
  Replace,
  Gauge,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Actions",
    description: "Transform text with a single keyboard shortcut.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "Select text in any app. Scriptly handles the rest.",
  },
  {
    icon: Brain,
    title: "Smart Context",
    description: "AI understands your text and suggests the best action.",
  },
  {
    icon: Puzzle,
    title: "Custom Actions",
    description: "Create your own prompts for domain-specific workflows.",
  },
  {
    icon: Replace,
    title: "In-place Replace",
    description: "Results replace your original text — no copy-paste needed.",
  },
  {
    icon: Gauge,
    title: "Lightning Fast",
    description: "Native Windows app. No browser. No lag.",
  },
];

const CircleHighlight = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });

  const rawProgress = useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, 1]);
  const progress = useSpring(rawProgress, { stiffness: 100, damping: 30 });

  const dashOffset = useTransform(progress, [0, 1], [400, 0]);

  return (
    <div ref={ref} className="relative inline-block">
      <span className="relative z-10">Native App</span>
      <svg
        className="absolute -inset-x-3 -inset-y-1 w-[calc(100%+24px)] h-[calc(100%+8px)]"
        viewBox="0 0 200 50"
        fill="none"
        preserveAspectRatio="none"
      >
        <motion.ellipse
          cx="100"
          cy="25"
          rx="95"
          ry="22"
          stroke="hsl(255, 50%, 45%)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="400"
          style={{ strokeDashoffset: dashOffset }}
          fill="none"
        />
      </svg>
    </div>
  );
};

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  const Icon = feature.icon;
  const isNativeApp = feature.title === "Lightning Fast";

  return (
    <motion.div
      className="group relative p-6 rounded-2xl glass-surface hover:bg-card hover:shadow-hover transition-all duration-300 cursor-default"
      initial={{ opacity: 0, y: 12, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {isNativeApp ? (
          <>
            Lightning Fast <CircleHighlight />
          </>
        ) : (
          feature.title
        )}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {feature.description}
      </p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-gradient mb-4">
            Your Workflow. Upgraded.
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Everything you need to transform how you write, all from one shortcut.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

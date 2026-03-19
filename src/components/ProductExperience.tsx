import { motion } from "framer-motion";
import { MousePointer2, Keyboard, ListChecks, Sparkles } from "lucide-react";

const steps = [
  {
    icon: MousePointer2,
    title: "Select",
    description: "Highlight any text in any application.",
    visual: (
      <div className="glass-surface rounded-2xl p-5 max-w-xs text-left">
        <div className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
          <p>Scriptly is a native Windows desktop</p>
          <p>
            <span className="bg-primary/15 text-primary ring-2 ring-primary/30 ring-offset-1 rounded px-0.5">
              application that transforms selected
            </span>
          </p>
          <p>
            <span className="bg-primary/15 text-primary ring-2 ring-primary/30 ring-offset-1 rounded px-0.5">
              text with AI-powered actions
            </span>
          </p>
          <p>without breaking your workflow.</p>
          <p>No context switching required.</p>
        </div>
      </div>
    ),
  },
  {
    icon: Keyboard,
    title: "Trigger",
    description: "Press your global shortcut.",
    visual: (
      <div className="glass-surface rounded-2xl p-6 max-w-xs flex items-center justify-center">
        <div className="flex gap-2">
          <span className="px-4 py-2 rounded-lg bg-card shadow-card text-sm font-mono font-semibold text-foreground border border-border">
            Ctrl
          </span>
          <span className="text-muted-foreground font-bold text-lg">+</span>
          <span className="px-4 py-2 rounded-lg bg-card shadow-card text-sm font-mono font-semibold text-foreground border border-border">
            Shift
          </span>
          <span className="text-muted-foreground font-bold text-lg">+</span>
          <span className="px-4 py-2 rounded-lg bg-card shadow-card text-sm font-mono font-semibold text-foreground border border-border">
            Space
          </span>
        </div>
      </div>
    ),
  },
  {
    icon: ListChecks,
    title: "Choose",
    description: "Pick an action: Summarize, Rewrite, Fix Grammar, or your own.",
    visual: (
      <div className="glass-surface rounded-2xl p-4 max-w-xs">
        <div className="space-y-1">
          {["Explain Code", "Rewrite", "Fix Grammar", "Summarize"].map(
            (action, i) => (
              <div
                key={action}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span>{action}</span>
                <span className="text-xs opacity-60 font-mono">
                  {["C", "R", "G", "S"][i]}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    ),
  },
  {
    icon: Sparkles,
    title: "Result",
    description: "Text is transformed and replaced instantly.",
    visual: (
      <div className="glass-surface rounded-2xl p-6 max-w-xs">
        <div className="space-y-2">
          <div className="h-3 rounded bg-muted w-full" />
          <div className="h-3 rounded bg-primary/15 w-full" />
          <div className="h-3 rounded bg-primary/15 w-4/5" />
          <div className="h-3 rounded bg-muted w-3/4" />
          <div className="h-3 rounded bg-muted w-5/6" />
        </div>
        <div className="mt-4 flex gap-2 justify-end">
          <span className="px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-muted-foreground">
            Copy
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-primary text-xs font-medium text-primary-foreground">
            Replace
          </span>
        </div>
      </div>
    ),
  },
];

const ProductExperience = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-gradient mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Four steps. Zero friction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <div className="mb-6">{step.visual}</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductExperience;

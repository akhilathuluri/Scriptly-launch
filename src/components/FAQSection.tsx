import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Spark?",
    answer:
      "Spark is a native Windows desktop application that transforms selected text with AI-powered actions. Select text anywhere, press a shortcut, and instantly summarize, rewrite, fix grammar, or run custom actions — without leaving your current app.",
  },
  {
    question: "How does it work?",
    answer:
      "Select any text in any application, press your configured keyboard shortcut (default: Ctrl+Shift+Space), choose an action from the floating panel, and get your result instantly. You can copy or replace the original text in one click.",
  },
  {
    question: "Which AI providers are supported?",
    answer:
      "Spark supports Groq out of the box, with plans to add more providers. You bring your own API key, which is encrypted locally using Windows DPAPI for maximum security.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. API keys are encrypted with Windows DPAPI and stored locally on your machine. Text is sent directly to your chosen AI provider — Spark never stores or logs your content on any external server.",
  },
  {
    question: "Can I create custom actions?",
    answer:
      "Absolutely. In Settings, you can define custom actions with your own prompts. These appear alongside built-in actions in the floating panel, letting you tailor Spark to your specific workflow.",
  },
  {
    question: "Does it work in every application?",
    answer:
      "Spark works system-wide — any application where you can select text. This includes browsers, code editors, email clients, document processors, terminals, and more.",
  },
  {
    question: "Is Spark free?",
    answer:
      "Spark is free to download and use. You provide your own AI provider API key, so you only pay for the AI usage directly through your provider at their standard rates.",
  },
  {
    question: "What are the system requirements?",
    answer:
      "Spark requires Windows 10 or later. It's a lightweight native application that runs in your system tray and uses minimal resources.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-gradient mb-4">
            Questions & Answers
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about Spark.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass-surface rounded-2xl border-none px-6 data-[state=open]:shadow-hover transition-shadow duration-300"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

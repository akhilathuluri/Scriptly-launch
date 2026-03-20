import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, MessageCircleQuestion, ShieldCheck } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-6 py-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-20 bottom-12 h-72 w-72 rounded-full bg-amber-200/45 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/40" />
      </div>

      <div className="relative mx-auto flex min-h-[85vh] w-full max-w-5xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="w-full rounded-3xl border border-border/60 bg-card/55 p-8 shadow-float backdrop-blur-xl md:p-12"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            Route Lost
          </div>

          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="text-[3.2rem] font-bold leading-[0.95] tracking-[-0.04em] text-foreground sm:text-[4.6rem]"
              >
                404
                <span className="block text-gradient">This page drifted away</span>
              </motion.h1>

              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                The page at this path is not available right now. It may have moved, been removed, or never existed.
              </p>

              <div className="mt-6 rounded-xl border border-border/60 bg-background/70 px-4 py-3 text-left text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Requested path:</span>
                <span className="ml-2 break-all font-mono">{location.pathname}</span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild variant="hero" size="lg" className="h-11 px-6">
                  <Link to="/">
                    <Home className="mr-1" />
                    Back to Home
                  </Link>
                </Button>

                <Button asChild variant="hero-secondary" size="lg" className="h-11 px-6">
                  <Link to="/faqs">
                    <MessageCircleQuestion className="mr-1" />
                    Open FAQs
                  </Link>
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="rounded-2xl border border-border/70 bg-background/85 p-6"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Quick Recovery
              </div>

              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="rounded-lg border border-border/60 bg-card/55 px-3 py-2">
                  Check the URL for typos.
                </li>
                <li className="rounded-lg border border-border/60 bg-card/55 px-3 py-2">
                  Return to home and continue from navigation.
                </li>
                <li className="rounded-lg border border-border/60 bg-card/55 px-3 py-2">
                  If a link brought you here, report it through the Issues page.
                </li>
              </ul>

              <div className="mt-5">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/issues">Report Broken Link</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import sparkLogo from "@/assets/spark-logo.svg";

const MOBILE_MENU_LINKS = [
  { to: "/why", label: "Why?" },
  { to: "/faqs", label: "FAQs" },
  { to: "/issues", label: "Issues" },
  { to: "/download-started", label: "Download", isPrimary: true },
];

const mobileOverlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.26,
      ease: [0.4, 0, 0.2, 1],
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } },
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/70 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent border-b border-transparent"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="container max-w-7xl mx-auto px-4 py-2 sm:px-6 sm:py-0">
        <div className="flex items-center justify-between sm:h-16">
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
          >
            <div
              className="h-10 w-10 rounded-xl bg-card shadow-card flex items-center justify-center cursor-pointer overflow-hidden"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <AnimatePresence mode="wait">
                {logoHovered ? (
                  <motion.div
                    key="arrow"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <ArrowLeft className="w-5 h-5 text-foreground" />
                  </motion.div>
                ) : (
                  <motion.img
                    key="logo"
                    src={sparkLogo}
                    alt="Spark logo"
                    className="w-6 h-6"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </AnimatePresence>
            </div>
            <span className="hidden sm:block text-lg font-semibold tracking-tight text-foreground">
              Spark
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-6">
            <Link
              to="/why"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Why?
            </Link>
            <Link
              to="/faqs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              FAQs
            </Link>
            <Link
              to="/issues"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Issues
            </Link>
            <Button variant="nav" size="sm" className="h-9 px-3 sm:px-5 shrink-0" asChild>
              <Link to="/download-started">Download</Link>
            </Button>
          </div>

          <div className="sm:hidden">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={mobileOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="sm:hidden fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl"
            >
              <div className="container mx-auto px-6 pt-24 pb-10 h-full">
                <motion.div
                  variants={mobileLinkVariants}
                  className="absolute top-4 right-4"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>

                <div className="h-full flex flex-col justify-center">
                  <div className="flex flex-col gap-4">
                    {MOBILE_MENU_LINKS.map((item) => (
                      <motion.div
                        key={item.to}
                        variants={mobileLinkVariants}
                      >
                        <Link
                          to={item.to}
                          className={`block w-full rounded-2xl border px-5 py-4 text-xl font-semibold transition-colors ${
                            item.isPrimary
                              ? "border-primary/30 bg-primary/10 text-primary hover:bg-primary/15"
                              : "border-border/60 bg-card/70 text-foreground hover:bg-card"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <motion.p
                    variants={mobileLinkVariants}
                    className="mt-8 text-sm text-muted-foreground"
                  >
                    Spark mobile navigation
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

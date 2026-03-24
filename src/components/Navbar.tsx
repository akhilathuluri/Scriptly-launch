import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import sparkLogo from "@/assets/spark-logo.svg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
        scrolled
          ? "bg-card/70 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent border-b border-transparent"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
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
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Spark
          </span>
        </Link>

        <div className="flex items-center gap-6">
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
          <Button variant="nav" size="sm" className="h-9 px-5" asChild>
            <Link to="/download-started">Download</Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

import { Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">S</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              Spark
            </span>
            <span className="text-xs text-muted-foreground">v1.0.0</span>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6">
            <a
              href="https://github.com/akhilathuluri/"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <Link
              to="/privacy-policy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <a
              href="mailto:akhil.builds@proton.me"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Contact"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Spark. System-wide AI text.
          </p>
        </div>

        {/* Secondary footer row */}
        <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-center flex-wrap gap-x-6 gap-y-2">
          <Link
            to="/terms"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/changelog"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Changelog
          </Link>
          <Link
            to="/why"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Why Spark?
          </Link>
          <Link
            to="/faqs"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQs
          </Link>
          <Link
            to="/uninstall"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Uninstall
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

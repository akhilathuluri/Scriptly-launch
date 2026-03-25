import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download as DownloadIcon, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const downloadSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Spark",
  operatingSystem: "Windows",
  applicationCategory: "ProductivityApplication",
  downloadUrl:
    "https://github.com/akhilathuluri/spark-app/releases/download/v1/SparkInstaller-win-x64.exe",
  description:
    "Download Spark for Windows and transform text instantly with AI actions like rewrite, grammar fix, summarize, and translate.",
};

const Download = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Download Spark for Windows"
        description="Download Spark for Windows and transform text instantly in any app with one keyboard shortcut."
        path="/download"
        keywords={[
          "download Spark",
          "Spark for Windows",
          "Spark exe download",
          "AI assistant Windows download",
        ]}
        structuredData={downloadSchema}
      />

      <Navbar />

      <main className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[36rem] rounded-full bg-primary/10 blur-[110px]" />
        </div>

        <div className="container max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gradient mb-4">
              Download Spark for Windows
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Spark is a native AI text assistant for Windows. Select text in any app, press one
              shortcut, and instantly rewrite, fix grammar, summarize, and translate in place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="rounded-2xl border border-border/60 bg-card/70 p-5">
              <Zap className="w-5 h-5 text-primary mb-3" />
              <h2 className="font-semibold mb-1">Fast In-Place AI Actions</h2>
              <p className="text-sm text-muted-foreground">No app switching, no copy-paste loops.</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/70 p-5">
              <Shield className="w-5 h-5 text-primary mb-3" />
              <h2 className="font-semibold mb-1">Privacy First</h2>
              <p className="text-sm text-muted-foreground">Local key encryption with Windows DPAPI.</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/70 p-5">
              <DownloadIcon className="w-5 h-5 text-primary mb-3" />
              <h2 className="font-semibold mb-1">Native Windows App</h2>
              <p className="text-sm text-muted-foreground">Lightweight and built for desktop workflows.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/80 p-8 text-center">
            <Button asChild variant="hero" size="lg" className="h-12 px-8">
              <Link to="/download-started">Start Spark Download</Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Need help first? Visit <Link to="/faqs" className="underline">FAQs</Link> or review the <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Download;

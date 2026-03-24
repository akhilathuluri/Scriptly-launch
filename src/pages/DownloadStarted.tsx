import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Laptop } from "lucide-react";
import SEO from "@/components/SEO";

type Architecture = "x64" | "arm64" | null;

const detectArchitecture = (): Architecture => {
  if (typeof navigator === "undefined") {
    return null;
  }

  const nav = navigator as Navigator & {
    userAgentData?: {
      architecture?: string;
      platform?: string;
    };
  };

  const architecture = nav.userAgentData?.architecture?.toLowerCase();
  if (architecture?.includes("arm")) {
    return "arm64";
  }
  if (architecture?.includes("x86") || architecture?.includes("x64")) {
    return "x64";
  }

  const fingerprint = `${navigator.platform} ${navigator.userAgent}`.toLowerCase();
  if (fingerprint.includes("arm64") || fingerprint.includes("aarch64") || fingerprint.includes("arm")) {
    return "arm64";
  }
  if (fingerprint.includes("win64") || fingerprint.includes("x64") || fingerprint.includes("x86_64")) {
    return "x64";
  }

  return null;
};

const DownloadStarted = () => {
  const x64DownloadUrl =
    "https://github.com/akhilathuluri/Spark-app/releases/download/v1.0/Spark.exe";
  const arm64DownloadUrl =
    "https://github.com/akhilathuluri/Spark-app/releases/latest";
  const detectedArchitecture = detectArchitecture();

  const isX64Recommended = detectedArchitecture === "x64";
  const isArm64Recommended = detectedArchitecture === "arm64";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-6 py-16">
      <SEO
        title="Spark Download Started"
        description="Your Spark download has started. Follow installation steps to set up Spark on Windows."
        path="/download-started"
        noindex
      />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -right-20 bottom-12 h-72 w-72 rounded-full bg-amber-200/25 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
            Download Started
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Choose your platform and download Spark
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-border/60 bg-card/70 p-8 text-center"
        >
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            Download Spark Builds
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pick the correct architecture for your device.
          </p>
          {detectedArchitecture && (
            <p className="mt-2 text-xs text-primary">
              Detected architecture: {detectedArchitecture.toUpperCase()}
            </p>
          )}

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Button
              asChild
              variant={isX64Recommended ? "hero" : "outline"}
              size="lg"
              className={`h-12 ${isX64Recommended ? "ring-2 ring-primary/50" : ""}`}
            >
              <a href={x64DownloadUrl} target="_blank" rel="noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download x64
              </a>
            </Button>

            <Button
              asChild
              variant={isArm64Recommended ? "hero" : "outline"}
              size="lg"
              className={`h-12 ${isArm64Recommended ? "ring-2 ring-primary/50" : ""}`}
            >
              <a href={arm64DownloadUrl} target="_blank" rel="noreferrer">
                <Laptop className="mr-2 h-4 w-4" />
                Download ARM64
              </a>
            </Button>

            <Button variant="secondary" size="lg" className="h-12" disabled>
              Linux (Coming Soon)
            </Button>
          </div>

          {(isX64Recommended || isArm64Recommended) && (
            <p className="mt-3 text-xs text-primary">
              Recommended for your device: {isX64Recommended ? "x64" : "ARM64"}
            </p>
          )}

          <p className="mt-5 text-xs text-muted-foreground">
            Need help installing? Check the <Link to="/faqs" className="underline hover:text-foreground">FAQs</Link> or report <Link to="/issues" className="underline hover:text-foreground">Issues</Link>.
          </p>

          <div className="mt-6 flex justify-center">
            <Button asChild variant="ghost">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DownloadStarted;

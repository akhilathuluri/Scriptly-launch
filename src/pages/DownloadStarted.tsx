import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, FileText, Zap } from "lucide-react";

const DownloadStarted = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  const steps = [
    {
      title: "Download Started",
      description: "Your Spark installer is downloading...",
      icon: Download,
      action: "Downloading Spark.exe",
      status: "in-progress",
    },
    {
      title: "Locate File",
      description: "Find the downloaded file in your Downloads folder",
      icon: FileText,
      action: "Look for: Spark.exe",
      status: "pending",
    },
    {
      title: "Run Installer",
      description: "Double-click the Spark.exe file to start installation",
      icon: Zap,
      action: "Double-click Spark.exe",
      status: "pending",
    },
  ];

  useEffect(() => {
    // Trigger the download immediately
    const link = document.createElement("a");
    link.href =
      "https://github.com/akhilathuluri/Spark-app/releases/download/v1.0/Spark.exe";
    link.download = "Spark.exe";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleClickExe = () => {
    setShowDialog(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-6 py-16">
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
            Follow these steps to complete your Spark installation
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-4 mb-8">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index <= currentStep;
            const isCurrentStep = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`rounded-2xl border p-6 transition-all ${
                  isActive
                    ? "border-primary/40 bg-card/70 shadow-float"
                    : "border-border/40 bg-card/30"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className={`h-12 w-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                        isCompleted
                          ? "bg-emerald-500/20 text-emerald-600"
                          : isCurrentStep
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                      animate={isCurrentStep ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                      transition={{ duration: 1.5, repeat: isCurrentStep ? Infinity : 0 }}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </motion.div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>

                    {isCurrentStep && step.status === "in-progress" && (
                      <motion.div
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {step.action}
                      </motion.div>
                    )}

                    {isCompleted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600"
                      >
                        ✓ Complete
                      </motion.div>
                    )}

                    {!isCompleted && !isCurrentStep && (
                      <div className="mt-3 inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        Pending
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Section */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Once you find Spark.exe in your Downloads folder, click the button below to simulate the installation:
            </p>
            <Button onClick={handleClickExe} variant="hero" size="lg">
              <FileText className="w-4 h-4 mr-2" />
              I Found & Clicked Spark.exe
            </Button>
          </motion.div>
        )}

        {/* Dialog Simulation */}
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg border border-border bg-card p-6 shadow-float"
            >
              <h4 className="font-semibold text-foreground mb-4">Spark Installer</h4>
              <p className="text-sm text-muted-foreground mb-6">
                Continue with installation of Spark?
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowDialog(false)}>
                  Cancel
                </Button>
                <Button variant="default" onClick={() => setShowDialog(false)}>
                  OK
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Completion */}
        {currentStep >= steps.length - 1 && !showDialog && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Installation Complete!</h3>
            <p className="text-muted-foreground mb-6">
              Spark is now installed and ready to use. Check your Start Menu or press Ctrl+Shift+Space to get started.
            </p>
            <div className="flex gap-3 justify-center">
              <Button asChild variant="outline">
                <Link to="/">Back to Home</Link>
              </Button>
              <Button variant="hero">
                Open Spark
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DownloadStarted;

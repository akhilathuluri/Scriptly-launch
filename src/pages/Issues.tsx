import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IssueForm, IssuesList } from "@/components/Issues";
import SEO from "@/components/SEO";

const Issues = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleIssueSuccess = () => {
    // Trigger refresh of issues list
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Spark Issues and Feedback"
        description="Report bugs, request features, and share feedback to help improve Spark, the native Windows AI text assistant."
        path="/issues"
      />
      <Navbar />

      <main className="relative pt-28 md:pt-36 pb-24 md:pb-32 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[36rem] rounded-full bg-primary/10 blur-[110px]" />
        </div>

        <div className="container max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="inline-flex items-center rounded-full border border-border bg-card/80 px-3 py-1 text-xs tracking-wide text-muted-foreground mb-4">
              Community Feedback
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gradient mb-3">
              Issues & Feedback
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Help us improve Spark by reporting bugs, requesting features, or providing valuable feedback about your experience.
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div>
              <IssueForm onSuccess={handleIssueSuccess} />
            </div>

            {/* Issues List Section */}
            <div>
              <IssuesList refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Issues;

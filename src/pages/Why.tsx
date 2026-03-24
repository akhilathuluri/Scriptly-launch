import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Why = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Why Spark | The Idea Behind Spark"
        description="Learn why Spark was created and how it removes copy-paste friction from everyday writing workflows."
        path="/why"
      />

      <Navbar />

      <main className="pt-28 pb-16 md:pt-36 md:pb-24">
        <section className="py-10 md:py-14">
          <div className="container max-w-4xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-gradient mb-6">
              The Idea Behind Spark
            </h1>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                We spend a huge part of our day working with text, writing, editing, fixing,
                translating, and rewriting. Spark removes the copy-paste-switch-repeat cycle that
                breaks focus.
              </p>
              <p>
                Spark is a native Windows app that lives inside your workflow. Select any text,
                press one shortcut, and transform it instantly where you already work.
              </p>
              <p>
                Fix grammar, rewrite, summarize, translate, change tone, expand ideas, or create
                custom actions. No tab switching. No friction. Just fast, seamless text
                transformation.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-8 md:pb-10">
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-5">
              Explore Spark
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/download"
                className="rounded-xl border border-border/60 bg-card/70 px-4 py-3 text-sm font-medium hover:bg-card"
              >
                Download Spark for Windows
              </Link>
              <Link
                to="/faqs"
                className="rounded-xl border border-border/60 bg-card/70 px-4 py-3 text-sm font-medium hover:bg-card"
              >
                Spark FAQs
              </Link>
              <Link
                to="/issues"
                className="rounded-xl border border-border/60 bg-card/70 px-4 py-3 text-sm font-medium hover:bg-card"
              >
                Report Issues and Feedback
              </Link>
              <Link
                to="/privacy-policy"
                className="rounded-xl border border-border/60 bg-card/70 px-4 py-3 text-sm font-medium hover:bg-card"
              >
                Spark Privacy Policy
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Why;

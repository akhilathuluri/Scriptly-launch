import Navbar from "@/components/Navbar";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Spark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Spark is a native Windows app that transforms selected text with AI-powered actions without leaving your current application.",
      },
    },
    {
      "@type": "Question",
      name: "How does Spark work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select text anywhere, use a shortcut, choose an action like rewrite or summarize, and Spark returns results in place.",
      },
    },
    {
      "@type": "Question",
      name: "Is Spark secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Spark encrypts API keys locally with Windows DPAPI and does not log your text on external servers.",
      },
    },
  ],
};

const FAQs = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Spark FAQs | AI Text Assistant Help"
        description="Read Spark FAQs about features, security, compatibility, and how Spark transforms text in any Windows app."
        path="/faqs"
        keywords={["Spark FAQs", "Spark help", "Spark AI assistant support"]}
        structuredData={faqSchema}
      />
      <Navbar />
      <main className="pt-16">
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductExperience from "@/components/ProductExperience";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Spark",
    url: "https://www.spark-app.in/",
    description:
      "Spark is a native Windows AI text assistant that transforms text in any app using one shortcut.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Spark",
    url: "https://www.spark-app.in/",
    logo: "https://www.spark-app.in/favicon.ico",
    sameAs: ["https://github.com/akhilathuluri/"],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Spark",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Windows",
    downloadUrl:
      "https://github.com/akhilathuluri/spark-app/releases/download/v1/SparkInstaller-win-x64.exe",
    description:
      "Spark is a native Windows app that rewrites, fixes grammar, translates, summarizes, and transforms selected text instantly.",
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Spark site navigation",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Download Spark",
        url: "https://www.spark-app.in/download",
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Spark FAQs",
        url: "https://www.spark-app.in/faqs",
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Issues and Feedback",
        url: "https://www.spark-app.in/issues",
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Privacy Policy",
        url: "https://www.spark-app.in/privacy-policy",
      },
    ],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Spark | AI Text Assistant for Windows"
        description="Spark is a native Windows AI text assistant. Select text anywhere, press one shortcut, and instantly rewrite, fix grammar, translate, summarize, and transform text in place."
        path="/"
        keywords={[
          "Spark AI",
          "Spark Windows app",
          "AI writing assistant for Windows",
          "text transformation tool",
          "AI rewrite and grammar fix",
        ]}
        structuredData={homeSchema}
      />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ProductExperience />
      <Footer />
    </div>
  );
};

export default Index;

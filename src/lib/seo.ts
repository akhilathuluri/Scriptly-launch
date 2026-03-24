export const SEO_DEFAULTS = {
  siteName: "Spark",
  siteTitle: "Spark - AI Text Assistant for Windows",
  description:
    "Spark is a native Windows AI text assistant. Select text anywhere, press one shortcut, and instantly rewrite, fix grammar, translate, summarize, and transform text in place.",
  image: "/favicon.ico",
  locale: "en_US",
  keywords: [
    "Spark",
    "Spark app",
    "AI text assistant",
    "Windows AI app",
    "rewrite text",
    "grammar correction",
    "summarize text",
    "translate text",
    "native Windows productivity"
  ]
};

export const getSiteUrl = () => {
  const envUrl = import.meta.env.VITE_SITE_URL as string | undefined;

  if (envUrl && envUrl.trim()) {
    return envUrl.replace(/\/$/, "");
  }

  return "https://usespark.vercel.app/";
};

import { Helmet } from "react-helmet-async";
import { SEO_DEFAULTS, getSiteUrl } from "@/lib/seo";

type JsonLd = Record<string, unknown>;

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  keywords?: string[];
  structuredData?: JsonLd | JsonLd[];
}

const toAbsoluteUrl = (url: string, baseUrl: string) => {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const normalized = url.startsWith("/") ? url : `/${url}`;
  return `${baseUrl}${normalized}`;
};

const SEO = ({
  title,
  description,
  path = "/",
  image = SEO_DEFAULTS.image,
  type = "website",
  noindex = false,
  keywords = [],
  structuredData,
}: SEOProps) => {
  const siteUrl = getSiteUrl();
  const canonical = toAbsoluteUrl(path, siteUrl);
  const imageUrl = toAbsoluteUrl(image, siteUrl);
  const metaTitle = title ?? SEO_DEFAULTS.siteTitle;
  const metaDescription = description ?? SEO_DEFAULTS.description;
  const robots = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";
  const keywordList = [...SEO_DEFAULTS.keywords, ...keywords].join(", ");
  const schemaList = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywordList} />
      <meta name="robots" content={robots} />
      <meta name="author" content="Spark" />
      <meta name="application-name" content={SEO_DEFAULTS.siteName} />

      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SEO_DEFAULTS.siteName} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={SEO_DEFAULTS.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {schemaList.map((schema, index) => (
        <script key={`seo-schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;

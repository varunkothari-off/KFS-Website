import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
}

export default function SEOHead({
  title = "Kothari Financial Services - Business Loans, Property Loans & Financial Advisory",
  description = "Get business loans up to ₹50 Cr with 24-hour approval. Lowest interest rates, 30+ partner banks, expert advisory. Apply now!",
  keywords = "business loan, property loan, cash credit, working capital loan, term loan, loan against property",
  canonical = "https://kotharifinancialservices.com",
  ogImage = "/attached_assets/logo_1754958364982.png",
  ogType = "website",
  structuredData
}: SEOHeadProps) {
  const fullTitle = title.includes("Kothari") ? title : `${title} | Kothari Financial Services`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
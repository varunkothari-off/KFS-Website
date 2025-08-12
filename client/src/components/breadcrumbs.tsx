import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://kotharifinancialservices.com${item.href}` : undefined
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className="bg-[#0a0b1e] border-b border-white/5 py-3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => (
            <li key={index} className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {item.href ? (
                <>
                  <Link href={item.href}>
                    <a className="text-gray-400 hover:text-purple-400 transition-colors" itemProp="item">
                      <span itemProp="name">{item.label}</span>
                    </a>
                  </Link>
                  {index < items.length - 1 && (
                    <ChevronRight className="w-4 h-4 mx-2 text-gray-600" aria-hidden="true" />
                  )}
                </>
              ) : (
                <span className="text-white" itemProp="name">{item.label}</span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
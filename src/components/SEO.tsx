import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  schemaMarkup?: string;
  canonicalUrl?: string;
}

export function SEO({ title, description, schemaMarkup, canonicalUrl }: SEOProps) {
  useEffect(() => {
    document.title = title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update canonical tag
    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.remove();
      }
    }

    // Update schema markup
    if (schemaMarkup) {
      let script = document.querySelector('#seo-schema-markup');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('id', 'seo-schema-markup');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = schemaMarkup;
    } else {
      const script = document.querySelector('#seo-schema-markup');
      if (script) {
        script.remove();
      }
    }
  }, [title, description, schemaMarkup]);

  return null;
}

import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  schemaMarkup?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
}

const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&fm=webp&w=1200';

export function SEO({ title, description, schemaMarkup, canonicalUrl, ogType = 'website', ogImage = DEFAULT_OG_IMAGE }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attribute: string, key: string, content: string) => {
      const existing = Array.from(document.querySelectorAll<HTMLMetaElement>(selector));
      existing.slice(1).forEach((meta) => meta.remove());
      const meta = existing[0] || document.createElement('meta');
      meta.setAttribute(attribute, key);
      meta.setAttribute('content', content);
      if (!existing[0]) document.head.appendChild(meta);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl || window.location.href);
    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Clothify');
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // Update canonical tag
    const canonicalLinks = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'));
    canonicalLinks.slice(1).forEach((link) => link.remove());
    if (canonicalUrl && canonicalLinks[0]) {
      const canonicalLink = canonicalLinks[0];
      canonicalLink.setAttribute('href', canonicalUrl);
    } else if (canonicalUrl) {
      const canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalLink);
    } else if (canonicalLinks[0]) {
      canonicalLinks[0].remove();
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
  }, [title, description, schemaMarkup, canonicalUrl, ogType, ogImage]);

  return null;
}

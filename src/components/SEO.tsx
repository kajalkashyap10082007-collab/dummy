
import { useEffect } from 'react';
import { SITE_URL } from '../seo';

interface SEOProps {
  title: string;
  description: string;
  schemaMarkup?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  noIndex?: boolean;
}

const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&fm=webp&w=1200';

export function SEO({
  title,
  description,
  schemaMarkup,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (
      selector: string,
      attribute: string,
      key: string,
      content: string
    ) => {
      const existing = Array.from(
        document.querySelectorAll<HTMLMetaElement>(selector)
      );

      existing.slice(1).forEach((meta) => meta.remove());

      const meta = existing[0] || document.createElement('meta');

      meta.setAttribute(attribute, key);
      meta.setAttribute('content', content);

      if (!existing[0]) {
        document.head.appendChild(meta);
      }
    };

    const canonical = new URL(
      canonicalUrl || window.location.pathname,
      SITE_URL
    ).href;

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow');

    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Clothify');
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_IN');

    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    const canonicalLinks = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]')
    );

    canonicalLinks.slice(1).forEach((link) => link.remove());

    const link = canonicalLinks[0] || document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canonical);

    if (!canonicalLinks[0]) {
      document.head.appendChild(link);
    }

    const oldSchema = document.querySelector('#seo-schema-markup');
    oldSchema?.remove();

    if (schemaMarkup) {
      try {
        JSON.parse(schemaMarkup);

        const script = document.createElement('script');
        script.id = 'seo-schema-markup';
        script.type = 'application/ld+json';
        script.textContent = schemaMarkup;
        document.head.appendChild(script);
      } catch (error) {
        console.error('Invalid SEO schema JSON:', error);
      }
    }
  }, [
    title,
    description,
    schemaMarkup,
    canonicalUrl,
    ogType,
    ogImage,
    noIndex,
  ]);

  return null;
}

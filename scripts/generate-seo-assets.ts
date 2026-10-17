import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { products } from '../src/data';
import { PAGE_SEO, SITE_URL, getProductSEO } from '../src/seo';

const distDirectory = join(process.cwd(), 'dist');
const template = readFileSync(join(distDirectory, 'index.html'), 'utf8');
const defaultOgImage = 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&fm=webp&w=1200';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function setMeta(html: string, attribute: 'name' | 'property', key: string, content: string) {
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;
  const existing = new RegExp(`<meta\\s+[^>]*${attribute}=["']${key}["'][^>]*>`, 'i');
  return existing.test(html)
    ? html.replace(existing, tag)
    : html.replace('</head>', `    ${tag}\n  </head>`);
}

function createDocument(
  page: { title: string; description: string; noIndex?: boolean; ogType?: string },
  canonicalPath: string,
  ogImage: string,
) {
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  let html = template.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  html = setMeta(html, 'name', 'description', page.description);
  html = setMeta(html, 'name', 'robots', page.noIndex ? 'noindex, nofollow' : 'index, follow');
  html = setMeta(html, 'property', 'og:title', page.title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'property', 'og:type', page.ogType || 'website');
  html = setMeta(html, 'property', 'og:site_name', 'Clothify');
  html = setMeta(html, 'property', 'og:url', canonicalUrl);
  html = setMeta(html, 'property', 'og:image', ogImage);
  html = setMeta(html, 'property', 'og:locale', 'en_IN');
  html = setMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = setMeta(html, 'name', 'twitter:title', page.title);
  html = setMeta(html, 'name', 'twitter:description', page.description);
  html = setMeta(html, 'name', 'twitter:image', ogImage);

  const canonical = `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`;
  const canonicalTag = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i;
  html = canonicalTag.test(html)
    ? html.replace(canonicalTag, canonical)
    : html.replace('</head>', `    ${canonical}\n  </head>`);

  return html;
}

function writeRoute(path: string, html: string) {
  const outputPath = path === '/'
    ? join(distDirectory, 'index.html')
    : join(distDirectory, path.replace(/^\/+|\/+$/g, ''), 'index.html');
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html);
}

const publicPages = Object.values(PAGE_SEO).filter((page) => !page.noIndex && !page.canonicalPath);
const sitemapPaths = [
  ...publicPages.map((page) => page.path),
  ...products.map((product) => `/product/${product.id}`),
];
const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapPaths.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`),
  '</urlset>',
  '',
].join('\n');

writeFileSync(join(process.cwd(), 'public', 'sitemap.xml'), sitemapXml);
writeFileSync(join(distDirectory, 'sitemap.xml'), sitemapXml);

for (const page of Object.values(PAGE_SEO)) {
  writeRoute(
    page.path,
    createDocument(page, page.canonicalPath || page.path, defaultOgImage),
  );
}

for (const product of products) {
  const page = getProductSEO(product.name, product.category);
  const path = `/product/${product.id}`;
  writeRoute(path, createDocument({ ...page, ogType: 'product' }, path, product.image));
}

console.log(`Generated sitemap for ${sitemapPaths.length} indexable URLs and route metadata for ${Object.keys(PAGE_SEO).length + products.length} pages.`);

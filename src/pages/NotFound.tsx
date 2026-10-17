import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PAGE_SEO } from '../seo';

export function NotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <SEO title={PAGE_SEO.notFound.title} description={PAGE_SEO.notFound.description} noIndex />
      <h1 className="text-3xl font-black text-zinc-900 mb-3">Page not found</h1>
      <p className="text-zinc-600 mb-8">The page you requested is unavailable. Explore our latest clothing collection instead.</p>
      <Link to="/products" className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-blue-800 transition-colors">
        Shop clothing
      </Link>
    </section>
  );
}

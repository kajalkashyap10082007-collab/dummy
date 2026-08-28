import { motion } from 'motion/react';
import { blogPosts } from '../data';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function Blog() {
  const blogSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Fashion Tips & Trends Blog | Clothify",
    "description": "Explore fashion tips, outfit ideas, clothing trends and affordable styling inspiration for men, women and kids on the Clothify blog.",
    "url": "https://dummy-mauve.vercel.app/sustainable-fashion-blog",
    "blogPost": blogPosts.map((post) => ({ "@type": "BlogPosting", "headline": post.title, "description": post.excerpt, "datePublished": new Date(post.date).toISOString().slice(0, 10), "articleSection": post.category, "image": post.image, "url": `https://dummy-mauve.vercel.app/sustainable-fashion-blog#${post.id}` }))
  });

 return (
 <div className="bg-blue-50 min-h-screen relative overflow-hidden">
  <SEO title="Fashion Tips & Trends Blog | Clothify" description="Explore fashion tips, outfit ideas, clothing trends and affordable styling inspiration for men, women and kids on the Clothify blog." schemaMarkup={blogSchema} canonicalUrl="https://dummy-mauve.vercel.app/sustainable-fashion-blog" />
  {/* Decorative background blobs */}
  <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-teal-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
  <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-blue-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
 <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <div className="text-center mb-16">
 <motion.h1 
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-4xl md:text-5xl font-bold font-serif text-zinc-900 mb-4"
 >
 Clothify Fashion Blog
 </motion.h1>
 <motion.p 
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-zinc-500 text-sm max-w-xl mx-auto"
 >
 Curated insights into fashion trends, sustainability, and styling guides from our editorial team.
 </motion.p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
 {blogPosts.map((post, i) => (
 <motion.article 
 key={post.id}
 id={post.id}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: i * 0.1, duration: 0.5 }}
 className="group flex flex-col"
 >
 <Link to={`/sustainable-fashion-blog#${post.id}`} className="block overflow-hidden rounded-sm aspect-[4/3] mb-6 relative">
 <img 
 src={post.image} 
 width="800"
 height="600"
 alt={`${post.title} - sustainable fashion trends`} 
 loading="lazy"
 decoding="async"
 onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&fm=webp&w=800' }}
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black rounded-sm shadow-sm">
 {post.category}
 </div>
 </Link>
 <div className="flex flex-col flex-grow">
 <span className="text-xs text-zinc-500 mb-3">{post.date}</span>
 <Link to={`/sustainable-fashion-blog#${post.id}`} className="text-xl font-serif font-bold text-zinc-900 mb-3 hover:text-amber-500 transition-colors line-clamp-2">
 {post.title}
 </Link>
 <p className="text-sm text-zinc-600 mb-6 line-clamp-3 leading-relaxed">
 {post.excerpt}
 </p>
 <Link to={`/products?search=${encodeURIComponent(post.category)}`} className="mt-auto inline-flex items-center text-sm font-semibold text-black hover:text-zinc-500 transition-colors uppercase tracking-wider">
 Shop Related Styles <ArrowRight className="ml-2 w-4 h-4" />
 </Link>
 </div>
 </motion.article>
 ))}
 </div>
 <nav aria-label="More fashion articles" className="mt-16 border-t border-zinc-200 pt-8">
 <h2 className="text-xl font-serif font-bold text-zinc-900 mb-4">More from the journal</h2>
 <div className="flex flex-wrap gap-x-6 gap-y-3">
 {blogPosts.map((post) => <Link key={post.id} to={`/sustainable-fashion-blog#${post.id}`} className="text-sm font-semibold text-zinc-600 hover:text-amber-500">{post.title}</Link>)}
 </div>
 </nav>
 </div>
 </div>
 );
}

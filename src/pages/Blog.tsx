import { motion } from 'motion/react';
import { blogPosts } from '../data';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function Blog() {
  const blogSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Sustainable & Ethical Fashion Blog | Clothify",
    "description": "Read the latest tips, trends, and news on sustainable fashion and premium clothing on the Clothify blog.",
    "url": "https://dummy-mauve.vercel.app/sustainable-fashion-blog""
  });

 return (
 <div className="bg-slate-50 min-h-screen relative overflow-hidden">
  <SEO title="Sustainable & Ethical Fashion Blog | Clothify" description="Read the latest tips, trends, and news on sustainable fashion and premium clothing on the Clothify blog." schemaMarkup={blogSchema} canonicalUrl="https://dummy-mauve.vercel.app/sustainable-fashion-blog"/>
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
 Clothify Blog: Insights on Sustainable & Ethical Fashion
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
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: i * 0.1, duration: 0.5 }}
 className="group flex flex-col"
 >
 <Link to="#" className="block overflow-hidden rounded-sm aspect-[4/3] mb-6 relative">
 <img 
 src={post.image} 
 alt={`${post.title} - sustainable fashion trends`} 
 loading="lazy"
 onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800' }}
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black rounded-sm shadow-sm">
 {post.category}
 </div>
 </Link>
 <div className="flex flex-col flex-grow">
 <span className="text-xs text-zinc-500 mb-3">{post.date}</span>
 <Link to="#" className="text-xl font-serif font-bold text-zinc-900 mb-3 hover:text-amber-500 transition-colors line-clamp-2">
 {post.title}
 </Link>
 <p className="text-sm text-zinc-600 mb-6 line-clamp-3 leading-relaxed">
 {post.excerpt}
 </p>
 <Link to="#" className="mt-auto inline-flex items-center text-sm font-semibold text-black hover:text-zinc-500 transition-colors uppercase tracking-wider">
 Read Article <ArrowRight className="ml-2 w-4 h-4" />
 </Link>
 </div>
 </motion.article>
 ))}
 </div>
 </div>
 </div>
 );
}

import { motion } from 'motion/react';
import { SEO } from '../components/SEO';

export function About() {
  const aboutSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Clothify",
      "description": "Ethical and Sustainable Premium Fashion Clothing",
      "url": "https://clothify.netlify.app/"
    }
  });

 return (
 <div className="bg-slate-50 min-h-screen relative overflow-hidden">
  <SEO title="About Clothify | Ethical & Sustainable Premium Fashion" description="Learn about Clothify's commitment to quality, sustainable, and ethical premium fashion clothing for men, women, and kids." schemaMarkup={aboutSchema} canonicalUrl="https://clothify.netlify.app/about-clothify-sustainable-fashion" />
  {/* Decorative background blobs */}
  <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-teal-50/50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
  <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-amber-50/50 rounded-full blur-3xl translate-y-1/4 translate-x-1/4 pointer-events-none"></div>
  <div className="relative z-10">
 {/* Hero */}
 <section className="relative py-24 border-b border-zinc-200 ">
 <div className="max-w-4xl mx-auto px-4 text-center">
 <h1 
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-zinc-900 "
 >
 About Clothify: Ethical & Sustainable Premium Fashion
 </h1>
 <motion.p 
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-lg text-zinc-600 font-light leading-relaxed"
 >
 We believe that true style is timeless. Since 2018, Clothify has been dedicated to crafting <strong>premium clothing</strong> and <strong>ethical fashion</strong> designed to outlast passing trends. We focus on <strong>sustainable</strong> practices to provide you with the best.
 </motion.p>
 </div>
 </section>

 {/* Story & Values */}
 <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
 <motion.div
 initial={{ opacity: 0, x: -30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 >
 <img 
 src="https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=800" 
 alt="Clothify team working on ethical sustainable fashion" 
 loading="lazy"
 onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800' }}
 className="w-full h-auto object-cover rounded-sm"
 />
 </motion.div>
 <motion.div
 initial={{ opacity: 0, x: 30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="space-y-6"
 >
 <h2 className="text-3xl font-bold font-serif text-zinc-900 mb-2">Our Story</h2>
 <div className="w-12 h-[1px] bg-black mb-6"></div>
 <p className="text-zinc-600 leading-relaxed text-sm">
 Clothify was born out of a simple observation: modern fashion had become too fast, too disposable, and too complicated. We set out to create an alternative—a single wardrobe of carefully considered pieces that transition seamlessly through your day.
 </p>
 <p className="text-zinc-600 leading-relaxed text-sm">
 We work directly with some of the finest mills and factories around the world to ensure every thread meets our rigorous standards. Transparent pricing, sustainable practices, and uncompromising quality are the pillars of everything we do.
 </p>
 
 <div className="pt-6 grid grid-cols-2 gap-6">
 <div>
 <h4 className="text-3xl font-bold font-serif text-zinc-900 mb-1">1M+</h4>
 <span className="text-xs text-zinc-500 uppercase tracking-widest block">Garments Sold</span>
 </div>
 <div>
 <h4 className="text-3xl font-bold font-serif text-zinc-900 mb-1">100%</h4>
 <span className="text-xs text-zinc-500 uppercase tracking-widest block">Carbon Neutral</span>
 </div>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Leadership */}
 <section className="py-20 bg-zinc-50 ">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-16">
 <h2 className="text-3xl font-bold font-serif text-zinc-900 mb-4">The Creative Visionaries</h2>
 <div className="w-16 h-[1px] bg-black mx-auto"></div>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
 {[
 { name: 'Elena Rostova', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800' },
 { name: 'Marcus Jin', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800' },
 { name: 'Sarah O\'Connor', role: 'Sustainability Director', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800' }
 ].map((member, i) => (
 <motion.div 
 key={member.name}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: i * 0.1 }}
 className="text-center"
 >
 <div className="mb-6 overflow-hidden rounded-sm mx-auto aspect-square max-w-[280px]">
 <img 
 src={member.image} 
 alt={member.name} 
 loading="lazy"
 onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800' }}
 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
 />
 </div>
 <h3 className="text-lg font-bold text-zinc-900 font-serif">{member.name}</h3>
 <p className="text-sm text-zinc-500 mt-1">{member.role}</p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 </div>
 </div>
 );
}

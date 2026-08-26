import fs from 'fs';

let content = `import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { products } from '../data';
import { ArrowRight, Truck, RefreshCw, ShieldCheck, Mail, Heart, Star } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';

const CATEGORIES = [
  { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600' },
  { name: 'Tops', image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&q=80&w=600' },
  { name: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80&w=600' },
  { name: 'Denim', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600' },
  { name: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=600' }
];

const STYLE_INSPO = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1529139574466-a303027c028b?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1502163140606-888448ae8cfe?auto=format&fit=crop&q=80&w=600'
];

export function Home() {
  const newArrivals = products.filter(p => p.isTrending).slice(0, 4);
  const bestSellers = products.filter(p => p.rating >= 4.5).slice(0, 4);

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans">
      <SEO 
        title="Clothify | Premium Fashion & Editorial Looks" 
        description="Discover curated fashion for every mood and moment. Explore dresses, denim, footwear and exclusive collections." 
      />

      {/* Editorial Hero Section */}
      <section className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden bg-zinc-900">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1920" 
          alt="New Season Collection" 
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-4"
          >
            New Season '26
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-white mb-6 leading-tight"
          >
            Style that feels like you.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 text-sm sm:text-base font-medium max-w-xl mx-auto mb-10"
          >
            Curated fashion for every mood, moment, and everyday look. Discover pieces designed to elevate your personal aesthetic.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/products?trending=true" className="w-full sm:w-auto px-8 py-3.5 bg-white text-zinc-900 text-xs font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors min-h-[44px] flex items-center justify-center">
              Shop New Arrivals
            </Link>
            <Link to="/products" className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors min-h-[44px] flex items-center justify-center">
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white border-b border-zinc-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center divide-x divide-zinc-100">
            <div className="flex flex-col items-center justify-center px-4">
              <Truck className="w-5 h-5 text-zinc-400 mb-2" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-900">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center justify-center px-4">
              <RefreshCw className="w-5 h-5 text-zinc-400 mb-2" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-900">Easy Returns</span>
            </div>
            <div className="flex flex-col items-center justify-center px-4">
              <Star className="w-5 h-5 text-zinc-400 mb-2" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-900">Curated Styles</span>
            </div>
            <div className="flex flex-col items-center justify-center px-4">
              <ShieldCheck className="w-5 h-5 text-zinc-400 mb-2" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-900">Secure Checkout</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-zinc-900 mb-3">Shop by Category</h2>
            <p className="text-zinc-500 text-sm">Essentials for your modern wardrobe.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {CATEGORIES.map((cat, i) => (
              <Link 
                to={"/products?category=" + cat.name} 
                key={cat.name}
                className="group block relative aspect-[3/4] overflow-hidden bg-zinc-100"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3 className="text-white text-sm sm:text-base font-bold uppercase tracking-widest">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-zinc-900 mb-2">New Arrivals</h2>
              <p className="text-zinc-500 text-sm">Fresh styles, just in.</p>
            </div>
            <Link to="/products?trending=true" className="hidden sm:inline-flex items-center text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-zinc-600 transition-colors">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products?trending=true" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-900 pb-1">
              View All New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* The Clothify Edit (Shop The Look) */}
      <section className="py-20 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-zinc-900 mb-3">The Clothify Edit</h2>
            <p className="text-zinc-500 text-sm">One look. Endless ways to style it.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
              <img 
                src="https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=1000" 
                alt="The Clothify Edit Outfit" 
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center px-4 md:px-12">
              <h3 className="text-xl font-serif font-black mb-6">Weekend Minimalist</h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-8">
                Master the art of understated elegance with our latest edit. Pairing relaxed denim with crisp tailored shirts and subtle accessories for a look that transitions seamlessly from morning coffee to evening dinners.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 bg-zinc-100 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&w=100&q=80" alt="White Shirt" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Oxford Button-Down</p>
                      <p className="text-xs text-zinc-500">₹1,999</p>
                    </div>
                  </div>
                  <Link to="/product/8" className="text-xs font-bold uppercase tracking-widest text-zinc-900 hover:underline">View</Link>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 bg-zinc-100 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=100&q=80" alt="Denim" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Classic Straight Denim</p>
                      <p className="text-xs text-zinc-500">₹2,499</p>
                    </div>
                  </div>
                  <Link to="/product/1" className="text-xs font-bold uppercase tracking-widest text-zinc-900 hover:underline">View</Link>
                </div>
              </div>
              <Link to="/products" className="inline-flex items-center justify-center bg-zinc-900 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                Shop The Look
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-[21/9] min-h-[400px] overflow-hidden bg-zinc-900 flex items-center justify-center text-center">
            <img 
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1920" 
              alt="Exclusive Offer" 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-50" 
            />
            <div className="relative z-10 px-6 max-w-2xl mx-auto">
              <span className="text-orange-400 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Limited Time</span>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-6">The Denim Event</h2>
              <p className="text-white/90 text-sm md:text-base mb-8">Take 20% off all premium denim this week only. Use code <span className="font-bold border-b border-white pb-0.5">DENIM20</span> at checkout.</p>
              <Link to="/products?category=Denim" className="inline-flex items-center justify-center bg-white text-zinc-900 px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors min-h-[44px]">
                Shop Denim
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-zinc-900 mb-3">Best Sellers</h2>
            <p className="text-zinc-500 text-sm">Our most-loved pieces, chosen by you.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/products" className="inline-flex items-center px-10 py-4 border border-zinc-900 text-zinc-900 text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-colors">
              Shop All Best Sellers
            </Link>
          </div>
        </div>
      </section>

      {/* Style Inspo */}
      <section className="py-20 bg-[#FAFAFA] border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-zinc-900 mb-3">Style Inspo</h2>
            <p className="text-zinc-500 text-sm">Follow us <a href="#" className="font-semibold text-zinc-900 hover:underline">@clothify</a> for daily inspiration.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {STYLE_INSPO.map((img, i) => (
              <a href="#" key={i} aria-label="View style post" className="group relative aspect-square overflow-hidden bg-zinc-100 block">
                <img 
                  src={img} 
                  alt="Style Inspiration" 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Clothify */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-zinc-900 mb-3">Why Clothify?</h2>
            <div className="w-12 h-0.5 bg-zinc-900 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <Star className="w-6 h-6 text-zinc-900 mb-4" strokeWidth={1.5} />
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Premium Quality</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Expertly crafted with high-grade materials for lasting wear.</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-6 h-6 text-zinc-900 mb-4" strokeWidth={1.5} />
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Curated Fashion</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Handpicked selections to elevate your personal style effortlessly.</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-6 h-6 text-zinc-900 mb-4" strokeWidth={1.5} />
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Easy Experience</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Seamless browsing, secure checkout, and fast delivery.</p>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="w-6 h-6 text-zinc-900 mb-4" strokeWidth={1.5} />
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Trend-Driven</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Staying ahead with modern designs and seasonal essentials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-[#0F172A] text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Mail className="w-8 h-8 text-white/50 mx-auto mb-6" strokeWidth={1} />
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mb-4">Get 10% Off Your First Demo Order</h2>
          <p className="text-zinc-400 text-sm mb-8">Style updates. New drops. No spam.</p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-zinc-500 px-4 py-3.5 focus:outline-none focus:border-white transition-colors min-h-[44px] text-sm"
              required
            />
            <button 
              type="submit" 
              className="bg-white text-[#0F172A] px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors min-h-[44px]"
            >
              Join Clothify
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/Home.tsx', content);

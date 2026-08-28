import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { products } from '../data';
import { ArrowRight, Star, Truck, RefreshCw, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';

const HERO_SLIDES = [
  {
    id: 1,
    subtitle: 'End of Reason Sale',
    title: '50-80% OFF',
    desc: 'On global brands & exclusive collections. The biggest fashion event is live.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&fm=webp&w=1920',
    fallback: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&fm=webp&w=1920',
  },
  {
    id: 2,
    subtitle: 'New Launch',
    title: 'MIN 30% + EXTRA 5% OFF',
    desc: 'Breathable knitted upper shoes and sportswear for ultimate comfort.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&fm=webp&w=1920',
    fallback: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&fm=webp&w=1920',
  },
  {
    id: 3,
    subtitle: 'Winter Collection',
    title: 'STAY WARM, STAY STYLISH',
    desc: 'Cozy sweaters, premium jackets, and winter essentials up to 40% off.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&fm=webp&w=1920',
    fallback: 'https://images.unsplash.com/photo-1502163140606-888448ae8cfe?auto=format&fit=crop&q=80&fm=webp&w=1920',
  }
];

const heroSrcSet = (image: string) => image.replace('w=1920', 'w=480') + ' 480w, ' + image.replace('w=1920', 'w=768') + ' 768w, ' + image.replace('w=1920', 'w=1200') + ' 1200w, ' + image + ' 1920w';

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const newArrivals = products.filter(p => p.isTrending).slice(0, 4);
  const bestSellers = products.filter(p => p.rating >= 4.5).slice(0, 4);
  const saleProducts = products.filter(p => p.originalPrice).slice(0, 4);
  const homeSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "name": "Clothify", "url": "https://dummy-mauve.vercel.app/" },
      { "@type": "WebSite", "name": "Clothify", "url": "https://dummy-mauve.vercel.app/", "potentialAction": { "@type": "SearchAction", "target": "https://dummy-mauve.vercel.app/products?search={search_term_string}", "query-input": "required name=search_term_string" } }
    ]
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <SEO 
        title="Clothify - Affordable Fashion for Men, Women & Kids" 
        description="Discover affordable and trendy clothing for men, women and kids at Clothify. Shop stylish fashion, new arrivals and great deals online." 
        schemaMarkup={homeSchema}
        canonicalUrl="https://dummy-mauve.vercel.app/"
      />
      {/* Hero Carousel */}
      <section 
        className="relative h-[400px] md:h-[600px] w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
            <img 
              src={HERO_SLIDES[currentSlide].image} 
              srcSet={heroSrcSet(HERO_SLIDES[currentSlide].image)}
              sizes="100vw"
              alt="Clothify affordable fashion collection"
              width="1920"
              height="600"
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
              fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
              decoding="async"
              onError={(e) => { e.currentTarget.src = HERO_SLIDES[currentSlide].fallback }}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-6 md:px-20 max-w-7xl mx-auto">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-amber-400 font-bold tracking-widest uppercase mb-2 text-xs md:text-sm"
              >
                {HERO_SLIDES[currentSlide].subtitle}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white text-3xl md:text-6xl font-black mb-4 uppercase tracking-tight max-w-2xl"
              >
                Affordable Fashion for Everyone
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-white text-xl md:text-3xl font-black mb-4 uppercase tracking-tight max-w-2xl"
              >
                {HERO_SLIDES[currentSlide].title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-200 text-sm md:text-xl mb-8 max-w-xl"
              >
                {HERO_SLIDES[currentSlide].desc}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/products" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3.5 rounded-sm font-bold uppercase tracking-widest text-sm transition-all shadow-lg hover:shadow-blue-700/30 flex items-center min-h-[44px] min-w-[44px]">
                  Shop Now <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all min-w-[44px] min-h-[44px] flex items-center justify-center opacity-0 md:group-hover:opacity-100" aria-label="Previous slide">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all min-w-[44px] min-h-[44px] flex items-center justify-center opacity-0 md:group-hover:opacity-100" aria-label="Next slide">
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={"w-2.5 h-2.5 min-w-11 min-h-11 p-3 bg-clip-content rounded-full transition-all " + (i === currentSlide ? "bg-blue-700 w-8" : "bg-white/50 hover:bg-white")}
              aria-label={"Go to slide " + (i + 1)}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-6 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12">
          <div className="flex items-center text-zinc-600">
            <Truck className="w-5 h-5 text-blue-700 mr-2" />
            <span className="text-sm font-bold uppercase tracking-wider">Free Shipping</span>
          </div>
          <div className="flex items-center text-zinc-600">
            <RefreshCw className="w-5 h-5 text-blue-700 mr-2" />
            <span className="text-sm font-bold uppercase tracking-wider">14-Day Returns</span>
          </div>
          <div className="flex items-center text-zinc-600">
            <ShieldCheck className="w-5 h-5 text-blue-700 mr-2" />
            <span className="text-sm font-bold uppercase tracking-wider">Secure Payment</span>
          </div>
          <div className="flex items-center text-zinc-600">
            <Star className="w-5 h-5 text-blue-700 mr-2" />
            <span className="text-sm font-bold uppercase tracking-wider">Top Brands</span>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Deal of the Day Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row">
          <div className="p-8 md:p-12 flex flex-col justify-center text-white md:w-1/2">
            <span className="bg-amber-400 text-zinc-900 text-xs font-black px-3 py-1 rounded-sm uppercase tracking-widest w-max mb-4">Deal of the Day</span>
            <h2 className="text-3xl md:text-5xl font-black mb-4">Premium Denim Collection</h2>
            <p className="text-blue-100 mb-8 max-w-md leading-relaxed">Upgrade your wardrobe with our latest sustainable denim styles. Comfort meets durability.</p>
            <Link to="/products?search=jeans" className="bg-white text-blue-700 px-8 py-3 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-zinc-100 transition-colors w-max flex items-center min-h-[44px]">
              Shop Denim <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="md:w-1/2 min-h-[300px] relative">
              <img src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1000" srcSet="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=480 480w, https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=768 768w, https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1000 1000w" sizes="(max-width: 767px) 100vw, 50vw" alt="Blue denim collection" width="1000" height="667" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        {/* New Arrivals */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 mb-2">New Arrivals</h2>
              <div className="w-20 h-1 bg-blue-700 rounded-full"></div>
            </div>
            <Link to="/products" className="text-blue-700 font-bold text-sm hover:text-blue-800 flex items-center uppercase tracking-widest">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-zinc-900 mb-2">Shop by Category</h2>
            <div className="w-20 h-1 bg-blue-700 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/products?category=Men" className="group relative h-[300px] rounded-2xl overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" srcSet="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=480 480w, https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800 800w" sizes="(max-width: 767px) 100vw, 33vw" alt="Men's cotton t-shirts" width="800" height="1000" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-2xl font-black mb-1">T-Shirts</h3>
                  <span className="text-blue-400 text-sm font-bold uppercase tracking-widest group-hover:text-amber-400 transition-colors">Explore</span>
                </div>
              </div>
            </Link>
            <Link to="/products?category=Women" className="group relative h-[300px] rounded-2xl overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800" srcSet="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=480 480w, https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800 800w" sizes="(max-width: 767px) 100vw, 33vw" alt="Women's evening dresses" width="800" height="1000" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-2xl font-black mb-1">Dresses</h3>
                  <span className="text-blue-400 text-sm font-bold uppercase tracking-widest group-hover:text-amber-400 transition-colors">Explore</span>
                </div>
              </div>
            </Link>
            <Link to="/products?category=Kids" className="group relative h-[300px] rounded-2xl overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=800" srcSet="https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=480 480w, https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=800 800w" sizes="(max-width: 767px) 100vw, 33vw" alt="Kids' fashion accessories" width="800" height="1000" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-2xl font-black mb-1">Accessories</h3>
                  <span className="text-blue-400 text-sm font-bold uppercase tracking-widest group-hover:text-amber-400 transition-colors">Explore</span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Best Sellers */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 mb-2">Best Sellers</h2>
              <div className="w-20 h-1 bg-blue-700 rounded-full"></div>
            </div>
            <Link to="/products" className="text-blue-700 font-bold text-sm hover:text-blue-800 flex items-center uppercase tracking-widest">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <nav aria-label="Explore Clothify" className="flex flex-wrap justify-center gap-6 border-t border-zinc-200 pt-8 text-sm font-bold uppercase tracking-widest text-zinc-600">
          <Link to="/about-clothify-sustainable-fashion" className="hover:text-blue-700">About Clothify</Link>
          <Link to="/sustainable-fashion-blog" className="hover:text-blue-700">Fashion Blog</Link>
          <Link to="/contact-clothify" className="hover:text-blue-700">Contact Support</Link>
        </nav>

      </main>
    </div>
  );
}

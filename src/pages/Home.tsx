import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { products, testimonials } from '../data';
import { ArrowRight, Star, Truck, RefreshCw, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';

const HERO_SLIDES = [
  {
    id: 1,
    subtitle: 'End of Reason Sale',
    title: '50-80% OFF',
    desc: 'On global brands & exclusive collections. The biggest fashion event is live.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1920',
    fallback: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1920',
  },
  {
    id: 2,
    subtitle: 'New Launch',
    title: 'MIN 30% + EXTRA 5% OFF',
    desc: 'Breathable knitted upper shoes and sportswear for ultimate comfort.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1920',
    fallback: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1920',
  },
  {
    id: 3,
    subtitle: 'Summer Collection',
    title: 'TRENDING STYLES',
    desc: 'Refresh your wardrobe with our latest summer essentials and vibrant colors.',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1920',
    fallback: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1920',
  }
];

const CIRCULAR_CATEGORIES = [
  { name: 'Men', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=200&h=200&fit=crop' },
  { name: 'Women', image: 'https://images.unsplash.com/photo-1485230895905-23e3abf11fc5?w=200&h=200&fit=crop' },
  { name: 'Kids', image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=200&h=200&fit=crop' },
  { name: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=200&h=200&fit=crop' },
  { name: 'Studio', image: 'https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?w=200&h=200&fit=crop' },
];

const TOP_BRANDS = [
  { name: 'PUMA', discount: 'Min 40% Off', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=500&fit=crop' },
  { name: 'H&M', discount: 'Up to 50% Off', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=400&h=500&fit=crop' },
  { name: 'MANGO', discount: 'Flat 30% Off', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop' },
  { name: 'LEVIS', discount: 'Min 50% Off', image: 'https://images.unsplash.com/photo-1542272454-3ce645f06e57?w=400&h=500&fit=crop' },
  { name: 'NIKE', discount: 'Up to 40% Off', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop' },
  { name: 'ZARA', discount: 'New Arrivals', image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=400&h=500&fit=crop' },
];

export function Home() {
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (sliderRef.current) {
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const homeSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Clothify",
    "url": "https://dummy-mauve.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://dummy-mauve.vercel.app/premium-clothing-collection?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });

  return (
    <div className="flex flex-col">
      <SEO 
        title="Premium Clothing & Fashion for Men, Women & Kids | Clothify" 
        description="Shop sustainable, ethical, and premium fashion clothing at Clothify. Explore our latest collection of premium clothing and accessories for men, women, and kids." 
        schemaMarkup={homeSchema}
        canonicalUrl="https://dummy-mauve.vercel.app"
      />
      {/* Search & Categories Bar (Mobile mostly, or clean quick links) */}
      <div className="bg-white/80 backdrop-blur-md border-b border-zinc-100 py-4 shadow-sm overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex space-x-6 sm:space-x-8 min-w-max">
          {CIRCULAR_CATEGORIES.map((cat, i) => (
            <Link key={cat.name} to={`/products?category=${cat.name}`} className="flex flex-col items-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-2 ring-2 ring-transparent group-hover:ring-amber-400 transition-all p-1 bg-white shadow-sm">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop' }}
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-zinc-800 group-hover:text-blue-700 transition-colors uppercase tracking-widest">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50/40 mt-4 sm:mt-6 mx-4 sm:mx-6 lg:mx-8 rounded-2xl shadow-sm border border-slate-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={HERO_SLIDES[currentSlide].image} 
              alt={`${HERO_SLIDES[currentSlide].title} - Premium ethical clothing collection for men and women`}
              onError={(e) => { e.currentTarget.src = HERO_SLIDES[currentSlide].fallback }}
              className="w-full h-full object-cover object-top transition-transform duration-[10000ms] scale-100 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent"></div>
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-10 text-left text-zinc-900 px-8 sm:px-16 w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <span className="uppercase tracking-[0.3em] text-sm sm:text-base font-black mb-4 block text-blue-700">
                  {HERO_SLIDES[currentSlide].subtitle}
                </span>
                <h2 className="text-5xl md:text-8xl font-black mb-4 leading-tight uppercase tracking-tighter text-zinc-900">
                  {HERO_SLIDES[currentSlide].title}
                </h2>
                <p className="text-lg md:text-2xl text-zinc-700 mb-8 font-bold tracking-wide">
                  {HERO_SLIDES[currentSlide].desc}
                  <span className="block mt-2 text-sm font-medium opacity-80">Discover premium clothing and ethical fashion.</span>
                </p>
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link 
                    to="/products"
                    className="bg-blue-700 text-white px-10 py-4 text-sm font-black transition-all rounded-full tracking-widest uppercase hover:bg-blue-800 hover:shadow-[0_0_20px_rgba(29,78,216,0.4)] hover:-translate-y-1 inline-flex items-center"
                  >
                    Explore Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <button onClick={prevSlide} className="p-4 rounded-full bg-white/50 hover:bg-white/90 backdrop-blur-sm text-zinc-900 shadow-lg transition-all hover:scale-110 border border-white/40">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextSlide} className="p-4 rounded-full bg-white/50 hover:bg-white/90 backdrop-blur-sm text-zinc-900 shadow-lg transition-all hover:scale-110 border border-white/40">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-300 rounded-full h-2 ${currentSlide === i ? 'w-8 bg-blue-700' : 'w-2 bg-zinc-400 hover:bg-blue-500'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* SEO Content Section for Keyword Density */}
      <section className="py-12 bg-white text-center px-4 max-w-4xl mx-auto">
        <h1 className="sr-only">Ethical and Sustainable Premium Fashion Clothing for Men, Women and Kids</h1>
        <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
          Welcome to <strong>Clothify</strong>, your ultimate destination for <strong>premium clothing</strong> and <strong>fashion</strong>. We are committed to offering <strong>ethical</strong> and <strong>sustainable fashion</strong> for the modern wardrobe. Whether you are looking for stylish <strong>men</strong>'s apparel, elegant <strong>women</strong>'s dresses, or durable <strong>kids</strong>' clothing, we have everything to elevate your personal style. Shop our premium collections of <strong>clothing</strong> and <strong>accessories</strong> today and experience unparalleled quality.
        </p>
      </section>

      {/* Featured Brands */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-widest text-zinc-900 mb-4">Medal Worthy Brands</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {TOP_BRANDS.map((brand, i) => (
              <motion.div 
                key={brand.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer rounded-lg shadow-sm hover:shadow-xl transition-all border border-zinc-100"
              >
                <img 
                  src={brand.image} 
                  alt={`${brand.name} Premium Clothing Collection`}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&w=400&h=500&fit=crop' }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                <div className="absolute bottom-0 w-full p-4 text-center">
                  <h3 className="text-lg font-black text-white uppercase tracking-widest mb-1">{brand.name}</h3>
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full inline-block border border-white/20">
                    <p className="text-xs sm:text-sm font-black text-amber-400 uppercase tracking-widest">{brand.discount}</p>
                  </div>
                </div>
                <Link to={`/products?brand=${brand.name}`} className="absolute inset-0 z-10"></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Slider */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50/40 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-widest text-zinc-900 mb-4">Trending In Fashion</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            <div 
              className="flex overflow-x-auto gap-6 sm:gap-8 pb-8 snap-x snap-mandatory no-scrollbar px-2 cursor-grab active:cursor-grabbing"
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {products.filter(p => p.isTrending).map((product) => (
                <div key={product.id} className="min-w-[280px] max-w-[300px] flex-shrink-0 snap-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            {/* Gradient faded edges for visual cues */}
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/products" className="inline-flex items-center text-sm font-black uppercase tracking-widest text-blue-700 border-2 border-blue-200 px-8 py-3 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-colors rounded-sm shadow-sm hover:shadow-md">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Grand Brands Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[40vh] sm:h-[50vh]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden group shadow-md border border-zinc-100">
            <img 
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1920" 
              alt="Winter Collection" 
              loading="lazy"
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1920' }}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-white/40 flex flex-col justify-center items-center text-center p-6 mix-blend-overlay"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 bg-black/20">
              <h2 className="text-3xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-4 shadow-sm">Grand Global Brands</h2>
              <p className="text-lg sm:text-2xl font-black text-amber-400 uppercase tracking-widest mb-8 drop-shadow-sm">Up to 70% Off</p>
              <Link to="/products" className="bg-white text-blue-700 px-10 py-4 text-sm font-black uppercase tracking-widest hover:bg-blue-700 hover:text-white transition-all rounded-full shadow-xl hover:-translate-y-1">
                Shop The Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50/40 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-zinc-900">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-slate-200">
                <Truck className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-black tracking-widest uppercase mb-3 text-zinc-800">Express Delivery</h3>
              <p className="text-zinc-600 text-sm leading-relaxed max-w-xs font-medium">
                Superfast delivery on all orders above ₹1,999. Get your styles delivered right to your doorstep.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-slate-200">
                <RefreshCw className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-black tracking-widest uppercase mb-3 text-zinc-800">14-Day Returns</h3>
              <p className="text-zinc-600 text-sm leading-relaxed max-w-xs font-medium">
                Not fully satisfied? Hassle-free returns and exchanges within 14 days of delivery.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-slate-200">
                <ShieldCheck className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-black tracking-widest uppercase mb-3 text-zinc-800">100% Original</h3>
              <p className="text-zinc-600 text-sm leading-relaxed max-w-xs font-medium">
                Guarantee for all products at Clothify. Authentic styles from the best brands.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}


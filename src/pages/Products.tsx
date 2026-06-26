import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data';
import { Search, Filter, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';

const CATEGORIES = ['All', 'Women', 'Men', 'Kids', 'Shoes', 'Accessories'];

export function Products() {
 const [searchParams, setSearchParams] = useSearchParams();
 const initialCategory = searchParams.get('category') || 'All';
 
 const [activeCategory, setActiveCategory] = useState(initialCategory);
 const [searchQuery, setSearchQuery] = useState('');
 const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

 const filteredProducts = useMemo(() => {
 return products.filter((p) => {
 const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
 const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
 return matchesCategory && matchesSearch;
 });
 }, [activeCategory, searchQuery]);

 const handleCategoryChange = (cat: string) => {
 setActiveCategory(cat);
 if (cat === 'All') {
 searchParams.delete('category');
 } else {
 searchParams.set('category', cat);
 }
 setSearchParams(searchParams);
 };

  const productsSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Shop Premium Clothing for Men, Women & Kids",
    "description": "Browse Clothify's extensive collection of premium clothing, ethical fashion, and sustainable apparel for men, women, and kids.",
    "url": "https://clothify.netlify.app/premium-clothing-collection",
    "hasPart": filteredProducts.slice(0, 10).map(p => ({
      "@type": "Product",
      "name": p.name,
      "image": p.image,
      "offers": {
        "@type": "Offer",
        "price": p.price,
        "priceCurrency": "INR"
      }
    }))
  });

 return (
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
 <SEO title="Shop Premium Clothing & Ethical Fashion | Clothify" description="Browse Clothify's extensive collection of premium clothing, ethical fashion, and sustainable apparel for men, women, and kids." schemaMarkup={productsSchema} canonicalUrl="https://clothify.netlify.app/premium-clothing-collection" />
 {/* Header & Controls */}
 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 space-y-4 md:space-y-0">
 <div>
 <h1 className="text-3xl md:text-4xl font-bold font-serif text-zinc-900 mb-2">Shop Premium Clothing for Men, Women & Kids</h1>
 <p className="text-zinc-500 text-sm">Showing {filteredProducts.length} items</p>
 </div>

 <div className="flex items-center space-x-4 w-full md:w-auto">
 {/* Search Box */}
 <div className="relative w-full md:w-64">
 <input 
 type="text" 
 placeholder="Search products..." 
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full bg-zinc-50 border border-zinc-200 rounded-sm py-2 pl-10 pr-4 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black :ring-white"
 />
 <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
 </div>
 
 {/* Mobile Filter Button */}
 <button 
 className="md:hidden p-2 border border-zinc-200 rounded-sm text-zinc-600 "
 onClick={() => setMobileFiltersOpen(true)}
 >
 <Filter className="w-5 h-5" />
 </button>
 </div>
 </div>

 <div className="flex flex-col md:flex-row gap-12">
 {/* Desktop Sidebar Filters */}
 <aside className="hidden md:block w-56 flex-shrink-0">
 <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 ">
 <div className="flex items-center mb-6 text-zinc-900 ">
 <Filter className="w-5 h-5 mr-2" />
 <h3 className="font-semibold tracking-wide">Filters</h3>
 </div>
 <h4 className="font-semibold text-zinc-900 tracking-widest text-[10px] uppercase mb-4 text-zinc-400">Categories</h4>
 <ul className="space-y-1">
 {CATEGORIES.map(cat => (
 <li key={cat}>
 <button
 onClick={() => handleCategoryChange(cat)}
 className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
 activeCategory === cat 
 ? 'bg-zinc-100 text-black font-medium shadow-sm' 
 : 'text-zinc-500 hover:text-black :text-white hover:bg-zinc-50 :bg-zinc-800/50'
 }`}
 >
 {cat}
 </button>
 </li>
 ))}
 </ul>
 </div>
 </aside>

 {/* Product Grid */}
 <div className="flex-1">
 {filteredProducts.length === 0 ? (
 <div className="py-20 text-center">
 <h3 className="text-xl text-zinc-900 font-serif mb-2">No products found</h3>
 <p className="text-zinc-500 text-sm">Try adjusting your filters or search query.</p>
 <button 
 onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
 className="mt-6 border-b border-black text-sm font-medium pb-1"
 >
 Clear all filters
 </button>
 </div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
 <AnimatePresence>
 {filteredProducts.map((product) => (
 <ProductCard key={product.id} product={product} />
 ))}
 </AnimatePresence>
 </div>
 )}
 </div>
 </div>

 {/* Mobile Filters Drawer */}
 <AnimatePresence>
 {mobileFiltersOpen && (
 <motion.div 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="fixed inset-0 z-50 flex"
 >
 <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
 <motion.div 
 initial={{ x: '100%' }}
 animate={{ x: 0 }}
 exit={{ x: '100%' }}
 transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
 className="relative ml-auto w-full max-w-xs h-full bg-white p-6 shadow-xl flex flex-col"
 >
 <div className="flex items-center justify-between mb-8">
 <h2 className="text-lg font-bold font-serif">Filters</h2>
 <button onClick={() => setMobileFiltersOpen(false)} className="text-zinc-500">
 <X className="w-6 h-6" />
 </button>
 </div>

 <h3 className="font-semibold text-zinc-900 tracking-widest text-sm uppercase mb-4">Categories</h3>
 <ul className="space-y-4">
 {CATEGORIES.map(cat => (
 <li key={cat}>
 <button
 onClick={() => {
 handleCategoryChange(cat);
 setMobileFiltersOpen(false);
 }}
 className={`text-sm transition-colors ${
 activeCategory === cat 
 ? 'text-black font-medium' 
 : 'text-zinc-500'
 }`}
 >
 {cat}
 </button>
 </li>
 ))}
 </ul>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
}

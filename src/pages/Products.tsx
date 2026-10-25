import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';
import { PAGE_SEO, SITE_URL } from '../seo';

const CATEGORIES = ['All', 'Men', 'Women', 'Kids'];
const SIZES = Array.from(new Set(products.flatMap(product => product.sizes || [])));
const COLORS = Array.from(new Set(products.flatMap(product => product.colors || [])));

export function Products() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSEO = location.pathname === PAGE_SEO.premiumCollection.path
    ? PAGE_SEO.premiumCollection
    : PAGE_SEO.products;
  const requestedCategory = searchParams.get('category') || 'All';
  const initialCategory = CATEGORIES.includes(requestedCategory) ? requestedCategory : 'All';
  const initialSearch = searchParams.get('search') || '';
  const initialTrending = searchParams.get('trending') === 'true';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const [activeSizes, setActiveSizes] = useState<string[]>([]);
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<string>('recommended');

  useEffect(() => {
    const requested = searchParams.get('category') || 'All';
    setActiveCategory(CATEGORIES.includes(requested) ? requested : 'All');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const searchableText = `${p.name} ${p.category} ${p.colors?.join(' ')} ${p.description || ''}`.toLowerCase();
      const matchesSearch = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean).every(term => searchableText.includes(term));
      const matchesPrice = p.price <= priceRange;
      const matchesSize = activeSizes.length === 0 || (p.sizes && p.sizes.some(s => activeSizes.includes(s)));
      const matchesColor = activeColors.length === 0 || (p.colors && p.colors.some(c => activeColors.includes(c)));
      const matchesTrending = !initialTrending || p.isTrending;
      
      return matchesCategory && matchesSearch && matchesPrice && matchesSize && matchesColor && matchesTrending;
    });

    switch (sortBy) {
      case 'price-low':
        return result.sort((a, b) => a.price - b.price);
      case 'price-high':
        return result.sort((a, b) => b.price - a.price);
      default:
        return result;
    }
  }, [activeCategory, searchQuery, activeSizes, activeColors, priceRange, initialTrending, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const toggleSize = (size: string) => {
    setActiveSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const toggleColor = (color: string) => {
    setActiveColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const clearFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setActiveSizes([]);
    setActiveColors([]);
    setPriceRange(2000);
    setSortBy('recommended');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO title={pageSEO.title} description={pageSEO.description} schemaMarkup={JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "CollectionPage", "name": "Shop Affordable Clothing for Men, Women & Kids", "url": `${SITE_URL}${PAGE_SEO.products.path}` }, { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` }, { "@type": "ListItem", "position": 2, "name": "Products", "item": `${SITE_URL}${PAGE_SEO.products.path}` }] }] })} canonicalUrl={`${SITE_URL}${pageSEO.canonicalPath || pageSEO.path}`} />
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-zinc-500">
        <ol className="flex items-center gap-2">
          <li><Link to="/" className="hover:text-blue-700">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-zinc-900">Products</li>
        </ol>
      </nav>
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-zinc-900 mb-2">Shop Affordable Fashion</h1>
          <p className="text-zinc-500 font-medium">Showing {filteredProducts.length} items</p>
          <Link to="/sustainable-fashion-blog" className="mt-3 inline-block text-sm font-bold text-blue-700 hover:underline">Read our fashion tips and styling ideas</Link>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <label htmlFor="product-search" className="sr-only">Search products</label>
            <input 
              id="product-search"
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-3 pl-10 pr-4 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
          </div>
          
          {/* Sort Dropdown */}
          <div className="relative border border-zinc-200 rounded-md bg-zinc-50 w-full sm:w-auto">
            <label htmlFor="product-sort" className="sr-only">Sort products</label>
            <select 
              id="product-sort"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent py-3 pl-4 pr-10 text-sm font-medium w-full outline-none cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-3.5 pointer-events-none" />
          </div>
          
          {/* Mobile Filter Button */}
          <button 
            aria-label="Open filters"
            className="p-3 border border-zinc-200 bg-white hover:bg-zinc-50 rounded-sm text-zinc-600 font-bold uppercase tracking-widest text-xs min-w-[44px] min-h-[44px] flex items-center justify-center w-full sm:w-auto transition-colors"
            onClick={() => setFiltersOpen(true)}
          >
            <Filter className="w-5 h-5 mr-2" /> Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block w-56 shrink-0 space-y-8">
          <div><h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">Category</h3><div className="space-y-2">{CATEGORIES.map(cat => <button key={cat} onClick={() => handleCategoryChange(cat)} className={`block w-full text-left text-sm py-2 ${activeCategory === cat ? 'text-blue-700 font-bold' : 'text-zinc-600 hover:text-zinc-900'}`}>{cat}</button>)}</div></div>
          <div><div className="flex justify-between text-xs font-black uppercase tracking-widest text-zinc-500 mb-3"><span>Price</span><span className="text-blue-700">₹{priceRange.toLocaleString('en-IN')}</span></div><input type="range" min="200" max="2000" step="50" value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} className="w-full accent-blue-700" /><div className="flex justify-between text-xs text-zinc-400 mt-1"><span>₹200</span><span>₹2,000</span></div></div>
          <div><h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">Size</h3><div className="flex flex-wrap gap-2">{SIZES.map(size => <button key={size} onClick={() => toggleSize(size)} className={`w-10 h-9 border text-xs font-bold rounded ${activeSizes.includes(size) ? 'bg-blue-700 text-white border-blue-700' : 'border-zinc-200 text-zinc-600'}`}>{size}</button>)}</div></div>
          <div><h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">Colour</h3><div className="flex flex-wrap gap-2">{COLORS.map(color => <button key={color} onClick={() => toggleColor(color)} aria-pressed={activeColors.includes(color)} className={`px-3 py-2 border text-xs font-bold rounded ${activeColors.includes(color) ? 'bg-blue-700 text-white border-blue-700' : 'border-zinc-200 text-zinc-600'}`}>{color}</button>)}</div></div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center bg-zinc-50 rounded-2xl border border-zinc-100">
              <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-widest mb-3">No products found</h3>
              <p className="text-zinc-500 mb-6">Try adjusting your filters or search query.</p>
              <button 
                onClick={clearFilters}
                className="bg-blue-700 text-white px-8 py-3 font-bold uppercase tracking-widest rounded-full hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Filters Drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="relative ml-auto w-full max-w-sm h-full bg-white p-6 shadow-xl flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black uppercase tracking-widest text-zinc-900">Filters</h2>
                <button aria-label="Close filters" onClick={() => setFiltersOpen(false)} className="text-zinc-500 hover:text-black min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Filter Content - Similar to Desktop */}
              <div className="space-y-8 flex-1">
                {/* Categories */}
                <div>
                  <h4 className="font-bold text-zinc-900 tracking-widest text-xs uppercase mb-4 text-zinc-500">Categories</h4>
                  <ul className="space-y-2">
                    {CATEGORIES.map(cat => (
                      <li key={cat}>
                        <button
                          onClick={() => handleCategoryChange(cat)}
                          className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                            activeCategory === cat ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-zinc-50 text-zinc-700 border border-transparent'
                          }`}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Price */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-zinc-900 tracking-widest text-xs uppercase text-zinc-500">Max Price</h4>
                    <span className="text-xs font-bold text-blue-700">₹{priceRange.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="200" max="2000" step="50" value={priceRange} 
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-blue-700"
                  />
                </div>
                
                {/* Size */}
                <div>
                  <h4 className="font-bold text-zinc-900 tracking-widest text-xs uppercase mb-4 text-zinc-500">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map(size => (
                      <button
                        key={size} onClick={() => toggleSize(size)}
                        className={`w-12 h-12 flex items-center justify-center text-sm font-bold border rounded-md transition-all ${
                          activeSizes.includes(size) ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-zinc-600 border-zinc-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 tracking-widest text-xs uppercase mb-4 text-zinc-500">Colour</h4>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map(color => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        aria-pressed={activeColors.includes(color)}
                        className={`px-4 py-3 text-sm font-bold border rounded-md transition-all ${
                          activeColors.includes(color) ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-zinc-600 border-zinc-200'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-zinc-200 grid grid-cols-2 gap-4">
                <button onClick={clearFilters} className="py-4 font-bold uppercase tracking-widest text-sm border border-zinc-200 rounded-md">Clear</button>
                <button onClick={() => setFiltersOpen(false)} className="py-4 font-bold uppercase tracking-widest text-sm bg-blue-700 text-white rounded-md">Apply</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

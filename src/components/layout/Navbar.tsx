import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Facebook, Instagram } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const MEGA_MENUS: Record<string, { columns: { title: string; items: string[] }[], featuredImages?: { url: string; title: string }[] }> = {
  'Products': {
    columns: [
      { title: 'Men', items: ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Sweatshirts', 'Jackets'] },
      { title: 'Women', items: ['Kurtas & Suits', 'Dresses', 'Tops', 'Jeans', 'Sarees'] },
      { title: 'Kids', items: ['Boys Clothing', 'Girls Clothing', 'Footwear', 'Toys'] },
      { title: 'Accessories', items: ['Watches', 'Backpacks', 'Belts', 'Wallets', 'Sunglasses'] }
    ],
    featuredImages: [
      { url: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=400&q=80', title: 'Summer Collection' },
      { url: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=400&q=80', title: 'New Arrivals' }
    ]
  }
};

const LINKS = [
  { name: 'Home', path: '/', hasMegaMenu: false },
  { name: 'About Us', path: '/about-clothify-sustainable-fashion', hasMegaMenu: false },
  { name: 'Products', path: '/premium-clothing-collection', hasMegaMenu: true },
  { name: 'Blog', path: '/sustainable-fashion-blog', hasMegaMenu: false },
  { name: 'Contact Us', path: '/contact-clothify', hasMegaMenu: false },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Announcement Bar */}
      <AnimatePresence>
        {showAnnouncement && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-r from-blue-700 via-teal-500 to-amber-500 text-white text-xs font-bold py-2 px-4 flex items-center justify-center relative overflow-hidden"
          >
            <span className="tracking-wide text-center drop-shadow-sm">
              FREE SHIPPING ON ORDERS OVER ₹2,999 • SHOP THE SUMMER SALE NOW
            </span>
            <button 
              onClick={() => setShowAnnouncement(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Utility Bar */}
      <div className="bg-zinc-900 text-white py-2 px-4 sm:px-6 lg:px-8 hidden md:block text-[11px] font-bold tracking-widest uppercase">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6 text-zinc-300">
            <span className="hover:text-amber-400 cursor-pointer transition-colors">Track Order</span>
            <span className="hover:text-amber-400 cursor-pointer transition-colors">Store Locator</span>
            <span className="hover:text-amber-400 cursor-pointer transition-colors">Customer Care</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-zinc-500 mr-2">Follow Us</span>
            <a href="#" className="text-zinc-300 hover:text-amber-400 transition-all hover:scale-110">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="text-zinc-300 hover:text-amber-400 transition-all hover:scale-110">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="text-zinc-300 hover:text-amber-400 transition-all hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M14 14a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z"/><path d="M9 9h.01"/><path d="M14 13h.01"/><path d="M9 10c0 2 1.5 3 4 4"/></svg>
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300 border-b border-transparent',
          isScrolled || !showAnnouncement
            ? 'bg-white/95 backdrop-blur-md border-zinc-200 shadow-sm py-4'
            : 'bg-white py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-zinc-600 hover:text-blue-700"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
              <Link to="/" className="flex items-center space-x-2 text-2xl font-black tracking-tighter text-zinc-900 group">
                <div className="w-8 h-8 bg-blue-700 text-white rounded flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform">
                  <ShoppingBag className="w-5 h-5 fill-white/20" />
                </div>
                <span>CLOTHIFY<span className="text-amber-500">.</span></span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1 ml-8 space-x-8 h-full min-h-[60px]" onMouseLeave={() => setHoveredMenu(null)}>
              {LINKS.map((link) => (
                <div 
                  key={link.name} 
                  className="h-full flex items-center"
                  onMouseEnter={() => setHoveredMenu(link.hasMegaMenu ? link.name : null)}
                  onClick={() => setHoveredMenu(link.hasMegaMenu && hoveredMenu !== link.name ? link.name : null)}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      'text-[13px] font-bold tracking-[0.05em] uppercase transition-colors hover:text-blue-700 relative h-full flex items-center',
                      location.pathname + location.search === link.path || hoveredMenu === link.name
                        ? 'text-blue-700'
                        : 'text-zinc-900'
                    )}
                  >
                    {link.name}
                    {(location.pathname + location.search === link.path || hoveredMenu === link.name) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[4px] bg-blue-700 rounded-t-md"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {link.hasMegaMenu && hoveredMenu === link.name && MEGA_MENUS[link.name] && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-[85px] left-0 right-0 bg-white border-t border-b border-zinc-200 shadow-xl overflow-hidden z-50 py-8 px-10"
                      style={{ maxHeight: '80vh', overflowY: 'auto' }}
                    >
                      <div className="max-w-7xl mx-auto flex justify-between gap-16">
                        <div className="flex justify-start gap-16 flex-1">
                          {MEGA_MENUS[link.name].columns.map((col: any) => (
                            <div key={col.title} className="flex flex-col min-w-[150px]">
                              <h4 className="text-blue-700 font-bold uppercase tracking-widest text-[13px] mb-4">
                                {col.title}
                              </h4>
                              <ul className="space-y-3">
                                {col.items.map((item: any) => (
                                  <li key={item}>
                                    <Link 
                                      to={`/premium-clothing-collection?category=${col.title}`}
                                      className="text-zinc-600 hover:text-blue-700 hover:font-bold text-sm tracking-wide transition-all"
                                      onClick={() => setHoveredMenu(null)}
                                    >
                                      {item}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        {MEGA_MENUS[link.name].featuredImages && (
                          <div className="flex gap-4 min-w-[300px]">
                            {MEGA_MENUS[link.name].featuredImages?.map((img: any, i: number) => (
                              <div key={i} className="relative group overflow-hidden rounded-sm cursor-pointer flex-1" onClick={() => setHoveredMenu(null)}>
                                <Link to="/premium-clothing-collection">
                                  <img src={img.url} alt={img.title} loading="lazy" className="w-full h-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-500" />
                                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                    <p className="text-white font-bold text-sm">{img.title}</p>
                                  </div>
                                </Link>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 text-zinc-600 hover:text-blue-700 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-zinc-600 hover:text-blue-700 transition-colors hidden sm:block">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 text-zinc-600 hover:text-blue-700 transition-colors relative group">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-700 rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white shadow-xl z-50 p-6 flex flex-col md:hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="flex items-center space-x-2 text-2xl font-black tracking-tighter text-zinc-900 group">
                    <div className="w-8 h-8 bg-blue-700 text-white rounded flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform">
                      <ShoppingBag className="w-5 h-5 fill-white/20" />
                    </div>
                    <span>CLOTHIFY<span className="text-amber-500">.</span></span>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 -mr-2 text-zinc-500 hover:text-blue-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <nav className="flex flex-col space-y-6">
                  {LINKS.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={cn(
                        'text-lg font-bold tracking-widest uppercase transition-colors',
                        location.pathname === link.path
                          ? 'text-blue-700'
                          : 'text-zinc-900 hover:text-blue-700'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto border-t border-zinc-100 pt-6">
                  <div className="flex items-center space-x-4 text-zinc-600 hover:text-blue-700 transition-colors cursor-pointer">
                    <User className="w-5 h-5" />
                    <span className="font-bold tracking-widest uppercase">My Account</span>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

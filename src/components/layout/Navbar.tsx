import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  User,
  Facebook,
  Instagram,
  Heart
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const MEGA_MENUS: Record<
  string,
  {
    columns: { title: string; items: string[] }[];
    featuredImages?: { url: string; title: string }[];
  }
> = {
  Products: {
    columns: [
      {
        title: 'Men',
        items: [
          'T-Shirts',
          'Casual Shirts',
          'Formal Shirts',
          'Sweatshirts',
          'Jackets'
        ]
      },
      {
        title: 'Women',
        items: ['Kurtas & Suits', 'Dresses', 'Tops', 'Jeans', 'Sarees']
      },
      {
        title: 'Kids',
        items: ['Boys Clothing', 'Girls Clothing', 'Footwear', 'Toys']
      },
      {
        title: 'Accessories',
        items: [
          'Watches',
          'Backpacks',
          'Belts',
          'Wallets',
          'Sunglasses'
        ]
      }
    ],
    featuredImages: [
      {
        url: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=400&q=75&auto=format',
        title: 'Summer Collection'
      },
      {
        url: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=400&q=75&auto=format',
        title: 'New Arrivals'
      }
    ]
  }
};

const LINKS = [
  {
    name: 'Home',
    path: '/',
    hasMegaMenu: false
  },
  {
    name: 'About Us',
    path: '/about-clothify-sustainable-fashion',
    hasMegaMenu: false
  },
  {
    name: 'Products',
    path: '/products',
    hasMegaMenu: true
  },
  {
    name: 'Blog',
    path: '/sustainable-fashion-blog',
    hasMegaMenu: false
  },
  {
    name: 'Contact Us',
    path: '/contact-clothify',
    hasMegaMenu: false
  }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const { cart, wishlist, user } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
            className="bg-gradient-to-r from-blue-700 via-emerald-500 to-amber-500 text-white text-xs font-bold py-2 px-4 flex items-center justify-center relative overflow-hidden"
          >
            <span className="tracking-wide text-center drop-shadow-sm">
              FREE SHIPPING ON ORDERS OVER ₹2,999 • SHOP THE SUMMER SALE NOW
            </span>

            <button
              onClick={() => setShowAnnouncement(false)}
              aria-label="Close announcement"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Utility Bar */}
      <div className="bg-black text-amber-500 py-2 px-4 sm:px-6 lg:px-8 hidden md:block text-[11px] font-bold tracking-widest uppercase">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6 text-amber-500">
            <span className="hover:text-amber-400 cursor-pointer transition-colors">
              Track Order
            </span>

            <span className="hover:text-amber-400 cursor-pointer transition-colors">
              Store Locator
            </span>

            <span className="hover:text-amber-400 cursor-pointer transition-colors">
              Customer Care
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-zinc-400 mr-2">Follow Us</span>

            <span
              className="text-zinc-400 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Instagram aria-hidden="true" className="w-4 h-4" />
            </span>

            <span
              className="text-zinc-400 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Facebook aria-hidden="true" className="w-4 h-4" />
            </span>

            <span
              className="text-zinc-400 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                <path d="M14 14a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z" />
                <path d="M9 9h.01" />
                <path d="M14 13h.01" />
                <path d="M9 10c0 2 1.5 3 4 4" />
              </svg>
            </span>
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
                aria-label="Open mobile menu"
                className="p-2 text-zinc-600 hover:text-blue-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
              <Link
                to="/"
                aria-label="Clothify Home"
                className="flex items-center space-x-2 text-2xl max-[374px]:text-xl font-black tracking-tighter text-zinc-900 group"
              >
                <div className="w-8 h-8 bg-blue-700 text-white rounded flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform">
                  <ShoppingBag className="w-5 h-5 fill-white/20" />
                </div>

                <span>
                  CLOTHIFY<span className="text-amber-500">.</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center justify-center flex-1 ml-8 space-x-8 h-full min-h-[60px]"
              onMouseLeave={() => setHoveredMenu(null)}
            >
              {LINKS.map((link) => {
                const featuredImages = MEGA_MENUS[link.name]?.featuredImages;

                return (
                  <div
                    key={link.name}
                    className="h-full flex items-center"
                    onMouseEnter={() =>
                      setHoveredMenu(
                        link.hasMegaMenu ? link.name : null
                      )
                    }
                    onClick={() =>
                      setHoveredMenu(
                        link.hasMegaMenu && hoveredMenu !== link.name
                          ? link.name
                          : null
                      )
                    }
                  >
                    <Link
                      to={link.path}
                      className={cn(
                        'text-[13px] font-bold tracking-[0.05em] uppercase transition-colors hover:text-blue-700 relative h-full flex items-center',
                        location.pathname + location.search === link.path ||
                          hoveredMenu === link.name
                          ? 'text-blue-700'
                          : 'text-zinc-900'
                      )}
                    >
                      {link.name}

                      {(location.pathname + location.search === link.path ||
                        hoveredMenu === link.name) && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-[4px] bg-blue-700 rounded-t-md"
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 30
                          }}
                        />
                      )}
                    </Link>

                    {/* Mega Menu Dropdown */}
                    {link.hasMegaMenu &&
                      hoveredMenu === link.name &&
                      MEGA_MENUS[link.name] && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-[85px] left-0 right-0 bg-white border-t border-b border-zinc-200 shadow-xl overflow-hidden z-50 py-8 px-10"
                          style={{
                            maxHeight: '80vh',
                            overflowY: 'auto'
                          }}
                        >
                          <div className="max-w-7xl mx-auto flex justify-between gap-16">
                            <div className="flex justify-start gap-16 flex-1">
                              {MEGA_MENUS[link.name].columns.map((col) => (
                                <div
                                  key={col.title}
                                  className="flex flex-col min-w-[150px]"
                                >
                                  <h4 className="text-blue-700 font-bold uppercase tracking-widest text-[13px] mb-4">
                                    {col.title}
                                  </h4>

                                  <ul className="space-y-3">
                                    {col.items.map((item) => (
                                      <li key={item}>
                                        <Link
                                          to={`/premium-clothing-collection?category=${encodeURIComponent(
                                            col.title
                                          )}`}
                                          className="text-zinc-600 hover:text-blue-700 hover:font-bold text-sm tracking-wide transition-all"
                                          onClick={() =>
                                            setHoveredMenu(null)
                                          }
                                        >
                                          {item}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>

                            {featuredImages && (
                              <div className="flex gap-4 min-w-[300px]">
                                {featuredImages.map((img, i) => (
                                  <div
                                    key={i}
                                    className="relative group overflow-hidden rounded-sm cursor-pointer flex-1"
                                    onClick={() => setHoveredMenu(null)}
                                  >
                                    <Link to="/products">
                                      <img
                                        src={img.url}
                                        alt={img.title}
                                        width="400"
                                        height="533"
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-500"
                                      />

                                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                        <p className="text-white font-bold text-sm">
                                          {img.title}
                                        </p>
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
                );
              })}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  if (searchQuery.trim()) {
                    navigate(
                      '/products?search=' +
                        encodeURIComponent(searchQuery)
                    );
                  }
                }}
                className="hidden lg:flex items-center bg-zinc-100 rounded-full px-4 py-2"
              >
                <input
                  type="text"
                  placeholder="Search dresses, shirts, jeans, sneakers..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="bg-transparent border-none outline-none text-sm w-64 focus:w-80 min-h-11 transition-all"
                />

                <button
                  type="submit"
                  aria-label="Search"
                  className="text-zinc-500 hover:text-blue-700 min-w-11 min-h-11 flex items-center justify-center"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              <button
                aria-label="Search Mobile"
                onClick={() => navigate('/products')}
                className="lg:hidden p-2 text-zinc-600 hover:text-blue-700 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                aria-label="Wishlist"
                onClick={() => navigate('/wishlist')}
                className="p-2 text-zinc-600 hover:text-blue-700 transition-colors relative min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <Heart className="w-5 h-5 hover:scale-110 transition-transform" />

                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                aria-label="User Account"
                onClick={() =>
                  navigate(user ? '/' : '/login')
                }
                className="p-2 text-zinc-600 hover:text-blue-700 transition-colors hidden sm:flex min-w-[44px] min-h-[44px] items-center justify-center"
              >
                {user ? (
                  <span className="text-sm font-bold truncate max-w-[80px]">
                    {user.name.split(' ')[0]}
                  </span>
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>

              <button
                aria-label="Shopping Cart"
                onClick={() => navigate('/cart')}
                className="p-2 text-zinc-600 hover:text-blue-700 transition-colors relative group min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />

                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-blue-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                    {cart.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                )}
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
                transition={{
                  type: 'spring',
                  bounce: 0,
                  duration: 0.4
                }}
                className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white shadow-xl z-50 p-6 flex flex-col md:hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <Link
                    to="/"
                    aria-label="Clothify Home"
                    className="flex items-center space-x-2 text-2xl font-black tracking-tighter text-zinc-900 group"
                  >
                    <div className="w-8 h-8 bg-blue-700 text-white rounded flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform">
                      <ShoppingBag className="w-5 h-5 fill-white/20" />
                    </div>

                    <span>
                      CLOTHIFY<span className="text-amber-500">.</span>
                    </span>
                  </Link>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close mobile menu"
                    className="p-2 -mr-2 text-zinc-500 hover:text-blue-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
                  <div className="space-y-4">
                    <div
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate('/wishlist');
                      }}
                      className="flex items-center space-x-4 text-zinc-600 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      <Heart className="w-5 h-5" />
                      <span className="font-bold tracking-widest uppercase">
                        Wishlist
                      </span>
                    </div>

                    <div
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate(user ? '/' : '/login');
                      }}
                      className="flex items-center space-x-4 text-zinc-600 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      <User className="w-5 h-5" />
                      <span className="font-bold tracking-widest uppercase">
                        {user ? 'My Account' : 'Sign In'}
                      </span>
                    </div>
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
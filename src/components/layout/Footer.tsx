import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 pt-16 pb-8 border-t-4 border-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <Link to="/" className="text-3xl font-black tracking-tighter text-white inline-block mb-2">
              CLOTHIFY<span className="text-blue-500">.</span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-300">
              Premium clothing and sustainable fashion for the modern wardrobe. Quality meets style.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <span className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                <Facebook aria-hidden="true" className="w-5 h-5" />
              </span>
              <span className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                <Instagram aria-hidden="true" className="w-5 h-5" />
              </span>
              <span className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                <Twitter aria-hidden="true" className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-blue-700"></span>
            </h3>
            <ul className="space-y-3">
              <li><Link to="/products" className="hover:text-blue-400 transition-colors inline-block text-sm">Shop All</Link></li>
              <li><Link to="/products?category=Men" className="hover:text-blue-400 transition-colors inline-block text-sm">Men's Collection</Link></li>
              <li><Link to="/products?category=Women" className="hover:text-blue-400 transition-colors inline-block text-sm">Women's Collection</Link></li>
              <li><Link to="/products?trending=true" className="hover:text-blue-400 transition-colors inline-block text-sm">Trending Now</Link></li>
              <li><Link to="/about-clothify-sustainable-fashion" className="hover:text-blue-400 transition-colors inline-block text-sm">About Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 relative inline-block">
              Customer Service
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-blue-700"></span>
            </h3>
            <ul className="space-y-3">
              <li><Link to="/contact-clothify" className="hover:text-blue-400 transition-colors inline-block text-sm">Contact Us</Link></li>
              <li><span className="text-zinc-300 inline-block text-sm">Shipping Policy</span></li>
              <li><span className="text-zinc-300 inline-block text-sm">Returns & Exchanges</span></li>
              <li><span className="text-zinc-300 inline-block text-sm">Size Guide</span></li>
              <li><span className="text-zinc-300 inline-block text-sm">FAQ</span></li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 relative inline-block">
              Stay in the loop
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-blue-700"></span>
            </h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">123 Fashion Street, Style City, SC 12345</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-sm">support@clothify.com</span>
              </div>
            </div>
            
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input 
                type="email" 
                id="footer-email"
                placeholder="Your email address" 
                className="bg-zinc-800 border-none text-white px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-700 text-sm rounded-l-sm"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 font-bold uppercase tracking-widest text-xs transition-colors rounded-r-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-300 text-center md:text-left">
            &copy; {new Date().getFullYear()} Clothify. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-zinc-300">
            <span className="text-zinc-300">Privacy Policy</span>
            <span className="text-zinc-300">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

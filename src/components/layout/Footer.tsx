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
              <li><Link to="/premium-clothing-collection" className="hover:text-blue-400 transition-colors inline-block text-sm">Shop All</Link></li>
              <li><Link to="/premium-clothing-collection?category=Men" className="hover:text-blue-400 transition-colors inline-block text-sm">Men's Collection</Link></li>
              <li><Link to="/premium-clothing-collection?category=Women" className="hover:text-blue-400 transition-colors inline-block text-sm">Women's Collection</Link></li>
              <li><Link to="/premium-clothing-collection?trending=true" className="hover:text-blue-400 transition-colors inline-block text-sm">Trending Now</Link></li>
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
              <li><Link to="/contact-clothify#shipping-policy" className="hover:text-blue-400 transition-colors inline-block text-sm">Shipping Policy</Link></li>
              <li><Link to="/contact-clothify#returns-exchanges" className="hover:text-blue-400 transition-colors inline-block text-sm">Returns & Exchanges</Link></li>
              <li><Link to="/contact-clothify#size-guide" className="hover:text-blue-400 transition-colors inline-block text-sm">Size Guide</Link></li>
              <li><Link to="/contact-clothify#faq" className="hover:text-blue-400 transition-colors inline-block text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 relative inline-block">
              Explore Clothify
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
            
            <p className="text-xs text-zinc-400 mb-3">Newsletter sign-up is not available on this site.</p>
            <Link to="/premium-clothing-collection" className="inline-block bg-blue-700 hover:bg-blue-600 text-white px-4 py-3 font-bold uppercase tracking-widest text-xs transition-colors rounded-sm">
              Browse the collection
            </Link>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-300 text-center md:text-left">
            &copy; {new Date().getFullYear()} Clothify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

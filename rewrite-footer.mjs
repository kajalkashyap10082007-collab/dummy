import fs from 'fs';

let content = `import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" aria-label="Clothify Home" className="text-2xl font-serif font-black tracking-tighter text-zinc-900 inline-block">
              CLOTHIFY<span className="text-zinc-400">.</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Curated fashion for the modern wardrobe. Elevating everyday style with premium quality and timeless designs.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <a href="#" aria-label="Facebook" className="text-zinc-400 hover:text-zinc-900 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center -ml-2">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-zinc-400 hover:text-zinc-900 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-zinc-400 hover:text-zinc-900 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-zinc-400 hover:text-zinc-900 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-zinc-900 mb-6 uppercase tracking-widest text-xs">Shop</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link to="/products?trending=true" className="hover:text-zinc-900 transition-colors block">New Arrivals</Link></li>
              <li><Link to="/products" className="hover:text-zinc-900 transition-colors block">Best Sellers</Link></li>
              <li><Link to="/products" className="hover:text-zinc-900 transition-colors block">Categories</Link></li>
              <li><Link to="/products?sale=true" className="hover:text-zinc-900 transition-colors block">Sale</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold text-zinc-900 mb-6 uppercase tracking-widest text-xs">Help</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-zinc-900 transition-colors block">FAQ</a></li>
              <li><Link to="/contact" className="hover:text-zinc-900 transition-colors block">Contact</Link></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors block">Shipping</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors block">Returns</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-zinc-900 mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link to="/about" className="hover:text-zinc-900 transition-colors block">About</Link></li>
              <li><Link to="/blog" className="hover:text-zinc-900 transition-colors block">Blog</Link></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors block">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Clothify. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <span>INR (₹)</span>
            <span>English</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
`;

fs.writeFileSync('src/components/layout/Footer.tsx', content);

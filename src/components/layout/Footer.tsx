import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, ArrowRight, MapPin, Phone, Mail, ShoppingBag, Linkedin } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('newsletter_subscription', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-blue-950 border-t border-blue-900 pt-16 pb-8 text-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white mb-2 inline-block">
              CLOTHIFY<span className="text-amber-400">.</span>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
              Redefining everyday elegance with <strong>premium clothing</strong>, <strong>ethical</strong> manufacturing, and <strong>sustainable fashion</strong>. Find the best <strong>women</strong>'s, <strong>men</strong>'s, and <strong>kids</strong>' <strong>fashion</strong> and <strong>accessories</strong> right here at Clothify.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="text-blue-300 hover:text-amber-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-amber-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-amber-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-amber-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-white mb-6 uppercase tracking-widest text-sm">Shop</h4>
            <ul className="space-y-3 text-sm text-blue-300">
              <li><Link to="/premium-clothing-collection?category=Women" className="hover:text-amber-400 transition-colors">Women's Collection</Link></li>
              <li><Link to="/premium-clothing-collection?category=Men" className="hover:text-amber-400 transition-colors">Men's Collection</Link></li>
              <li><Link to="/premium-clothing-collection?category=Shoes" className="hover:text-amber-400 transition-colors">Shoes & Footwear</Link></li>
              <li><Link to="/premium-clothing-collection?category=Accessories" className="hover:text-amber-400 transition-colors">Accessories</Link></li>
              <li><Link to="/premium-clothing-collection?trending=true" className="hover:text-amber-400 transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-black text-white mb-6 uppercase tracking-widest text-sm">Company</h4>
            <ul className="space-y-3 text-sm text-blue-300">
              <li><Link to="/about-clothify-sustainable-fashion" className="hover:text-amber-400 transition-colors">About Story</Link></li>
              <li><Link to="/contact-clothify" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/sustainable-fashion-blog" className="hover:text-amber-400 transition-colors">Style Journal</Link></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-black text-white mb-6 uppercase tracking-widest text-sm">Newsletter</h4>
            <p className="text-blue-200 text-sm mb-4 leading-relaxed">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-blue-900 border border-blue-800 rounded-lg py-3 pl-4 pr-12 text-sm text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-gradient-to-r from-blue-700 to-teal-500 text-white hover:shadow-lg transition-all flex items-center justify-center rounded-md"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-teal-400 font-bold tracking-widest mt-2">Thanks for subscribing!</p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-blue-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-blue-300 font-semibold tracking-widest">
          <p>© {new Date().getFullYear()} CLOTHIFY. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> New York, NY</span>
            <span className="flex items-center"><Phone className="w-3 h-3 mr-1" /> 1-800-CLOTHIFY</span>
            <span className="flex items-center"><Mail className="w-3 h-3 mr-1" /> support@clothify.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

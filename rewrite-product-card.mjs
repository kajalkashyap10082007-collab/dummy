import fs from 'fs';

let content = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { useToast } from './Toast';
import { motion } from 'motion/react';
import { QuickView } from './QuickView';
import { Heart } from 'lucide-react';
import { Product } from '../types';

export function ProductCard({ product, ...props }: { product: Product } & React.HTMLAttributes<HTMLDivElement>) {
  const { addToWishlist, removeFromWishlist, wishlist } = useStore();
  const { toast } = useToast();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const isWishlisted = wishlist.some(p => p.id === product.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast('Removed from wishlist', 'info');
    } else {
      addToWishlist(product);
      toast('Added to wishlist ❤️', 'success');
    }
  };

  return (
    <motion.div 
      {...(props as any)}
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col bg-transparent overflow-hidden transition-all duration-500"
    >
      <div className="relative aspect-[4/5] bg-zinc-100 overflow-hidden cursor-pointer">
        <Link to={"/product/" + product.id} className="block w-full h-full">
          {/* Primary Image */}
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&fm=webp&w=800' }}
            className={"absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 " + (product.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105')}
          />
          {/* Hover Image */}
          {product.hoverImage && (
            <img 
              src={product.hoverImage} 
              alt={product.name + " alternate view"} 
              loading="lazy"
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&fm=webp&w=800' }}
              className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
          )}
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.originalPrice && (
            <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
            </div>
          )}
          {product.isTrending && (
            <div className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Trending
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button aria-label="Add to favorites" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(); }} className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full text-zinc-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-red-500 hover:scale-110 shadow-sm translate-y-[-10px] group-hover:translate-y-0 min-w-[40px] min-h-[40px] flex items-center justify-center">
          <Heart className={"w-4 h-4 " + (isWishlisted ? "fill-current text-red-500" : "")} />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsQuickViewOpen(true); }} className="w-full bg-white text-zinc-900 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all shadow-sm">
            Quick View
          </button>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col flex-grow py-4 px-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{product.category}</span>
        </div>
        
        <Link to={"/product/" + product.id} className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors mb-1 line-clamp-1">
          {product.name}
        </Link>
        
        <div className="flex items-center space-x-2 mt-auto">
          <span className="text-sm font-semibold text-zinc-900">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-500 line-through decoration-zinc-300">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>

      <QuickView product={product} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
    </motion.div>
  );
}
`;
fs.writeFileSync('src/components/ProductCard.tsx', content);

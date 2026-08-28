import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { useToast } from './Toast';
import { motion } from 'motion/react';
import { QuickView } from './QuickView';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

export function ProductCard({ product, ...props }: { product: Product } & React.HTMLAttributes<HTMLDivElement>) {
  const { addToWishlist, removeFromWishlist, wishlist, addToCart } = useStore();
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

  const handleAddToCart = () => {
    addToCart(product, product.sizes?.[0], product.colors?.[0]);
    toast('Added to cart', 'success');
  };

  return (
    <motion.div 
      {...(props as any)}
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100"
    >
      <div className="relative aspect-[4/5] bg-zinc-100 overflow-hidden cursor-pointer">
        <Link to={"/product/" + product.id} className="block w-full h-full">
          {/* Primary Image */}
          <img 
            src={product.image} 
            srcSet={product.image.replace('w=900', 'w=480') + ' 480w, ' + product.image.replace('w=900', 'w=768') + ' 768w, ' + product.image + ' 900w'}
            sizes="(max-width: 767px) 50vw, (max-width: 1279px) 25vw, 225px"
            alt={product.imageAlt || `${product.category} ${product.name}`} 
            width="900"
            height="1125"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&fm=webp&w=800' }}
            className={"absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 " + (product.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105')}
          />
          {/* Hover Image */}
          {product.hoverImage && (
            <img 
              src={product.hoverImage} 
              srcSet={product.hoverImage.replace('w=900', 'w=480') + ' 480w, ' + product.hoverImage.replace('w=900', 'w=768') + ' 768w, ' + product.hoverImage + ' 900w'}
              sizes="(max-width: 767px) 50vw, (max-width: 1279px) 25vw, 225px"
              alt=""
              aria-hidden="true"
              width="900"
              height="1125"
              loading="lazy"
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&fm=webp&w=800' }}
              className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
          )}
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.originalPrice && (
            <div className="bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-widest shadow-sm">
              {product.discount ?? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
            </div>
          )}
          {product.isTrending && (
            <div className="bg-white/95 backdrop-blur-sm text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-widest shadow-sm border border-blue-100">
              Trending
            </div>
          )}
          {product.isNewArrival && !product.isTrending && (
            <div className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-widest shadow-sm">
              New
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={isWishlisted} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(); }} className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full text-zinc-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-blue-700 hover:scale-110 shadow-sm translate-y-[-10px] group-hover:translate-y-0 min-w-[40px] min-h-[40px] flex items-center justify-center">
          <Heart className={"w-4 h-4 " + (isWishlisted ? "fill-current text-blue-700" : "")} />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsQuickViewOpen(true); }} className="w-full bg-zinc-900/95 backdrop-blur-sm text-white py-3 rounded-sm text-sm font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg">
            Quick View
          </button>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col flex-grow py-4 px-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-black uppercase tracking-widest text-blue-700">{product.category}</span>
          <div className="flex items-center text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[10px] ml-1 text-zinc-500 font-medium">{product.rating} ({product.reviews})</span>
          </div>
        </div>
        
        <Link to={"/product/" + product.id} className="text-sm font-bold text-zinc-900 hover:text-blue-700 transition-colors mb-2 line-clamp-1">
          {product.name}
        </Link>
        
        <div className="flex items-center space-x-2 mt-auto">
          <span className="text-sm font-black text-zinc-900">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-500 line-through decoration-zinc-300">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
        <button onClick={handleAddToCart} className="mt-4 w-full min-h-[42px] rounded-md bg-zinc-900 text-white text-xs font-black uppercase tracking-widest transition-colors hover:bg-blue-700 flex items-center justify-center gap-2">
          <ShoppingBag className="w-4 h-4" /> Add to Cart
        </button>
      </div>

      <QuickView product={product} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
    </motion.div>
  );
}

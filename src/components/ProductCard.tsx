import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Star } from 'lucide-react';
import { Product } from '../types';

export function ProductCard({ product, ...props }: { product: Product } & React.HTMLAttributes<HTMLDivElement>) {
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
        <Link to={`/products`} className="block w-full h-full">
          {/* Primary Image */}
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800' }}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${product.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
          />
          {/* Hover Image */}
          {product.hoverImage && (
            <img 
              src={product.hoverImage} 
              alt={`${product.name} alternate view`} 
              loading="lazy"
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800' }}
              className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
          )}
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.originalPrice && (
            <div className="bg-blue-700 text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-widest shadow-sm">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
            </div>
          )}
          {product.isTrending && (
            <div className="bg-white/95 backdrop-blur-sm text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-widest shadow-sm border border-blue-100">
              Trending
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-zinc-400 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-teal-600 hover:scale-110 shadow-sm translate-y-[-10px] group-hover:translate-y-0">
          <Heart className="w-4 h-4" />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
          <button className="w-full bg-zinc-900/95 backdrop-blur-sm text-white py-3 rounded-sm text-sm font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg">
            Quick Add
          </button>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col flex-grow p-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-black uppercase tracking-widest text-blue-700">{product.category}</span>
          <div className="flex items-center text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[10px] ml-1 text-zinc-500 font-medium">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/products`} className="text-sm font-bold text-zinc-900 hover:text-blue-700 transition-colors mb-2 line-clamp-1">
          {product.name}
        </Link>
        
        <div className="flex items-center space-x-2 mt-auto">
          <span className="text-sm font-black text-zinc-900">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-400 line-through decoration-zinc-300">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

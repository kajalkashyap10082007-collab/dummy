import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, Heart } from 'lucide-react';
import { useEffect, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useStore } from '../store';
import { useToast } from './Toast';

interface QuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

function QuickViewComponent({ product, isOpen, onClose }: QuickViewProps) {
  const navigate = useNavigate();
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useStore();
  const { toast } = useToast();
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const isWishlisted = wishlist.some(p => p.id === product.id);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast('Please select a size', 'error');
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast('Please select a color', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, 1);
    toast('Added to cart', 'success');
    onClose();
  };

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 flex flex-col md:flex-row"
          >
            <button aria-label="Close" onClick={onClose} className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-zinc-600 hover:text-zinc-900 shadow-sm">
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-zinc-100 relative">
              <img src={product.image} alt={product.imageAlt || `${product.category} ${product.name}`} width="900" height="1125" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
            
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[90vh] no-scrollbar">
              <span className="text-xs font-black text-blue-700 uppercase tracking-widest">{product.category}</span>
              <h2 id="quick-view-title" className="text-2xl font-black text-zinc-900 mt-2 mb-3">{product.name}</h2>
              
              <div className="flex items-center gap-3 mb-4 text-yellow-500">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-zinc-300'}`} />)}
                </div>
                <span className="text-sm text-zinc-600 font-medium">({product.reviews || 0} Reviews)</span>
              </div>
              
              <div className="flex items-end gap-3 mb-6">
                <span className="text-2xl font-black text-zinc-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-500 line-through mb-1">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              
              <p className="text-sm text-zinc-600 leading-relaxed mb-6 line-clamp-3">
                {product.description || 'Premium quality piece from Clothify. Elevate your wardrobe with our latest collection.'}
              </p>
              
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <span className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-2 block">Size</span>
                  <div className="flex gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size} onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 text-xs font-bold border rounded-md transition-all ${selectedSize === size ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-700 border-zinc-200'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {product.colors && product.colors.length > 0 && (
                <div className="mb-8">
                  <span className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-2 block">Color</span>
                  <div className="flex gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color} onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 min-h-[44px] text-xs font-bold border rounded-md transition-all ${selectedColor === color ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-700 border-zinc-200'}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-blue-700 text-white h-12 rounded-md font-black uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" /> Add to Cart
                </button>
                <div className="flex gap-3">
                  <button 
                    onClick={toggleWishlist}
                    className="flex-1 h-12 border border-zinc-200 rounded-md font-bold text-sm flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-500' : 'text-zinc-600'}`} />
                    Wishlist
                  </button>
                  <button 
                    onClick={() => { onClose(); navigate(`/product/${product.id}`); }}
                    className="flex-1 h-12 border border-zinc-200 rounded-md font-bold text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export const QuickView = memo(QuickViewComponent);

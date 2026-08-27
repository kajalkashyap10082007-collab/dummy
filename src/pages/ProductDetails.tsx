import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, ArrowLeft, RefreshCw, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data';
import { useStore } from '../store';
import { useToast } from '../components/Toast';
import { SEO } from '../components/SEO';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const product = products.find(p => p.id === id);
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useStore();
  
  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = wishlist.some(p => p.id === product?.id);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/products')} className="text-blue-700 hover:underline">
          Return to Shop
        </button>
      </div>
    );
  }

  const productSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Product", "name": product.name, "description": product.description, "image": product.images || [product.image], "category": product.category, "offers": { "@type": "Offer", "url": `https://dummy-mauve.vercel.app/product/${product.id}`, "priceCurrency": "INR", "price": product.price, "availability": "https://schema.org/InStock" } },
      { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dummy-mauve.vercel.app/" }, { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://dummy-mauve.vercel.app/products" }, { "@type": "ListItem", "position": 3, "name": product.name, "item": `https://dummy-mauve.vercel.app/product/${product.id}` }] }
    ]
  });

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast('Please select a size', 'error');
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast('Please select a color', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    toast('Added to cart', 'success');
  };

  const handleBuyNow = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast('Please select a size', 'error');
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast('Please select a color', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
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

  const allImages = product.images || [product.image, product.hoverImage].filter(Boolean) as string[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO title={`${product.name} | Clothify`} description={product.description || `Shop ${product.name} at Clothify.`} schemaMarkup={productSchema} canonicalUrl={`https://dummy-mauve.vercel.app/product/${product.id}`} ogType="product" ogImage={product.image} />
      <button aria-label="Go back" onClick={() => navigate(-1)} className="flex items-center text-zinc-600 hover:text-blue-700 mb-8 transition-colors min-h-[44px]">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 overflow-auto no-scrollbar max-h-[600px]">
            {allImages.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImage(img)}
                className={`w-20 h-24 md:w-24 md:h-32 flex-shrink-0 border-2 overflow-hidden rounded-md ${activeImage === img ? 'border-blue-700' : 'border-transparent'}`}
              >
                <img src={img} alt={`${product.imageAlt || `${product.category} ${product.name}`} thumbnail ${i + 1}`} width="96" height="128" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-zinc-100 rounded-2xl overflow-hidden aspect-[4/5] relative">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={activeImage}
                alt={product.imageAlt || `${product.category} ${product.name}`}
                width="900"
                height="1125"
                className="w-full h-full object-cover object-top"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-sm font-black text-blue-700 uppercase tracking-widest">{product.category}</span>
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 mt-2 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-zinc-300'}`} />
                ))}
              </div>
              <span className="text-sm text-zinc-600">({product.reviews || 0} Reviews)</span>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-zinc-900">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-zinc-500 line-through mb-1">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm font-black text-emerald-600 mb-1 ml-2">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="text-zinc-600 leading-relaxed mb-8">
            {product.description || 'Elevate your wardrobe with this premium piece from Clothify. Designed for maximum comfort and unparalleled style.'}
          </p>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-zinc-900">Select Size</span>
                <button className="text-sm text-blue-700 hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border rounded-md font-medium transition-all ${selectedSize === size ? 'border-blue-700 bg-blue-50 text-blue-700' : 'border-zinc-200 text-zinc-700 hover:border-zinc-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-8">
              <span className="text-sm font-bold text-zinc-900 mb-3 block">Color: <span className="text-zinc-600 font-normal">{selectedColor || 'Select'}</span></span>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-full text-sm min-h-[44px] font-medium transition-all ${selectedColor === color ? 'border-blue-700 bg-blue-50 text-blue-700' : 'border-zinc-200 text-zinc-700 hover:border-zinc-400'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex items-center border border-zinc-200 rounded-md h-14">
              <button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full flex items-center justify-center text-zinc-600 hover:text-blue-700">-</button>
              <span className="w-12 text-center font-medium flex items-center justify-center">{quantity}</span>
              <button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)} className="w-12 h-full flex items-center justify-center text-zinc-600 hover:text-blue-700">+</button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-zinc-900 text-white h-14 rounded-md font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" /> Add to Cart
            </button>
            
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-blue-700 text-white h-14 rounded-md font-black uppercase tracking-widest hover:bg-blue-700 transition-colors"
            >
              Buy Now
            </button>
            
            <button aria-label="Toggle wishlist" onClick={toggleWishlist}
              className={`h-14 w-14 border rounded-md flex items-center justify-center transition-colors ${isWishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'}`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-zinc-100">
            <div className="flex items-center gap-3 text-zinc-700">
              <Truck className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-medium">Free Shipping over ₹1,999</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-700">
              <RefreshCw className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-medium">14-Day Easy Returns</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-700">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-medium">100% Original Guarantee</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-20 pt-10 border-t border-zinc-200">
        <h3 className="text-2xl font-black text-zinc-900 mb-8">Customer Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-zinc-50 p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-3 text-yellow-500">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <h4 className="font-bold text-zinc-900 mb-2">Excellent Quality!</h4>
              <p className="text-sm text-zinc-600 mb-4">The fabric is incredibly soft and the fit is just perfect. I was worried about ordering online but the size guide was spot on. Highly recommend!</p>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span className="font-medium text-zinc-800">Jane Doe</span>
                <span>2 days ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

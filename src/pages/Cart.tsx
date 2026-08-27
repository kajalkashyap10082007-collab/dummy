import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../store';

export function Cart() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const totalOriginalPrice = cart.reduce((total, item) => total + (item.product.originalPrice || item.product.price) * item.quantity, 0);
  const discount = totalOriginalPrice - subtotal;
  const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 99;
  const finalTotal = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-6 text-zinc-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-zinc-900 mb-2">Your cart is empty</h2>
        <p className="text-zinc-500 mb-8 text-center max-w-sm">Looks like you haven't added anything to your cart yet. Discover our premium collection!</p>
        <Link to="/products" className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-zinc-900 mb-8 uppercase tracking-widest">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="border-t border-zinc-200">
            {cart.map((item, index) => (
              <div key={`${item.product.id}-${item.size}-${item.color}-${index}`} className="flex py-6 border-b border-zinc-200 gap-6">
                <Link to={`/product/${item.product.id}`} className="w-24 h-32 flex-shrink-0 rounded-md overflow-hidden bg-zinc-100">
                  <img src={item.product.image} alt={item.product.imageAlt || `${item.product.category} ${item.product.name}`} width="96" height="128" className="w-full h-full object-cover object-top" />
                </Link>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between mb-1">
                    <Link to={`/product/${item.product.id}`} className="font-bold text-zinc-900 hover:text-blue-700 transition-colors">
                      {item.product.name}
                    </Link>
                    <span className="font-black text-zinc-900">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                  
                  <div className="text-sm text-zinc-500 space-y-1 mb-4">
                    {item.size && <p>Size: {item.size}</p>}
                    {item.color && <p>Color: {item.color}</p>}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-zinc-200 rounded-md">
                      <button aria-label="Decrease quantity" onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:text-blue-700">-</button>
                      <span className="w-10 text-center text-sm font-medium flex items-center justify-center">{item.quantity}</span>
                      <button aria-label="Increase quantity" onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:text-blue-700">+</button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                      className="text-zinc-500 hover:text-red-500 transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-96">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h2 className="text-xl font-black text-zinc-900 mb-6 uppercase tracking-widest">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
            </div>
            
            <div className="border-t border-zinc-200 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-bold text-zinc-900">Total</span>
                <span className="text-2xl font-black text-zinc-900">₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-blue-700 text-white py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

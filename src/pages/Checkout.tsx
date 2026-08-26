import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { useToast } from '../components/Toast';

export function Checkout() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 99;
  const finalTotal = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast('Your cart is empty', 'error');
      return;
    }
    
    // Process order (demo)
    setTimeout(() => {
      clearCart();
      toast('Order placed successfully! ✓', 'success');
      navigate('/order-confirmation', { state: { orderId: 'ORD-' + Math.floor(Math.random() * 1000000), total: finalTotal } });
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-xl mb-4">No items to checkout.</p>
        <button onClick={() => navigate('/products')} className="text-slate-900 hover:underline">Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-zinc-900 mb-8 uppercase tracking-widest">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required name="firstName" placeholder="First Name" onChange={handleChange} className="border p-3 rounded-md focus:ring-2 focus:ring-slate-900 outline-none transition-all" />
                <input required name="lastName" placeholder="Last Name" onChange={handleChange} className="border p-3 rounded-md focus:ring-2 focus:ring-slate-900 outline-none transition-all" />
                <input required name="email" type="email" placeholder="Email Address" onChange={handleChange} className="border p-3 rounded-md focus:ring-2 focus:ring-slate-900 outline-none transition-all md:col-span-2" />
                <input required name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} className="border p-3 rounded-md focus:ring-2 focus:ring-slate-900 outline-none transition-all md:col-span-2" />
              </div>
            </section>

            {/* Shipping Info */}
            <section>
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required name="address" placeholder="Street Address" onChange={handleChange} className="border p-3 rounded-md focus:ring-2 focus:ring-slate-900 outline-none transition-all md:col-span-2" />
                <input required name="city" placeholder="City" onChange={handleChange} className="border p-3 rounded-md focus:ring-2 focus:ring-slate-900 outline-none transition-all" />
                <input required name="state" placeholder="State" onChange={handleChange} className="border p-3 rounded-md focus:ring-2 focus:ring-slate-900 outline-none transition-all" />
                <input required name="pincode" placeholder="Pincode" onChange={handleChange} className="border p-3 rounded-md focus:ring-2 focus:ring-slate-900 outline-none transition-all" />
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-zinc-50 transition-colors">
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="mr-3" />
                  <span className="font-medium">Cash on Delivery (COD)</span>
                </label>
                <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-zinc-50 transition-colors">
                  <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleChange} className="mr-3" />
                  <span className="font-medium">UPI / Net Banking</span>
                </label>
                <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-zinc-50 transition-colors">
                  <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="mr-3" />
                  <span className="font-medium">Credit / Debit Card</span>
                </label>
              </div>
            </section>
          </form>
        </div>
        
        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-96">
          <div className="bg-zinc-50 p-6 rounded-2xl sticky top-24">
            <h2 className="text-xl font-black text-zinc-900 mb-6 uppercase tracking-widest">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 no-scrollbar">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="relative w-16 h-20 rounded-md overflow-hidden bg-zinc-200 flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    <span className="absolute top-0 right-0 bg-zinc-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-bl-md">{item.quantity}</span>
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-bold text-zinc-900 line-clamp-2">{item.product.name}</p>
                    <p className="text-zinc-500 mt-1">{item.size} / {item.color}</p>
                    <p className="font-bold mt-1">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-zinc-200 pt-4 space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
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
              type="submit"
              form="checkout-form"
              className="w-full bg-slate-900 text-white py-4 rounded-full font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

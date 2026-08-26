import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

export function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, total } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-12 h-12 text-emerald-600" />
      </div>
      <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4 text-center uppercase tracking-widest">Order Confirmed!</h1>
      <p className="text-zinc-600 text-center max-w-md mb-8">
        Thank you for shopping with Clothify. Your order <span className="font-bold text-zinc-900">#{orderId}</span> has been placed successfully.
      </p>
      
      <div className="bg-zinc-50 p-6 rounded-xl w-full max-w-sm mb-8 border border-zinc-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-zinc-600">Order Total</span>
          <span className="font-black text-zinc-900">₹{total?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-600">Estimated Delivery</span>
          <span className="font-bold text-zinc-900">3-5 Business Days</span>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/products')}
        className="bg-blue-700 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
}

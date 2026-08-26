import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore } from '../store';
import { ProductCard } from '../components/ProductCard';

export function Wishlist() {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-300">
          <Heart className="w-10 h-10 fill-current" />
        </div>
        <h2 className="text-2xl font-black text-zinc-900 mb-2">Your wishlist is empty</h2>
        <p className="text-zinc-500 mb-8 text-center max-w-sm">Save your favorite items here to review them later or add them to cart.</p>
        <Link to="/products" className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-3xl font-black text-zinc-900 uppercase tracking-widest">My Wishlist</h1>
        <span className="text-zinc-500 font-medium">{wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

import fs from 'fs';

let content = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

// Replace standard lucide icons with lucide-react imports if missing (already there)
if (!content.includes('useStore')) {
  content = content.replace("import { Link, useLocation } from 'react-router-dom';", "import { Link, useLocation, useNavigate } from 'react-router-dom';\nimport { useStore } from '../../store';");
}

// Ensure navigate is available
if (!content.includes('useNavigate()')) {
  content = content.replace('const location = useLocation();', 'const location = useLocation();\n  const navigate = useNavigate();\n  const { cart, wishlist, user } = useStore();\n  const [searchQuery, setSearchQuery] = useState("");');
}

// Modify Cart button to have Link/navigate and badge
content = content.replace(
  /<button aria-label="Shopping Cart".*?>([\s\S]*?)<\/button>/,
  `<button aria-label="Shopping Cart" onClick={() => navigate('/cart')} className="p-2 text-zinc-600 hover:text-blue-700 transition-colors relative group min-w-[44px] min-h-[44px] flex items-center justify-center">
    <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
    {cart.length > 0 && (
      <span className="absolute top-0 right-0 w-4 h-4 bg-blue-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
        {cart.reduce((total, item) => total + item.quantity, 0)}
      </span>
    )}
  </button>`
);

// Add Wishlist button icon
content = content.replace(
  /<button aria-label="Search".*?<\/button>/,
  `<form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) navigate('/products?search=' + encodeURIComponent(searchQuery)); }} className="hidden lg:flex items-center bg-zinc-100 rounded-full px-4 py-2">
    <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-sm w-48 focus:w-64 transition-all" />
    <button type="submit" aria-label="Search" className="text-zinc-500 hover:text-blue-700">
      <Search className="w-4 h-4" />
    </button>
  </form>
  <button aria-label="Wishlist" onClick={() => navigate('/wishlist')} className="p-2 text-zinc-600 hover:text-blue-700 transition-colors relative min-w-[44px] min-h-[44px] flex items-center justify-center">
    <Heart className="w-5 h-5 hover:scale-110 transition-transform" />
    {wishlist.length > 0 && (
      <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
        {wishlist.length}
      </span>
    )}
  </button>`
);

content = content.replace(
  /<button aria-label="User Account".*?>([\s\S]*?)<\/button>/,
  `<button aria-label="User Account" onClick={() => navigate(user ? '/' : '/login')} className="p-2 text-zinc-600 hover:text-blue-700 transition-colors hidden sm:flex min-w-[44px] min-h-[44px] items-center justify-center">
    {user ? <span className="text-sm font-bold truncate max-w-[80px]">{user.name.split(' ')[0]}</span> : <User className="w-5 h-5" />}
  </button>`
);

fs.writeFileSync('src/components/layout/Navbar.tsx', content);

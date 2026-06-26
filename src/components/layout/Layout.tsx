import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import ScrollToTop from '../ScrollToTop';
import { Facebook, Instagram } from 'lucide-react';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-zinc-900 transition-colors duration-300 relative">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

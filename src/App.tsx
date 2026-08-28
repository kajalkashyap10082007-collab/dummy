import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { Layout } from './components/layout/Layout';
import { ToastProvider } from './components/Toast';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Products = lazy(() => import('./pages/Products').then(module => ({ default: module.Products })));
const ProductDetails = lazy(() => import('./pages/ProductDetails').then(module => ({ default: module.ProductDetails })));
const Cart = lazy(() => import('./pages/Cart').then(module => ({ default: module.Cart })));
const Wishlist = lazy(() => import('./pages/Wishlist').then(module => ({ default: module.Wishlist })));
const Checkout = lazy(() => import('./pages/Checkout').then(module => ({ default: module.Checkout })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation').then(module => ({ default: module.OrderConfirmation })));
const Blog = lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="clothify-theme">
      <ToastProvider>
        <Router basename="/">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about-clothify-sustainable-fashion" element={<About />} />
                <Route path="premium-clothing-collection" element={<Products />} />
                <Route path="products" element={<Products />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="cart" element={<Cart />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="order-confirmation" element={<OrderConfirmation />} />
                <Route path="login" element={<Login />} />
                <Route path="sustainable-fashion-blog" element={<Blog />} />
                <Route path="contact-clothify" element={<Contact />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

import { useState, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import PromoBanners from './components/PromoBanners';
import CategoryGrid from './components/CategoryGrid';
import FlashSale from './components/FlashSale';
import MidBanners from './components/MidBanners';
import BrandShowcase from './components/BrandShowcase';
import ProductGrid from './components/ProductGrid';
import TrustStrip from './components/TrustStrip';
import Newsletter from './components/Newsletter';
import RecentlyViewed from './components/RecentlyViewed';
import CartDrawer from './components/CartDrawer';
import QuickView from './components/QuickView';
import BottomNav from './components/BottomNav';
import { type Product } from './data/products';

function AppInner() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [activeNav, setActiveNav] = useState('Home');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const handleQuickView = useCallback((p: Product) => {
    setQuickViewProduct(p);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((x) => x.id !== p.id);
      return [p, ...filtered].slice(0, 12);
    });
  }, []);

  return (
    <div className="min-h-svh bg-[#f0eff5]">
      <Toaster position="bottom-center" />
      <Header query={query} onQuery={setQuery} />
      <CartDrawer />
      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />

      <main className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-5 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-10 flex flex-col gap-4 sm:gap-6 md:gap-7">
        <HeroBanner />
        <PromoBanners />
        <CategoryGrid active={category} onChange={setCategory} />
        <FlashSale onQuickView={handleQuickView} />
        <MidBanners />
        <BrandShowcase />
        <ProductGrid query={query} category={category} onQuickView={handleQuickView} />
        <RecentlyViewed items={recentlyViewed} onQuickView={handleQuickView} />
        <Newsletter />
        <TrustStrip />

        <footer className="text-center text-xs text-gray-400 py-4 border-t-2 border-dashed border-gray-200">
          © 2026 Marketa · All rights reserved
        </footer>
      </main>

      <BottomNav active={activeNav} onSelect={setActiveNav} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AppInner />
      </WishlistProvider>
    </CartProvider>
  );
}

import { useState } from 'react';
import { Search, Bell, Heart, ShoppingCart, Menu, X, MapPin, ChevronDown, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import clsx from 'clsx';

const TOP_CATS = ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Grocery', 'Deals', 'New Arrivals'];

interface Props { query: string; onQuery: (v: string) => void; }

export default function Header({ query, onQuery }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const { count: wishCount } = useWishlist();

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-[#1a1a2e]">
      {/* Promo bar */}
      <div className="bg-[#6c47ff] text-white text-xs text-center py-1.5 font-semibold tracking-wide flex items-center justify-center gap-2">
        <Zap size={12} className="fill-yellow-300 text-yellow-300" />
        Free shipping on orders over $30 — Use code <strong className="bg-white/20 px-1.5 py-0.5 rounded font-black">FREESHIP</strong>
        <Zap size={12} className="fill-yellow-300 text-yellow-300" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#6c47ff] rounded-lg border-2 border-[#1a1a2e] flex items-center justify-center shadow-[2px_2px_0_#1a1a2e]">
              <ShoppingCart size={16} className="text-white" />
            </div>
            <span className="text-xl font-black text-[#1a1a2e] tracking-tight hidden sm:block">Marketa</span>
          </div>

          {/* Location */}
          <button className="hidden md:flex items-center gap-1 text-sm text-gray-600 hover:text-[#6c47ff] transition-colors shrink-0 border border-gray-200 rounded-lg px-2.5 py-1.5">
            <MapPin size={13} className="text-[#6c47ff]" />
            <span className="font-semibold">San Francisco</span>
            <ChevronDown size={12} />
          </button>

          {/* Search */}
          <div className="flex-1 flex items-center bg-gray-50 rounded-xl overflow-hidden border-2 border-[#1a1a2e] focus-within:border-[#6c47ff] transition-colors shadow-[2px_2px_0_#1a1a2e] focus-within:shadow-[2px_2px_0_#6c47ff]">
            <Search size={15} className="ml-3 text-gray-400 shrink-0" />
            <input
              type="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Search products, brands and more…"
              className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none text-gray-800 placeholder:text-gray-400"
            />
            <button className="bg-[#6c47ff] text-white text-sm font-black px-4 py-2.5 hover:bg-[#5a38e0] transition-colors shrink-0">
              Search
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl border-2 border-[#1a1a2e] text-gray-600 hover:text-[#6c47ff] hover:border-[#6c47ff] transition-colors relative shadow-[2px_2px_0_#1a1a2e]">
              <Bell size={17} />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>

            <button
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl border-2 border-[#1a1a2e] text-gray-600 hover:text-red-500 hover:border-red-400 transition-colors relative shadow-[2px_2px_0_#1a1a2e]"
            >
              <Heart size={17} />
              {wishCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black min-w-[16px] h-4 rounded-full flex items-center justify-center px-0.5 border border-white">
                  {wishCount}
                </span>
              )}
            </button>

            <button
              onClick={openCart}
              className="flex items-center gap-1.5 bg-[#6c47ff] text-white rounded-xl px-3 py-2 border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e] hover:bg-[#5a38e0] transition-colors relative"
            >
              <ShoppingCart size={17} />
              <span className="hidden sm:block text-sm font-black">Cart</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 border-2 border-white bounce-pop">
                  {count}
                </span>
              )}
            </button>

            <button className="hidden md:block text-sm font-black text-[#6c47ff] border-2 border-[#6c47ff] rounded-xl px-3 py-2 hover:bg-[#6c47ff] hover:text-white transition-all shadow-[2px_2px_0_#6c47ff] ml-1">
              Sign In
            </button>

            <button className="md:hidden p-2 text-gray-600" onClick={() => setMenuOpen((o) => !o)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Desktop category nav */}
        <nav className="hidden md:flex items-center gap-0.5 pb-2 overflow-x-auto scrollbar-hide">
          {TOP_CATS.map((c) => (
            <button key={c} className="text-sm text-gray-600 hover:text-[#6c47ff] font-semibold px-3 py-1.5 rounded-lg hover:bg-violet-50 transition-all whitespace-nowrap">
              {c}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      <div className={clsx(
        'md:hidden overflow-hidden transition-all duration-300 bg-white border-t-2 border-[#1a1a2e]',
        menuOpen ? 'max-h-64' : 'max-h-0'
      )}>
        <div className="px-4 py-3 flex flex-wrap gap-2">
          {TOP_CATS.map((c) => (
            <button key={c} onClick={() => setMenuOpen(false)}
              className="text-sm text-gray-700 bg-gray-100 hover:bg-violet-100 hover:text-[#6c47ff] font-semibold px-3 py-1.5 rounded-full transition-all border border-gray-200">
              {c}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

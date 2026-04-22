import { useState } from 'react';
import { SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import { type Product } from '../data/products';
import clsx from 'clsx';

const SORTS = ['Recommended', 'Price ↑', 'Price ↓', 'Top Rated', 'Newest'];

interface Props { query: string; category: string; onQuickView: (p: Product) => void; }

export default function ProductGrid({ query, category, onQuickView }: Props) {
  const [sort, setSort] = useState('Recommended');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const { products, loading } = useProducts(query, category);

  const sorted = [...products].sort((a, b) => {
    if (sort === 'Price ↑') return a.price - b.price;
    if (sort === 'Price ↓') return b.price - a.price;
    if (sort === 'Top Rated') return (b.rating ?? 0) - (a.rating ?? 0);
    return 0;
  });

  const heading = category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products`
    : 'Trending Now';

  return (
    <section>
      {/* Header row — wraps cleanly on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-4">
        <h2 className="text-base sm:text-lg font-black text-gray-900 shrink-0">
          {heading}
          {!loading && <span className="ml-2 text-xs sm:text-sm font-semibold text-gray-400">({sorted.length})</span>}
        </h2>
        <div className="flex items-center gap-2">
          {/* Sort chips — scrollable row */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1 sm:flex-none pb-0.5">
            <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
            {SORTS.map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={clsx(
                  'text-[10px] sm:text-xs font-black px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border-2 transition-all whitespace-nowrap',
                  sort === s
                    ? 'bg-[#6c47ff] text-white border-[#6c47ff] shadow-[2px_2px_0_#1a1a2e]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#6c47ff] hover:text-[#6c47ff]'
                )}
              >
                {s}
              </button>
            ))}
          </div>
          {/* View toggle */}
          <div className="flex border-2 border-[#1a1a2e] rounded-xl overflow-hidden shadow-[2px_2px_0_#1a1a2e] shrink-0">
            <button onClick={() => setView('grid')} className={clsx('p-1.5 transition-colors', view === 'grid' ? 'bg-[#6c47ff] text-white' : 'bg-white text-gray-400 hover:bg-gray-50')}>
              <LayoutGrid size={14} />
            </button>
            <button onClick={() => setView('list')} className={clsx('p-1.5 transition-colors border-l-2 border-[#1a1a2e]', view === 'list' ? 'bg-[#6c47ff] text-white' : 'bg-white text-gray-400 hover:bg-gray-50')}>
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4">
          {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : sorted.length === 0 ? (
        <div className="paper-card text-center py-12 sm:py-16 px-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full border-2 border-[#1a1a2e] flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <SlidersHorizontal size={22} className="text-gray-400" />
          </div>
          <p className="font-black text-gray-700 mb-1">No items found</p>
          <p className="text-sm text-gray-400">Try a different search or category</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4">
          {sorted.map((p) => <ProductCard key={p.id} product={p} onQuickView={onQuickView} />)}
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {sorted.map((p) => (
            <div key={p.id} className="paper-card flex gap-3 sm:gap-4 p-2.5 sm:p-3 cursor-pointer" onClick={() => onQuickView(p)}>
              <img src={p.image} alt={p.title} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg sm:rounded-xl border-2 border-[#1a1a2e] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase truncate">{p.seller}</p>
                <h3 className="font-black text-gray-900 text-xs sm:text-sm leading-snug mt-0.5 line-clamp-2">{p.title}</h3>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1,2,3,4,5].map((i) => (
                    <svg key={i} viewBox="0 0 24 24" className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i <= Math.round(p.rating ?? 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}>
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  ))}
                  <span className="text-[9px] sm:text-[10px] text-gray-400 ml-0.5 hidden sm:inline">({p.reviews?.toLocaleString()})</span>
                </div>
              </div>
              <div className="shrink-0 text-right flex flex-col justify-between">
                <div>
                  <p className="font-black text-[#6c47ff] text-sm sm:text-base">${p.price}</p>
                  {p.originalPrice && <p className="text-[10px] sm:text-xs text-gray-400 line-through">${p.originalPrice}</p>}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="mt-2 bg-[#6c47ff] text-white text-[10px] font-black px-2 py-1 rounded-lg border border-[#1a1a2e] hidden sm:block"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

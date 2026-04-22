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
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-black text-gray-900">
          {heading}
          {!loading && <span className="ml-2 text-sm font-semibold text-gray-400">({sorted.length})</span>}
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal size={14} className="text-gray-400 shrink-0" />
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
            {SORTS.map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={clsx(
                  'text-xs font-black px-3 py-1.5 rounded-full border-2 transition-all whitespace-nowrap',
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
          <div className="flex border-2 border-[#1a1a2e] rounded-xl overflow-hidden shadow-[2px_2px_0_#1a1a2e]">
            <button
              onClick={() => setView('grid')}
              className={clsx('p-1.5 transition-colors', view === 'grid' ? 'bg-[#6c47ff] text-white' : 'bg-white text-gray-400 hover:bg-gray-50')}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setView('list')}
              className={clsx('p-1.5 transition-colors border-l-2 border-[#1a1a2e]', view === 'list' ? 'bg-[#6c47ff] text-white' : 'bg-white text-gray-400 hover:bg-gray-50')}
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : sorted.length === 0 ? (
        <div className="paper-card text-center py-16 px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full border-2 border-[#1a1a2e] flex items-center justify-center mx-auto mb-4">
            <SlidersHorizontal size={24} className="text-gray-400" />
          </div>
          <p className="font-black text-gray-700 mb-1">No items found</p>
          <p className="text-sm text-gray-400">Try a different search or category</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {sorted.map((p) => <ProductCard key={p.id} product={p} onQuickView={onQuickView} />)}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((p) => (
            <div key={p.id} className="paper-card flex gap-4 p-3 cursor-pointer" onClick={() => onQuickView(p)}>
              <img src={p.image} alt={p.title} className="w-24 h-24 object-cover rounded-xl border-2 border-[#1a1a2e] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 font-semibold uppercase">{p.seller}</p>
                <h3 className="font-black text-gray-900 text-sm leading-snug mt-0.5">{p.title}</h3>
                <div className="flex items-center gap-1 mt-1">
                  {[1,2,3,4,5].map((i) => (
                    <svg key={i} viewBox="0 0 24 24" className={`w-3 h-3 ${i <= Math.round(p.rating ?? 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}>
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  ))}
                  <span className="text-[10px] text-gray-400">({p.reviews?.toLocaleString()})</span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-black text-[#6c47ff] text-base">${p.price}</p>
                {p.originalPrice && <p className="text-xs text-gray-400 line-through">${p.originalPrice}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

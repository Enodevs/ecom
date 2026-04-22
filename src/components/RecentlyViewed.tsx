import { Clock } from 'lucide-react';
import { type Product } from '../data/products';
import ProductCard from './ProductCard';

interface Props {
  items: Product[];
  onQuickView: (p: Product) => void;
}

export default function RecentlyViewed({ items, onQuickView }: Props) {
  if (items.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-100 rounded-lg border-2 border-[#1a1a2e] flex items-center justify-center shadow-[2px_2px_0_#1a1a2e]">
            <Clock size={14} className="text-gray-600" />
          </div>
          <h2 className="text-lg font-black text-gray-900">Recently Viewed</h2>
        </div>
        <button className="text-sm font-bold text-[#6c47ff] hover:underline">Clear</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {items.slice(0, 6).map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
        ))}
      </div>
    </section>
  );
}

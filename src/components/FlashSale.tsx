import useEmblaCarousel from 'embla-carousel-react';
import { useFlashProducts, useCountdown } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import { Zap } from 'lucide-react';
import { type Product } from '../data/products';

interface Props { onQuickView: (p: Product) => void; }

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#1a1a2e] text-white font-black text-base md:text-xl w-10 md:w-12 h-10 md:h-12 rounded-lg border-2 border-[#1a1a2e] flex items-center justify-center tabular-nums shadow-[2px_2px_0_#6c47ff]">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-[9px] font-black text-gray-500 mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function FlashSale({ onQuickView }: Props) {
  const { products, loading } = useFlashProducts();
  const { h, m, s } = useCountdown(4 * 3600 + 23 * 60 + 47);
  const [emblaRef] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });

  return (
    <section className="bg-white rounded-2xl border-2 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 rounded-lg p-1.5 border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e]">
            <Zap size={16} className="text-gray-900 fill-gray-900" />
          </div>
          <h2 className="text-lg font-black text-gray-900">Flash Sale</h2>
          <span className="text-xs bg-red-500 text-white font-black px-2 py-0.5 rounded-full border border-red-600 animate-pulse">LIVE</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-bold">Ends in</span>
          <div className="flex items-center gap-1">
            <TimeBlock value={h} label="HRS" />
            <span className="text-gray-400 font-black text-lg pb-4">:</span>
            <TimeBlock value={m} label="MIN" />
            <span className="text-gray-400 font-black text-lg pb-4">:</span>
            <TimeBlock value={s} label="SEC" />
          </div>
        </div>

        <button className="text-sm font-black text-[#6c47ff] hover:underline">See all →</button>
      </div>

      <div ref={emblaRef} className="overflow-hidden -mx-1">
        <div className="flex gap-3 px-1">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="min-w-[160px] md:min-w-[200px]"><SkeletonCard /></div>
              ))
            : products.map((p) => (
                <div key={p.id} className="min-w-[160px] md:min-w-[200px]">
                  <ProductCard product={p} onQuickView={onQuickView} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
